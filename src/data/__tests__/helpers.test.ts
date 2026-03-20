import { describe, it, expect } from "vitest";
import {
  calculateNetWorth,
  groupAccounts,
  getSpendingByCategory,
  getRecentTransactions,
  getMonthlyTotals,
} from "@/data/helpers";
import type { Account, Transaction } from "@/types";

// ── Factories ───────────────────────────────────────────

function makeAccount(overrides: Partial<Account> & { balance: number }): Account {
  return {
    id: "acc-1",
    name: "Test Account",
    type: "checking",
    institution: "Test Bank",
    lastUpdated: "2026-03-15",
    ...overrides,
  };
}

function makeTxn(overrides: Partial<Transaction> & { amount: number }): Transaction {
  return {
    id: "txn-1",
    date: "2026-03-10",
    merchant: "Test Merchant",
    category: "groceries",
    status: "posted",
    ...overrides,
  };
}

// ── calculateNetWorth ───────────────────────────────────

describe("calculateNetWorth", () => {
  it("returns zeros for an empty array", () => {
    const result = calculateNetWorth([]);
    expect(result).toEqual({ total: 0, assets: 0, liabilities: 0 });
  });

  it("sums positive balances as assets and negative as liabilities", () => {
    const accounts = [
      makeAccount({ id: "a1", balance: 5000, type: "checking" }),
      makeAccount({ id: "a2", balance: 10000, type: "savings" }),
      makeAccount({ id: "a3", balance: -2500, type: "credit-card" }),
      makeAccount({ id: "a4", balance: -15000, type: "loan" }),
    ];
    const result = calculateNetWorth(accounts);
    expect(result.assets).toBe(15000);
    expect(result.liabilities).toBe(17500);
    expect(result.total).toBe(-2500);
  });

  it("handles all positive balances (no liabilities)", () => {
    const accounts = [
      makeAccount({ id: "a1", balance: 1000 }),
      makeAccount({ id: "a2", balance: 2000 }),
    ];
    const result = calculateNetWorth(accounts);
    expect(result).toEqual({ total: 3000, assets: 3000, liabilities: 0 });
  });

  it("handles all negative balances (no assets)", () => {
    const accounts = [
      makeAccount({ id: "a1", balance: -500, type: "credit-card" }),
      makeAccount({ id: "a2", balance: -1000, type: "loan" }),
    ];
    const result = calculateNetWorth(accounts);
    expect(result).toEqual({ total: -1500, assets: 0, liabilities: 1500 });
  });

  it("treats a zero balance as an asset (>= 0 branch)", () => {
    const accounts = [makeAccount({ balance: 0 })];
    const result = calculateNetWorth(accounts);
    expect(result).toEqual({ total: 0, assets: 0, liabilities: 0 });
  });
});

// ── groupAccounts ───────────────────────────────────────

describe("groupAccounts", () => {
  it("groups accounts by type with correct labels and totals", () => {
    const accounts = [
      makeAccount({ id: "a1", type: "checking", balance: 3000 }),
      makeAccount({ id: "a2", type: "checking", balance: 1500 }),
      makeAccount({ id: "a3", type: "savings", balance: 10000 }),
      makeAccount({ id: "a4", type: "credit-card", balance: -2000 }),
    ];
    const groups = groupAccounts(accounts);

    expect(groups).toHaveLength(3);
    expect(groups[0].type).toBe("checking");
    expect(groups[0].label).toBe("Checking");
    expect(groups[0].total).toBe(4500);
    expect(groups[0].accounts).toHaveLength(2);

    expect(groups[1].type).toBe("savings");
    expect(groups[1].total).toBe(10000);

    expect(groups[2].type).toBe("credit-card");
    expect(groups[2].label).toBe("Credit Cards");
    expect(groups[2].total).toBe(-2000);
  });

  it("returns groups in the fixed order (checking before savings before credit-card)", () => {
    const accounts = [
      makeAccount({ id: "a1", type: "credit-card", balance: -100 }),
      makeAccount({ id: "a2", type: "checking", balance: 500 }),
      makeAccount({ id: "a3", type: "investment", balance: 20000 }),
    ];
    const groups = groupAccounts(accounts);
    const types = groups.map((g) => g.type);
    expect(types).toEqual(["checking", "investment", "credit-card"]);
  });

  it("returns an empty array for no accounts", () => {
    expect(groupAccounts([])).toEqual([]);
  });

  it("omits types not present in input", () => {
    const accounts = [makeAccount({ id: "a1", type: "cash", balance: 200 })];
    const groups = groupAccounts(accounts);
    expect(groups).toHaveLength(1);
    expect(groups[0].type).toBe("cash");
  });
});

// ── getSpendingByCategory ───────────────────────────────

describe("getSpendingByCategory", () => {
  const baseTxns: Transaction[] = [
    makeTxn({ id: "t1", amount: -50, category: "groceries", date: "2026-03-05" }),
    makeTxn({ id: "t2", amount: -30, category: "groceries", date: "2026-03-10" }),
    makeTxn({ id: "t3", amount: -100, category: "dining", date: "2026-03-08" }),
    makeTxn({ id: "t4", amount: 3000, category: "income", date: "2026-03-01" }),
    makeTxn({ id: "t5", amount: -200, category: "transfer", date: "2026-03-02" }),
    makeTxn({ id: "t6", amount: -25, category: "shopping", date: "2026-02-28", excludeFromBudget: true }),
    makeTxn({ id: "t7", amount: -40, category: "entertainment", date: "2026-02-15" }),
  ];

  it("filters out income (positive amounts)", () => {
    const result = getSpendingByCategory(baseTxns);
    const cats = result.map((r) => r.category.id);
    expect(cats).not.toContain("income");
  });

  it("filters out transfers", () => {
    const result = getSpendingByCategory(baseTxns);
    const cats = result.map((r) => r.category.id);
    expect(cats).not.toContain("transfer");
  });

  it("filters out excludeFromBudget transactions", () => {
    const result = getSpendingByCategory(baseTxns);
    const cats = result.map((r) => r.category.id);
    expect(cats).not.toContain("shopping");
  });

  it("groups by category with correct totals and counts", () => {
    const result = getSpendingByCategory(baseTxns);
    const groceries = result.find((r) => r.category.id === "groceries");
    expect(groceries).toBeDefined();
    expect(groceries!.total).toBe(80);
    expect(groceries!.count).toBe(2);
  });

  it("sorts results by total descending", () => {
    const result = getSpendingByCategory(baseTxns);
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].total).toBeGreaterThanOrEqual(result[i].total);
    }
  });

  it("calculates percentages that sum to 100", () => {
    const result = getSpendingByCategory(baseTxns);
    const totalPct = result.reduce((s, r) => s + r.percentage, 0);
    expect(totalPct).toBeCloseTo(100, 5);
  });

  it("filters by month when provided", () => {
    const result = getSpendingByCategory(baseTxns, "2026-03");
    const cats = result.map((r) => r.category.id);
    expect(cats).not.toContain("entertainment");
    expect(cats).toContain("groceries");
    expect(cats).toContain("dining");
  });

  it("returns empty array when no transactions match", () => {
    const result = getSpendingByCategory(baseTxns, "2025-01");
    expect(result).toEqual([]);
  });
});

// ── getRecentTransactions ───────────────────────────────

describe("getRecentTransactions", () => {
  const txns: Transaction[] = [
    makeTxn({ id: "t1", date: "2026-03-01", amount: -10 }),
    makeTxn({ id: "t2", date: "2026-03-15", amount: -20 }),
    makeTxn({ id: "t3", date: "2026-03-10", amount: -30 }),
    makeTxn({ id: "t4", date: "2026-02-28", amount: -40 }),
    makeTxn({ id: "t5", date: "2026-03-05", amount: -50 }),
    makeTxn({ id: "t6", date: "2026-03-20", amount: -60 }),
  ];

  it("returns transactions sorted by date descending", () => {
    const result = getRecentTransactions(txns);
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].date >= result[i].date).toBe(true);
    }
  });

  it("defaults to 5 results", () => {
    expect(getRecentTransactions(txns)).toHaveLength(5);
  });

  it("respects a custom limit", () => {
    expect(getRecentTransactions(txns, 3)).toHaveLength(3);
  });

  it("returns all if limit exceeds length", () => {
    expect(getRecentTransactions(txns, 100)).toHaveLength(6);
  });

  it("does not mutate the original array", () => {
    const original = [...txns];
    getRecentTransactions(txns);
    expect(txns.map((t) => t.id)).toEqual(original.map((t) => t.id));
  });

  it("returns the most recent transactions first", () => {
    const result = getRecentTransactions(txns, 2);
    expect(result[0].id).toBe("t6"); // 2026-03-20
    expect(result[1].id).toBe("t2"); // 2026-03-15
  });
});

// ── getMonthlyTotals ────────────────────────────────────

describe("getMonthlyTotals", () => {
  const txns: Transaction[] = [
    makeTxn({ id: "t1", amount: 5000, category: "income", date: "2026-03-01" }),
    makeTxn({ id: "t2", amount: 1000, category: "income", date: "2026-03-15" }),
    makeTxn({ id: "t3", amount: -200, category: "groceries", date: "2026-03-05" }),
    makeTxn({ id: "t4", amount: -100, category: "dining", date: "2026-03-10" }),
    makeTxn({ id: "t5", amount: -500, category: "transfer", date: "2026-03-12" }),
    makeTxn({ id: "t6", amount: -50, category: "shopping", date: "2026-03-08", excludeFromBudget: true }),
    makeTxn({ id: "t7", amount: -300, category: "rent", date: "2026-02-01" }),
  ];

  it("calculates income from positive income-category transactions", () => {
    const result = getMonthlyTotals(txns, "2026-03");
    expect(result.income).toBe(6000);
  });

  it("calculates expenses excluding transfers and excludeFromBudget", () => {
    const result = getMonthlyTotals(txns, "2026-03");
    expect(result.expenses).toBe(300);
  });

  it("calculates net as income minus expenses", () => {
    const result = getMonthlyTotals(txns, "2026-03");
    expect(result.net).toBe(6000 - 300);
  });

  it("filters by month correctly", () => {
    const result = getMonthlyTotals(txns, "2026-02");
    expect(result.income).toBe(0);
    expect(result.expenses).toBe(300);
    expect(result.net).toBe(-300);
  });

  it("returns zeros when no transactions match the month", () => {
    const result = getMonthlyTotals(txns, "2025-01");
    expect(result).toEqual({ income: 0, expenses: 0, net: 0 });
  });
});
