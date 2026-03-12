"use client";

import { Card } from "@/components/ui/Card";
import { InsightCard } from "@/components/ui/InsightCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  user,
  envelopes,
  recentTransactions,
  upcomingBills,
} from "@/data/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function TodayView() {
  const t = useTranslations("today");
  const td = useTranslations("data");

  const activeEnvelopes = envelopes
    .filter((e) => e.group !== "growth" && e.id !== "rent")
    .slice(0, 5);

  const bambooInsight = {
    id: "today-insight",
    date: td("dates.today"),
    content: td("insights.todayInsight"),
  };

  return (
    <div className="space-y-8 animate-view-enter">
      {/* ─── Greeting ───────────────────────────── */}
      <div className="animate-fade-up stagger-1">
        <h1 className="font-display font-semibold text-lg text-text-primary">
          {t("greeting", { name: user.name })}
        </h1>
        <p className="text-sm text-text-secondary font-body">
          March 9, 2026
        </p>
      </div>

      {/* ─── Net Worth Card ─────────────────────── */}
      <Card className="animate-fade-up stagger-2" hoverable>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium">
              {t("netWorth.label")}
            </p>
            <p className="font-display font-bold text-3xl text-green-deep mt-1">
              {formatCurrency(user.netWorth)}
            </p>
          </div>
          <div className="flex items-center gap-1 text-positive text-sm font-body font-medium bg-green-light px-2 py-1 rounded-sm">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {formatCurrency(user.netWorthChange, true)}
          </div>
        </div>

        {/* Sparkline */}
        <div className="mt-4 h-10 flex items-end gap-[3px]">
          {user.netWorthTrend.map((val, i) => {
            const max = Math.max(...user.netWorthTrend);
            const min = Math.min(...user.netWorthTrend);
            const height = ((val - min) / (max - min)) * 100;
            return (
              <div
                key={i}
                className="flex-1 bg-green-accent/30 rounded-t-sm min-h-[2px]"
                style={{ height: `${Math.max(height, 5)}%` }}
              />
            );
          })}
        </div>
        <p className="mt-1 text-xs text-text-tertiary font-body text-right">
          {t("netWorth.sparklineLabel")}
        </p>
      </Card>

      {/* ─── Bamboo Insight ─────────────────────── */}
      <div className="animate-fade-up stagger-3">
        <InsightCard insight={bambooInsight} />
      </div>

      {/* ─── Envelope Summary ───────────────────── */}
      <div className="animate-fade-up stagger-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium">
            {t("envelopes.label")}
          </p>
          <Link
            href="/app/envelopes"
            className="text-xs text-green-primary font-body font-medium hover:text-green-accent transition-colors"
          >
            {t("envelopes.seeAll")}
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          {activeEnvelopes.map((env) => {
            const remaining = env.budgeted - env.spent;
            const percentage = (env.spent / env.budgeted) * 100;
            return (
              <Card
                key={env.id}
                hoverable
                className="min-w-[140px] flex-shrink-0 p-3"
              >
                <p className="font-body font-medium text-sm text-text-primary truncate">
                  {td(`envelopes.${env.id}`)}
                </p>
                <p className="font-display font-semibold text-lg text-green-deep mt-1">
                  {formatCurrency(remaining)}
                </p>
                <p className="text-xs text-text-tertiary font-body">
                  {t("envelopes.remaining")}
                </p>
                <ProgressBar
                  spent={env.spent}
                  budgeted={env.budgeted}
                  className="mt-2"
                />
                {percentage >= 75 && (
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-caution" />
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* ─── Upcoming Bills ─────────────────────── */}
      <div className="animate-fade-up stagger-5">
        <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium mb-3">
          {t("upcoming.label")}
        </p>
        <Card>
          <div className="divide-y divide-bg-subtle">
            {upcomingBills.map((bill) => (
              <div
                key={bill.id}
                className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
              >
                <span className="text-sm font-body text-text-primary">
                  {bill.name}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-text-tertiary font-body">
                    {bill.date}
                  </span>
                  <span className="font-display font-semibold text-sm text-text-primary">
                    {formatCurrency(bill.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ─── Recent Activity ────────────────────── */}
      <div className="animate-fade-up stagger-6">
        <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium mb-3">
          {t("recent.label")}
        </p>
        <div className="space-y-1">
          {recentTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-2.5 px-1"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body text-text-primary truncate">
                  {tx.merchant}
                </p>
                {tx.envelope && (
                  <p className="text-xs text-text-tertiary font-body">
                    {tx.envelope}
                  </p>
                )}
              </div>
              <span
                className={`font-display font-semibold text-sm ${
                  tx.amount > 0 ? "text-positive" : "text-text-primary"
                }`}
              >
                {formatCurrency(tx.amount, tx.amount > 0)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <button className="text-sm text-text-secondary font-body hover:text-green-primary transition-colors inline-flex items-center gap-1 cursor-pointer">
            {t("recent.seeAll")}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
