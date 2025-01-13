import Link from "next/link";
import SearchBar from "./search-bar";
import { getRecipesSummary } from "@/data/recipes";
import { getTranslations } from "next-intl/server";

interface LayoutProps {
  children: React.ReactNode;
  locale: string;
}

export default async function Layout({ children, locale }: LayoutProps) {
  const recipes = getRecipesSummary(locale);
  const t = await getTranslations("Layout");

  return (
    <div className="min-h-screen bg-amber-50 text-amber-900 font-serif">
      <header className="bg-amber-100 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold">
              {t("title")}
            </Link>
            <SearchBar recipes={recipes} locale={locale as string} />
          </div>
          <div>
            <a href="/ca">
              <button
                type="button"
                className={`mr-2 ${locale === "ca" ? "font-bold" : ""}`}
              >
                Valencià
              </button>
            </a>
            <a href="/es">
              <button
                type="button"
                className={`mr-2 ${locale === "es" ? "font-bold" : ""}`}
              >
                Español
              </button>
            </a>
            <a href="/en">
              <button
                type="button"
                className={locale === "en" ? "font-bold" : ""}
              >
                English
              </button>
            </a>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">{children}</main>
      <footer className="bg-amber-100 p-4 mt-8">
        <div className="container mx-auto text-center">
          © {new Date().getFullYear()} {t("title")}
        </div>
      </footer>
    </div>
  );
}
