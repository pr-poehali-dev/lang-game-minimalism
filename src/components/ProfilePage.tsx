import { useState } from "react";
import { UserStats } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface Props {
  stats: UserStats;
  avatar: string;
  registeredAt: string;
  onLogout: () => void;
}

export default function ProfilePage({ stats, avatar, registeredAt, onLogout }: Props) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const xpPercent = Math.round((stats.xp / stats.xpToNext) * 100);

  const joinDate = new Date(registeredAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const levelLabel =
    stats.level <= 2 ? "Новичок" :
    stats.level <= 4 ? "Начинающий" :
    stats.level <= 7 ? "Базовый" :
    stats.level <= 10 ? "Средний" : "Продвинутый";

  const badges = [
    { emoji: "🌱", label: "Первый шаг", unlocked: stats.completedLessons.length >= 1 },
    { emoji: "📚", label: "5 уроков", unlocked: stats.completedLessons.length >= 5 },
    { emoji: "🔥", label: "Серия 3 дня", unlocked: stats.streak >= 3 },
    { emoji: "⭐", label: "10 звёзд", unlocked: stats.stars >= 10 },
    { emoji: "🏆", label: "Ударник", unlocked: stats.stars >= 30 },
    { emoji: "💎", label: "50 звёзд", unlocked: stats.stars >= 50 },
    { emoji: "🚀", label: "Уровень 5", unlocked: stats.level >= 5 },
    { emoji: "🎓", label: "15 уроков", unlocked: stats.completedLessons.length >= 15 },
    { emoji: "👑", label: "Все уроки", unlocked: stats.completedLessons.length >= 30 },
  ];

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-900" style={{ color: "#1E293B" }}>Профиль</h1>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-700 transition-all"
          style={{ background: "#FEF2F2", color: "#EF4444" }}
        >
          <Icon name="LogOut" size={14} style={{ color: "#EF4444" }} />
          Выйти
        </button>
      </div>

      {/* Avatar + Name card */}
      <div
        className="card-game p-6 mb-4 text-center fade-in-up"
        style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}
      >
        <div
          className="w-24 h-24 rounded-3xl mx-auto mb-3 flex items-center justify-center text-5xl"
          style={{ background: "rgba(255,255,255,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
        >
          {avatar}
        </div>
        <h2 className="text-2xl font-900 text-white">{stats.name}</h2>
        <p className="text-white/70 font-600 text-sm mb-1">Уровень {stats.level} • {levelLabel}</p>
        <p className="text-white/50 font-600 text-xs">С нами с {joinDate}</p>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-white/70 font-600 mb-1.5">
            <span>Опыт до следующего уровня</span>
            <span>{stats.xp} / {stats.xpToNext} XP</span>
          </div>
          <div className="progress-bar" style={{ background: "rgba(255,255,255,0.2)" }}>
            <div className="progress-fill" style={{ width: `${xpPercent}%`, background: "rgba(255,255,255,0.9)" }} />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 fade-in-up" style={{ animationDelay: "0.1s" }}>
        {[
          { label: "Уроков пройдено", value: stats.completedLessons.length, emoji: "📚", color: "#3B82F6", bg: "#EFF6FF" },
          { label: "Всего звёзд", value: stats.stars, emoji: "⭐", color: "#EAB308", bg: "#FEFCE8" },
          { label: "Текущая серия", value: `${stats.streak} дн.`, emoji: "🔥", color: "#F97316", bg: "#FFF7ED" },
          { label: "Мой уровень", value: stats.level, emoji: "🏅", color: "#8B5CF6", bg: "#F5F3FF" },
        ].map((s) => (
          <div key={s.label} className="card-game p-4" style={{ background: s.bg }}>
            <div className="text-2xl mb-1">{s.emoji}</div>
            <div className="text-xl font-900" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs font-600 text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress to finish */}
      <div className="card-game p-4 mb-4 fade-in-up" style={{ animationDelay: "0.15s" }}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-800 text-sm" style={{ color: "#1E293B" }}>Прогресс по курсу</h3>
          <span className="text-sm font-900" style={{ color: "#3B82F6" }}>
            {stats.completedLessons.length}/30
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${Math.round((stats.completedLessons.length / 30) * 100)}%`,
              background: "linear-gradient(90deg,#3B82F6,#6366F1)",
            }}
          />
        </div>
        <p className="text-xs font-600 text-muted-foreground mt-2">
          {Math.round((stats.completedLessons.length / 30) * 100)}% курса завершено
        </p>
      </div>

      {/* Badges */}
      <div className="card-game p-4 mb-4 fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-800" style={{ color: "#1E293B" }}>Достижения</h3>
          <span className="text-xs font-700 px-2 py-0.5 rounded-full" style={{ background: "#EFF6FF", color: "#3B82F6" }}>
            {unlockedCount}/{badges.length}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center gap-1 p-3 rounded-2xl text-center transition-all"
              style={{
                background: b.unlocked ? "#F8FAFF" : "#F8FAFC",
                opacity: b.unlocked ? 1 : 0.35,
                border: b.unlocked ? "2px solid #BFDBFE" : "2px solid transparent",
              }}
            >
              <span className="text-2xl">{b.emoji}</span>
              <span className="text-xs font-700 leading-tight" style={{ color: b.unlocked ? "#1E293B" : "#94A3B8" }}>
                {b.label}
              </span>
              {b.unlocked && (
                <Icon name="CheckCircle" size={12} style={{ color: "#22C55E" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly activity */}
      <div className="card-game p-4 mb-4 fade-in-up" style={{ animationDelay: "0.25s" }}>
        <h3 className="font-800 mb-3" style={{ color: "#1E293B" }}>Активность за неделю</h3>
        <div className="flex gap-2 items-end justify-between h-20">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, i) => {
            const heights = [40, 70, 55, 80, 60, 30, 45];
            const today = new Date().getDay();
            const dayIndex = i === 6 ? 0 : i + 1;
            const active = dayIndex <= today;
            return (
              <div key={day} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-full rounded-t-lg transition-all duration-700"
                  style={{
                    height: active ? heights[i] : 10,
                    background: active ? "linear-gradient(180deg,#3B82F6,#6366F1)" : "#F1F5F9",
                    transitionDelay: `${i * 0.06}s`,
                  }}
                />
                <span className="text-xs font-700 text-muted-foreground">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* App version / coming soon */}
      <div
        className="card-game p-4 mb-4 fade-in-up text-center"
        style={{ animationDelay: "0.3s", background: "linear-gradient(135deg,#F8FAFF,#EFF6FF)", border: "2px solid #BFDBFE" }}
      >
        <p className="text-2xl mb-1">🚀</p>
        <p className="font-800 text-sm" style={{ color: "#1E293B" }}>Скоро новые функции!</p>
        <p className="text-xs text-muted-foreground font-600 mt-0.5">
          Словарный запас • Аудио • Разговорная практика
        </p>
        <span className="inline-block text-xs font-700 px-3 py-1 rounded-full mt-2" style={{ background: "#3B82F620", color: "#3B82F6" }}>
          v1.0 — Грамматика
        </span>
      </div>

      <div className="h-4" />

      {/* Logout confirm modal */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 flex items-end justify-center z-50 px-4 pb-6"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="card-game p-6 w-full max-w-md bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <p className="text-3xl mb-2">⚠️</p>
              <h3 className="text-lg font-900" style={{ color: "#1E293B" }}>Выйти из аккаунта?</h3>
              <p className="text-sm text-muted-foreground font-600 mt-1">
                Весь твой прогресс и звёзды будут удалены
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="btn-ios flex-1 py-3 font-800"
                style={{ background: "#F1F5F9", color: "#64748B" }}
              >
                Отмена
              </button>
              <button
                onClick={onLogout}
                className="btn-ios flex-1 py-3 font-800 text-white"
                style={{ background: "linear-gradient(135deg,#EF4444,#F97316)" }}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
