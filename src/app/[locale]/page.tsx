import Link from "next/link";
import { categories } from "@/data/recipes";
import { getTranslations } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Category");
  const h = await getTranslations("Home");

  return (
    <>
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-8 text-center">{h("title")}</h1>
        <div className="prose prose-amber prose-lg mx-auto">
          {h("prologue")
            .split("\n\n")
            .map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]"
                    : ""
                }
              >
                {paragraph}
              </p>
            ))}
          <p className="text-right italic mt-8">— {h("author")}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/${locale}/category/${category}`}
              className="bg-amber-200 p-6 rounded-lg shadow-md hover:bg-amber-300 transition-colors text-center text-xl"
            >
              {t(category)}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
