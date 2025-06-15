import React, { useState, useEffect } from "react";
import { useLanguage, Lang } from "@/hooks/useLanguage";
import { LanguageSelector } from "@/components/LanguageSelector";
import { translations } from "@/locales";
import { Button } from "@/components/ui/button";
import { AuthForm } from "@/components/AuthForm";
import { Onboarding } from "@/components/Onboarding";

const STORAGE_KEY = "auth_data";
const ONBOARDING_KEY = "onboarding_complete";

const Index = () => {
  const { lang, setLanguage } = useLanguage();

  // Состояние для экрана выбора языка только при первом запуске
  const [showLangScreen, setShowLangScreen] = useState(false);

  // Показываем форму авторизации, если auth_data отсутствует
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Состояние для экрана настройки
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user_language");
    if (!stored) setShowLangScreen(true);
  }, []);

  useEffect(() => {
    // Проверить если есть auth_data (без валидации токена)
    const auth = localStorage.getItem(STORAGE_KEY);
    setIsAuthenticated(!!auth);
  }, []);

  useEffect(() => {
    // Онбординг показываем только при первом запуске (и если еще не завершен)
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (!completed) setShowOnboarding(true);
  }, []);

  const handleSelectLang = (newLang: Lang) => {
    setLanguage(newLang);
    setShowLangScreen(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleFinishOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem(ONBOARDING_KEY, "1");
  };

  if (showOnboarding) {
    return <Onboarding onStart={handleFinishOnboarding} />;
  }

  if (showLangScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-300 to-pink-300">
        <LanguageSelector selected={lang} onSelect={handleSelectLang} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-300 to-pink-300">
        <div className="absolute top-4 right-4">
          <Button variant="ghost" onClick={() => setShowLangScreen(true)}>
            {translations[lang].changeLang}
          </Button>
        </div>
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  // Приветствие после авторизации — ВАЖНО: фон и человечек теперь ярко-позитивные.
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-300 to-pink-300">
      <div className="absolute top-4 right-4">
        <Button variant="ghost" onClick={() => setShowLangScreen(true)}>
          {translations[lang].changeLang}
        </Button>
      </div>
      <div className="text-center animate-fade-in">
        <div className="text-7xl mb-4 drop-shadow-sm">👨‍🎨</div>
        <h1 className="text-4xl font-bold mb-4">{translations[lang].welcome}</h1>
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
