import { UserStats } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface Props {
  stats: UserStats;
}

const badges = [
  { emoji: "🌱", label: "Первый урок", unlocked: true },
  { emoji: "🔥", label: "Серия 7 дней", unlocked: true },
  { emoji: "⭐", label: "10 звёзд", unlocked: true },
  { emoji: "🏆", label: "Ударник", unlocked: false },
  { emoji: "💎", label: "50 звёзд", unlocked: false },
  { emoji: "🚀", label: "Уровень 5", unlocked: false },
];

export default function ProfilePage({ stats }: Props) {
  const xpPercent = Math.round((stats.xp / stats.xpToNext) * 100);

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <h1 className="text-2xl font-900 mb-6" style={{ color: "#1E293B" }}>Профиль</h1>

      {/* Avatar + Name */}
      <div
        className="card-game p-6 mb-4 text-center fade-in-up"
        style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}
      >
        <div
          className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl"
          style={{ background: "rgba(255,255,255,0.2)" }}
        >
          🧑‍🚀
        </div>
        <h2 className="text-xl font-900 text-white">{stats.name}</h2>
        <p className="text-white/70 font-600 text-sm">Уровень {stats.level} • Начинающий</p>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-white/70 font-600 mb-1">
            <span>Опыт</span>
            <span>{stats.xp} / {stats.xpToNext}</span>
          </div>
          <div className="progress-bar" style={{ background: "rgba(255,255,255,0.2)" }}>
            <div
              className="progress-fill"
              style={{ width: `${xpPercent}%`, background: "rgba(255,255,255,0.9)" }}
            />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 fade-in-up" style={{ animationDelay: "0.1s" }}>
        {[
          { label: "Пройдено уроков", value: stats.completedLessons.length, emoji: "📚", color: "#3B82F6", bg: "#EFF6FF" },
          { label: "Всего звёзд", value: stats.stars, emoji: "⭐", color: "#EAB308", bg: "#FEFCE8" },
          { label: "Текущая серия", value: `${stats.streak} дней`, emoji: "🔥", color: "#F97316", bg: "#FFF7ED" },
          { label: "Уровень", value: stats.level, emoji: "🏅", color: "#8B5CF6", bg: "#F5F3FF" },
        ].map((s) => (
          <div key={s.label} className="card-game p-4" style={{ background: s.bg }}>
            <div className="text-2xl mb-1">{s.emoji}</div>
            <div className="text-xl font-900" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs font-600 text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="card-game p-4 mb-4 fade-in-up" style={{ animationDelay: "0.2s" }}>
        <h3 className="font-800 mb-3" style={{ color: "#1E293B" }}>Достижения</h3>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center gap-1 p-3 rounded-2xl text-center"
              style={{
                background: b.unlocked ? "#F8FAFF" : "#F8FAFC",
                opacity: b.unlocked ? 1 : 0.4,
              }}
            >
              <span className="text-2xl">{b.emoji}</span>
              <span className="text-xs font-700" style={{ color: b.unlocked ? "#1E293B" : "#94A3B8" }}>
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
        <div className="flex gap-2 items-end justify-between">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, i) => {
            const heights = [40, 70, 55, 80, 60, 90, 45];
            const active = i < 5;
            return (
              <div key={day} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-full rounded-t-lg"
                  style={{
                    height: active ? heights[i] : 12,
                    background: active
                      ? "linear-gradient(180deg,#3B82F6,#6366F1)"
                      : "#F1F5F9",
                    transition: "height 0.5s cubic-bezier(0.34,1.56,0.64,1)",
                    transitionDelay: `${i * 0.05}s`,
                  }}
                />
                <span className="text-xs font-700 text-muted-foreground">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
