"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { InsightCard } from "@/components/ui/InsightCard";
import { monthlySummary } from "@/data/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";

export default function AskBambooView() {
  const t = useTranslations("ask");
  const td = useTranslations("data");
  const [query, setQuery] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const suggestions = [
    t("suggestions.0"),
    t("suggestions.1"),
    t("suggestions.2"),
    t("suggestions.3"),
  ];

  const followUps = [
    t("response.followUps.0"),
    t("response.followUps.1"),
    t("response.followUps.2"),
  ];

  const askBambooInsights = [
    {
      id: "ask-1",
      date: td("dates.today"),
      content: td("insights.groceryInsight"),
      followUp: td("insights.groceryFollowUp"),
    },
    {
      id: "ask-2",
      date: td("dates.yesterday"),
      content: td("insights.subscriptionInsight"),
      data: [
        { label: "Hulu", value: "$17.99/mo" },
        { label: "Headspace", value: "$12.99/mo" },
        { label: "Planet Fitness", value: "$45.00/mo" },
      ],
      followUp: td("insights.subscriptionFollowUp"),
    },
  ];

  function handleSubmit(q: string) {
    setQuery(q);
    setShowResponse(true);
  }

  return (
    <div className="space-y-8 animate-view-enter">
      {/* ─── Header ─────────────────────────────── */}
      <div className="animate-fade-up stagger-1">
        <h1 className="font-display font-bold text-2xl text-green-deep">
          {t("title")}
        </h1>
      </div>

      {/* ─── Search Input ───────────────────────── */}
      <div className="animate-fade-up stagger-2">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            placeholder={t("placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) handleSubmit(query);
            }}
            className="w-full pl-12 pr-4 py-4 rounded-lg bg-bg-subtle text-base font-body text-text-primary placeholder:text-text-tertiary border-none focus:outline-none focus:ring-2 focus:ring-green-accent/30"
          />
        </div>
      </div>

      {/* ─── Suggested Queries ──────────────────── */}
      {!showResponse && (
        <div className="animate-fade-up stagger-3">
          <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium mb-3">
            {t("suggested")}
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSubmit(suggestion)}
                className="px-3 py-1.5 text-sm font-body text-text-secondary bg-bg-subtle rounded-full hover:bg-green-light hover:text-green-primary transition-colors cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── Response Card ──────────────────────── */}
      {showResponse && (
        <div className="animate-fade-up space-y-4">
          <p className="text-sm text-text-tertiary font-body">
            &ldquo;{query}&rdquo;
          </p>

          <Card elevated className="p-6">
            <h3 className="font-display font-semibold text-lg text-text-primary">
              {t("response.title")}
            </h3>

            <div className="mt-4 space-y-2">
              {[
                {
                  label: t("response.totalSpent"),
                  value: formatCurrency(monthlySummary.totalSpent),
                },
                {
                  label: t("response.totalBudget"),
                  value: formatCurrency(monthlySummary.totalBudget),
                },
                {
                  label: t("response.remaining"),
                  value: formatCurrency(monthlySummary.remaining),
                  accent: true,
                },
                {
                  label: t("response.dailyPace"),
                  value: `${formatCurrency(monthlySummary.dailyPace)}/day`,
                },
                {
                  label: t("response.budgetPace"),
                  value: `${formatCurrency(monthlySummary.budgetPace)}/day`,
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between text-sm font-body"
                >
                  <span className="text-text-secondary">{row.label}</span>
                  <span
                    className={`font-display font-semibold ${row.accent ? "text-positive" : "text-text-primary"}`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-bg-subtle">
              <div className="space-y-1.5 text-sm font-body text-text-secondary">
                <p>
                  {t("response.envelopesOnPace")}{" "}
                  <span className="text-text-primary font-medium">
                    {monthlySummary.envelopesOnPace} of{" "}
                    {monthlySummary.envelopesTotal}
                  </span>
                </p>
                <p className="text-caution">
                  {t("response.diningAhead")}
                </p>
                <p>{t("response.groceriesHot")}</p>
                <p>
                  {t("response.netWorthLabel")}{" "}
                  <span className="text-positive font-medium">
                    {formatCurrency(monthlySummary.netWorthChange, true)} {t("response.thisMonth")}
                  </span>
                </p>
              </div>

              <p className="mt-4 text-sm font-body text-text-primary leading-relaxed">
                {t("response.overall")}
              </p>
            </div>

            {/* Follow-up suggestions */}
            <div className="mt-4 flex flex-wrap gap-2">
              {followUps.map((followUp) => (
                <button
                  key={followUp}
                  onClick={() => handleSubmit(followUp)}
                  className="px-3 py-1.5 text-xs font-body text-green-primary bg-green-light rounded-full hover:bg-green-glow transition-colors cursor-pointer"
                >
                  {followUp}
                </button>
              ))}
            </div>
          </Card>

          <button
            onClick={() => {
              setShowResponse(false);
              setQuery("");
            }}
            className="text-sm text-text-secondary font-body hover:text-green-primary transition-colors cursor-pointer"
          >
            {t("clear")}
          </button>
        </div>
      )}

      {/* ─── Recent Insights Feed ───────────────── */}
      <div className={showResponse ? "animate-fade-up" : "animate-fade-up stagger-4"}>
        <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium mb-3">
          {t("recentInsights")}
        </p>
        <div className="space-y-4">
          {askBambooInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
}
