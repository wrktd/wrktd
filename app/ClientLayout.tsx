"use client";
import { createContext, useContext, useEffect, useState } from "react";
import ShaderBackground from "./components/ShaderBackground";

type Theme = "dark" | "light";

export const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("wrktd-theme") as Theme | null;
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("wrktd-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <ShaderBackground />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </ThemeContext.Provider>
  );
}
