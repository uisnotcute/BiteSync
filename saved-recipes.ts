import { desc, eq } from "drizzle-orm";
import { Router, type IRouter } from "express";
import {
  CreateSavedRecipeBody,
  CreateSavedRecipeResponse,
  DeleteSavedRecipeParams,
  ListSavedRecipesResponse,
  UpdateSavedRecipeBody,
  UpdateSavedRecipeParams,
  UpdateSavedRecipeResponse,
} from "@workspace/api-zod";
import { db, savedRecipesTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/saved-recipes", async (_req, res): Promise<void> => {
  const recipes = await db
    .select()
    .from(savedRecipesTable)
    .orderBy(desc(savedRecipesTable.updatedAt), desc(savedRecipesTable.id));

  res.json(ListSavedRecipesResponse.parse(recipes));
});

router.post("/saved-recipes", async (req, res): Promise<void> => {
  const parsed = CreateSavedRecipeBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn(
      { errors: parsed.error.flatten() },
      "Invalid saved recipe request",
    );
    res.status(400).json({ error: "Check the recipe details and try again." });
    return;
  }

  const [recipe] = await db
    .insert(savedRecipesTable)
    .values(parsed.data)
    .returning();

  res.status(201).json(CreateSavedRecipeResponse.parse(recipe));
});

router.patch("/saved-recipes/:id", async (req, res): Promise<void> => {
  const params = UpdateSavedRecipeParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Enter a valid saved recipe identifier." });
    return;
  }

  const parsed = UpdateSavedRecipeBody.safeParse(req.body);
  if (!parsed.success || Object.keys(parsed.data ?? {}).length === 0) {
    req.log.warn(
      { errors: parsed.success ? undefined : parsed.error.flatten() },
      "Invalid saved recipe update",
    );
    res.status(400).json({ error: "Add a valid recipe update and try again." });
    return;
  }

  const [recipe] = await db
    .update(savedRecipesTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(savedRecipesTable.id, params.data.id))
    .returning();

  if (!recipe) {
    res.status(404).json({ error: "Saved recipe not found." });
    return;
  }

  res.json(UpdateSavedRecipeResponse.parse(recipe));
});

router.delete("/saved-recipes/:id", async (req, res): Promise<void> => {
  const params = DeleteSavedRecipeParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Enter a valid saved recipe identifier." });
    return;
  }

  const [recipe] = await db
    .delete(savedRecipesTable)
    .where(eq(savedRecipesTable.id, params.data.id))
    .returning({ id: savedRecipesTable.id });

  if (!recipe) {
    res.status(404).json({ error: "Saved recipe not found." });
    return;
  }

  res.sendStatus(204);
});

export default router;
