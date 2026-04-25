import Icon from "@/components/ui/icon";
import { Screen, UserStats } from "@/pages/Index";

interface Props {
  current: Screen;
  onChange: (s: Screen) => void;
  stats: UserStats;
}

export default function BottomNav({ current, onChange, stats }: Props) {
  const items = [
    { id: "home" as Screen, icon: "BookOpen", label: "Уроки" },
    { id: "streak" as Screen, icon: "Zap", label: "Ударный" },
    { id: "profile" as Screen, icon: "User", label: "Профиль" },
  ];

  return (
    <div className="bottom-nav fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 py-2 flex items-center justify-around z-50">
      {items.map((item) => {
        const active = current === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200"
            style={{
              background: active ? "rgba(59,130,246,0.1)" : "transparent",
              color: active ? "#3B82F6" : "#94A3B8",
            }}
          >
            <Icon
              name={item.icon}
              size={22}
              style={{ color: active ? "#3B82F6" : "#94A3B8" }}
            />
            <span
              className="text-xs font-700"
              style={{
                fontWeight: active ? 800 : 600,
                color: active ? "#3B82F6" : "#94A3B8",
              }}
            >
              {item.label}
            </span>
            {item.id === "streak" && (
              <span
                className="absolute -top-1 -right-1 text-xs"
                style={{ fontSize: 10, fontWeight: 800, color: "#F97316" }}
              >
                🔥{stats.streak}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
