// ─── Account Types ──────────────────────────────────────

export type AccountType =
  | "checking"
  | "savings"
  | "credit-card"
  | "loan"
  | "investment"
  | "property"
  | "vehicle"
  | "cash";

export interface Account {
  id: string;
  name: string;
  institution: string;
  type: AccountType;
  balance: number; // positive for assets, negative for liabilities (credit cards, loans)
  lastSynced: string; // ISO date string
  mask?: string; // last 4 digits
  isManual?: boolean;
}

export type AccountGroup = {
  type: AccountType;
  label: string;
  accounts: Account[];
  total: number;
};
