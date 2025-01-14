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
      <div className="max-w-5xl mx-auto mb-12 mt-12">
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

        <div className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">{h("credits.title")}</h2>
          <div className="space-y-6">
            <p className="font-semibold">{h("credits.editor")}</p>

            <div>
              <p className="font-medium">{h("credits.supervision.title")}</p>
              {["Rosa Cartagena Mas", "Virtu Pérez Honorato"].map((person) => (
                <p key={person}>{person}</p>
              ))}
            </div>

            <div>
              <p className="font-medium">{h("credits.textRevision.title")}</p>
              {["Eva Berenguer Baldó"].map((person: string) => (
                <p key={person}>{person}</p>
              ))}
            </div>

            <div>
              <p className="font-medium">{h("credits.specialThanks.title")}</p>
              <p>
                <span className="font-medium">Aurora Soler Garcia</span>{" "}
                {h("credits.specialThanks.credits.translation")}
              </p>
              <p>
                <span className="font-medium">Jaume Soriano Sivera</span>{" "}
                {h("credits.specialThanks.credits.cover")}
              </p>
              <p>
                <span className="font-medium">David Garcia</span>{" "}
                {h("credits.specialThanks.credits.photography")}
              </p>
              <p>
                <span className="font-medium">Veronica Guzmán</span>{" "}
                {h("credits.specialThanks.credits.printing")}
              </p>
              <p>
                <span className="font-medium">
                  Trinidad Mas Sirvent i Virtudes Honorato Climent
                </span>{" "}
                {h("credits.specialThanks.credits.adaptation")}
              </p>
            </div>

            <div>
              <p className="font-medium">{h("credits.printing.title")}</p>
              <p>{h("credits.printing.company")}</p>
            </div>

            <p className="text-sm text-amber-700">{h("credits.copyright")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
