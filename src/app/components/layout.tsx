"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import SearchBar from "./search-bar";
import type { RecipeSummary } from "@/data/recipes";

type LayoutProps = {
  children: React.ReactNode;
  recipes: Array<RecipeSummary>;
};

export default function Layout({ children, recipes }: LayoutProps) {
  const { locale } = useParams();
  const t = useTranslations("Layout");

  const changeLanguage = (lang: string) => {
    window.location.href = `/${lang}`;
  };

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
            <button
              type="button"
              onClick={() => changeLanguage("ca")}
              className={`mr-2 ${locale === "ca" ? "font-bold" : ""}`}
            >
              Valencià
            </button>
            <button
              type="button"
              onClick={() => changeLanguage("es")}
              className={`mr-2 ${locale === "es" ? "font-bold" : ""}`}
            >
              Español
            </button>
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              className={locale === "en" ? "font-bold" : ""}
            >
              English
            </button>
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
