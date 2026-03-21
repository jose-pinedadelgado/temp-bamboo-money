# Day 2: Connect React to API

## Analysis — What needs to change

### Current state
React pages import directly from `src/data/` mock files:
- `mock-data.ts` → envelopes, goals, upcomingBills, recentTransactions, user, bambooInsight, askBambooInsights, monthlySummary
- `accounts.ts` → accounts array
- `transactions.ts` → transactions array  
- `helpers.ts` → calculateNetWorth, groupAccounts, getSpendingByCategory, getRecentTransactions, getMonthlyTotals
- `categories.ts` → category metadata (icons, colors, labels)

### Target state
React pages call `src/lib/api.ts` which fetches from Django REST API. Mock data stays as fallback/demo mode.

### Type mapping — React types vs API response shapes

| React Type | Mock Shape | API Response | Gap |
|-----------|-----------|-------------|-----|
| `Account` | `{id: string, name, institution, type: AccountType, balance, lastSynced, mask?, isManual?}` | `{id: int, name, account_type, institution, balance}` | API missing: lastSynced, mask, isManual. id is int not string. account_type vs type. |
| `Transaction` | `{id: string, date, merchant, amount, category: TransactionCategory, accountId, status, note?, isRecurring?, excludeFromBudget?}` | `{id: int, date, description, merchant, amount, is_income, category_id, category_name, account_id, account_name, notes}` | Different category model (name vs enum). No status/isRecurring/excludeFromBudget in API. |
| `Envelope` (mock) | `{id, name, icon, budgeted, spent, group, paceNote?, paidDate?}` | `BudgetOut: {id, name, icon, color, monthly_limit, spent_this_month, remaining, percent_used, rollover_amount, effective_limit}` | API has richer data. Missing: group classification, paceNote. |
| `Goal` (mock) | `{id, name, target, current, monthlyContribution, projectedDate, insight, type}` | `GoalOut: {id, name, target_amount, current_amount, deadline, icon, progress_percent, contributions[]}` | Different field names. API missing: monthlyContribution, projectedDate, insight. |

### Strategy
1. Create **adapter functions** that transform API responses → React types
2. Keep mock types as the canonical React types
3. API client returns mock-compatible shapes
4. Pages don't change — just swap import source

---

## Execution Plan

### Step 1: API client (`src/lib/api.ts`) — 30 min

Create typed fetch wrapper with session auth.

```typescript
// Handles: base URL, credentials, JSON parsing, error handling
// All functions return data shaped like our mock types
```

**Test:** 
- Unit test: mock fetch, verify correct URL + headers
- Manual: `await api.dashboard()` in browser console returns data

### Step 2: Type adapters (`src/lib/adapters.ts`) — 30 min

Transform API responses to match React types exactly.

| Adapter | API Shape → React Shape |
|---------|----------------------|
| `adaptAccount(api) → Account` | `id: String(api.id)`, `type: api.account_type`, add defaults for missing fields |
| `adaptTransaction(api) → Transaction` | `id: String(api.id)`, infer `category` from `category_name`, map `is_income` to positive amount |
| `adaptBudget(api) → Envelope` | `budgeted: api.monthly_limit`, `spent: api.spent_this_month`, infer `group` from name/icon |
| `adaptGoal(api) → Goal` | `target: api.target_amount`, `current: api.current_amount`, compute `monthlyContribution` from contributions |
| `adaptDashboard(api) → DashboardData` | Combine net_worth + budget_summary + adapted transactions + bills |

**Test:** Unit test each adapter with sample API JSON → verify output matches mock type shape.

### Step 3: Data hooks (`src/hooks/useApi.ts`) — 30 min

React hooks that fetch + cache + handle loading/error states.

```typescript
export function useDashboard() → { data, loading, error }
export function useTransactions(filters?) → { data, loading, error }  
export function useBudgets() → { data, loading, error }
export function useGoals() → { data, loading, error }
```

Each hook:
1. Tries API fetch
2. On success: adapts response, returns real data
3. On failure: falls back to mock data, logs warning
4. Tracks loading/error state

**Test:** 
- Hook returns mock data when API unreachable (offline mode)
- Hook returns real data when API responds

### Step 4: Wire Today page — 30 min

Replace mock imports in `src/app/app/page.tsx`:

| Current | New |
|---------|-----|
| `import { envelopes, upcomingBills } from "@/data/mock-data"` | `const { data } = useDashboard()` |
| `import { transactions } from "@/data/transactions"` | `data.recent_transactions` (already adapted) |
| `import { accounts } from "@/data/accounts"` | `const { data: accounts } = useAccounts()` |
| Hardcoded `"Jose"` greeting | `data.user.username` |
| `getRecentTransactions(transactions, 5)` | Already computed by API dashboard endpoint |
| `getSpendingByCategory(transactions, "2026-03")` | Compute client-side from transactions, or add API endpoint later |

**Test:**
- Start Django server on :8002
- Start Next.js dev on :3000
- Today page loads with real data from API
- If Django is down, page still loads with mock data

### Step 5: Wire Envelopes page — 20 min

Replace `envelopes` mock import with `useBudgets()` hook.

**Test:** Envelopes page shows real budget categories with computed spending.

### Step 6: Wire Goals page — 20 min

Replace `goals` mock import with `useGoals()` hook.

**Test:** Goals page shows real goals with progress bars matching API data.

### Step 7: Wire Ask Bamboo page — 20 min

Add `sendMessage(text)` API call. Keep suggestion chips from mock data.

**Test:** Type a question → get LLM response (or graceful fallback if no OpenAI key).

### Step 8: CORS setup — 10 min

Add `django-cors-headers` to Django, allow `http://localhost:3000`.

**Test:** No CORS errors in browser console.

### Step 9: Add loading/error states to pages — 20 min

When data is loading: show skeleton cards (matches design system).
When API fails: show mock data + subtle "demo mode" indicator.

**Test:** 
- Kill Django → React shows "demo mode" with mock data
- Start Django → React shows real data, no indicator

---

## Files Created/Modified

```
NEW:
  src/lib/api.ts           ← API client (fetch wrapper)
  src/lib/adapters.ts      ← API → React type transformers
  src/hooks/useApi.ts      ← Data fetching hooks with fallback

MODIFIED:
  src/app/app/page.tsx              ← Today: use hooks instead of mock imports
  src/app/app/envelopes/page.tsx    ← Envelopes: use hooks
  src/app/app/goals/page.tsx        ← Goals: use hooks
  src/app/app/ask/page.tsx          ← Ask: add real chat API call

KEPT (not deleted):
  src/data/mock-data.ts     ← Fallback data for demo/offline mode
  src/data/accounts.ts      ← Fallback
  src/data/transactions.ts  ← Fallback
  src/data/helpers.ts       ← Still used for client-side computations
```

Django side:
```
MODIFIED:
  requirements.txt          ← Add django-cors-headers
  bamboo_site/settings.py   ← CORS_ALLOWED_ORIGINS
```

---

## Verification Checklist

- [ ] `npm run build` passes (no type errors)
- [ ] `npm run test` passes
- [ ] Today page: real net worth, real transactions, real envelopes
- [ ] Envelopes page: real budget categories with spending
- [ ] Goals page: real goals with progress
- [ ] Ask Bamboo: sends message to API (or graceful fallback)
- [ ] Kill Django → all pages still work (mock data fallback)
- [ ] No CORS errors in browser console
- [ ] Swagger docs still accessible at :8002/api/docs
