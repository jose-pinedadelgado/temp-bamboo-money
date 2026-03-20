"use client";

import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { accounts } from "@/data/accounts";
import { groupAccounts, calculateNetWorth } from "@/data/helpers";
import { formatCurrency } from "@/lib/utils";
import {
  Landmark,
  PiggyBank,
  CreditCard,
  GraduationCap,
  LineChart,
  Home,
  Car,
  Banknote,
} from "lucide-react";
import type { AccountType } from "@/types";

const typeIcons: Record<AccountType, typeof Landmark> = {
  checking: Landmark,
  savings: PiggyBank,
  "credit-card": CreditCard,
  loan: GraduationCap,
  investment: LineChart,
  property: Home,
  vehicle: Car,
  cash: Banknote,
};

export function AccountsList() {
  const groups = groupAccounts(accounts);
  const { total } = calculateNetWorth(accounts);

  return (
    <div className="space-y-4">
      <SectionHeader title="Accounts" total={formatCurrency(total)} />

      {groups.map((group) => {
        const Icon = typeIcons[group.type] ?? Landmark;
        const isLiability = group.total < 0;

        return (
          <Card key={group.type} bordered>
            {/* Group header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-text-tertiary" strokeWidth={1.75} />
                <span className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium">
                  {group.label}
                </span>
              </div>
              <span
                className={`font-display font-semibold text-sm tabular-nums ${
                  isLiability ? "text-warning" : "text-text-primary"
                }`}
              >
                {isLiability ? "-" : ""}
                {formatCurrency(Math.abs(group.total))}
              </span>
            </div>

            {/* Account rows */}
            <div className="divide-y divide-border-divider">
              {group.accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between min-h-[var(--row-min-height)] py-2.5 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-body text-text-primary truncate">
                      {account.name}
                    </p>
                    <p className="text-xs text-text-tertiary font-body">
                      {account.institution}
                      {account.mask && ` ···${account.mask}`}
                    </p>
                  </div>
                  <span
                    className={`font-display font-semibold text-sm flex-shrink-0 tabular-nums ${
                      account.balance < 0 ? "text-warning" : "text-text-primary"
                    }`}
                  >
                    {formatCurrency(account.balance)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
