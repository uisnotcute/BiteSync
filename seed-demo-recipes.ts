import {
  db,
  savedRecipesTable,
  type InsertSavedRecipe,
} from "@workspace/db";

const day = 24 * 60 * 60 * 1000;

const demoRecipes: (InsertSavedRecipe & {
  createdAt: Date;
  updatedAt: Date;
})[] = [
  {
    seedKey: "bitesync-demo-chicken",
    recipeId: "chicken",
    title: "Crispy Honey-Soy Chicken Rice Bowl",
    creator: "@chef_alex_reels",
    platform: "BiteSync Library",
    durationMinutes: 20,
    calories: 520,
    proteinGrams: 42,
    ingredientCount: 6,
    sourceUrl: null,
    sourceTitle: null,
    thumbnailUrl: null,
    estimatedCostCents: 4450,
    status: "cooked" as const,
    pantry: {
      "ing-1": false,
      "ing-2": true,
      "ing-3": true,
      "ing-4": false,
      "ing-5": true,
      "ing-6": false,
    },
    completedSteps: [0, 1, 2, 3, 4],
    createdAt: new Date(Date.now() - 8 * day),
    updatedAt: new Date(Date.now() - 8 * day),
  },
  {
    seedKey: "bitesync-demo-pasta",
    recipeId: "pasta",
    title: "15-Minute Creamy Garlic Parmesan Pasta",
    creator: "@pasta_daily_shorts",
    platform: "BiteSync Library",
    durationMinutes: 15,
    calories: 610,
    proteinGrams: 19,
    ingredientCount: 5,
    sourceUrl: null,
    sourceTitle: null,
    thumbnailUrl: null,
    estimatedCostCents: 5550,
    status: "draft" as const,
    pantry: {
      "ing-7": false,
      "ing-8": false,
      "ing-9": false,
      "ing-10": true,
      "ing-11": true,
    },
    completedSteps: [0],
    createdAt: new Date(Date.now() - 4 * day),
    updatedAt: new Date(Date.now() - 4 * day),
  },
  {
    seedKey: "bitesync-demo-salmon",
    recipeId: "salmon",
    title: "Sesame-Honey Salmon Rice Bowl",
    creator: "@weeknight.table",
    platform: "BiteSync Library",
    durationMinutes: 25,
    calories: 575,
    proteinGrams: 38,
    ingredientCount: 6,
    sourceUrl: null,
    sourceTitle: null,
    thumbnailUrl: null,
    estimatedCostCents: 7150,
    status: "cooked" as const,
    pantry: {
      "ing-12": false,
      "ing-13": true,
      "ing-14": true,
      "ing-15": true,
      "ing-16": false,
      "ing-17": false,
    },
    completedSteps: [0, 1, 2, 3, 4],
    createdAt: new Date(Date.now() - 2 * day),
    updatedAt: new Date(Date.now() - 2 * day),
  },
  {
    seedKey: "bitesync-demo-udon",
    recipeId: "udon",
    title: "Miso Mushroom Udon",
    creator: "@noodlesafterwork",
    platform: "BiteSync Library",
    durationMinutes: 18,
    calories: 430,
    proteinGrams: 16,
    ingredientCount: 6,
    sourceUrl: null,
    sourceTitle: null,
    thumbnailUrl: null,
    estimatedCostCents: 6100,
    status: "draft" as const,
    pantry: {
      "ing-30": false,
      "ing-31": false,
      "ing-32": true,
      "ing-33": false,
      "ing-34": false,
      "ing-35": true,
    },
    completedSteps: [],
    createdAt: new Date(Date.now() - day),
    updatedAt: new Date(Date.now() - day),
  },
];

export async function seedDemoRecipes(): Promise<void> {
  await db
    .insert(savedRecipesTable)
    .values(demoRecipes)
    .onConflictDoNothing({ target: savedRecipesTable.seedKey });
}
