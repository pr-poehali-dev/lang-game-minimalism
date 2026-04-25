import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { UserStats } from "@/pages/Index";

interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  gradient: string;
  difficulty: "Лёгкий" | "Средний" | "Сложный";
}

const lessons: Lesson[] = [
  { id: 0, title: "Глагол TO BE", subtitle: "am / is / are", emoji: "🟢", color: "#22C55E", gradient: "linear-gradient(135deg,#22C55E,#14B8A6)", difficulty: "Лёгкий" },
  { id: 1, title: "Артикли", subtitle: "a / an / the", emoji: "🔵", color: "#3B82F6", gradient: "linear-gradient(135deg,#3B82F6,#6366F1)", difficulty: "Лёгкий" },
  { id: 2, title: "Местоимения", subtitle: "I, you, he, she...", emoji: "🟣", color: "#8B5CF6", gradient: "linear-gradient(135deg,#8B5CF6,#EC4899)", difficulty: "Лёгкий" },
  { id: 3, title: "Present Simple", subtitle: "Настоящее время", emoji: "🟡", color: "#EAB308", gradient: "linear-gradient(135deg,#EAB308,#F97316)", difficulty: "Средний" },
  { id: 4, title: "Числа и счёт", subtitle: "1-100 и больше", emoji: "🟠", color: "#F97316", gradient: "linear-gradient(135deg,#F97316,#EF4444)", difficulty: "Средний" },
  { id: 5, title: "Вопросы", subtitle: "What? Where? When?", emoji: "🔴", color: "#EF4444", gradient: "linear-gradient(135deg,#EF4444,#8B5CF6)", difficulty: "Сложный" },
];

interface Props {
  stats: UserStats;
  onStartLesson: (idx: number) => void;
  onStartStreak: () => void;
}

export default function HomePage({ stats, onStartLesson, onStartStreak }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const xpPercent = Math.round((stats.xp / stats.xpToNext) * 100);

  return (
    <div className={`px-4 pt-6 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-600 text-muted-foreground">Привет,</p>
          <h1 className="text-2xl font-900" style={{ color: "#1E293B" }}>
            {stats.name} 👋
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full" style={{ background: "#FFF7ED" }}>
            <span className="fire-pulse text-base">🔥</span>
            <span className="font-800 text-sm" style={{ color: "#F97316" }}>{stats.streak}</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full" style={{ background: "#FEFCE8" }}>
            <span className="text-base">⭐</span>
            <span className="font-800 text-sm" style={{ color: "#EAB308" }}>{stats.stars}</span>
          </div>
        </div>
      </div>

      {/* Level card */}
      <div
        className="card-game p-5 mb-5 fade-in-up"
        style={{
          background: "linear-gradient(135deg, #3B82F6, #6366F1)",
          animationDelay: "0.1s",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-700 text-white/70 uppercase tracking-wide">Уровень</p>
            <p className="text-3xl font-900 text-white">{stats.level}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-700 text-white/70">Опыт</p>
            <p className="text-lg font-800 text-white">{stats.xp} / {stats.xpToNext}</p>
          </div>
        </div>
        <div className="progress-bar" style={{ background: "rgba(255,255,255,0.2)" }}>
          <div
            className="progress-fill"
            style={{
              width: `${xpPercent}%`,
              background: "rgba(255,255,255,0.9)",
            }}
          />
        </div>
        <p className="text-xs font-600 text-white/70 mt-2">{xpPercent}% до следующего уровня</p>
      </div>

      {/* Streak mode banner */}
      <button
        onClick={onStartStreak}
        className="btn-ios w-full p-4 mb-6 text-left fade-in-up"
        style={{
          background: "linear-gradient(135deg, #F97316, #EF4444)",
          animationDelay: "0.15s",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-700 text-white/80 uppercase tracking-wide">Режим дня</p>
            <p className="text-lg font-900 text-white">⚡ Ударный режим</p>
            <p className="text-xs text-white/70 font-600 mt-0.5">10 вопросов за 60 секунд</p>
          </div>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <Icon name="ChevronRight" size={22} style={{ color: "white" }} />
          </div>
        </div>
      </button>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6 fade-in-up" style={{ animationDelay: "0.2s" }}>
        {[
          { label: "Уроков", value: stats.completedLessons.length, emoji: "📚", color: "#3B82F6", bg: "#EFF6FF" },
          { label: "Звёзд", value: stats.stars, emoji: "⭐", color: "#EAB308", bg: "#FEFCE8" },
          { label: "Серия", value: stats.streak, emoji: "🔥", color: "#F97316", bg: "#FFF7ED" },
        ].map((s) => (
          <div key={s.label} className="card-game p-3 text-center" style={{ background: s.bg }}>
            <p className="text-2xl mb-0.5">{s.emoji}</p>
            <p className="text-xl font-900" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs font-600 text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Lessons */}
      <div className="mb-4">
        <h2 className="text-lg font-900 mb-3" style={{ color: "#1E293B" }}>Уроки грамматики</h2>
        <div className="flex flex-col gap-3">
          {lessons.map((lesson, idx) => {
            const completed = stats.completedLessons.includes(lesson.id);
            const locked = idx > stats.completedLessons.length;

            return (
              <button
                key={lesson.id}
                onClick={() => !locked && onStartLesson(lesson.id)}
                className="card-game p-4 text-left flex items-center gap-4 fade-in-up"
                style={{
                  animationDelay: `${0.1 * idx + 0.2}s`,
                  opacity: locked ? 0.5 : 1,
                  cursor: locked ? "not-allowed" : "pointer",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
                  style={{ background: locked ? "#F1F5F9" : lesson.gradient }}
                >
                  {locked ? "🔒" : lesson.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-800 text-sm" style={{ color: "#1E293B" }}>{lesson.title}</p>
                    {completed && <span className="text-xs">✅</span>}
                  </div>
                  <p className="text-xs text-muted-foreground font-600">{lesson.subtitle}</p>
                  <span
                    className="inline-block text-xs font-700 px-2 py-0.5 rounded-full mt-1"
                    style={{
                      background: locked ? "#F1F5F9" : `${lesson.color}18`,
                      color: locked ? "#94A3B8" : lesson.color,
                    }}
                  >
                    {lesson.difficulty}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {completed ? (
                    <div className="flex gap-0.5">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="text-base">⭐</span>
                      ))}
                    </div>
                  ) : (
                    <Icon
                      name={locked ? "Lock" : "ChevronRight"}
                      size={18}
                      style={{ color: locked ? "#CBD5E1" : "#94A3B8" }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
