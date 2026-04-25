import { useState, useEffect } from "react";
import HomePage from "@/components/HomePage";
import LessonPage from "@/components/LessonPage";
import ProfilePage from "@/components/ProfilePage";
import StreakModePage from "@/components/StreakModePage";
import BottomNav from "@/components/BottomNav";
import OnboardingPage from "@/components/OnboardingPage";
import { useStorage, StoredUser } from "@/hooks/useStorage";

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

export default function Index() {
  const { user, loaded, saveUser, updateStats, logout } = useStorage();
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedLesson, setSelectedLesson] = useState(0);

  // Update streak on daily visit
  useEffect(() => {
    if (!user) return;
    const today = new Date().toDateString();
    const lastKey = "englishup_last_visit";
    const last = localStorage.getItem(lastKey);
    if (last !== today) {
      localStorage.setItem(lastKey, today);
      if (last) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (last === yesterday.toDateString()) {
          updateStats({ ...user, streak: user.streak + 1 });
        }
      }
    }
  }, [user]);

  const handleRegister = (newUser: StoredUser) => {
    saveUser(newUser);
  };

  const addStars = (count: number) => {
    if (!user) return;
    const newXp = user.xp + count * 10;
    const levelUp = newXp >= user.xpToNext;
    const updated: StoredUser = {
      ...user,
      stars: user.stars + count,
      xp: levelUp ? newXp - user.xpToNext : newXp,
      level: levelUp ? user.level + 1 : user.level,
      xpToNext: levelUp ? user.xpToNext + 100 : user.xpToNext,
    };
    saveUser(updated);
  };

  const completeLesson = (lessonIndex: number, stars: number) => {
    if (!user) return;
    const newXp = user.xp + stars * 10;
    const levelUp = newXp >= user.xpToNext;
    const updated: StoredUser = {
      ...user,
      stars: user.stars + stars,
      xp: levelUp ? newXp - user.xpToNext : newXp,
      level: levelUp ? user.level + 1 : user.level,
      xpToNext: levelUp ? user.xpToNext + 100 : user.xpToNext,
      completedLessons: user.completedLessons.includes(lessonIndex)
        ? user.completedLessons
        : [...user.completedLessons, lessonIndex],
    };
    saveUser(updated);
    setScreen("home");
  };

  // Splash while loading from storage
  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-6xl mb-4 bounce-in">🇬🇧</div>
          <p className="font-800 text-muted-foreground">EnglishUp</p>
        </div>
      </div>
    );
  }

  // New user — show onboarding
  if (!user) {
    return (
      <div className="min-h-screen bg-background max-w-md mx-auto">
        <OnboardingPage onComplete={handleRegister} />
      </div>
    );
  }

  const stats: UserStats = user;

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
        {screen === "profile" && (
          <ProfilePage stats={stats} avatar={user.avatar} registeredAt={user.registeredAt} onLogout={logout} />
        )}
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
