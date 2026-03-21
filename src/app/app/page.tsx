"use client";

import { Card } from "@/components/ui/Card";
import { InsightCard } from "@/components/ui/InsightCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NetWorthSummary } from "@/components/app/NetWorthSummary";
import { AccountsList } from "@/components/app/AccountsList";
import { useDashboard, useBudgets, useTransactions } from "@/hooks/useApi";
import { getSpendingByCategory } from "@/data/helpers";
import { formatCurrency } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function TodayView() {
  const t = useTranslations("today");
  const td = useTranslations("data");

  const { data: dash, loading, isDemo } = useDashboard();
  const { data: envelopes } = useBudgets();
  const { data: allTransactions } = useTransactions();

  const activeEnvelopes = envelopes
    .filter((e) => e.group !== "growth" && e.id !== "rent")
    .slice(0, 5);

  const recentTxns = dash.recentTransactions;
  const currentMonth = new Date().toISOString().slice(0, 7);
  const spendingByCategory = getSpendingByCategory(allTransactions, currentMonth).slice(0, 5);

  const bambooInsight = {
    id: "today-insight",
    date: td("dates.today"),
    content: td("insights.todayInsight"),
  };

  return (
    <div className="space-y-[var(--section-gap)] animate-view-enter">
      {/* ─── Demo Mode Indicator ────────────────── */}
      {isDemo && (
        <div className="text-xs text-text-tertiary font-body bg-bg-subtle rounded-[var(--radius-md)] px-3 py-1.5 text-center">
          Demo mode — showing sample data
        </div>
      )}

      {/* ─── Greeting ───────────────────────────── */}
      <div className="animate-fade-up stagger-1">
        <h1 className="font-display font-semibold text-lg text-text-primary">
          {t("greeting", { name: dash.user.name })}
        </h1>
        <p className="text-sm text-text-secondary font-body">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* ─── Net Worth (computed from accounts) ──── */}
      <div className="animate-fade-up stagger-2">
        <NetWorthSummary />
      </div>

      {/* ─── Bamboo Insight ─────────────────────── */}
      <div className="animate-fade-up stagger-3">
        <InsightCard insight={bambooInsight} />
      </div>

      {/* ─── Spending by Category ─────────────────── */}
      <div className="animate-fade-up stagger-4">
        <SectionHeader title={t("spending.label")} />
        <Card bordered>
          <div className="space-y-3">
            {spendingByCategory.map((item) => (
              <div key={item.category.id}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.category.color}`} />
                    <span className="text-sm font-body text-text-primary">
                      {item.category.label}
                    </span>
                  </div>
                  <span className="font-display font-semibold text-sm text-text-primary tabular-nums">
                    {formatCurrency(item.total)}
                  </span>
                </div>
                <div className="w-full h-1 bg-bg-subtle rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.category.color} animate-progress-fill`}
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ─── Envelope Summary ───────────────────── */}
      <div className="animate-fade-up stagger-5">
        <SectionHeader
          title={t("envelopes.label")}
          action={
            <Link
              href="/app/envelopes"
              className="text-xs text-green-primary font-body font-medium hover:text-green-accent transition-colors"
            >
              {t("envelopes.seeAll")}
            </Link>
          }
        />

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          {activeEnvelopes.map((env) => {
            const remaining = env.budgeted - env.spent;
            const percentage = (env.spent / env.budgeted) * 100;
            return (
              <Card
                key={env.id}
                hoverable
                bordered
                className="min-w-[140px] flex-shrink-0 p-3"
              >
                <p className="font-body font-medium text-sm text-text-primary truncate">
                  {td(`envelopes.${env.id}`)}
                </p>
                <p className="font-display font-semibold text-lg text-green-deep mt-1 tabular-nums">
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
      <div className="animate-fade-up stagger-6">
        <SectionHeader title={t("upcoming.label")} />
        <Card bordered>
          <div className="divide-y divide-border-divider">
            {dash.upcomingBills.map((bill) => (
              <div
                key={bill.id}
                className="flex items-center justify-between min-h-[var(--row-min-height)] py-2.5 first:pt-0 last:pb-0"
              >
                <span className="text-sm font-body text-text-primary">
                  {bill.name}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-text-tertiary font-body">
                    {bill.date}
                  </span>
                  <span className="font-display font-semibold text-sm text-text-primary tabular-nums">
                    {formatCurrency(bill.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ─── Recent Transactions ────────────────── */}
      <div className="animate-fade-up stagger-7">
        <SectionHeader title={t("recent.label")} />
        <Card bordered>
          <div className="divide-y divide-border-divider">
            {recentTxns.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between min-h-[var(--row-min-height)] py-2.5"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body text-text-primary truncate">
                    {tx.merchant}
                  </p>
                  <p className="text-xs text-text-tertiary font-body">
                    {new Date(tx.date + "T12:00:00").toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`font-display font-semibold text-sm tabular-nums ${
                    tx.amount > 0 ? "text-positive" : "text-text-primary"
                  }`}
                >
                  {formatCurrency(tx.amount, tx.amount > 0)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-4 text-center">
          <Link
            href="/app/transactions"
            className="text-sm text-text-secondary font-body hover:text-green-primary transition-colors inline-flex items-center gap-1 focus-ring rounded-[var(--radius-md)] px-2 py-1"
          >
            {t("recent.seeAll")}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ─── Accounts ─────────────────────────────── */}
      <div className="animate-fade-up stagger-8">
        <AccountsList />
      </div>
    </div>
  );
}
