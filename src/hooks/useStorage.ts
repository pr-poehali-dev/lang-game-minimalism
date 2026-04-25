import { useState, useEffect } from "react";
import { UserStats } from "@/pages/Index";

const STORAGE_KEY = "englishup_user";

export interface StoredUser extends UserStats {
  avatar: string;
  registeredAt: string;
}

export function useStorage() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  const saveUser = (u: StoredUser) => {
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  };

  const updateStats = (stats: UserStats) => {
    if (!user) return;
    const updated = { ...user, ...stats };
    saveUser(updated);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return { user, loaded, saveUser, updateStats, logout };
}
