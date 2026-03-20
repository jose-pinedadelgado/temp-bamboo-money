"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, Target, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/app", labelKey: "today" as const, icon: Home },
  { href: "/app/envelopes", labelKey: "envelopes" as const, icon: Wallet },
  { href: "/app/goals", labelKey: "goals" as const, icon: Target },
  { href: "/app/ask", labelKey: "askBamboo" as const, icon: Sparkles },
];

export function NavRail() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <aside
      className={cn(
        "nav-rail hidden md:flex flex-col items-center",
        "w-[var(--nav-rail-width)] min-h-screen",
        "bg-nav-bg",
        "fixed left-0 top-0 z-[var(--z-sticky)]",
        "border-r border-border-divider/10"
      )}
      aria-label="Main navigation"
    >
      {/* Brand icon only */}
      <div className="py-5 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-green-accent">
          <path
            d="M4 20L8 4M8 4C10 8 14 10 18 10M8 4C6 8 4 12 4 16M8 12C10 14 14 15 16 15M8 8C9 9 11 10 13 10"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Divider */}
      <div className="w-10 h-px bg-nav-item-default/10" />

      {/* Navigation items */}
      <nav className="flex-1 flex flex-col items-center gap-1 py-4 w-full px-2">
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
                "flex flex-col items-center justify-center gap-1 w-full py-2 rounded-[var(--radius-md)]",
                "text-[10px] font-body font-medium",
                "transition-all focus-ring",
                `duration-[var(--motion-normal)]`,
                isActive
                  ? "text-nav-item-active bg-nav-item-active/10"
                  : "text-nav-item-default hover:text-nav-item-hover hover:bg-nav-item-active/5"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="w-5 h-5" strokeWidth={1.75} />
              <span className="truncate max-w-[72px] text-center leading-tight">
                {t(item.labelKey)}
              </span>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-nav-indicator" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
