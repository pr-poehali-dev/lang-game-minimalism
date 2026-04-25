import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { UserStats } from "@/pages/Index";

interface LessonMeta {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  gradient: string;
  difficulty: "Лёгкий" | "Средний" | "Сложный" | "Продвинутый";
}

interface LevelGroup {
  label: string;
  emoji: string;
  color: string;
  bg: string;
  lessons: LessonMeta[];
}

const levelGroups: LevelGroup[] = [
  {
    label: "С нуля",
    emoji: "🌱",
    color: "#22C55E",
    bg: "#F0FDF4",
    lessons: [
      { id: 0, title: "Глагол TO BE", subtitle: "am / is / are", emoji: "🌱", color: "#22C55E", gradient: "linear-gradient(135deg,#22C55E,#14B8A6)", difficulty: "Лёгкий" },
      { id: 1, title: "Артикли A/AN/THE", subtitle: "a / an / the", emoji: "📖", color: "#3B82F6", gradient: "linear-gradient(135deg,#3B82F6,#6366F1)", difficulty: "Лёгкий" },
      { id: 2, title: "Местоимения", subtitle: "I, you, he, she...", emoji: "👥", color: "#8B5CF6", gradient: "linear-gradient(135deg,#8B5CF6,#EC4899)", difficulty: "Лёгкий" },
      { id: 3, title: "Числа 1–20", subtitle: "one, two, three...", emoji: "🔢", color: "#F97316", gradient: "linear-gradient(135deg,#F97316,#EAB308)", difficulty: "Лёгкий" },
      { id: 4, title: "Цвета и предметы", subtitle: "red, blue, book...", emoji: "🎨", color: "#EC4899", gradient: "linear-gradient(135deg,#EC4899,#F97316)", difficulty: "Лёгкий" },
      { id: 5, title: "Семья и люди", subtitle: "mother, father...", emoji: "👨‍👩‍👧", color: "#14B8A6", gradient: "linear-gradient(135deg,#14B8A6,#3B82F6)", difficulty: "Лёгкий" },
    ],
  },
  {
    label: "Начинающий",
    emoji: "📚",
    color: "#3B82F6",
    bg: "#EFF6FF",
    lessons: [
      { id: 6, title: "Present Simple", subtitle: "он делает каждый день", emoji: "⏰", color: "#EAB308", gradient: "linear-gradient(135deg,#EAB308,#22C55E)", difficulty: "Лёгкий" },
      { id: 7, title: "Отрицание: don't/doesn't", subtitle: "I don't, she doesn't", emoji: "🚫", color: "#EF4444", gradient: "linear-gradient(135deg,#EF4444,#F97316)", difficulty: "Лёгкий" },
      { id: 8, title: "Вопросы: DO/DOES", subtitle: "Do you? Does she?", emoji: "❓", color: "#6366F1", gradient: "linear-gradient(135deg,#6366F1,#8B5CF6)", difficulty: "Лёгкий" },
      { id: 9, title: "Present Continuous", subtitle: "прямо сейчас", emoji: "🎬", color: "#14B8A6", gradient: "linear-gradient(135deg,#14B8A6,#22C55E)", difficulty: "Средний" },
      { id: 10, title: "Притяжательные мест.", subtitle: "my, your, his, her...", emoji: "💼", color: "#EC4899", gradient: "linear-gradient(135deg,#EC4899,#8B5CF6)", difficulty: "Средний" },
      { id: 11, title: "Предлоги места", subtitle: "in, on, under, next to", emoji: "📍", color: "#F97316", gradient: "linear-gradient(135deg,#F97316,#EAB308)", difficulty: "Средний" },
    ],
  },
  {
    label: "Базовый",
    emoji: "⚡",
    color: "#F97316",
    bg: "#FFF7ED",
    lessons: [
      { id: 12, title: "Past Simple: правил.", subtitle: "walked, talked, played", emoji: "⏪", color: "#3B82F6", gradient: "linear-gradient(135deg,#3B82F6,#22C55E)", difficulty: "Средний" },
      { id: 13, title: "Past Simple: неправил.", subtitle: "went, had, saw, came", emoji: "⚡", color: "#EF4444", gradient: "linear-gradient(135deg,#EF4444,#8B5CF6)", difficulty: "Средний" },
      { id: 14, title: "Future Simple: WILL", subtitle: "I will, she will...", emoji: "🔮", color: "#8B5CF6", gradient: "linear-gradient(135deg,#8B5CF6,#3B82F6)", difficulty: "Средний" },
      { id: 15, title: "Степени прилагат.", subtitle: "big, bigger, biggest", emoji: "📊", color: "#22C55E", gradient: "linear-gradient(135deg,#22C55E,#EAB308)", difficulty: "Средний" },
      { id: 16, title: "CAN / MUST", subtitle: "умею / должен", emoji: "💪", color: "#14B8A6", gradient: "linear-gradient(135deg,#14B8A6,#6366F1)", difficulty: "Средний" },
      { id: 17, title: "Вопросительные слова", subtitle: "what, where, when...", emoji: "🔍", color: "#F97316", gradient: "linear-gradient(135deg,#F97316,#EC4899)", difficulty: "Средний" },
    ],
  },
  {
    label: "Средний",
    emoji: "🎯",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    lessons: [
      { id: 18, title: "Present Perfect", subtitle: "have / has + V3", emoji: "✨", color: "#6366F1", gradient: "linear-gradient(135deg,#6366F1,#14B8A6)", difficulty: "Сложный" },
      { id: 19, title: "Условные I типа", subtitle: "If it rains, I'll...", emoji: "🔀", color: "#22C55E", gradient: "linear-gradient(135deg,#22C55E,#3B82F6)", difficulty: "Сложный" },
      { id: 20, title: "Пассивный залог", subtitle: "is done / was built", emoji: "🔄", color: "#EC4899", gradient: "linear-gradient(135deg,#EC4899,#EF4444)", difficulty: "Сложный" },
      { id: 21, title: "Косвенная речь", subtitle: "He said that...", emoji: "💬", color: "#F97316", gradient: "linear-gradient(135deg,#F97316,#6366F1)", difficulty: "Сложный" },
      { id: 22, title: "SHOULD / COULD", subtitle: "советую / мог бы", emoji: "🎯", color: "#14B8A6", gradient: "linear-gradient(135deg,#14B8A6,#EAB308)", difficulty: "Сложный" },
      { id: 23, title: "Герундий и инфинитив", subtitle: "enjoy doing / want to do", emoji: "🔧", color: "#3B82F6", gradient: "linear-gradient(135deg,#3B82F6,#EC4899)", difficulty: "Сложный" },
    ],
  },
  {
    label: "Продвинутый",
    emoji: "🏆",
    color: "#EF4444",
    bg: "#FEF2F2",
    lessons: [
      { id: 24, title: "Past Perfect", subtitle: "had + V3", emoji: "⏳", color: "#8B5CF6", gradient: "linear-gradient(135deg,#8B5CF6,#EF4444)", difficulty: "Продвинутый" },
      { id: 25, title: "Условные II типа", subtitle: "If I were rich, I would...", emoji: "🌀", color: "#EAB308", gradient: "linear-gradient(135deg,#EAB308,#8B5CF6)", difficulty: "Продвинутый" },
      { id: 26, title: "Артикли: продвинутый", subtitle: "the Thames, — English", emoji: "🎓", color: "#3B82F6", gradient: "linear-gradient(135deg,#3B82F6,#14B8A6)", difficulty: "Продвинутый" },
      { id: 27, title: "Фразовые глаголы", subtitle: "give up, find out...", emoji: "🚀", color: "#F97316", gradient: "linear-gradient(135deg,#F97316,#22C55E)", difficulty: "Продвинутый" },
      { id: 28, title: "Сослагательное накл.", subtitle: "I wish, If only...", emoji: "💭", color: "#6366F1", gradient: "linear-gradient(135deg,#6366F1,#22C55E)", difficulty: "Продвинутый" },
      { id: 29, title: "Все времена: финал", subtitle: "Perfect, Continuous...", emoji: "🏆", color: "#EF4444", gradient: "linear-gradient(135deg,#EF4444,#EAB308)", difficulty: "Продвинутый" },
    ],
  },
];

const diffColor: Record<string, string> = {
  "Лёгкий": "#22C55E",
  "Средний": "#F97316",
  "Сложный": "#EF4444",
  "Продвинутый": "#8B5CF6",
};

interface Props {
  stats: UserStats;
  onStartLesson: (idx: number) => void;
  onStartStreak: () => void;
}

export default function HomePage({ stats, onStartLesson, onStartStreak }: Props) {
  const [visible, setVisible] = useState(false);
  const [openGroup, setOpenGroup] = useState<number>(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const xpPercent = Math.round((stats.xp / stats.xpToNext) * 100);
  const totalCompleted = stats.completedLessons.length;

  // Determine which lesson is next to unlock
  const nextUnlock = totalCompleted;

  return (
    <div className={`px-4 pt-6 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-600 text-muted-foreground">Привет,</p>
          <h1 className="text-2xl font-900" style={{ color: "#1E293B" }}>
            {stats.name} 👋
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full" style={{ background: "#FFF7ED" }}>
            <span className="fire-pulse text-sm">🔥</span>
            <span className="font-800 text-sm" style={{ color: "#F97316" }}>{stats.streak}</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full" style={{ background: "#FEFCE8" }}>
            <span className="text-sm">⭐</span>
            <span className="font-800 text-sm" style={{ color: "#EAB308" }}>{stats.stars}</span>
          </div>
        </div>
      </div>

      {/* Level card */}
      <div
        className="card-game p-5 mb-4 fade-in-up"
        style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)", animationDelay: "0.05s" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs font-700 text-white/70 uppercase tracking-wide">Уровень</p>
            <p className="text-3xl font-900 text-white">{stats.level}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-700 text-white/70">Прогресс</p>
            <p className="text-sm font-800 text-white">{totalCompleted} / 30 уроков</p>
          </div>
        </div>
        <div className="progress-bar" style={{ background: "rgba(255,255,255,0.2)" }}>
          <div className="progress-fill" style={{ width: `${xpPercent}%`, background: "rgba(255,255,255,0.9)" }} />
        </div>
        <p className="text-xs font-600 text-white/70 mt-1.5">{stats.xp} / {stats.xpToNext} XP</p>
      </div>

      {/* Streak mode banner */}
      <button
        onClick={onStartStreak}
        className="btn-ios w-full p-4 mb-5 text-left fade-in-up"
        style={{ background: "linear-gradient(135deg, #F97316, #EF4444)", animationDelay: "0.1s" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-700 text-white/80 uppercase tracking-wide">Режим дня</p>
            <p className="text-lg font-900 text-white">⚡ Ударный режим</p>
            <p className="text-xs text-white/70 font-600 mt-0.5">10 вопросов за 60 секунд</p>
          </div>
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
            <Icon name="ChevronRight" size={20} style={{ color: "white" }} />
          </div>
        </div>
      </button>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5 fade-in-up" style={{ animationDelay: "0.15s" }}>
        {[
          { label: "Уроков", value: totalCompleted, emoji: "📚", color: "#3B82F6", bg: "#EFF6FF" },
          { label: "Звёзд", value: stats.stars, emoji: "⭐", color: "#EAB308", bg: "#FEFCE8" },
          { label: "Серия", value: stats.streak, emoji: "🔥", color: "#F97316", bg: "#FFF7ED" },
        ].map((s) => (
          <div key={s.label} className="card-game p-3 text-center" style={{ background: s.bg }}>
            <p className="text-xl mb-0.5">{s.emoji}</p>
            <p className="text-xl font-900" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs font-600 text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Lessons by level */}
      <div className="mb-2">
        <h2 className="text-lg font-900 mb-3" style={{ color: "#1E293B" }}>Уроки грамматики</h2>

        <div className="flex flex-col gap-3">
          {levelGroups.map((group, gi) => {
            const isOpen = openGroup === gi;
            const groupLessonIds = group.lessons.map((l) => l.id);
            const completedInGroup = groupLessonIds.filter((id) => stats.completedLessons.includes(id)).length;
            const groupTotal = group.lessons.length;
            const groupDone = completedInGroup === groupTotal;

            return (
              <div key={group.label} className="fade-in-up" style={{ animationDelay: `${gi * 0.07}s` }}>
                {/* Group header */}
                <button
                  onClick={() => setOpenGroup(isOpen ? -1 : gi)}
                  className="card-game w-full p-4 flex items-center gap-3"
                  style={{ background: isOpen ? group.bg : "white" }}
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: isOpen ? group.color : "#F1F5F9" }}
                  >
                    <span>{group.emoji}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-800 text-sm" style={{ color: "#1E293B" }}>{group.label}</p>
                    <p className="text-xs text-muted-foreground font-600">{completedInGroup}/{groupTotal} уроков</p>
                    {/* mini progress */}
                    <div className="progress-bar mt-1.5" style={{ height: 6 }}>
                      <div
                        className="progress-fill"
                        style={{
                          width: `${(completedInGroup / groupTotal) * 100}%`,
                          background: `linear-gradient(90deg, ${group.color}, ${group.color}BB)`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {groupDone && <span className="text-base">✅</span>}
                    <Icon
                      name={isOpen ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      style={{ color: "#94A3B8" }}
                    />
                  </div>
                </button>

                {/* Lessons in group */}
                {isOpen && (
                  <div className="flex flex-col gap-2 mt-2 pl-2">
                    {group.lessons.map((lesson, idx) => {
                      const completed = stats.completedLessons.includes(lesson.id);
                      const locked = lesson.id > nextUnlock;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => !locked && onStartLesson(lesson.id)}
                          className="card-game p-3 text-left flex items-center gap-3 bounce-in"
                          style={{
                            animationDelay: `${idx * 0.04}s`,
                            opacity: locked ? 0.45 : 1,
                            cursor: locked ? "not-allowed" : "pointer",
                          }}
                        >
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                            style={{ background: locked ? "#F1F5F9" : lesson.gradient }}
                          >
                            {locked ? "🔒" : lesson.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-800 text-sm leading-tight" style={{ color: "#1E293B" }}>
                              {lesson.title}
                            </p>
                            <p className="text-xs text-muted-foreground font-600 mt-0.5 truncate">{lesson.subtitle}</p>
                            <span
                              className="inline-block text-xs font-700 px-2 py-0.5 rounded-full mt-1"
                              style={{
                                background: locked ? "#F1F5F9" : `${diffColor[lesson.difficulty]}18`,
                                color: locked ? "#94A3B8" : diffColor[lesson.difficulty],
                              }}
                            >
                              {lesson.difficulty}
                            </span>
                          </div>
                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            {completed ? (
                              <div className="flex gap-0.5">
                                <span className="text-sm">⭐</span>
                                <span className="text-sm">⭐</span>
                                <span className="text-sm">⭐</span>
                              </div>
                            ) : (
                              <Icon
                                name={locked ? "Lock" : "ChevronRight"}
                                size={16}
                                style={{ color: locked ? "#CBD5E1" : "#94A3B8" }}
                              />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
