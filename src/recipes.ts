export type Ingredient = {
  id: string;
  name: string;
  price: number;
  defaultPantry: boolean;
};

export type Recipe = {
  id: string;
  title: string;
  creator: string;
  platform: string;
  time: string;
  calories: string;
  protein: string;
  badge: string;
  keywords: string[];
  ingredients: Ingredient[];
  steps: string[];
  tips: string[];
};

export const RECIPES: Recipe[] = [
  {
    id: "chicken",
    title: "Crispy Honey-Soy Chicken Rice Bowl",
    creator: "@chef_alex_reels",
    platform: "Instagram Reel",
    time: "20 mins",
    calories: "520 kcal",
    protein: "42g",
    badge: "High protein",
    keywords: ["chicken", "teriyaki", "honey soy", "soy chicken"],
    ingredients: [
      { id: "ing-1", name: "Chicken Breast Fillet (300g)", price: 28.5, defaultPantry: false },
      { id: "ing-2", name: "Japanese Light Soy Sauce", price: 16, defaultPantry: true },
      { id: "ing-3", name: "Pure Organic Honey (250g)", price: 24, defaultPantry: true },
      { id: "ing-4", name: "Fresh Broccoli Florets (Pack)", price: 9.5, defaultPantry: false },
      { id: "ing-5", name: "Jasmine White Rice", price: 12, defaultPantry: true },
      { id: "ing-6", name: "Fresh Garlic Clove (Pack of 3)", price: 6.5, defaultPantry: false },
    ],
    steps: [
      "Cut the chicken breast into bite-sized cubes and pat dry with paper towels.",
      "In a small bowl, whisk 2 tbsp light soy sauce, 1.5 tbsp honey, and minced garlic.",
      "Sear the chicken on medium-high heat for 6-8 minutes until golden crisp on edges.",
      "Pour the honey-soy sauce mixture into the pan, letting it bubble into a sticky glaze.",
      "Steam broccoli florets for 3 minutes, then serve over warm jasmine rice.",
    ],
    tips: [
      "Take the chicken off the heat as soon as the edges turn golden. Honey can go from glossy to burnt quickly.",
      "Let the pan get hot before adding the chicken so it browns instead of steaming.",
    ],
  },
  {
    id: "pasta",
    title: "15-Minute Creamy Garlic Parmesan Pasta",
    creator: "@pasta_daily_shorts",
    platform: "YouTube Shorts",
    time: "15 mins",
    calories: "610 kcal",
    protein: "19g",
    badge: "Quick dinner",
    keywords: ["pasta", "parmesan", "fettuccine", "alfredo"],
    ingredients: [
      { id: "ing-7", name: "Italian Fettuccine (500g)", price: 15, defaultPantry: false },
      { id: "ing-8", name: "Heavy Cooking Cream (200ml)", price: 18.5, defaultPantry: false },
      { id: "ing-9", name: "Parmesan Cheese Wedge (100g)", price: 22, defaultPantry: false },
      { id: "ing-10", name: "Fresh Garlic Head", price: 5.5, defaultPantry: true },
      { id: "ing-11", name: "Extra Virgin Olive Oil & Pepper", price: 14, defaultPantry: true },
    ],
    steps: [
      "Bring a large pot of salted water to boil and cook fettuccine al dente (8-9 mins).",
      "Gently sauté finely minced garlic in 1 tablespoon of olive oil over low heat.",
      "Stir in heavy cream and bring to a simmer for 2 minutes until slightly reduced.",
      "Toss hot pasta directly into sauce, fold in freshly grated Parmesan, and season with black pepper.",
    ],
    tips: [
      "Save a mug of pasta water before draining. A splash helps the sauce cling without getting heavy.",
      "Keep the cream at a gentle simmer; a hard boil can make it split.",
    ],
  },
  {
    id: "salmon",
    title: "Sesame-Honey Salmon Rice Bowl",
    creator: "@weeknight.table",
    platform: "YouTube Shorts",
    time: "25 mins",
    calories: "575 kcal",
    protein: "38g",
    badge: "Balanced",
    keywords: ["salmon", "honey salmon", "sesame salmon"],
    ingredients: [
      { id: "ing-12", name: "Salmon Fillet (250g)", price: 52, defaultPantry: false },
      { id: "ing-13", name: "Jasmine White Rice", price: 12, defaultPantry: true },
      { id: "ing-14", name: "Japanese Soy Sauce", price: 16, defaultPantry: true },
      { id: "ing-15", name: "Pure Honey (250g)", price: 24, defaultPantry: true },
      { id: "ing-16", name: "Cucumber (1 pc)", price: 8.5, defaultPantry: false },
      { id: "ing-17", name: "Toasted Sesame Seeds", price: 11, defaultPantry: false },
    ],
    steps: [
      "Cook the rice and fluff it while warm.",
      "Pat the salmon dry, then season lightly with salt and pepper.",
      "Sear the salmon skin-side down for 4-5 minutes; turn and cook until just opaque.",
      "Stir soy sauce and honey together, then brush over the salmon in the final minute.",
      "Serve over rice with sliced cucumber and sesame seeds.",
    ],
    tips: [
      "Pull the salmon when the middle is just opaque and still moist; it keeps cooking for a minute after leaving the pan.",
      "Brush on the honey-soy glaze near the end so the sugars don't scorch.",
    ],
  },
  {
    id: "shrimp",
    title: "One-Pan Lemon Butter Shrimp Orzo",
    creator: "@pantryandplate",
    platform: "TikTok",
    time: "22 mins",
    calories: "490 kcal",
    protein: "31g",
    badge: "One pan",
    keywords: ["shrimp", "prawn", "orzo", "lemon butter"],
    ingredients: [
      { id: "ing-18", name: "Peeled Shrimp (250g)", price: 36, defaultPantry: false },
      { id: "ing-19", name: "Orzo Pasta (200g)", price: 17, defaultPantry: false },
      { id: "ing-20", name: "Fresh Lemon (1 pc)", price: 7, defaultPantry: false },
      { id: "ing-21", name: "Unsalted Butter (100g)", price: 18, defaultPantry: true },
      { id: "ing-22", name: "Baby Spinach (1 bag)", price: 15, defaultPantry: false },
      { id: "ing-23", name: "Fresh Garlic Clove (Pack of 3)", price: 6.5, defaultPantry: true },
    ],
    steps: [
      "Warm butter in a deep pan and soften the garlic over medium-low heat.",
      "Stir in the orzo, then add 500ml warm stock or water. Simmer, stirring often, until tender.",
      "Add shrimp and cook for 2-3 minutes until pink and opaque.",
      "Fold in spinach, lemon zest, and a squeeze of lemon juice.",
      "Loosen with a splash of water if needed, then taste and season before serving.",
    ],
    tips: [
      "Shrimp cook in a flash. Add them near the end and take the pan off once they turn pink.",
      "Keep the orzo moving so it doesn't settle and stick to the bottom.",
    ],
  },
  {
    id: "tofu",
    title: "Crispy Tofu Peanut Noodle Bowl",
    creator: "@theweekdaycook",
    platform: "TikTok",
    time: "25 mins",
    calories: "560 kcal",
    protein: "27g",
    badge: "Plant-based",
    keywords: ["tofu", "peanut noodles", "tofu noodles"],
    ingredients: [
      { id: "ing-24", name: "Firm Tofu (300g)", price: 16, defaultPantry: false },
      { id: "ing-25", name: "Egg Noodles (2 nests)", price: 15, defaultPantry: false },
      { id: "ing-26", name: "Smooth Peanut Butter (250g)", price: 22, defaultPantry: true },
      { id: "ing-27", name: "Japanese Light Soy Sauce", price: 16, defaultPantry: true },
      { id: "ing-28", name: "Fresh Lime (1 pc)", price: 8, defaultPantry: false },
      { id: "ing-29", name: "Cucumber (1 pc)", price: 8.5, defaultPantry: false },
    ],
    steps: [
      "Press the tofu with a clean towel, cut into cubes, and pat the outside dry.",
      "Pan-fry tofu in a little oil, turning occasionally, until golden on most sides.",
      "Cook the noodles following the packet directions; save a few spoonfuls of noodle water.",
      "Whisk peanut butter, soy sauce, lime juice, and warm noodle water until glossy.",
      "Toss noodles with the sauce and cucumber, then finish with the crisp tofu.",
    ],
    tips: [
      "Dry tofu is the secret to crisp edges. Give it a few minutes in a clean towel before it hits the pan.",
      "Add noodle water a spoon at a time until the peanut sauce turns silky.",
    ],
  },
  {
    id: "udon",
    title: "Miso Mushroom Udon",
    creator: "@noodlesafterwork",
    platform: "Instagram Reel",
    time: "18 mins",
    calories: "430 kcal",
    protein: "16g",
    badge: "Comfort food",
    keywords: ["udon", "miso mushroom", "mushroom udon"],
    ingredients: [
      { id: "ing-30", name: "Frozen Udon Noodles (2 packs)", price: 20, defaultPantry: false },
      { id: "ing-31", name: "Mixed Mushrooms (200g)", price: 18, defaultPantry: false },
      { id: "ing-32", name: "White Miso Paste (150g)", price: 27, defaultPantry: true },
      { id: "ing-33", name: "Baby Spinach (1 bag)", price: 15, defaultPantry: false },
      { id: "ing-34", name: "Spring Onions (1 bunch)", price: 8, defaultPantry: false },
      { id: "ing-35", name: "Toasted Sesame Oil", price: 15, defaultPantry: true },
    ],
    steps: [
      "Sear torn mushrooms in a little oil until browned and their edges start to crisp.",
      "Pour in 600ml water or vegetable stock and bring to a gentle simmer.",
      "Loosen the miso with a ladle of warm broth in a small bowl, then stir it back into the pan.",
      "Add udon and simmer until warmed through, then fold in spinach.",
      "Top with sliced spring onions and a few drops of sesame oil.",
    ],
    tips: [
      "Miso tastes best when it isn't boiled hard. Stir it in after lowering the heat.",
      "Let the mushrooms sit undisturbed for a minute so they brown instead of steaming.",
    ],
  },
];

export function findRecipeForVideo(title: string): Recipe | null {
  const normalizedTitle = title.toLowerCase().replace(/[\s_-]+/g, " ");
  return RECIPES.find((recipe) =>
    recipe.keywords.some((keyword) => normalizedTitle.includes(keyword)),
  ) ?? null;
}
