"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, Target, Sparkles, Settings, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
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
  const { user, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <aside
      className={cn(
        "sidebar hidden flex-col",
        "w-[var(--sidebar-width)] min-h-screen",
        "bg-nav-bg text-nav-item-default",
        "fixed left-0 top-0 z-[var(--z-sticky)]",
        "border-r border-border-divider/10"
      )}
    >
      {/* Brand */}
      <div className="px-6 py-5 flex items-center gap-2.5">
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-green-accent">
          <path
            d="M4 20L8 4M8 4C10 8 14 10 18 10M8 4C6 8 4 12 4 16M8 12C10 14 14 15 16 15M8 8C9 9 11 10 13 10"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-display font-semibold text-lg text-nav-item-active">
          Bamboo Money
        </span>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-nav-item-default/10" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Main navigation">
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
                "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-body font-medium",
                "transition-all focus-ring",
                `duration-[var(--motion-normal)]`,
                isActive
                  ? "text-nav-item-active bg-nav-item-active/10 border-l-[3px] border-l-nav-indicator"
                  : "text-nav-item-default hover:text-nav-item-hover hover:bg-nav-item-active/5 border-l-[3px] border-l-transparent"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="w-5 h-5" strokeWidth={1.75} />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      {/* Bottom utility cluster */}
      <div className="px-3 py-4 mt-auto">
        <div className="mx-3 h-px bg-nav-item-default/10 mb-3" />
        <ThemeToggle variant="sidebar" />
        <LocaleToggle variant="sidebar" />
        <button className={cn(
          "flex items-center gap-3 px-3 py-2.5 w-full rounded-[var(--radius-md)] text-sm font-body",
          "text-nav-item-default hover:text-nav-item-hover hover:bg-nav-item-active/5",
          "transition-colors focus-ring cursor-pointer",
          `duration-[var(--motion-normal)]`
        )}>
          <Settings className="w-5 h-5" strokeWidth={1.75} />
          {t("settings")}
        </button>
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 w-full rounded-[var(--radius-md)] text-sm font-body",
            "text-nav-item-default/60 hover:text-warning hover:bg-warning/5",
            "transition-colors focus-ring cursor-pointer",
            `duration-[var(--motion-normal)]`
          )}
        >
          <LogOut className="w-5 h-5" strokeWidth={1.75} />
          Sign out
        </button>
        <div className="flex items-center gap-3 px-3 py-2.5 mt-1">
          <div className="w-8 h-8 rounded-full bg-green-accent/20 flex items-center justify-center text-sm font-body font-semibold text-green-accent">
            {user?.username?.[0]?.toUpperCase() || "?"}
          </div>
          <span className="text-sm font-body text-nav-item-default/80">{user?.username || "Guest"}</span>
        </div>
      </div>
    </aside>
  );
}
