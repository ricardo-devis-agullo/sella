import type { Recipe } from "./src/data/recipes.ts";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

type Translations = Record<string, unknown> & {
  recipes: Record<string, Recipe>;
};
const getTranslations = (locale: string): Translations => {
  return JSON.parse(
    readFileSync(
      path.join(process.cwd(), "messages", `${locale}.json`),
      "utf-8"
    )
  );
};
const publicFiles = readdirSync(path.join(process.cwd(), "public", "recipes"));

const main = getTranslations("ca");
const otherLanguages = {
  es: getTranslations("es"),
};

function error(message: string): never {
  console.error(message);
  process.exit(1);
}

for (const recipe of Object.keys(main.recipes)) {
  if (!publicFiles.includes(`${recipe}.webp`)) {
    error(`MISSING IMAGE! ${recipe}`);
  }

  for (const language of Object.keys(otherLanguages)) {
    const other = otherLanguages[language];

    if (!other.recipes[recipe]) {
      error(`MISSING! ${recipe} in ${language}`);
    } else {
      if (
        main.recipes[recipe].difficulty !== other.recipes[recipe].difficulty
      ) {
        error(`DIFFICULTY MISMATCH! ${recipe} in ${language}`);
      }
      if (
        main.recipes[recipe].preparationTime !==
        other.recipes[recipe].preparationTime
      ) {
        error(`PREPARATION TIME MISMATCH! ${recipe} in ${language}`);
      }
      if (
        main.recipes[recipe].cookingTime !== other.recipes[recipe].cookingTime
      ) {
        error(`COOKING TIME MISMATCH! ${recipe} in ${language}`);
      }
      if (main.recipes[recipe].servings !== other.recipes[recipe].servings) {
        error(`SERVINGS MISMATCH! ${recipe} in ${language}`);
      }
      if (main.recipes[recipe].category !== other.recipes[recipe].category) {
        error(`CATEGORY MISMATCH! ${recipe} in ${language}`);
      }
      if (
        main.recipes[recipe].ingredients.length !==
        other.recipes[recipe].ingredients.length
      ) {
        error(`INGREDIENTS MISMATCH! ${recipe} in ${language}`);
      }
      if (
        main.recipes[recipe].instructions.length !==
        other.recipes[recipe].instructions.length
      ) {
        error(`INSTRUCTIONS MISMATCH! ${recipe} in ${language}`);
      }
    }
  }
}

console.log("All ok!");
