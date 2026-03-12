"use client";

import { useLocale } from "next-intl";
import { setLocale } from "@/i18n/actions";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

interface LocaleToggleProps {
  className?: string;
  variant?: "sidebar" | "default";
}

const labels: Record<string, string> = {
  en: "Español",
  es: "English",
};

export function LocaleToggle({ className, variant = "default" }: LocaleToggleProps) {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const nextLocale = locale === "en" ? "es" : "en";

  function handleSwitch() {
    startTransition(() => {
      setLocale(nextLocale);
    });
  }

  if (variant === "sidebar") {
    return (
      <button
        onClick={handleSwitch}
        disabled={isPending}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-sm font-body",
          "text-text-inverse/70 hover:text-text-inverse/90 hover:bg-text-inverse/5 transition-colors cursor-pointer",
          isPending && "opacity-50",
          className
        )}
        aria-label={`Switch to ${labels[locale]}`}
      >
        <Languages className="w-5 h-5" strokeWidth={1.75} />
        {labels[locale]}
      </button>
    );
  }

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      className={cn(
        "p-2 rounded-md transition-colors cursor-pointer",
        "text-text-secondary hover:text-text-primary hover:bg-bg-subtle",
        isPending && "opacity-50",
        className
      )}
      aria-label={`Switch to ${labels[locale]}`}
    >
      <Languages className="w-5 h-5" strokeWidth={1.75} />
    </button>
  );
}
