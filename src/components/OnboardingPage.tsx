import { useState } from "react";
import { StoredUser } from "@/hooks/useStorage";
import Icon from "@/components/ui/icon";

interface Props {
  onComplete: (user: StoredUser) => void;
}

const avatars = ["🧑‍🚀", "👦", "👧", "🧒", "👨‍🎓", "👩‍🎓", "🦸", "🦸‍♀️", "🧙", "🧜‍♀️", "🐱", "🦊"];

const goals = [
  { id: "school", emoji: "🏫", label: "Для школы", desc: "Подготовка к урокам и экзаменам" },
  { id: "travel", emoji: "✈️", label: "Для путешествий", desc: "Общение за границей" },
  { id: "fun", emoji: "🎮", label: "Для интереса", desc: "Просто хочу выучить язык" },
  { id: "work", emoji: "💼", label: "Для работы", desc: "Карьера и деловое общение" },
];

type Step = "welcome" | "name" | "avatar" | "goal" | "ready";

export default function OnboardingPage({ onComplete }: Props) {
  const [step, setStep] = useState<Step>("welcome");
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🧑‍🚀");
  const [selectedGoal, setSelectedGoal] = useState("fun");
  const [nameError, setNameError] = useState("");

  const handleNameNext = () => {
    if (!name.trim() || name.trim().length < 2) {
      setNameError("Введи имя (минимум 2 буквы)");
      return;
    }
    setNameError("");
    setStep("avatar");
  };

  const handleFinish = () => {
    const newUser: StoredUser = {
      name: name.trim(),
      avatar: selectedAvatar,
      level: 1,
      xp: 0,
      xpToNext: 200,
      streak: 0,
      stars: 0,
      totalLessons: 30,
      completedLessons: [],
      registeredAt: new Date().toISOString(),
    };
    onComplete(newUser);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto">
      {/* Progress dots */}
      {step !== "welcome" && step !== "ready" && (
        <div className="flex items-center justify-center gap-2 pt-6 px-4">
          {(["name", "avatar", "goal"] as Step[]).map((s) => {
            const steps: Step[] = ["name", "avatar", "goal"];
            const current = steps.indexOf(step);
            const idx = steps.indexOf(s);
            return (
              <div
                key={s}
                className="rounded-full transition-all duration-300"
                style={{
                  width: idx === current ? 24 : 8,
                  height: 8,
                  background: idx <= current ? "#3B82F6" : "#E2E8F0",
                }}
              />
            );
          })}
        </div>
      )}

      {/* STEP: Welcome */}
      {step === "welcome" && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center text-6xl mb-6 bounce-in"
            style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", boxShadow: "0 16px 40px rgba(59,130,246,0.35)" }}
          >
            🇬🇧
          </div>
          <h1
            className="text-4xl font-900 mb-3 fade-in-up"
            style={{ color: "#1E293B", animationDelay: "0.1s" }}
          >
            EnglishUp
          </h1>
          <p
            className="text-lg text-muted-foreground font-600 mb-2 fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Учи английский как игру!
          </p>
          <p
            className="text-sm text-muted-foreground font-600 mb-10 fade-in-up"
            style={{ animationDelay: "0.25s", maxWidth: 280 }}
          >
            30 уроков грамматики • Ударный режим • Звёзды и достижения
          </p>

          <div className="flex flex-col gap-3 w-full fade-in-up" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={() => setStep("name")}
              className="btn-ios w-full py-4 text-white font-900 text-lg"
              style={{ background: "linear-gradient(135deg,#3B82F6,#6366F1)" }}
            >
              Начать бесплатно 🚀
            </button>
            <p className="text-xs text-muted-foreground font-600">
              Регистрация за 30 секунд • Без кредитки
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 w-full mt-8 fade-in-up" style={{ animationDelay: "0.4s" }}>
            {[
              { emoji: "🎮", text: "Как игра" },
              { emoji: "⭐", text: "Звёзды" },
              { emoji: "🔥", text: "Серии дней" },
            ].map((f) => (
              <div key={f.text} className="card-game p-3 text-center">
                <div className="text-2xl mb-1">{f.emoji}</div>
                <div className="text-xs font-700" style={{ color: "#1E293B" }}>{f.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP: Name */}
      {step === "name" && (
        <div className="flex-1 flex flex-col px-6 pt-8">
          <button onClick={() => setStep("welcome")} className="mb-6 self-start">
            <Icon name="ArrowLeft" size={22} style={{ color: "#94A3B8" }} />
          </button>

          <div className="flex-1">
            <h2 className="text-3xl font-900 mb-2 fade-in-up" style={{ color: "#1E293B" }}>
              Как тебя зовут? 👋
            </h2>
            <p className="text-muted-foreground font-600 mb-8 fade-in-up" style={{ animationDelay: "0.05s" }}>
              Мы будем обращаться к тебе по имени
            </p>

            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setNameError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleNameNext()}
              placeholder="Введи своё имя..."
              maxLength={20}
              autoFocus
              className="w-full text-xl font-800 px-5 py-4 rounded-2xl outline-none fade-in-up"
              style={{
                animationDelay: "0.1s",
                border: `2.5px solid ${nameError ? "#EF4444" : "#E2E8F0"}`,
                background: "white",
                color: "#1E293B",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => { if (!nameError) e.target.style.borderColor = "#3B82F6"; }}
              onBlur={(e) => { if (!nameError) e.target.style.borderColor = "#E2E8F0"; }}
            />
            {nameError && (
              <p className="text-sm font-600 mt-2 fade-in-up" style={{ color: "#EF4444" }}>
                {nameError}
              </p>
            )}

            {name.trim().length >= 2 && (
              <div className="card-game p-4 mt-4 flex items-center gap-3 fade-in-up" style={{ background: "#EFF6FF" }}>
                <span className="text-2xl">{selectedAvatar}</span>
                <div>
                  <p className="font-800" style={{ color: "#1E293B" }}>Привет, {name.trim()}!</p>
                  <p className="text-xs text-muted-foreground font-600">Рады видеть тебя здесь ✨</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleNameNext}
            className="btn-ios w-full py-4 text-white font-900 text-lg mb-6"
            style={{
              background: name.trim().length >= 2
                ? "linear-gradient(135deg,#3B82F6,#6366F1)"
                : "#E2E8F0",
              color: name.trim().length >= 2 ? "white" : "#94A3B8",
              transition: "all 0.2s",
            }}
          >
            Продолжить →
          </button>
        </div>
      )}

      {/* STEP: Avatar */}
      {step === "avatar" && (
        <div className="flex-1 flex flex-col px-6 pt-8">
          <button onClick={() => setStep("name")} className="mb-6 self-start">
            <Icon name="ArrowLeft" size={22} style={{ color: "#94A3B8" }} />
          </button>

          <h2 className="text-3xl font-900 mb-2 fade-in-up" style={{ color: "#1E293B" }}>
            Выбери аватар
          </h2>
          <p className="text-muted-foreground font-600 mb-6 fade-in-up" style={{ animationDelay: "0.05s" }}>
            Это будет твой образ в приложении
          </p>

          <div className="grid grid-cols-4 gap-3 mb-6 fade-in-up" style={{ animationDelay: "0.1s" }}>
            {avatars.map((av) => (
              <button
                key={av}
                onClick={() => setSelectedAvatar(av)}
                className="aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all duration-200"
                style={{
                  background: selectedAvatar === av
                    ? "linear-gradient(135deg,#3B82F6,#6366F1)"
                    : "#F8FAFF",
                  border: `2.5px solid ${selectedAvatar === av ? "#3B82F6" : "#E2E8F0"}`,
                  transform: selectedAvatar === av ? "scale(1.08)" : "scale(1)",
                  boxShadow: selectedAvatar === av ? "0 8px 24px rgba(59,130,246,0.3)" : "none",
                }}
              >
                {av}
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="card-game p-4 flex items-center gap-4 mb-6 fade-in-up" style={{ animationDelay: "0.15s", background: "#EFF6FF" }}>
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}
            >
              {selectedAvatar}
            </div>
            <div>
              <p className="font-900 text-lg" style={{ color: "#1E293B" }}>{name}</p>
              <p className="text-sm text-muted-foreground font-600">Уровень 1 • Новичок</p>
              <div className="flex gap-1 mt-1">
                <span className="text-xs font-700 px-2 py-0.5 rounded-full" style={{ background: "#22C55E18", color: "#22C55E" }}>🌱 Старт</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep("goal")}
            className="btn-ios w-full py-4 text-white font-900 text-lg mb-6"
            style={{ background: "linear-gradient(135deg,#3B82F6,#6366F1)" }}
          >
            Продолжить →
          </button>
        </div>
      )}

      {/* STEP: Goal */}
      {step === "goal" && (
        <div className="flex-1 flex flex-col px-6 pt-8">
          <button onClick={() => setStep("avatar")} className="mb-6 self-start">
            <Icon name="ArrowLeft" size={22} style={{ color: "#94A3B8" }} />
          </button>

          <h2 className="text-3xl font-900 mb-2 fade-in-up" style={{ color: "#1E293B" }}>
            Зачем учишь? 🎯
          </h2>
          <p className="text-muted-foreground font-600 mb-6 fade-in-up" style={{ animationDelay: "0.05s" }}>
            Поможем выстроить нужный путь
          </p>

          <div className="flex flex-col gap-3 mb-6">
            {goals.map((g, i) => (
              <button
                key={g.id}
                onClick={() => setSelectedGoal(g.id)}
                className="card-game p-4 flex items-center gap-4 text-left transition-all duration-200 fade-in-up"
                style={{
                  animationDelay: `${i * 0.07}s`,
                  border: `2.5px solid ${selectedGoal === g.id ? "#3B82F6" : "transparent"}`,
                  background: selectedGoal === g.id ? "#EFF6FF" : "white",
                  transform: selectedGoal === g.id ? "scale(1.01)" : "scale(1)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: selectedGoal === g.id
                      ? "linear-gradient(135deg,#3B82F6,#6366F1)"
                      : "#F1F5F9",
                  }}
                >
                  {g.emoji}
                </div>
                <div className="flex-1">
                  <p className="font-800" style={{ color: "#1E293B" }}>{g.label}</p>
                  <p className="text-xs text-muted-foreground font-600 mt-0.5">{g.desc}</p>
                </div>
                {selectedGoal === g.id && (
                  <Icon name="CheckCircle" size={20} style={{ color: "#3B82F6" }} />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep("ready")}
            className="btn-ios w-full py-4 text-white font-900 text-lg mb-6"
            style={{ background: "linear-gradient(135deg,#3B82F6,#6366F1)" }}
          >
            Продолжить →
          </button>
        </div>
      )}

      {/* STEP: Ready */}
      {step === "ready" && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center text-6xl mb-6 bounce-in"
            style={{ background: "linear-gradient(135deg,#22C55E,#14B8A6)", boxShadow: "0 16px 40px rgba(34,197,94,0.35)" }}
          >
            {selectedAvatar}
          </div>

          <h2 className="text-3xl font-900 mb-2 fade-in-up" style={{ color: "#1E293B", animationDelay: "0.1s" }}>
            Всё готово, {name}! 🎉
          </h2>
          <p className="text-muted-foreground font-600 mb-8 fade-in-up" style={{ animationDelay: "0.2s" }}>
            Твой аккаунт создан.<br/>Начнём первый урок?
          </p>

          <div className="grid grid-cols-3 gap-3 w-full mb-8 fade-in-up" style={{ animationDelay: "0.25s" }}>
            {[
              { emoji: "📚", label: "30 уроков", sub: "от нуля" },
              { emoji: "⚡", label: "Ударный", sub: "режим" },
              { emoji: "🏆", label: "Достижения", sub: "и звёзды" },
            ].map((f) => (
              <div key={f.label} className="card-game p-3 text-center" style={{ background: "#F0FDF4" }}>
                <div className="text-2xl mb-0.5">{f.emoji}</div>
                <div className="text-xs font-800" style={{ color: "#16A34A" }}>{f.label}</div>
                <div className="text-xs text-muted-foreground font-600">{f.sub}</div>
              </div>
            ))}
          </div>

          <button
            onClick={handleFinish}
            className="btn-ios w-full py-4 text-white font-900 text-xl fade-in-up"
            style={{
              background: "linear-gradient(135deg,#22C55E,#14B8A6)",
              boxShadow: "0 8px 32px rgba(34,197,94,0.35)",
              animationDelay: "0.3s",
            }}
          >
            Поехали! 🚀
          </button>
        </div>
      )}
    </div>
  );
}
