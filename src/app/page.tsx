"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import {
  Wallet,
  CreditCard,
  TrendingUp,
  BookOpen,
  BarChart3,
  Layers,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";
import { LocaleToggle } from "@/components/ui/LocaleToggle";

export default function LandingPage() {
  const scrollRef = useScrollReveal();
  const t = useTranslations("landing");
  const nav = useTranslations("nav");

  return (
    <div ref={scrollRef} className="relative z-10">
      {/* ─── Navigation ─────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-sand/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BambooIcon className="w-7 h-7 text-green-deep" />
            <span className="font-display font-bold text-xl text-green-deep">
              {t("brand")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <LocaleToggle />
            <Link href="/app">
              <Button variant="ghost" size="sm">
                {nav("openApp")}
              </Button>
            </Link>
            <a href="#waitlist">
              <Button size="sm">{nav("joinWaitlist")}</Button>
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Section 1: Hero ────────────────────────── */}
      <section className="min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-green-deep leading-[1.1] tracking-tight animate-fade-up stagger-1">
              {t("hero.headline1")}
              <br />
              {t("hero.headline2")}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-text-secondary font-body leading-relaxed max-w-lg animate-fade-up stagger-2">
              {t("hero.subheadline")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up stagger-3">
              <a href="#waitlist">
                <Button size="lg">
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="inline ml-2 w-5 h-5" />
                </Button>
              </a>
              <a href="#how-it-works">
                <Button variant="secondary" size="lg">
                  {t("hero.ctaSecondary")}
                </Button>
              </a>
            </div>
            <p className="mt-4 text-sm text-text-tertiary font-body animate-fade-up stagger-4">
              {t("hero.ctaNote")}
            </p>
          </div>

          {/* Bamboo Growth Animation */}
          <div className="hidden lg:flex justify-center items-end h-[400px]">
            <div className="relative w-48 h-full">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-t from-green-deep to-green-accent animate-bamboo-grow origin-bottom rounded-full" />
              {[
                { bottom: "25%", delay: "1.2s", side: "right" },
                { bottom: "50%", delay: "1.5s", side: "left" },
                { bottom: "75%", delay: "1.8s", side: "right" },
                { bottom: "95%", delay: "2.1s", side: "left" },
              ].map((leaf, i) => (
                <div
                  key={i}
                  className="absolute animate-leaf-sprout"
                  style={{
                    bottom: leaf.bottom,
                    [leaf.side === "left" ? "right" : "left"]: "50%",
                    animationDelay: leaf.delay,
                    transformOrigin:
                      leaf.side === "left" ? "right center" : "left center",
                  }}
                >
                  <svg
                    width="32"
                    height="20"
                    viewBox="0 0 32 20"
                    className={`text-green-accent ${leaf.side === "left" ? "scale-x-[-1]" : ""}`}
                  >
                    <path
                      d="M2 18C6 6 16 2 30 2C20 8 12 14 2 18Z"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <path
                      d="M2 18C6 6 16 2 30 2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </div>
              ))}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-green-glow rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: The Problem ─────────────────── */}
      <section className="bg-bg-section py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium scroll-reveal">
            {t("problem.label")}
          </p>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-green-deep scroll-reveal">
            {t("problem.headline")}
          </h2>

          <div className="mt-16 grid sm:grid-cols-3 gap-8">
            {([
              { icon: BookOpen, key: "budgeting" },
              { icon: BarChart3, key: "dashboards" },
              { icon: Layers, key: "fragmented" },
            ] as const).map((item, i) => (
              <div
                key={i}
                className="scroll-reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-md bg-green-light flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-green-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-text-primary">
                  {t(`problem.items.${item.key}.title`)}
                </h3>
                <p className="mt-2 text-text-secondary font-body leading-relaxed">
                  {t(`problem.items.${item.key}.body`)}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-16 text-center text-xl font-display font-semibold text-green-primary scroll-reveal">
            {t("problem.bridge")}
          </p>
        </div>
      </section>

      {/* ─── Section 3: The Solution (Three Pillars) ── */}
      <section id="how-it-works" className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium scroll-reveal">
            {t("pillars.label")}
          </p>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-green-deep scroll-reveal">
            {t("pillars.headline")}
          </h2>

          <div className="mt-16 grid sm:grid-cols-3 gap-8">
            {([
              { icon: Wallet, key: "envelopes", accent: "border-green-accent" },
              { icon: CreditCard, key: "subscriptions", accent: "border-gold" },
              { icon: TrendingUp, key: "netWorth", accent: "border-green-deep" },
            ] as const).map((pillar, i) => (
              <div
                key={i}
                className={`scroll-reveal bg-bg-card rounded-lg p-6 shadow-card border-t-[3px] ${pillar.accent}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <pillar.icon className="w-8 h-8 text-green-primary mb-4" />
                <h3 className="font-display font-bold text-xl text-text-primary">
                  {t(`pillars.${pillar.key}.title`)}
                </h3>
                <p className="mt-3 text-text-secondary font-body leading-relaxed">
                  {t(`pillars.${pillar.key}.body`)}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-text-secondary font-body text-lg scroll-reveal">
            {t("pillars.bridge")}
          </p>
        </div>
      </section>

      {/* ─── Section 4: The Assistant ───────────────── */}
      <section className="bg-bg-section py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium scroll-reveal">
            {t("assistant.label")}
          </p>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-green-deep scroll-reveal">
            {t("assistant.headline")}
          </h2>
          <p className="mt-4 text-text-secondary font-body text-lg max-w-2xl scroll-reveal">
            {t("assistant.description")}
          </p>

          <div className="mt-12 max-w-2xl space-y-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="scroll-reveal bg-bg-card rounded-lg p-5 shadow-card border-l-[3px] border-l-green-accent"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-green-accent flex-shrink-0 mt-1"
                  >
                    <path
                      d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-text-primary font-body leading-relaxed">
                    {t(`assistant.insights.${i}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 5: Competitive Positioning ─────── */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium scroll-reveal">
            {t("competitive.label")}
          </p>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-green-deep scroll-reveal">
            {t("competitive.headline")}
          </h2>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {(["vsYnab", "vsMonarch", "vsRocket"] as const).map((key, i) => (
              <div
                key={i}
                className="scroll-reveal bg-bg-card rounded-lg p-6 shadow-card"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="text-xs uppercase tracking-[0.1em] text-green-accent font-body font-semibold mb-3">
                  {t(`competitive.${key}.label`)}
                </p>
                <p className="text-text-primary font-body leading-relaxed">
                  {t(`competitive.${key}.text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 6: Who It's For ────────────────── */}
      <section className="bg-bg-section py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium scroll-reveal">
            {t("personas.label")}
          </p>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-green-deep scroll-reveal">
            {t("personas.headline")}
          </h2>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {([
              { icon: Users, key: "couples" },
              { icon: Target, key: "quitters" },
              { icon: Sparkles, key: "goalSetters" },
              { icon: BookOpen, key: "bilingual" },
            ] as const).map((persona, i) => (
              <div
                key={i}
                className="scroll-reveal bg-bg-card rounded-lg p-5 shadow-card"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <persona.icon className="w-6 h-6 text-green-accent mb-3" />
                <h3 className="font-display font-semibold text-base text-text-primary">
                  {t(`personas.${persona.key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-text-secondary font-body leading-relaxed">
                  {t(`personas.${persona.key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 7: Pricing ─────────────────────── */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium text-center scroll-reveal">
            {t("pricing.label")}
          </p>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-green-deep text-center scroll-reveal">
            {t("pricing.headline")}
          </h2>

          <div className="mt-16 grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free tier */}
            <div className="scroll-reveal bg-bg-card rounded-lg p-8 shadow-card border border-sand/30">
              <h3 className="font-display font-bold text-2xl text-text-primary">
                {t("pricing.free.title")}
              </h3>
              <p className="mt-1 text-text-secondary font-body text-sm">
                {t("pricing.free.subtitle")}
              </p>
              <div className="mt-6 space-y-3">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-body text-text-primary">
                    <Check className="w-4 h-4 text-green-accent flex-shrink-0" />
                    {t(`pricing.free.features.${i}`)}
                  </div>
                ))}
              </div>
              <a href="#waitlist" className="block mt-8">
                <Button variant="secondary" className="w-full">
                  {nav("joinWaitlist")}
                </Button>
              </a>
            </div>

            {/* Premium tier */}
            <div className="scroll-reveal bg-bg-card rounded-lg p-8 shadow-elevated border-2 border-gold/40 relative"
              style={{ transitionDelay: "80ms" }}
            >
              <div className="absolute -top-3 right-6 bg-gold text-text-inverse text-xs font-body font-semibold px-3 py-1 rounded-full">
                {t("pricing.premium.badge")}
              </div>
              <h3 className="font-display font-bold text-2xl text-text-primary">
                {t("pricing.premium.title")}
              </h3>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-display font-bold text-3xl text-green-deep">
                  {t("pricing.premium.price")}
                </span>
                <span className="text-text-secondary font-body text-sm">
                  {t("pricing.premium.period")}
                </span>
              </div>
              <p className="mt-1 text-text-tertiary font-body text-xs">
                {t("pricing.premium.note")}
              </p>
              <div className="mt-6 space-y-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-body text-text-primary">
                    <Check className="w-4 h-4 text-green-accent flex-shrink-0" />
                    {t(`pricing.premium.features.${i}`)}
                  </div>
                ))}
              </div>
              <a href="#waitlist" className="block mt-8">
                <Button className="w-full">{t("hero.ctaPrimary")}</Button>
              </a>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-text-tertiary font-body scroll-reveal">
            {t("pricing.footnote")}
          </p>
        </div>
      </section>

      {/* ─── Section 8: Footer / Final CTA ──────────── */}
      <section
        id="waitlist"
        className="bg-green-deep py-24 sm:py-32"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BambooIcon className="w-10 h-10 text-green-accent mx-auto mb-6 scroll-reveal" />
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-inverse scroll-reveal">
            {t("cta.headline")}
          </h2>
          <p className="mt-4 text-green-accent/80 font-body text-lg max-w-md mx-auto scroll-reveal">
            {t("cta.description")}
          </p>

          <form
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto scroll-reveal"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={t("cta.placeholder")}
              className="flex-1 px-4 py-3 rounded-md bg-text-inverse/10 border border-text-inverse/20 text-text-inverse placeholder:text-text-inverse/40 font-body focus:outline-none focus:ring-2 focus:ring-green-accent/50"
            />
            <Button size="md" className="whitespace-nowrap">
              {t("cta.button")}
            </Button>
          </form>

          <div className="mt-20 pt-8 border-t border-text-inverse/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-inverse/40 font-body">
            <p>{t("cta.builtBy")}</p>
            <div className="flex gap-6">
              <span className="hover:text-text-inverse/60 cursor-pointer">{t("cta.privacy")}</span>
              <span className="hover:text-text-inverse/60 cursor-pointer">{t("cta.terms")}</span>
              <span className="hover:text-text-inverse/60 cursor-pointer">{t("cta.contact")}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Bamboo icon (reusable SVG) ──────────────── */
function BambooIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 20L8 4M8 4C10 8 14 10 18 10M8 4C6 8 4 12 4 16M8 12C10 14 14 15 16 15M8 8C9 9 11 10 13 10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
