"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { useTransition, useState } from "react";
import { Locale, usePathname, useRouter } from "@/i18n/routing";

export default function LocaleSwitcherSelect() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const locales = {
    ca: "Valencià",
    es: "Español",
    en: "English",
  };

  return (
    <div
      className={clsx(
        "relative",
        isPending && "transition-opacity [&:disabled]:opacity-30"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-amber-200 transition-colors"
      >
        <span>{locales[params.locale as Locale]}</span>
        <span className="text-xs">▼</span>
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 py-2 w-32 bg-white rounded-lg shadow-lg z-50">
            {Object.entries(locales).map(([code, name]) => (
              <button
                key={code}
                onClick={() => {
                  startTransition(() => {
                    router.replace(
                      // @ts-expect-error -- Same as above
                      { pathname, params },
                      { locale: code as Locale }
                    );
                  });
                  setIsOpen(false);
                }}
                className={clsx(
                  "w-full px-4 py-2 text-left hover:bg-amber-50 transition-colors",
                  code === params.locale && "font-semibold bg-amber-100"
                )}
                disabled={isPending}
              >
                {name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
