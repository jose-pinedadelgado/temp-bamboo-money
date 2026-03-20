"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { accounts } from "@/data/accounts";
import { calculateNetWorth, getMonthlyTotals } from "@/data/helpers";
import { transactions } from "@/data/transactions";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";

// Simulated historical net worth data (16 data points over ~4 months)
const netWorthHistory = [
  41200, 41800, 42100, 42400, 42300, 43000, 43500, 43200,
  44100, 44800, 45200, 45600, 46100, 46500, 46890, 47430,
];

export function NetWorthSummary() {
  const { total, assets, liabilities } = calculateNetWorth(accounts);
  const monthTotals = getMonthlyTotals(transactions, "2026-03");

  // Month-over-month change (simulated: last two points in history)
  const prevMonth = netWorthHistory[netWorthHistory.length - 2];
  const change = total - prevMonth;

  return (
    <Card bordered>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium">
            Net Worth
          </p>
          <p className="font-display font-bold text-3xl text-green-deep mt-1 tabular-nums">
            {formatCurrency(total)}
          </p>
        </div>
        <Badge variant="positive">
          <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
          {formatCurrency(change, true)}
        </Badge>
      </div>

      {/* Sparkline */}
      <div className="mt-4 h-10 flex items-end gap-[3px]">
        {netWorthHistory.map((val, i) => {
          const max = Math.max(...netWorthHistory);
          const min = Math.min(...netWorthHistory);
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
        Last 90 days
      </p>

      {/* Assets / Liabilities breakdown */}
      <div className="mt-4 pt-4 border-t border-border-divider grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-positive" />
            <span className="text-xs text-text-tertiary font-body">Assets</span>
          </div>
          <p className="font-display font-semibold text-lg text-text-primary tabular-nums">
            {formatCurrency(assets)}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingDown className="w-3.5 h-3.5 text-warning" />
            <span className="text-xs text-text-tertiary font-body">Liabilities</span>
          </div>
          <p className="font-display font-semibold text-lg text-text-primary tabular-nums">
            {formatCurrency(liabilities)}
          </p>
        </div>
      </div>

      {/* Cash flow this month */}
      <div className="mt-4 pt-4 border-t border-border-divider">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-tertiary font-body">March cash flow</span>
          <span
            className={`font-display font-semibold text-sm tabular-nums ${
              monthTotals.net >= 0 ? "text-positive" : "text-warning"
            }`}
          >
            {formatCurrency(monthTotals.net, true)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-text-tertiary font-body">
            Income {formatCurrency(monthTotals.income)} · Spent {formatCurrency(monthTotals.expenses)}
          </span>
        </div>
      </div>
    </Card>
  );
}
