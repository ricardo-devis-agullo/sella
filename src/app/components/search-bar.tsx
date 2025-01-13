"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { RecipeSummary } from "@/data/recipes";

type SearchProps = {
  recipes: Array<RecipeSummary>;
  locale: string;
};

export default function SearchBar({ recipes, locale }: SearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState<Array<RecipeSummary>>(
    []
  );
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.length > 1) {
      const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered.slice(0, 5)); // Limit to 5 results
      setIsOpen(true);
    } else {
      setFilteredRecipes([]);
      setIsOpen(false);
    }
  };

  const handleRecipeClick = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/${locale}/recipe/${slug}`);
  };

  return (
    <div className="relative w-64" ref={searchRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={t("Layout.search")}
        className="w-full px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
      />
      {isOpen && filteredRecipes.length > 0 && (
        <div className="absolute z-50 w-96 mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {filteredRecipes.map((recipe) => (
            <button
              key={recipe.slug}
              onClick={() => handleRecipeClick(recipe.slug)}
              className="w-full p-3 hover:bg-amber-50 flex items-center gap-3 border-b border-amber-100 last:border-none"
            >
              <Image
                src={`/recipes/${recipe.slug}.webp`}
                alt={recipe.title}
                width={48}
                height={48}
                className="rounded-md object-cover w-12 h-12"
              />
              <div className="text-left">
                <div className="font-semibold">{recipe.title}</div>
                <div className="text-xs text-amber-700">
                  {t(`Recipe.difficulty.${recipe.difficulty}`)} •{" "}
                  {recipe.preparationTime}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
