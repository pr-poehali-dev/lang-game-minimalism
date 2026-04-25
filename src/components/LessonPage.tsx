import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { lessonsData } from "@/data/lessons";

interface Props {
  lessonIndex: number;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

type Phase = "intro" | "quiz" | "result";

export default function LessonPage({ lessonIndex, onComplete, onBack }: Props) {
  const lesson = lessonsData[lessonIndex] ?? lessonsData[0];
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [shake, setShake] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [starsVisible, setStarsVisible] = useState([false, false, false]);

  const q = lesson.questions[current];
  const total = lesson.questions.length;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === q.correct;
    if (correct) {
      setCorrectCount((c) => c + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
    setTimeout(() => setShowExplanation(true), 300);
  };

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
    } else {
      const stars = correctCount >= total - 1 ? 3 : correctCount >= total - 2 ? 2 : 1;
      setEarnedStars(stars);
      setPhase("result");
      setTimeout(() => setStarsVisible([true, false, false]), 300);
      setTimeout(() => setStarsVisible([true, true, false]), 700);
      setTimeout(() => setStarsVisible([true, true, true]), 1100);
    }
  };

  const progress = ((current) / total) * 100;

  if (phase === "intro") {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div
          className="p-6 pt-12 pb-10"
          style={{ background: lesson.gradient }}
        >
          <button onClick={onBack} className="mb-4">
            <Icon name="ArrowLeft" size={22} style={{ color: "rgba(255,255,255,0.8)" }} />
          </button>
          <div className="text-center">
            <div className="text-6xl mb-3 bounce-in">{lesson.emoji}</div>
            <h1 className="text-2xl font-900 text-white">{lesson.title}</h1>
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-5">
          {/* Intro text */}
          <div className="card-game p-5 fade-in-up">
            <p className="text-sm font-700 text-muted-foreground uppercase tracking-wide mb-2">Что изучаем</p>
            <p className="text-base font-600" style={{ color: "#1E293B", lineHeight: 1.6 }}>
              {lesson.intro}
            </p>
          </div>

          {/* Rule card */}
          <div
            className="p-5 rounded-3xl fade-in-up"
            style={{
              background: "linear-gradient(135deg, #F8FAFF, #EFF6FF)",
              border: "2px solid #BFDBFE",
              animationDelay: "0.1s",
            }}
          >
            <p className="text-xs font-800 text-blue-500 uppercase tracking-wide mb-2">📌 Правило</p>
            <p className="text-lg font-900" style={{ color: "#3B82F6" }}>
              {lesson.rule}
            </p>
          </div>

          {/* Questions count */}
          <div className="flex items-center gap-3 fade-in-up" style={{ animationDelay: "0.2s" }}>
            {lesson.questions.map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-800"
                style={{ background: "#EFF6FF", color: "#3B82F6" }}
              >
                {i + 1}
              </div>
            ))}
            <span className="text-sm text-muted-foreground font-600 ml-1">{total} вопросов</span>
          </div>

          <div className="flex-1" />

          <button
            onClick={() => setPhase("quiz")}
            className="btn-ios w-full py-4 text-center font-900 text-lg text-white"
            style={{ background: lesson.gradient }}
          >
            Начать урок 🚀
          </button>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const percentage = Math.round((correctCount / total) * 100);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="text-7xl mb-4 bounce-in">
          {earnedStars === 3 ? "🏆" : earnedStars === 2 ? "🎉" : "💪"}
        </div>
        <h1 className="text-2xl font-900 mb-1" style={{ color: "#1E293B" }}>
          {earnedStars === 3 ? "Отлично!" : earnedStars === 2 ? "Хорошо!" : "Продолжай!"}
        </h1>
        <p className="text-muted-foreground font-600 mb-8">{correctCount} из {total} правильно ({percentage}%)</p>

        {/* Stars */}
        <div className="flex gap-4 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`text-5xl transition-all duration-300 ${starsVisible[i] ? "star-pop" : "opacity-20 scale-50"}`}
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              {i < earnedStars ? "⭐" : "☆"}
            </div>
          ))}
        </div>

        {/* Breakdown */}
        <div className="card-game p-4 w-full mb-6 text-left">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="font-600 text-muted-foreground text-sm">Правильных</span>
            <span className="font-900 text-green-500">{correctCount} ✅</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="font-600 text-muted-foreground text-sm">Получено звёзд</span>
            <span className="font-900 text-yellow-500">{earnedStars} ⭐</span>
          </div>
        </div>

        <button
          onClick={() => onComplete(earnedStars)}
          className="btn-ios w-full py-4 text-white font-900 text-lg"
          style={{ background: lesson.gradient }}
        >
          Готово!
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="px-4 pt-6 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack}>
            <Icon name="X" size={20} style={{ color: "#94A3B8" }} />
          </button>
          <div className="progress-bar flex-1">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
                background: lesson.gradient,
              }}
            />
          </div>
          <span className="text-sm font-800" style={{ color: "#94A3B8" }}>
            {current + 1}/{total}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-4 flex flex-col">
        <div className="mb-6 fade-in-up">
          <p className="text-xs font-800 text-muted-foreground uppercase tracking-wide mb-2">
            Вопрос {current + 1}
          </p>
          <h2 className="text-2xl font-900" style={{ color: "#1E293B", lineHeight: 1.3 }}>
            {q.question}
          </h2>
          {q.hint && (
            <p className="text-sm text-muted-foreground font-600 mt-2 italic">
              {q.hint}
            </p>
          )}
        </div>

        {/* Options */}
        <div className={`flex flex-col gap-3 mb-6 ${shake ? "shake" : ""}`}>
          {q.options.map((opt, idx) => {
            let state = "";
            if (answered) {
              if (idx === q.correct) state = "correct";
              else if (idx === selected) state = "wrong";
            } else if (idx === selected) state = "selected";

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`option-btn p-4 text-left flex items-center gap-3 ${state} ${state === "correct" ? "correct-pulse" : ""}`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-800 flex-shrink-0"
                  style={{
                    background:
                      state === "correct"
                        ? "#22C55E"
                        : state === "wrong"
                        ? "#EF4444"
                        : state === "selected"
                        ? "#3B82F6"
                        : "#F1F5F9",
                    color:
                      state === "correct" || state === "wrong" || state === "selected"
                        ? "white"
                        : "#64748B",
                  }}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <span
                  className="font-700 text-base"
                  style={{
                    color:
                      state === "correct"
                        ? "#16A34A"
                        : state === "wrong"
                        ? "#DC2626"
                        : "#1E293B",
                  }}
                >
                  {opt}
                </span>
                {state === "correct" && (
                  <span className="ml-auto text-lg">✅</span>
                )}
                {state === "wrong" && (
                  <span className="ml-auto text-lg">❌</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className="p-4 rounded-2xl mb-4 fade-in-up"
            style={{
              background: selected === q.correct ? "#F0FDF4" : "#FEF2F2",
              border: `2px solid ${selected === q.correct ? "#86EFAC" : "#FECACA"}`,
            }}
          >
            <p className="text-sm font-700" style={{ color: selected === q.correct ? "#16A34A" : "#DC2626" }}>
              {selected === q.correct ? "✅ Правильно!" : "❌ Ошибка"}
            </p>
            <p className="text-sm font-600 mt-1" style={{ color: "#374151" }}>
              {q.explanation}
            </p>
          </div>
        )}

        <div className="flex-1" />

        {answered && (
          <button
            onClick={handleNext}
            className="btn-ios w-full py-4 text-white font-900 text-lg mb-4 fade-in-up"
            style={{ background: lesson.gradient }}
          >
            {current < total - 1 ? "Следующий →" : "Завершить урок 🎉"}
          </button>
        )}
      </div>
    </div>
  );
}
