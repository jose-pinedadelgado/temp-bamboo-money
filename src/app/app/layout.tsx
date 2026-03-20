"use client";

import { Sidebar } from "@/components/app/Sidebar";
import { NavRail } from "@/components/app/NavRail";
import { BottomNav } from "@/components/app/BottomNav";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

function DarkGrainOverlay() {
  return (
    <div
      className="grain-overlay fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <div
      id="app-shell"
      className={cn(
        "relative z-10 min-h-screen bg-bg-primary",
        theme === "dark" && "dark"
      )}
      suppressHydrationWarning
    >
      {theme === "dark" && <DarkGrainOverlay />}
      <Sidebar />
      <NavRail />
      <BottomNav />
      <main
        id="main-content"
        className={cn(
          "pb-[var(--bottom-nav-height)] md:pb-0",
          "md:ml-[var(--nav-rail-width)]"
        )}
      >
        <div
          className={cn(
            "px-[var(--page-padding-mobile)] md:px-[var(--page-padding-desktop)]",
            "py-6 md:py-8"
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
