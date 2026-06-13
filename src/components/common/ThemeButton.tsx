"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
     flex items-center justify-center w-10 h-auto self-stretch rounded-md
        bg-primary/10
        backdrop-blur-md
        hover:scale-110 active:scale-95
        transition-all duration-300
        p-2
        
      "
    >
      {isDark ? (
        <IconSun size={18} className="text-primary via-primary" />
      ) : (
        <IconMoon size={18} className="text-primary via-primary" />
      )}
    </button>
  );
}
