
import React from "react";
import { Button } from "@/components/ui/button";
import { Lang } from "@/hooks/useLanguage";

interface LanguageSelectorProps {
  selected: Lang;
  onSelect: (lang: Lang) => void;
}

export const LANG_LABELS = {
  uk: "Українська",
  en: "English",
};

export function LanguageSelector({ selected, onSelect }: LanguageSelectorProps) {
  return (
    <div className="flex flex-col items-center p-8 gap-6">
      <h2 className="text-2xl font-bold mb-2">
        {selected === "uk" ? "Оберіть мову" : "Select language"}
      </h2>
      <div className="flex gap-4">
        <Button
          variant={selected === "uk" ? "default" : "outline"}
          onClick={() => onSelect("uk")}
        >
          🇺🇦 Українська
        </Button>
        <Button
          variant={selected === "en" ? "default" : "outline"}
          onClick={() => onSelect("en")}
        >
          🇬🇧 English
        </Button>
      </div>
    </div>
  );
}
