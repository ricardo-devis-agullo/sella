import Link from "next/link";
import Layout from "../components/layout";
import { categories } from "@/data/recipes";
import { getTranslations } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Category");

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-center">Home</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/${locale}/category/${category}`}
            className="bg-amber-200 p-4 rounded-lg shadow-md hover:bg-amber-300 transition-colors text-center"
          >
            {t(category)}
          </Link>
        ))}
      </div>
    </Layout>
  );
}
