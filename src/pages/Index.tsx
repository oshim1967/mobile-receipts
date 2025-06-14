
import React, { useState, useEffect } from "react";
import { useLanguage, Lang } from "@/hooks/useLanguage";
import { LanguageSelector } from "@/components/LanguageSelector";
import { translations } from "@/locales";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { lang, setLanguage } = useLanguage();

  // Состояние для отображения экрана выбора языка только при первом запуске
  const [showLangScreen, setShowLangScreen] = useState(false);

  useEffect(() => {
    // Если языка нет в localStorage, показать экран выбора языка
    const stored = localStorage.getItem("user_language");
    if (!stored) setShowLangScreen(true);
  }, []);

  const handleSelectLang = (newLang: Lang) => {
    setLanguage(newLang);
    setShowLangScreen(false);
  };

  if (showLangScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LanguageSelector selected={lang} onSelect={handleSelectLang} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="absolute top-4 right-4">
        <Button variant="ghost" onClick={() => setShowLangScreen(true)}>
          {lang === "uk" ? "Змінити мову" : "Change language"}
        </Button>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          {translations[lang].welcome}
        </h1>
        <p className="text-xl text-muted-foreground">
          {lang === "uk"
            ? "Почніть створення свого проєкту тут!"
            : "Start building your amazing project here!"}
        </p>
      </div>
    </div>
  );
};

export default Index;
