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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-card/95 backdrop-blur-md border-t border-bg-subtle h-16 safe-area-pb">
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
                "flex flex-col items-center gap-0.5 py-1 px-3 relative transition-colors",
                isActive ? "text-green-primary" : "text-text-tertiary"
              )}
            >
              <item.icon className="w-[22px] h-[22px]" strokeWidth={1.75} />
              <span className="text-xs font-body font-medium">
                {t(item.labelKey)}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-green-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
