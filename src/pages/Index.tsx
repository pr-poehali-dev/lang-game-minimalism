import { useState } from "react";
import HomePage from "@/components/HomePage";
import LessonPage from "@/components/LessonPage";
import ProfilePage from "@/components/ProfilePage";
import StreakModePage from "@/components/StreakModePage";
import BottomNav from "@/components/BottomNav";

export type Screen = "home" | "lesson" | "profile" | "streak";

export interface UserStats {
  name: string;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  stars: number;
  totalLessons: number;
  completedLessons: number[];
}

const initialStats: UserStats = {
  name: "Алекс",
  level: 3,
  xp: 340,
  xpToNext: 500,
  streak: 7,
  stars: 18,
  totalLessons: 12,
  completedLessons: [0, 1, 2],
};

export default function Index() {
  const [screen, setScreen] = useState<Screen>("home");
  const [stats, setStats] = useState<UserStats>(initialStats);
  const [selectedLesson, setSelectedLesson] = useState(0);

  const addStars = (count: number) => {
    setStats((s) => ({ ...s, stars: s.stars + count, xp: s.xp + count * 10 }));
  };

  const completeLesson = (lessonIndex: number, stars: number) => {
    setStats((s) => ({
      ...s,
      stars: s.stars + stars,
      xp: Math.min(s.xp + stars * 10, s.xpToNext),
      completedLessons: s.completedLessons.includes(lessonIndex)
        ? s.completedLessons
        : [...s.completedLessons, lessonIndex],
    }));
    setScreen("home");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      <div className="flex-1 overflow-y-auto pb-24">
        {screen === "home" && (
          <HomePage
            stats={stats}
            onStartLesson={(idx) => {
              setSelectedLesson(idx);
              setScreen("lesson");
            }}
            onStartStreak={() => setScreen("streak")}
          />
        )}
        {screen === "lesson" && (
          <LessonPage
            lessonIndex={selectedLesson}
            onComplete={(stars) => completeLesson(selectedLesson, stars)}
            onBack={() => setScreen("home")}
          />
        )}
        {screen === "profile" && <ProfilePage stats={stats} />}
        {screen === "streak" && (
          <StreakModePage
            onComplete={(stars) => {
              addStars(stars);
              setScreen("home");
            }}
            onBack={() => setScreen("home")}
          />
        )}
      </div>
      {screen !== "lesson" && screen !== "streak" && (
        <BottomNav current={screen} onChange={setScreen} stats={stats} />
      )}
    </div>
  );
}
