import fs from "node:fs";
import path from "node:path";

export const categories = ["starters", "cocas", "main-courses", "sweets"];
export type Category = (typeof categories)[number];

export type Recipe = {
  title: string;
  author?: string;
  difficulty: "easy" | "medium" | "hard";
  preparationTime: string;
  cookingTime?: string;
  category: Category;
  ingredients: string[];
  instructions: string[];
  notes?: string;
  image: string;
};
let recipes: Record<string, Recipe> | undefined = undefined;

function loadRecipes(): Record<string, Recipe> {
  if (recipes) return recipes;

  const loadedRecipes = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "messages", "ca.json"), "utf-8")
  ).recipes;
  recipes = loadedRecipes;

  return loadedRecipes;
}

export function getRecipesByCategory(
  category: Category
): Array<Recipe & { slug: string }> {
  const recipes = loadRecipes();

  return Object.entries(recipes)
    .filter(([_slug, recipe]) => recipe.category === category)
    .map(([slug, recipe]) => ({ slug, ...recipe }));
}

export function getRecipeBySlug(
  slug: string
): (Recipe & { slug: string }) | undefined {
  const recipes = loadRecipes();

  const recipe = recipes[slug];
  return recipe ? { slug, ...recipe } : undefined;
}
