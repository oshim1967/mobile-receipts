
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

// Можно заменить emoji на иллюстрацию при наличии файла:
// import ManArtist from "@/assets/happy-man-artist.svg";

const slides = [
  {
    title: "Добро пожаловать!",
    description:
      "Здесь вы сможете легко вести свои расходы, анализировать траты и экономить.",
    image: "👨‍🎨", // Место для весёлого человечка
  },
  {
    title: "Удобно и быстро",
    description: "Понятные отчёты, мгновенный ввод чеков, всегда под рукой.",
    image: "👨‍🎤",
  },
  {
    title: "Контролируйте финансы",
    description: "Начните свой путь к финансовой стабильности прямо сейчас!",
    image: "👨‍💼",
  },
];

interface OnboardingProps {
  onStart: () => void;
}

export function Onboarding({ onStart }: OnboardingProps) {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < slides.length - 1) setStep(step + 1);
    else onStart();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-300 to-pink-300 transition duration-700">
      <div className="w-full max-w-md rounded-[2rem] bg-white/80 shadow-2xl p-8 flex flex-col items-center gap-6 animate-fade-in">
        <div className="text-7xl mb-2 drop-shadow-sm">{slides[step].image}</div>
        <h2 className="text-[2rem] font-bold text-primary mb-2 text-center">
          {slides[step].title}
        </h2>
        <p className="text-lg text-muted-foreground mb-4 text-center">
          {slides[step].description}
        </p>
        <div className="flex items-center mt-2 mb-4">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-6 rounded-full mx-1 transition-all duration-300 ${
                i === step ? "bg-orange-400" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <Button
          size="lg"
          className="w-full font-semibold bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-400 text-white shadow-lg hover:scale-105 transition-transform"
          onClick={next}
          aria-label={step < slides.length - 1 ? "Далее" : "Начать"}
        >
          {step < slides.length - 1 ? "Далее" : "Начать"}
        </Button>
      </div>
    </div>
  );
}
