// ─── Mock Account Data ──────────────────────────────────
// 10 accounts across 6 types — tells a realistic financial story.

import type { Account } from "@/types";

export const accounts: Account[] = [
  // ── Checking ────────────────────
  {
    id: "chase-checking",
    name: "Chase Total Checking",
    institution: "Chase",
    type: "checking",
    balance: 4285.32,
    lastSynced: "2026-03-12",
    mask: "4821",
  },
  // ── Savings ─────────────────────
  {
    id: "ally-savings",
    name: "Ally High-Yield Savings",
    institution: "Ally Bank",
    type: "savings",
    balance: 8420.0,
    lastSynced: "2026-03-12",
    mask: "7733",
  },
  {
    id: "chase-savings",
    name: "Chase Savings",
    institution: "Chase",
    type: "savings",
    balance: 3400.0,
    lastSynced: "2026-03-12",
    mask: "4822",
  },
  // ── Credit Cards ────────────────
  {
    id: "amex-gold",
    name: "Amex Gold Card",
    institution: "American Express",
    type: "credit-card",
    balance: -2847.56,
    lastSynced: "2026-03-12",
    mask: "1004",
  },
  {
    id: "chase-freedom",
    name: "Chase Freedom Unlimited",
    institution: "Chase",
    type: "credit-card",
    balance: -1352.44,
    lastSynced: "2026-03-12",
    mask: "9182",
  },
  // ── Investments ─────────────────
  {
    id: "fidelity-401k",
    name: "Fidelity 401(k)",
    institution: "Fidelity",
    type: "investment",
    balance: 28750.0,
    lastSynced: "2026-03-11",
    mask: "6601",
  },
  {
    id: "vanguard-roth",
    name: "Vanguard Roth IRA",
    institution: "Vanguard",
    type: "investment",
    balance: 12340.0,
    lastSynced: "2026-03-11",
    mask: "3350",
  },
  // ── Loans ───────────────────────
  {
    id: "sofi-student",
    name: "SoFi Student Loan",
    institution: "SoFi",
    type: "loan",
    balance: -8200.0,
    lastSynced: "2026-03-12",
    mask: "5501",
  },
  // ── Property ────────────────────
  {
    id: "car-value",
    name: "2021 Honda Civic",
    institution: "Manual",
    type: "vehicle",
    balance: 18500.0,
    lastSynced: "2026-02-01",
    isManual: true,
  },
  // ── Cash ────────────────────────
  {
    id: "cash-wallet",
    name: "Cash on Hand",
    institution: "Manual",
    type: "cash",
    balance: 135.0,
    lastSynced: "2026-03-10",
    isManual: true,
  },
];
