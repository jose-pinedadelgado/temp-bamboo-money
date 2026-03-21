/**
 * Adapters: Transform API responses → React mock-compatible types.
 * Pages don't need to know whether data came from API or mock files.
 */

import type { Account, AccountType, Transaction, TransactionCategory } from "@/types";
import type { Envelope, Goal, Bill, Insight } from "@/data/mock-data";
import type {
  ApiAccount,
  ApiTransaction,
  ApiBudget,
  ApiGoal,
  ApiRecurring,
  ApiDashboard,
} from "./api";

// ── Account ─────────────────────────────────────────────

const accountTypeMap: Record<string, AccountType> = {
  checking: "checking",
  savings: "savings",
  credit_card: "credit-card",
  "credit card": "credit-card",
  credit: "credit-card",
  loan: "loan",
  investment: "investment",
  property: "property",
  vehicle: "vehicle",
  cash: "cash",
};

export function adaptAccount(api: ApiAccount): Account {
  return {
    id: String(api.id),
    name: api.name,
    institution: api.institution || "Manual",
    type: accountTypeMap[api.account_type.toLowerCase()] || "cash",
    balance: Number(api.balance),
    lastSynced: new Date().toISOString().split("T")[0],
  };
}

// ── Transaction ─────────────────────────────────────────

const categoryNameMap: Record<string, TransactionCategory> = {
  groceries: "groceries",
  dining: "dining",
  "dining out": "dining",
  restaurants: "dining",
  transportation: "transportation",
  gas: "transportation",
  transit: "transportation",
  utilities: "utilities",
  rent: "rent",
  mortgage: "rent",
  shopping: "shopping",
  entertainment: "entertainment",
  subscriptions: "subscriptions",
  health: "health",
  healthcare: "health",
  travel: "travel",
  education: "education",
  "personal care": "personal-care",
  "personal-care": "personal-care",
  gifts: "gifts",
  income: "income",
  salary: "income",
  transfer: "transfer",
};

export function adaptTransaction(api: ApiTransaction): Transaction {
  const catName = (api.category_name || "other").toLowerCase();
  const category: TransactionCategory = categoryNameMap[catName] || "other";

  return {
    id: String(api.id),
    date: api.date,
    merchant: api.merchant || api.description,
    amount: api.is_income ? Math.abs(Number(api.amount)) : -Math.abs(Number(api.amount)),
    category,
    accountId: api.account_id ? String(api.account_id) : "",
    status: "posted" as const,
    note: api.notes || undefined,
  };
}

// ── Budget → Envelope ───────────────────────────────────

const essentialNames = new Set([
  "groceries", "rent", "mortgage", "utilities", "transportation",
  "gas", "insurance", "phone", "internet", "healthcare", "health",
]);

const growthNames = new Set([
  "savings", "emergency", "investing", "debt", "retirement",
  "education", "401k", "ira",
]);

function inferGroup(name: string): "essentials" | "lifestyle" | "growth" {
  const lower = name.toLowerCase();
  if (essentialNames.has(lower) || Array.from(essentialNames).some(e => lower.includes(e))) return "essentials";
  if (growthNames.has(lower) || Array.from(growthNames).some(g => lower.includes(g))) return "growth";
  return "lifestyle";
}

export function adaptBudget(api: ApiBudget): Envelope {
  const spent = Number(api.spent_this_month);
  const budgeted = Number(api.effective_limit) || Number(api.monthly_limit);
  const percentUsed = api.percent_used;

  let paceNote: string | undefined;
  if (spent > 0 && percentUsed < 100) {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const dayOfMonth = new Date().getDate();
    const dailyPace = spent / dayOfMonth;
    paceNote = `$${dailyPace.toFixed(2)}/day pace`;
  }

  return {
    id: String(api.id),
    name: api.name,
    icon: api.icon || "📦",
    budgeted,
    spent,
    group: inferGroup(api.name),
    paceNote: percentUsed >= 100 ? `Paid` : paceNote,
  };
}

// ── Goal ────────────────────────────────────────────────

export function adaptGoal(api: ApiGoal): Goal {
  const current = Number(api.current_amount);
  const target = Number(api.target_amount);

  // Estimate monthly contribution from recent contributions
  const contributions = api.contributions || [];
  const recentContribs = contributions.slice(-3);
  const monthlyContribution = recentContribs.length > 0
    ? recentContribs.reduce((s, c) => s + Number(c.amount), 0) / recentContribs.length
    : 0;

  // Project completion date
  const remaining = target - current;
  let projectedDate = "Unknown";
  if (monthlyContribution > 0 && remaining > 0) {
    const monthsLeft = Math.ceil(remaining / monthlyContribution);
    const projected = new Date();
    projected.setMonth(projected.getMonth() + monthsLeft);
    projectedDate = projected.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  } else if (remaining <= 0) {
    projectedDate = "Complete!";
  }

  return {
    id: String(api.id),
    name: api.name,
    target,
    current,
    monthlyContribution: Math.round(monthlyContribution),
    projectedDate,
    insight: `You're ${api.progress_percent.toFixed(0)}% of the way there.`,
    type: "savings",
  };
}

// ── Recurring → Bill ────────────────────────────────────

export function adaptRecurringToBill(api: ApiRecurring): Bill {
  const nextDate = api.next_expected_date
    ? new Date(api.next_expected_date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "Upcoming";

  return {
    id: String(api.id),
    name: api.merchant,
    date: nextDate,
    amount: Number(api.expected_amount),
  };
}

// ── Dashboard composite ─────────────────────────────────

export interface DashboardData {
  user: { name: string };
  netWorth: { total: number; assets: number; liabilities: number; change: number };
  budgetSummary: { totalBudgeted: number; totalSpent: number; remaining: number };
  recentTransactions: Transaction[];
  upcomingBills: Bill[];
  alertCount: number;
}

export function adaptDashboard(api: ApiDashboard, username: string): DashboardData {
  return {
    user: { name: username },
    netWorth: {
      total: Number(api.net_worth.total),
      assets: Number(api.net_worth.assets),
      liabilities: Number(api.net_worth.liabilities),
      change: 0, // API doesn't track change yet — would need historical comparison
    },
    budgetSummary: {
      totalBudgeted: Number(api.budget_summary.total_budgeted),
      totalSpent: Number(api.budget_summary.total_spent),
      remaining: Number(api.budget_summary.remaining),
    },
    recentTransactions: api.recent_transactions.map(adaptTransaction),
    upcomingBills: api.upcoming_bills.map(adaptRecurringToBill),
    alertCount: api.alerts.length,
  };
}
