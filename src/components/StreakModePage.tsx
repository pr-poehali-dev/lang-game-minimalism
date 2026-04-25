import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  onComplete: (stars: number) => void;
  onBack: () => void;
}

const streakQuestions = [
  { q: "I ___ a student.", options: ["am", "is", "are", "be"], correct: 0 },
  { q: "She ___ happy.", options: ["am", "are", "is", "be"], correct: 2 },
  { q: "___ apple is on the table.", options: ["A", "An", "The", "—"], correct: 1 },
  { q: "They ___ friends.", options: ["is", "am", "be", "are"], correct: 3 },
  { q: "I have ___ cat.", options: ["the", "an", "a", "—"], correct: 2 },
  { q: "Tom is my friend. ___ is funny.", options: ["She", "It", "He", "They"], correct: 2 },
  { q: "We ___ at school.", options: ["is", "am", "are", "be"], correct: 2 },
  { q: "___ sun is very bright.", options: ["A", "An", "The", "—"], correct: 2 },
  { q: "She is ___ engineer.", options: ["a", "an", "the", "—"], correct: 1 },
  { q: "He ___ a teacher.", options: ["am", "are", "be", "is"], correct: 3 },
];

type Phase = "ready" | "playing" | "result";

export default function StreakModePage({ onComplete, onBack }: Props) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [timeLeft, setTimeLeft] = useState(60);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  const [multiplier, setMultiplier] = useState(1);

  const endGame = useCallback(() => {
    setPhase("result");
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) {
      endGame();
      return;
    }
    const t = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(t);
  }, [phase, timeLeft, endGame]);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const q = streakQuestions[current % streakQuestions.length];
    const correct = idx === q.correct;

    if (correct) {
      const newCombo = combo + 1;
      const newMult = newCombo >= 5 ? 3 : newCombo >= 3 ? 2 : 1;
      setCombo(newCombo);
      setMultiplier(newMult);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      setScore((s) => s + 10 * newMult);
      setFlash("correct");
    } else {
      setCombo(0);
      setMultiplier(1);
      setFlash("wrong");
    }

    setTimeout(() => {
      setFlash(null);
      setSelected(null);
      setCurrent((c) => c + 1);
    }, 500);
  };

  const timerPercent = (timeLeft / 60) * 100;
  const timerColor =
    timeLeft > 30 ? "#22C55E" : timeLeft > 10 ? "#F97316" : "#EF4444";

  const q = streakQuestions[current % streakQuestions.length];

  if (phase === "ready") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <button onClick={onBack} className="absolute top-6 left-4">
          <Icon name="ArrowLeft" size={22} style={{ color: "#94A3B8" }} />
        </button>

        <div className="text-7xl mb-4 fire-pulse">⚡</div>
        <h1 className="text-3xl font-900 mb-2" style={{ color: "#1E293B" }}>Ударный режим</h1>
        <p className="text-muted-foreground font-600 mb-8">
          Отвечай как можно быстрее!<br />Серия правильных ответов = множитель очков!
        </p>

        <div className="grid grid-cols-3 gap-3 w-full mb-8">
          {[
            { emoji: "⏱️", label: "60 секунд", desc: "на всё" },
            { emoji: "🔥", label: "Комбо x3", desc: "за серию" },
            { emoji: "⭐", label: "До 5 звёзд", desc: "за очки" },
          ].map((item) => (
            <div key={item.label} className="card-game p-3 text-center">
              <div className="text-2xl mb-1">{item.emoji}</div>
              <div className="text-xs font-800" style={{ color: "#1E293B" }}>{item.label}</div>
              <div className="text-xs text-muted-foreground font-600">{item.desc}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setPhase("playing")}
          className="btn-ios w-full py-4 text-white font-900 text-xl"
          style={{ background: "linear-gradient(135deg,#F97316,#EF4444)" }}
        >
          Старт! 🚀
        </button>
      </div>
    );
  }

  if (phase === "result") {
    const stars = score >= 150 ? 5 : score >= 100 ? 4 : score >= 60 ? 3 : score >= 30 ? 2 : 1;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="text-7xl mb-4 bounce-in">🏆</div>
        <h1 className="text-3xl font-900 mb-1" style={{ color: "#1E293B" }}>Время вышло!</h1>
        <p className="text-xl font-800 mb-6" style={{ color: "#F97316" }}>{score} очков</p>

        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={`text-4xl star-pop`} style={{ animationDelay: `${i * 0.15}s` }}>
              {i <= stars ? "⭐" : "☆"}
            </span>
          ))}
        </div>

        <div className="card-game p-4 w-full mb-6 text-left">
          {[
            ["Счёт", `${score} очков`, "#3B82F6"],
            ["Макс. комбо", `x${maxCombo}`, "#F97316"],
            ["Вопросов отвечено", `${current}`, "#22C55E"],
            ["Звёзд получено", `${stars} ⭐`, "#EAB308"],
          ].map(([label, val, color]) => (
            <div key={label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
              <span className="text-sm font-600 text-muted-foreground">{label}</span>
              <span className="font-900 text-sm" style={{ color }}>{val}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => onComplete(stars)}
          className="btn-ios w-full py-4 text-white font-900 text-lg"
          style={{ background: "linear-gradient(135deg,#F97316,#EF4444)" }}
        >
          Забрать награду!
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{
        background:
          flash === "correct"
            ? "rgba(34,197,94,0.08)"
            : flash === "wrong"
            ? "rgba(239,68,68,0.08)"
            : "transparent",
      }}
    >
      {/* Top bar */}
      <div className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-900" style={{ color: "#1E293B" }}>{score}</span>
            <span className="text-sm text-muted-foreground font-600">очков</span>
          </div>
          <div
            className="px-4 py-1.5 rounded-full font-900 text-sm"
            style={{
              background: `${timerColor}20`,
              color: timerColor,
              transition: "all 0.3s",
            }}
          >
            ⏱ {timeLeft}с
          </div>
          {combo >= 2 && (
            <div
              className="px-3 py-1.5 rounded-full font-900 text-sm fire-pulse"
              style={{ background: "#FFF7ED", color: "#F97316" }}
            >
              🔥 x{multiplier}
            </div>
          )}
        </div>

        {/* Timer bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${timerPercent}%`,
              background: `linear-gradient(90deg, ${timerColor}, ${timerColor}AA)`,
              transition: "width 1s linear, background 0.3s",
            }}
          />
        </div>

        {combo >= 3 && (
          <p className="text-center text-xs font-800 mt-2" style={{ color: "#F97316" }}>
            🔥 Комбо {combo}! Множитель x{multiplier}
          </p>
        )}
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col px-4 pt-6">
        <div className="mb-6 fade-in-up" key={current}>
          <p className="text-xs font-800 text-muted-foreground uppercase tracking-wide mb-2">
            Вопрос {current + 1}
          </p>
          <h2 className="text-2xl font-900" style={{ color: "#1E293B" }}>{q.q}</h2>
        </div>

        <div className="grid grid-cols-2 gap-3" key={`opts-${current}`}>
          {q.options.map((opt, idx) => {
            let bg = "white";
            let border = "#E8ECF0";
            let color = "#1E293B";

            if (selected !== null) {
              if (idx === q.correct) { bg = "#F0FDF4"; border = "#22C55E"; color = "#16A34A"; }
              else if (idx === selected) { bg = "#FEF2F2"; border = "#EF4444"; color = "#DC2626"; }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className="option-btn p-4 text-center font-800 text-base fade-in-up"
                style={{
                  background: bg,
                  borderColor: border,
                  color,
                  animationDelay: `${idx * 0.05}s`,
                  fontSize: 18,
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {flash && (
          <div className="text-center mt-6 fade-in-up">
            <span className="text-4xl">{flash === "correct" ? "✅" : "❌"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
