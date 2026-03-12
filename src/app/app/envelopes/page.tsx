"use client";

import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { envelopes } from "@/data/mock-data";
import { formatCurrency, getProgressPercentage } from "@/lib/utils";
import { useTranslations } from "next-intl";
import {
  ShoppingCart,
  Home,
  Zap,
  Car,
  UtensilsCrossed,
  Tv,
  ShoppingBag,
  CreditCard,
  Shield,
  TrendingDown,
  Plus,
  Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ShoppingCart,
  Home,
  Zap,
  Car,
  UtensilsCrossed,
  Tv,
  ShoppingBag,
  CreditCard,
  Shield,
  TrendingDown,
};

export default function EnvelopesView() {
  const t = useTranslations("envelopes");
  const td = useTranslations("data");

  const totalRemaining = envelopes.reduce(
    (sum, e) => sum + Math.max(e.budgeted - e.spent, 0),
    0
  );

  const groups = ["essentials", "lifestyle", "growth"] as const;

  return (
    <div className="space-y-8 animate-view-enter">
      {/* ─── Header ─────────────────────────────── */}
      <div className="animate-fade-up stagger-1">
        <h1 className="font-display font-bold text-2xl text-green-deep">
          {t("title")}
        </h1>
        <p className="text-sm text-text-secondary font-body mt-1">
          <span className="font-display font-semibold text-text-primary">
            {formatCurrency(totalRemaining)}
          </span>{" "}
          {t("remaining")} &middot; {t("daysLeft", { days: 21 })}
        </p>
      </div>

      {/* ─── Search ─────────────────────────────── */}
      <div className="animate-fade-up stagger-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder={t("search")}
            className="w-full pl-9 pr-4 py-2.5 rounded-md bg-bg-subtle text-sm font-body text-text-primary placeholder:text-text-tertiary border-none focus:outline-none focus:ring-2 focus:ring-green-accent/30"
          />
        </div>
      </div>

      {/* ─── Envelope Groups ────────────────────── */}
      {groups.map((group, gi) => {
        const groupEnvelopes = envelopes.filter((e) => e.group === group);
        return (
          <div
            key={group}
            className="animate-fade-up"
            style={{ animationDelay: `${(gi + 2) * 50}ms` }}
          >
            <p className="text-xs uppercase tracking-[0.05em] text-text-secondary font-body font-medium mb-3">
              {t(`groups.${group}`)}
            </p>

            <div className="space-y-3">
              {groupEnvelopes.map((env) => {
                const Icon = iconMap[env.icon] || ShoppingCart;
                const remaining = Math.max(env.budgeted - env.spent, 0);
                const percentage = getProgressPercentage(env.spent, env.budgeted);
                const isGrowth = env.group === "growth";
                const isPaid = !!env.paidDate;

                return (
                  <Card key={env.id} hoverable>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-md bg-green-light flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4.5 h-4.5 text-green-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body font-medium text-sm text-text-primary">
                          {td(`envelopes.${env.id}`)}
                        </p>

                        {isGrowth ? (
                          <div className="mt-1">
                            <p className="text-sm font-body text-text-secondary">
                              <span className="font-display font-semibold text-text-primary">
                                {formatCurrency(env.budgeted)}
                              </span>{" "}
                              {t("allocatedThisMonth")}
                            </p>
                            {env.paceNote && (
                              <p className="text-xs text-green-accent font-body mt-1">
                                {td(`paceNotes.${env.id}`)}
                              </p>
                            )}
                          </div>
                        ) : (
                          <>
                            <div className="flex items-baseline gap-1.5 mt-1">
                              <span className="font-display font-semibold text-base text-green-deep">
                                {formatCurrency(remaining)}
                              </span>
                              <span className="text-xs text-text-tertiary font-body">
                                {t("remaining")}
                              </span>
                              <span className="text-xs text-text-tertiary font-body ml-auto">
                                {t("of", { amount: formatCurrency(env.budgeted) })}
                              </span>
                            </div>

                            <ProgressBar
                              spent={env.spent}
                              budgeted={env.budgeted}
                              className="mt-2"
                            />

                            <div className="flex items-center justify-between mt-1.5">
                              <p className="text-xs text-text-secondary font-body">
                                {isPaid ? (
                                  <span className="text-positive">
                                    {td(`paidDates.${env.id}`)} &#10003;
                                  </span>
                                ) : (
                                  <>
                                    {t("spent", { amount: formatCurrency(env.spent) })}
                                    {env.paceNote &&
                                      ` · ${td(`paceNotes.${env.id}`)}`}
                                  </>
                                )}
                              </p>
                              {percentage >= 75 && !isPaid && (
                                <Badge variant="caution">{t("paceAhead")}</Badge>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* ─── Add Envelope ───────────────────────── */}
      <button className="w-full py-4 border-2 border-dashed border-sand/50 rounded-lg text-sm font-body text-text-secondary hover:border-green-accent hover:text-green-primary transition-colors flex items-center justify-center gap-2 cursor-pointer">
        <Plus className="w-4 h-4" />
        {t("addEnvelope")}
      </button>
    </div>
  );
}
