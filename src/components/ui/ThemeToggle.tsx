"use client";

import { useTheme } from "@/hooks/useTheme";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "sidebar" | "default";
}

export function ThemeToggle({ className, variant = "default" }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const t = useTranslations("nav");
  const isDark = theme === "dark";

  if (variant === "sidebar") {
    return (
      <button
        onClick={toggle}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-sm font-body",
          "text-text-inverse/70 hover:text-text-inverse/90 hover:bg-text-inverse/5 transition-colors cursor-pointer",
          className
        )}
        aria-label={isDark ? t("lightMode") : t("darkMode")}
      >
        {isDark ? (
          <Sun className="w-5 h-5" strokeWidth={1.75} />
        ) : (
          <Moon className="w-5 h-5" strokeWidth={1.75} />
        )}
        {isDark ? t("lightMode") : t("darkMode")}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        "p-2 rounded-md transition-colors cursor-pointer",
        "text-text-secondary hover:text-text-primary hover:bg-bg-subtle",
        className
      )}
      aria-label={isDark ? t("lightMode") : t("darkMode")}
    >
      {isDark ? (
        <Sun className="w-5 h-5" strokeWidth={1.75} />
      ) : (
        <Moon className="w-5 h-5" strokeWidth={1.75} />
      )}
    </button>
  );
}
