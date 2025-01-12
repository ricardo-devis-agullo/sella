"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [language, setLanguage] = useState("ca");
  const t = useTranslations("Layout");

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    window.location.href = `/${lang}`;
  };

  return (
    <div className="min-h-screen bg-amber-50 text-amber-900 font-serif">
      <header className="bg-amber-100 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            {t("title")}
          </Link>
          <div>
            <button
              type="button"
              onClick={() => changeLanguage("ca")}
              className={`mr-2 ${language === "ca" ? "font-bold" : ""}`}
            >
              Català
            </button>
            <button
              type="button"
              onClick={() => changeLanguage("es")}
              className={language === "es" ? "font-bold" : ""}
            >
              Español
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
