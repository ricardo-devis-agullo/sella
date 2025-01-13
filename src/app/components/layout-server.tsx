import { getRecipesSummary } from "@/data/recipes";
import Layout from "./layout";

type LayoutServerProps = {
  children: React.ReactNode;
};

export default function LayoutServer({ children }: LayoutServerProps) {
  const recipes = getRecipesSummary();

  return <Layout recipes={recipes}>{children}</Layout>;
}
