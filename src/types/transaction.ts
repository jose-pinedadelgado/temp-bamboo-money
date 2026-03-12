// ─── Transaction Types ──────────────────────────────────

export type TransactionCategory =
  | "groceries"
  | "dining"
  | "transportation"
  | "utilities"
  | "rent"
  | "shopping"
  | "entertainment"
  | "subscriptions"
  | "health"
  | "travel"
  | "education"
  | "personal-care"
  | "gifts"
  | "income"
  | "transfer"
  | "other";

export type TransactionStatus = "pending" | "posted" | "reviewed";

export interface Transaction {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  merchant: string;
  amount: number; // negative = expense, positive = income
  category: TransactionCategory;
  accountId: string;
  status: TransactionStatus;
  note?: string;
  isRecurring?: boolean;
  excludeFromBudget?: boolean;
}
