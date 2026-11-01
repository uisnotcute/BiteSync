import { Router, type IRouter } from "express";
import {
  GetVideoMetadataBody,
  GetVideoMetadataResponse,
  type VideoMetadata,
} from "@workspace/api-zod";

const router: IRouter = Router();

const YOUTUBE_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"]);
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const METADATA_TIMEOUT_MS = 8000;

type SupportedVideo = {
  canonicalUrl: string;
  embedEndpoint: string;
  platform: VideoMetadata["platform"];
};

function parseSupportedVideo(input: string): SupportedVideo | null {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return null;
  }

  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) return null;
  const host = url.hostname.toLowerCase();

  if (YOUTUBE_HOSTS.has(host)) {
    const segments = url.pathname.split("/").filter(Boolean);
    const videoId = host === "youtu.be"
      ? segments[0]
      : url.pathname === "/watch"
        ? url.searchParams.get("v") ?? undefined
        : ["shorts", "embed", "live"].includes(segments[0] ?? "")
          ? segments[1]
          : undefined;

    if (!videoId || !VIDEO_ID.test(videoId)) return null;
    const isShort = segments[0] === "shorts";
    const canonicalUrl = isShort
      ? `https://www.youtube.com/shorts/${videoId}`
      : `https://www.youtube.com/watch?v=${videoId}`;

    return {
      canonicalUrl,
      embedEndpoint: `https://www.youtube.com/oembed?url=${encodeURIComponent(canonicalUrl)}&format=json`,
      platform: isShort ? "YouTube Shorts" : "YouTube",
    };
  }

  return null;
}

function textField(data: Record<string, unknown>, key: string, maxLength: number): string | null {
  const value = data[key];
  return typeof value === "string" && value.trim()
    ? value.trim().slice(0, maxLength)
    : null;
}

function safeHttpsUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.toString() : null;
  } catch {
    return null;
  }
}

router.post("/video-metadata", async (req, res): Promise<void> => {
  const parsedBody = GetVideoMetadataBody.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ error: "Enter a valid public video link." });
    return;
  }

  const video = parseSupportedVideo(parsedBody.data.url);
  if (!video) {
    res.status(400).json({
      error: "BiteSync can currently read public YouTube links. TikTok and Instagram previews aren't available here yet; choose a recipe from the library instead.",
    });
    return;
  }

  let providerResponse: Response;
  try {
    providerResponse = await fetch(video.embedEndpoint, {
      headers: { Accept: "application/json" },
      redirect: "error",
      signal: AbortSignal.timeout(METADATA_TIMEOUT_MS),
    });
  } catch {
    req.log.warn({ platform: video.platform }, "Public video metadata request failed");
    res.status(502).json({ error: "The video provider could not be reached. Try again or choose a recipe from the library." });
    return;
  }

  if (!providerResponse.ok) {
    const unavailable = [400, 401, 403, 404].includes(providerResponse.status);
    res.status(unavailable ? 422 : 502).json({
      error: unavailable
        ? "This video is private or its public preview is unavailable. Choose a recipe from the library instead."
        : "The video provider could not read this link. Try again in a moment.",
    });
    return;
  }

  let providerData: Record<string, unknown>;
  try {
    const payload: unknown = await providerResponse.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid metadata");
    providerData = payload as Record<string, unknown>;
  } catch {
    req.log.warn({ platform: video.platform }, "Public video metadata response was invalid");
    res.status(502).json({ error: "The video provider returned an unreadable preview. Try again or choose a recipe from the library." });
    return;
  }

  const title = textField(providerData, "title", 240);
  const creator = textField(providerData, "author_name", 120);
  if (!title || !creator) {
    res.status(422).json({ error: "This video does not have enough public details to identify a recipe." });
    return;
  }

  const response: VideoMetadata = {
    title,
    creator,
    creatorUrl: safeHttpsUrl(textField(providerData, "author_url", 1000)),
    platform: video.platform,
    thumbnailUrl: safeHttpsUrl(textField(providerData, "thumbnail_url", 2000)),
    sourceUrl: video.canonicalUrl,
  };

  res.json(GetVideoMetadataResponse.parse(response));
});

export default router;
