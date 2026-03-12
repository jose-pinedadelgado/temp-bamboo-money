# Bamboo Money — Build Log

## Iteration 1 — 2026-03-12 — Core Data Layer (Phase 1)

**Goal**: Build the data foundation: types, rich mock data, transaction list page, net worth component, accounts model, and wire the Today dashboard to real aggregated data.

**Status**: Complete. Build passes, lint clean.

### What was built

1. **TypeScript types** (`src/types/`)
   - `Transaction` — id, date, merchant, amount, category, accountId, status, note, isRecurring, excludeFromBudget
   - `Account` — id, name, institution, type, balance, lastSynced, mask, isManual
   - `TransactionCategory` — 16 categories (groceries through other)
   - `AccountType` — 8 types (checking, savings, credit-card, loan, investment, property, vehicle, cash)

2. **Category definitions** (`src/data/categories.ts`)
   - 16 categories with labels, Lucide icon names, and color classes
   - `getCategoryMeta()` lookup helper

3. **Rich mock data**
   - 55 transactions across March and late February 2026 (`src/data/transactions.ts`)
   - 10 accounts across 6 types — Chase checking/savings, Ally savings, Amex Gold, Chase Freedom, Fidelity 401k, Vanguard Roth IRA, SoFi student loan, Honda Civic, cash (`src/data/accounts.ts`)
   - Mix of expenses, income, transfers, recurring charges, pending/posted/reviewed statuses

4. **Aggregation helpers** (`src/data/helpers.ts`)
   - `calculateNetWorth()` — computes total, assets, liabilities from accounts
   - `groupAccounts()` — groups accounts by type with subtotals
   - `getSpendingByCategory()` — aggregates spending with percentages, filterable by month
   - `getRecentTransactions()` — sorted by date, configurable limit
   - `getMonthlyTotals()` — income vs expenses for a given month

5. **Transactions page** (`/app/transactions`)
   - Searchable list (merchant, note, category)
   - Category filter chips (all 16 categories)
   - Status filter (pending, posted, reviewed)
   - Sort by date, amount, or merchant (asc/desc toggle)
   - Grouped by date with relative labels (Today, Yesterday, etc.)
   - Category color dots, status icons, recurring badges
   - Back navigation to Today view

6. **NetWorthSummary component** (`src/components/app/NetWorthSummary.tsx`)
   - Computed from real account data (not hardcoded)
   - Sparkline chart (16-point history)
   - Assets vs liabilities breakdown
   - Monthly cash flow summary (income vs expenses)

7. **AccountsList component** (`src/components/app/AccountsList.tsx`)
   - Accounts grouped by type (checking, savings, investments, vehicles, cash, credit cards, loans)
   - Type icons, institution names, account masks
   - Group subtotals with liability coloring

8. **Today dashboard wired to real data**
   - Net worth computed from accounts (was hardcoded `47230`)
   - Recent transactions from `transactions.ts` (was separate `recentTransactions` array)
   - New "Spending This Month" section with category breakdown bars
   - Accounts section at bottom of dashboard
   - "See all transactions" now links to `/app/transactions`

### Files created
- `src/types/transaction.ts`
- `src/types/account.ts`
- `src/types/index.ts`
- `src/data/categories.ts`
- `src/data/accounts.ts`
- `src/data/transactions.ts`
- `src/data/helpers.ts`
- `src/app/app/transactions/page.tsx`
- `src/components/app/NetWorthSummary.tsx`
- `src/components/app/AccountsList.tsx`

### Files modified
- `src/app/app/page.tsx` — rewired to use real data layer
- `messages/en.json` — added `spending.label` translation
- `messages/es.json` — added `spending.label` translation

### Verification
- `npm run build` — passes (all 7 routes compile static)
- `npm run lint` — clean (no errors)

### Decisions
- Transactions page is a sub-route (`/app/transactions`), not a fifth nav tab — respects "four views only" architecture
- Account balances: positive = asset, negative = liability — matches accounting convention
- Categories defined separately from transactions to enable future category management features
- Aggregation helpers are pure functions (testable, API-swappable)

---
