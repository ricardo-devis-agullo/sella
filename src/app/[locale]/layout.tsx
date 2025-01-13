import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "../globals.css";
import { Link, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getRecipesSummary } from "@/data/recipes";
import SearchBar from "@/components/search-bar";
import LocaleSwitcherSelect from "@/components/locale-switcher";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Recetes de Sella",
  description: "Recetes de cuina de Sella",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const recipes = getRecipesSummary(locale);
  const t = await getTranslations("Layout");

  return (
    <html lang={locale}>
      <body className={`${playfair.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen bg-amber-50 text-amber-900 font-serif flex flex-col">
            <header className="bg-amber-100 p-4 shadow-md">
              <div className="container mx-auto flex justify-between items-center gap-4">
                <Link href="/" className="text-2xl font-bold hidden sm:block">
                  {t("title")}
                </Link>
                <div className="flex-1 sm:flex-initial">
                  <SearchBar recipes={recipes} locale={locale as string} />
                </div>
                <LocaleSwitcherSelect />
              </div>
            </header>
            <main className="container mx-auto p-4 flex-1">{children}</main>
            <footer className="bg-amber-100 p-4 mt-8">
              <div className="container mx-auto text-center">
                © {new Date().getFullYear()} {t("title")}
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
