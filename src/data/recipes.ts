import fs from "node:fs";
import path from "node:path";
import z from "zod";

export const categories = [
  "starters",
  "cocas",
  "main-courses",
  "sweets",
] as const;
export const Category = z.enum(categories);
export type Category = z.infer<typeof Category>;

export const Recipe = z.object({
  title: z.string(),
  author: z.string().optional(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  preparationTime: z.string(),
  cookingTime: z.string().optional(),
  servings: z.number().optional(),
  category: z.enum(categories),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  notes: z.string().optional(),
});
export type Recipe = z.infer<typeof Recipe>;

let recipes: Record<string, Recipe> | undefined = undefined;

export function loadRecipes(locale = "ca"): Record<string, Recipe> {
  if (recipes) return recipes;

  const loadedRecipes = z
    .record(Recipe)
    .parse(
      JSON.parse(
        fs.readFileSync(
          path.join(process.cwd(), "messages", `${locale}.json`),
          "utf-8"
        )
      ).recipes
    );
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
