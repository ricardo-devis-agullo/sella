import { loadRecipes } from "@/data/recipes";
import Layout from "./layout";

type LayoutServerProps = {
  children: React.ReactNode;
};

export default function LayoutServer({ children }: LayoutServerProps) {
  // Server-side data loading
  const recipes = Object.entries(loadRecipes()).map(([slug, recipe]) => ({
    slug,
    ...recipe,
  }));

  return <Layout recipes={recipes}>{children}</Layout>;
}
