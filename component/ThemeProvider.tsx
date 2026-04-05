"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ThemeCtx = {
  pagemode: string;
  setPagemode: (v: string) => void;
};

export const ThemeContext = createContext<ThemeCtx>({
  pagemode: "dark",
  setPagemode: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // null = not yet read from localStorage
  const [pagemode, setPagemode] = useState<string | null>(null);

  // Read persisted preference once on client mount
  useEffect(() => {
    const stored = localStorage.getItem("pagemode") ?? "dark";
    setPagemode(stored);
  }, []);

  // Sync to localStorage + html class whenever pagemode changes.
  // Guard on null so this never fires before localStorage is read.
  useEffect(() => {
    if (pagemode === null) return;
    localStorage.setItem("pagemode", pagemode);
    document.documentElement.classList.toggle("dark", pagemode === "dark");
  }, [pagemode]);

  return (
    <ThemeContext.Provider value={{ pagemode: pagemode ?? "dark", setPagemode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
