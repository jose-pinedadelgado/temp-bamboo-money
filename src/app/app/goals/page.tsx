"use client";

import { Card } from "@/components/ui/Card";
import { goals } from "@/data/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

const goalKeyMap: Record<string, string> = {
  emergency: "emergency",
  japan: "japan",
  "credit-card": "creditCard",
};

export default function GoalsView() {
  const t = useTranslations("goals");
  const td = useTranslations("data.goals");

  const totalTarget = goals.reduce((s, g) => s + g.target, 0);

  return (
    <div className="space-y-8 animate-view-enter">
      {/* ─── Header ─────────────────────────────── */}
      <div className="animate-fade-up stagger-1">
        <h1 className="font-display font-bold text-2xl text-green-deep">
          {t("title")}
        </h1>
        <p className="text-sm text-text-secondary font-body mt-1">
          {t("active", { count: goals.length })} &middot;{" "}
          <span className="font-display font-semibold text-text-primary">
            {formatCurrency(totalTarget)}
          </span>{" "}
          {t("totalTarget")}
        </p>
      </div>

      {/* ─── Goal Cards ─────────────────────────── */}
      {goals.map((goal, i) => {
        const isDebt = goal.type === "debt";
        const percentage = (goal.current / goal.target) * 100;
        const tKey = goalKeyMap[goal.id];
        return (
          <Card
            key={goal.id}
            hoverable
            className="p-6 animate-fade-up"
            style={{ animationDelay: `${(i + 1) * 60}ms` }}
          >
            {/* Label */}
            <p className="text-xs uppercase tracking-[0.05em] text-green-accent font-body font-semibold">
              {td(`${tKey}.name`)}
            </p>

            <div className="flex gap-6 mt-4">
              {/* Bamboo Stalk Growth Visualization */}
              <div className="flex flex-col items-center w-8 flex-shrink-0">
                <div className="relative w-2 h-48 bg-bg-subtle rounded-full overflow-hidden">
                  {/* Filled portion grows from bottom */}
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-green-deep to-green-accent rounded-full transition-all duration-1000 ease-out"
                    style={{ height: `${percentage}%` }}
                  />

                  {/* Leaf nodes at 25%, 50%, 75%, 100% */}
                  {[25, 50, 75, 100].map((milestone) => {
                    const reached = percentage >= milestone;
                    const bottomPos = `${milestone}%`;
                    return (
                      <div
                        key={milestone}
                        className="absolute -left-2.5 w-7 flex justify-center"
                        style={{ bottom: bottomPos, transform: "translateY(50%)" }}
                      >
                        {reached ? (
                          <svg
                            width="14"
                            height="10"
                            viewBox="0 0 14 10"
                            className="text-green-accent"
                          >
                            <path
                              d="M1 9C3 3 7 1 13 1C9 4 5 7 1 9Z"
                              fill="currentColor"
                              opacity="0.5"
                            />
                            <path
                              d="M1 9C3 3 7 1 13 1"
                              stroke="currentColor"
                              strokeWidth="1"
                              fill="none"
                            />
                          </svg>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-bg-subtle border border-sand/50" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-text-tertiary font-body mt-2">
                  {Math.round(percentage)}%
                </p>
              </div>

              {/* Goal details */}
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-3xl text-green-deep">
                  {isDebt
                    ? formatCurrency(goal.target - goal.current)
                    : formatCurrency(goal.current)}
                </p>
                <p className="text-sm text-text-secondary font-body mt-0.5">
                  {isDebt
                    ? t("remainingOf", { amount: formatCurrency(goal.target) })
                    : t("of", { amount: formatCurrency(goal.target) })}
                </p>

                <div className="mt-4 text-sm text-text-secondary font-body">
                  <p>
                    {formatCurrency(goal.monthlyContribution)}{t("perMonth")} &middot;{" "}
                    {isDebt ? t("debtFreeBy") : t("onPaceFor")}{" "}
                    <span className="text-green-accent font-medium">
                      {goal.projectedDate}
                    </span>
                  </p>
                </div>

                {/* Bamboo insight */}
                <div className="mt-4 p-3 bg-bg-subtle rounded-md">
                  <p className="text-sm text-text-secondary font-body leading-relaxed italic">
                    &ldquo;{td(`${tKey}.insight`)}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </Card>
        );
      })}

      {/* ─── Plant a New Goal ───────────────────── */}
      <button className="w-full py-5 border-2 border-dashed border-sand/50 rounded-lg text-sm font-body text-text-secondary hover:border-green-accent hover:text-green-primary transition-colors flex items-center justify-center gap-2 cursor-pointer">
        <Plus className="w-4 h-4" />
        {t("plantGoal")}
      </button>
    </div>
  );
}
