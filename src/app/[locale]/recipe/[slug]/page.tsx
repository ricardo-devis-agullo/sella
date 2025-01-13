import Image from "next/image";
import { getRecipeBySlug, type Recipe } from "@/data/recipes";
import { notFound } from "next/navigation";
import { getTranslations, getMessages } from "next-intl/server";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const t = await getTranslations(`recipes.${slug}`);
  const tr = await getTranslations("Recipe");
  const messages = await getMessages();
  const { ingredients, instructions } = (
    messages.recipes as any as Record<string, Recipe>
  )[slug];

  return (
    <article className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">
        {t("title")}
        {t("author") && (
          <span className="block text-lg text-gray-600 font-normal mt-1">
            {tr("version")} {t("author")}
          </span>
        )}
      </h1>
      <div className="flex gap-4 mb-4 text-sm text-amber-700">
        <span>
          {tr("difficulty.title")}: {tr(`difficulty.${recipe.difficulty}`)}
        </span>
        {recipe.servings && <span>Racions: {recipe.servings}</span>}
        <span>
          {tr("prepTime")}: {t("preparationTime")}
        </span>
        {recipe.cookingTime && (
          <span>
            {tr("cookTime")}: {t("cookingTime")}
          </span>
        )}
      </div>
      <Image
        src={`/recipes/${slug}.webp`}
        alt={t("title")}
        width={600}
        height={400}
        className="rounded-lg mb-6"
      />
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {ingredients.map((ingredient, index) => (
            <li key={`ingredient-${index}`}>{ingredient}</li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">{tr("instructions")}</h2>
        <ol className="list-decimal list-inside">
          {instructions.map((step, index) => (
            <li key={`step-${index}`} className="mb-2">
              {step}
            </li>
          ))}
        </ol>
      </section>
      {t.has("notes") && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">{tr("notes")}</h2>
          <p>{t("notes")}</p>
        </section>
      )}
    </article>
  );
}
