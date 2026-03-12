"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, Target, Sparkles, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocaleToggle } from "@/components/ui/LocaleToggle";

const navItems = [
  { href: "/app", labelKey: "today" as const, icon: Home },
  { href: "/app/envelopes", labelKey: "envelopes" as const, icon: Wallet },
  { href: "/app/goals", labelKey: "goals" as const, icon: Target },
  { href: "/app/ask", labelKey: "askBamboo" as const, icon: Sparkles },
];

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <aside className="hidden md:flex flex-col w-[260px] bg-gradient-to-b from-green-deep to-[#163a2b] dark:from-[#0d2419] dark:to-[#0a1c14] text-text-inverse min-h-screen fixed left-0 top-0 z-40">
      {/* Radial glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-green-accent/[0.08] rounded-full blur-3xl pointer-events-none" />

      {/* Brand */}
      <div className="relative px-6 py-6 flex items-center gap-2.5">
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-green-accent">
          <path
            d="M4 20L8 4M8 4C10 8 14 10 18 10M8 4C6 8 4 12 4 16M8 12C10 14 14 15 16 15M8 8C9 9 11 10 13 10"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-display font-semibold text-lg text-text-inverse">
          Bamboo Money
        </span>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-text-inverse/10" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/app"
              ? pathname === "/app"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-body font-medium transition-all duration-200",
                isActive
                  ? "text-text-inverse bg-text-inverse/10 border-l-[3px] border-l-green-accent"
                  : "text-text-inverse/70 hover:text-text-inverse/90 hover:bg-text-inverse/5 border-l-[3px] border-l-transparent"
              )}
            >
              <item.icon className="w-5 h-5" strokeWidth={1.75} />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 mt-auto">
        <div className="mx-3 h-px bg-text-inverse/10 mb-4" />
        <ThemeToggle variant="sidebar" />
        <LocaleToggle variant="sidebar" />
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-sm font-body text-text-inverse/70 hover:text-text-inverse/90 hover:bg-text-inverse/5 transition-colors cursor-pointer">
          <Settings className="w-5 h-5" strokeWidth={1.75} />
          {t("settings")}
        </button>
        <div className="flex items-center gap-3 px-3 py-2.5 mt-1">
          <div className="w-8 h-8 rounded-full bg-green-accent/20 flex items-center justify-center text-sm font-body font-semibold text-green-accent">
            J
          </div>
          <span className="text-sm font-body text-text-inverse/80">Jose</span>
        </div>
      </div>
    </aside>
  );
}
