
import { useState, useCallback, useEffect } from "react";

export type Lang = "uk" | "en";
const LANGUAGE_KEY = "user_language";

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem(LANGUAGE_KEY);
    return stored === "en" ? "en" : "uk";
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, lang);
  }, [lang]);

  const setLanguage = useCallback((newLang: Lang) => {
    setLang(newLang);
  }, []);

  return { lang, setLanguage };
}
