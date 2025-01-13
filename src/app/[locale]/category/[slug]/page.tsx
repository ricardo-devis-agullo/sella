import Link from "next/link";
import Image from "next/image";
import { Category, getRecipesByCategory } from "@/data/recipes";
import { getTranslations } from "next-intl/server";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const recipes = getRecipesByCategory(Category.parse(slug));
  const t = await getTranslations("Category");
  const tr = await getTranslations("Recipe");

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{t(slug)}</h1>
      <div className="grid gap-4">
        {recipes.map((recipe) => (
          <Link
            key={recipe.slug}
            href={`/${locale}/recipe/${recipe.slug}`}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex gap-4 items-center"
          >
            <div className="flex-shrink-0">
              <Image
                src={`/recipes/${recipe.slug}.webp`}
                alt={recipe.title}
                width={80}
                height={80}
                className="rounded-lg object-cover w-20 h-20"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <div className="flex gap-4 text-sm text-amber-700">
                <span>
                  {tr("difficulty.title")}:{" "}
                  {tr(`difficulty.${recipe.difficulty}`)}
                </span>
                <span>
                  {tr("prepTime")}: {recipe.preparationTime}
                </span>
                {recipe.cookingTime && (
                  <span>
                    {tr("cookTime")}: {recipe.cookingTime}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {recipes.length === 0 && (
        <p className="text-gray-500">{t("noRecipes")}</p>
      )}
    </>
  );
}
