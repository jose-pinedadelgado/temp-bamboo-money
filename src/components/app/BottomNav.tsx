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

export function BottomNav() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0",
        "z-[var(--z-sticky)]",
        "bg-bg-card/95 backdrop-blur-md",
        "border-t border-border-default",
        "h-[var(--bottom-nav-height)]",
        "safe-area-pb"
      )}
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-full px-2">
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
                "flex flex-col items-center gap-0.5 py-1.5 px-3 relative",
                "transition-colors focus-ring",
                `duration-[var(--motion-normal)]`,
                isActive ? "text-green-primary" : "text-text-tertiary"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon
                className="w-[var(--bottom-nav-icon)] h-[var(--bottom-nav-icon)]"
                strokeWidth={1.75}
              />
              <span className="text-[var(--bottom-nav-label)] font-body font-medium">
                {t(item.labelKey)}
              </span>
              {isActive && (
                <div className="absolute -bottom-0.5 w-5 h-0.5 rounded-full bg-green-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
