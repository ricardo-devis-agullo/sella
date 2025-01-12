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

export function getRecipesByCategory(
  category: Category
): Array<Recipe & { slug: string }> {
  const recipes: Record<string, Recipe> = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "messages", `ca.json`), "utf-8")
  ).recipes;

  return Object.entries(recipes)
    .filter(([_slug, recipe]) => recipe.category === category)
    .map(([slug, recipe]) => ({ slug, ...recipe }));
}

export function getRecipeBySlug(
  slug: string
): (Recipe & { slug: string }) | undefined {
  const recipes: Record<string, Recipe> = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "messages", `ca.json`), "utf-8")
  ).recipes;

  const recipe = recipes[slug];
  return recipe ? { slug, ...recipe } : undefined;
}
