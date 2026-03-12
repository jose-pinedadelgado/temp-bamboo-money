// ─── Data Aggregation Helpers ───────────────────────────
// Pure functions that derive financial summaries from raw data.

import type { Account, AccountGroup, AccountType, Transaction, TransactionCategory } from "@/types";
import { getCategoryMeta, type CategoryMeta } from "./categories";

// ── Net Worth ───────────────────────────────────────────

export function calculateNetWorth(accounts: Account[]): {
  total: number;
  assets: number;
  liabilities: number;
} {
  let assets = 0;
  let liabilities = 0;

  for (const account of accounts) {
    if (account.balance >= 0) {
      assets += account.balance;
    } else {
      liabilities += Math.abs(account.balance);
    }
  }

  return { total: assets - liabilities, assets, liabilities };
}

// ── Account Grouping ────────────────────────────────────

const accountTypeLabels: Record<AccountType, string> = {
  checking: "Checking",
  savings: "Savings",
  "credit-card": "Credit Cards",
  loan: "Loans",
  investment: "Investments",
  property: "Property",
  vehicle: "Vehicles",
  cash: "Cash",
};

const accountTypeOrder: AccountType[] = [
  "checking",
  "savings",
  "investment",
  "property",
  "vehicle",
  "cash",
  "credit-card",
  "loan",
];

export function groupAccounts(accounts: Account[]): AccountGroup[] {
  const groups = new Map<AccountType, Account[]>();

  for (const account of accounts) {
    const list = groups.get(account.type) ?? [];
    list.push(account);
    groups.set(account.type, list);
  }

  return accountTypeOrder
    .filter((type) => groups.has(type))
    .map((type) => {
      const accts = groups.get(type)!;
      return {
        type,
        label: accountTypeLabels[type],
        accounts: accts,
        total: accts.reduce((sum, a) => sum + a.balance, 0),
      };
    });
}

// ── Spending by Category ────────────────────────────────

export interface CategorySpending {
  category: CategoryMeta;
  total: number;
  count: number;
  percentage: number;
}

export function getSpendingByCategory(
  txns: Transaction[],
  month?: string // "YYYY-MM" format, e.g. "2026-03"
): CategorySpending[] {
  const filtered = txns.filter((t) => {
    if (t.amount >= 0) return false; // skip income/inflows
    if (t.excludeFromBudget) return false;
    if (t.category === "transfer") return false;
    if (month && !t.date.startsWith(month)) return false;
    return true;
  });

  const map = new Map<TransactionCategory, { total: number; count: number }>();

  for (const t of filtered) {
    const entry = map.get(t.category) ?? { total: 0, count: 0 };
    entry.total += Math.abs(t.amount);
    entry.count += 1;
    map.set(t.category, entry);
  }

  const totalSpending = Array.from(map.values()).reduce((s, e) => s + e.total, 0);

  return Array.from(map.entries())
    .map(([cat, data]) => ({
      category: getCategoryMeta(cat),
      total: data.total,
      count: data.count,
      percentage: totalSpending > 0 ? (data.total / totalSpending) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total);
}

// ── Recent Transactions ─────────────────────────────────

export function getRecentTransactions(txns: Transaction[], limit = 5): Transaction[] {
  return [...txns].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

// ── Monthly Totals ──────────────────────────────────────

export function getMonthlyTotals(txns: Transaction[], month: string) {
  const monthTxns = txns.filter((t) => t.date.startsWith(month));

  const income = monthTxns
    .filter((t) => t.amount > 0 && t.category === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expenses = monthTxns
    .filter((t) => t.amount < 0 && !t.excludeFromBudget && t.category !== "transfer")
    .reduce((s, t) => s + Math.abs(t.amount), 0);

  return { income, expenses, net: income - expenses };
}
