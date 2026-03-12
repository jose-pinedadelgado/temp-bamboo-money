// ─── Mock Transaction Data ──────────────────────────────
// 55 transactions across March 2026 — a realistic month of spending.
// Mix of expenses, income, transfers, and recurring charges.

import type { Transaction } from "@/types";

export const transactions: Transaction[] = [
  // ── March 12 (today) ────────────
  { id: "t01", date: "2026-03-12", merchant: "Starbucks", amount: -5.75, category: "dining", accountId: "amex-gold", status: "pending" },
  { id: "t02", date: "2026-03-12", merchant: "Uber", amount: -14.30, category: "transportation", accountId: "amex-gold", status: "pending" },

  // ── March 11 ────────────────────
  { id: "t03", date: "2026-03-11", merchant: "Whole Foods", amount: -67.42, category: "groceries", accountId: "amex-gold", status: "posted" },
  { id: "t04", date: "2026-03-11", merchant: "Netflix", amount: -17.99, category: "subscriptions", accountId: "chase-freedom", status: "posted", isRecurring: true },
  { id: "t05", date: "2026-03-11", merchant: "CVS Pharmacy", amount: -24.50, category: "health", accountId: "chase-freedom", status: "posted" },

  // ── March 10 ────────────────────
  { id: "t06", date: "2026-03-10", merchant: "Trader Joe's", amount: -52.18, category: "groceries", accountId: "amex-gold", status: "reviewed" },
  { id: "t07", date: "2026-03-10", merchant: "Shell Gas Station", amount: -48.50, category: "transportation", accountId: "chase-freedom", status: "reviewed" },
  { id: "t08", date: "2026-03-10", merchant: "Target", amount: -34.99, category: "shopping", accountId: "amex-gold", status: "reviewed" },

  // ── March 9 ─────────────────────
  { id: "t09", date: "2026-03-09", merchant: "Trader Joe's", amount: -34.20, category: "groceries", accountId: "amex-gold", status: "reviewed" },
  { id: "t10", date: "2026-03-09", merchant: "Shell Gas Station", amount: -48.50, category: "transportation", accountId: "chase-freedom", status: "reviewed" },
  { id: "t11", date: "2026-03-09", merchant: "Amazon", amount: -23.99, category: "shopping", accountId: "amex-gold", status: "reviewed" },
  { id: "t12", date: "2026-03-09", merchant: "Venmo — Lisa", amount: 45.00, category: "transfer", accountId: "chase-checking", status: "reviewed", excludeFromBudget: true },

  // ── March 8 ─────────────────────
  { id: "t13", date: "2026-03-08", merchant: "Chipotle", amount: -12.85, category: "dining", accountId: "amex-gold", status: "reviewed" },
  { id: "t14", date: "2026-03-08", merchant: "Spotify", amount: -9.99, category: "subscriptions", accountId: "chase-freedom", status: "reviewed", isRecurring: true },
  { id: "t15", date: "2026-03-08", merchant: "AMC Theaters", amount: -18.50, category: "entertainment", accountId: "amex-gold", status: "reviewed" },
  { id: "t16", date: "2026-03-08", merchant: "Kroger", amount: -89.34, category: "groceries", accountId: "chase-freedom", status: "reviewed" },

  // ── March 7 ─────────────────────
  { id: "t17", date: "2026-03-07", merchant: "Chipotle", amount: -12.85, category: "dining", accountId: "amex-gold", status: "reviewed" },
  { id: "t18", date: "2026-03-07", merchant: "Planet Fitness", amount: -45.00, category: "health", accountId: "chase-freedom", status: "reviewed", isRecurring: true },
  { id: "t19", date: "2026-03-07", merchant: "TJ Maxx", amount: -42.30, category: "shopping", accountId: "amex-gold", status: "reviewed" },

  // ── March 6 ─────────────────────
  { id: "t20", date: "2026-03-06", merchant: "Costco", amount: -156.78, category: "groceries", accountId: "amex-gold", status: "reviewed" },
  { id: "t21", date: "2026-03-06", merchant: "Uber Eats", amount: -28.40, category: "dining", accountId: "amex-gold", status: "reviewed" },
  { id: "t22", date: "2026-03-06", merchant: "Electric Co.", amount: -94.20, category: "utilities", accountId: "chase-checking", status: "reviewed", isRecurring: true },
  { id: "t23", date: "2026-03-06", merchant: "Water & Sewer", amount: -42.80, category: "utilities", accountId: "chase-checking", status: "reviewed", isRecurring: true },

  // ── March 5 ─────────────────────
  { id: "t24", date: "2026-03-05", merchant: "Panera Bread", amount: -14.25, category: "dining", accountId: "amex-gold", status: "reviewed" },
  { id: "t25", date: "2026-03-05", merchant: "Amazon", amount: -89.99, category: "shopping", accountId: "amex-gold", status: "reviewed", note: "Wireless headphones" },
  { id: "t26", date: "2026-03-05", merchant: "Headspace", amount: -12.99, category: "subscriptions", accountId: "chase-freedom", status: "reviewed", isRecurring: true },

  // ── March 4 ─────────────────────
  { id: "t27", date: "2026-03-04", merchant: "Walgreens", amount: -18.75, category: "health", accountId: "chase-freedom", status: "reviewed" },
  { id: "t28", date: "2026-03-04", merchant: "Exxon", amount: -42.30, category: "transportation", accountId: "chase-freedom", status: "reviewed" },
  { id: "t29", date: "2026-03-04", merchant: "Thai Palace", amount: -36.50, category: "dining", accountId: "amex-gold", status: "reviewed" },

  // ── March 3 ─────────────────────
  { id: "t30", date: "2026-03-03", merchant: "H-E-B", amount: -78.45, category: "groceries", accountId: "amex-gold", status: "reviewed" },
  { id: "t31", date: "2026-03-03", merchant: "Internet — AT&T", amount: -55.00, category: "utilities", accountId: "chase-checking", status: "reviewed", isRecurring: true },
  { id: "t32", date: "2026-03-03", merchant: "Hulu", amount: -17.99, category: "subscriptions", accountId: "chase-freedom", status: "reviewed", isRecurring: true },

  // ── March 2 ─────────────────────
  { id: "t33", date: "2026-03-02", merchant: "Sephora", amount: -52.00, category: "personal-care", accountId: "amex-gold", status: "reviewed" },
  { id: "t34", date: "2026-03-02", merchant: "Lyft", amount: -22.15, category: "transportation", accountId: "amex-gold", status: "reviewed" },
  { id: "t35", date: "2026-03-02", merchant: "Olive Garden", amount: -48.70, category: "dining", accountId: "amex-gold", status: "reviewed" },

  // ── March 1 ─────────────────────
  { id: "t36", date: "2026-03-01", merchant: "Employer — Paycheck", amount: 3850.00, category: "income", accountId: "chase-checking", status: "reviewed", isRecurring: true },
  { id: "t37", date: "2026-03-01", merchant: "Landlord — Rent", amount: -1800.00, category: "rent", accountId: "chase-checking", status: "reviewed", isRecurring: true },
  { id: "t38", date: "2026-03-01", merchant: "Ally Savings Transfer", amount: -400.00, category: "transfer", accountId: "chase-checking", status: "reviewed", excludeFromBudget: true },
  { id: "t39", date: "2026-03-01", merchant: "SoFi Student Loan", amount: -400.00, category: "other", accountId: "chase-checking", status: "reviewed", isRecurring: true, note: "Monthly student loan payment" },
  { id: "t40", date: "2026-03-01", merchant: "State Farm", amount: -89.00, category: "transportation", accountId: "chase-checking", status: "reviewed", isRecurring: true, note: "Car insurance" },

  // ── February spillover (late Feb) ──
  { id: "t41", date: "2026-02-28", merchant: "Whole Foods", amount: -54.30, category: "groceries", accountId: "amex-gold", status: "reviewed" },
  { id: "t42", date: "2026-02-28", merchant: "Coursera", amount: -49.00, category: "education", accountId: "chase-freedom", status: "reviewed", isRecurring: true },
  { id: "t43", date: "2026-02-27", merchant: "Birthday Gift — Mom", amount: -65.00, category: "gifts", accountId: "amex-gold", status: "reviewed", note: "Birthday gift" },
  { id: "t44", date: "2026-02-27", merchant: "Southwest Airlines", amount: -187.00, category: "travel", accountId: "amex-gold", status: "reviewed", note: "Flights for April trip" },
  { id: "t45", date: "2026-02-26", merchant: "Costco", amount: -124.56, category: "groceries", accountId: "amex-gold", status: "reviewed" },
  { id: "t46", date: "2026-02-25", merchant: "Dental Associates", amount: -150.00, category: "health", accountId: "chase-freedom", status: "reviewed", note: "Copay — dental cleaning" },
  { id: "t47", date: "2026-02-24", merchant: "Home Depot", amount: -67.89, category: "shopping", accountId: "chase-freedom", status: "reviewed" },
  { id: "t48", date: "2026-02-23", merchant: "Chick-fil-A", amount: -9.45, category: "dining", accountId: "amex-gold", status: "reviewed" },
  { id: "t49", date: "2026-02-22", merchant: "Uber", amount: -18.60, category: "transportation", accountId: "amex-gold", status: "reviewed" },
  { id: "t50", date: "2026-02-21", merchant: "iCloud Storage", amount: -2.99, category: "subscriptions", accountId: "chase-freedom", status: "reviewed", isRecurring: true },
  { id: "t51", date: "2026-02-20", merchant: "Kroger", amount: -62.10, category: "groceries", accountId: "chase-freedom", status: "reviewed" },
  { id: "t52", date: "2026-02-19", merchant: "Side Gig — Freelance", amount: 450.00, category: "income", accountId: "chase-checking", status: "reviewed" },
  { id: "t53", date: "2026-02-18", merchant: "Barber Shop", amount: -28.00, category: "personal-care", accountId: "chase-checking", status: "reviewed" },
  { id: "t54", date: "2026-02-15", merchant: "Employer — Paycheck", amount: 3850.00, category: "income", accountId: "chase-checking", status: "reviewed", isRecurring: true },
  { id: "t55", date: "2026-02-15", merchant: "Landlord — Rent", amount: -1800.00, category: "rent", accountId: "chase-checking", status: "reviewed", isRecurring: true },
];
