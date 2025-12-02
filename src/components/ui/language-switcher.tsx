"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

type Locale = "pt" | "en" | "it" | "es";

export default function LanguageSwitcher() {
  const t = useTranslations("footer");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value as Locale;
    router.push(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-2">
      {/* Ícone de mundo */}

      <select
        aria-label={t("languageLabel")}
        onChange={handleLanguageChange}
        value={currentLocale}
        className="
          rounded-md bg-white/10 px-2 py-1 text-white text-sm 
          outline-none ring-1 ring-white/10 
          focus:ring-2 focus:ring-sky-400
        "
      >
        <option className="text-black" value="pt">
          Português (BR)
        </option>
        <option className="text-black" value="en">
          English (US)
        </option>
        <option className="text-black" value="it">
          Italiano
        </option>
        <option className="text-black" value="es">
          Espanhol
        </option>
      </select>
    </div>
  );
}
