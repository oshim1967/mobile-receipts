
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { translations } from "@/locales";
import { useLanguage } from "@/hooks/useLanguage";

interface AuthFormProps {
  onAuthSuccess: () => void;
}

const STORAGE_KEY = "auth_data";

export function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const { lang } = useLanguage();

  const [apiKey, setApiKey] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // При монтировании пробуем подставить сохранённые данные
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        setApiKey(data.apiKey || "");
        setLogin(data.login || "");
        setPassword(data.password || "");
      } catch (e) {
        // ignore wrong format
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!apiKey.trim() || !login.trim() || !password.trim()) {
      setError(translations[lang].errorAuth);
      return;
    }

    // Здесь вместо реального запроса — имитация авторизации:
    // Просто сохраняем в localStorage
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ apiKey, login, password })
    );
    onAuthSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs bg-card p-6 rounded-xl flex flex-col gap-4 shadow-lg"
      autoComplete="off"
    >
      <h2 className="text-2xl font-bold mb-2 text-center">
        {translations[lang].authTitle}
      </h2>
      <div className="flex flex-col gap-2">
        <label className="text-base font-medium" htmlFor="api-key">
          {translations[lang].apiKey}
        </label>
        <Input
          id="api-key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={translations[lang].apiKey}
          type="text"
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-base font-medium" htmlFor="login">
          {translations[lang].login}
        </label>
        <Input
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder={translations[lang].login}
          type="text"
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-base font-medium" htmlFor="password">
          {translations[lang].password}
        </label>
        <Input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={translations[lang].password}
          type="password"
          autoComplete="off"
        />
      </div>
      {error && (
        <div className="text-sm text-destructive text-center">{error}</div>
      )}
      <Button type="submit" className="mt-2">
        {translations[lang].submit}
      </Button>
    </form>
  );
}
