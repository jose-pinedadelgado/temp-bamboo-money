# Bamboo Money — Integration Progress Log

Reference document to review as we progress through the roadmap.

---

## Day 1: API Layer (2026-03-20)

### What was built
Created a Django Ninja REST API layer exposing 24 endpoints across 19 paths.

### All endpoints

```
GET    /api/accounts/
GET    /api/alerts/
POST   /api/alerts/{id}/dismiss/
POST   /api/alerts/dismiss-all/
POST   /api/auth/login/
POST   /api/auth/logout/
GET    /api/auth/me/
POST   /api/auth/register/
GET    /api/budgets/
POST   /api/budgets/
PUT    /api/budgets/{id}/
DELETE /api/budgets/{id}/
POST   /api/chat/
GET    /api/dashboard/
GET    /api/goals/
POST   /api/goals/
GET    /api/goals/{id}/
DELETE /api/goals/{id}/
POST   /api/goals/{id}/contribute/
GET    /api/recurring/
GET    /api/transactions/
POST   /api/transactions/
PUT    /api/transactions/{id}/
DELETE /api/transactions/{id}/
PATCH  /api/transactions/{id}/category/
```

### Test results (verified with demo2 user)
```
Auth:         ✅ Login → session → authenticated requests
Dashboard:    ✅ Net worth $470K, 12 budgets, 5 recent txns
Transactions: ✅ 50 returned with merchant/amount/date
Budgets:      ✅ 12 categories, computed spending fields
Goals:        ✅ 3 goals, progress % (70.2% Emergency Fund)
Accounts:     ✅ 6 accounts
Recurring:    ✅ 0 (none seeded, endpoint works)
Alerts:       ✅ 0 (none active, endpoint works)
Chat:         ✅ Built (needs OpenAI key for live test)
Swagger docs: ✅ http://localhost:8002/api/docs
```

### Files created
```
Django repo (bamboo-money):
  api/                    ← New Django app
  ├── router.py           ← Django Ninja API router
  ├── schemas.py          ← Pydantic request/response schemas  
  ├── middleware.py        ← CSRF exemption for API routes
  ├── endpoints/
  │   ├── dashboard.py
  │   ├── transactions.py
  │   ├── budgets.py
  │   ├── goals.py
  │   ├── accounts.py
  │   ├── recurring.py
  │   ├── alerts.py
  │   ├── chat.py
  │   └── auth.py
  └── tests.py
```

---

## Day 2: Connect React to API (2026-03-20)

### What "connected" means — precisely

The React pages now **attempt** to call Django API endpoints. If the call succeeds (Django running + user logged in), real database data is displayed. If it fails (Django down, no auth, CORS error), the page silently falls back to hardcoded mock data. The user experience is identical either way.

### Current reality

**Nobody is logged in on the React side.** There is no login page in React yet (that's Day 4). So right now:

1. Page loads
2. Hook calls `fetch("http://localhost:8002/api/dashboard/", { credentials: "include" })`
3. Django returns 401 (no session cookie)
4. Hook catches error → returns mock data instead
5. Page renders with mock data
6. User sees exactly what they saw before Day 2

**Nothing is actually loading from Django yet in practice.** Day 2 built the pipes. Day 4 builds the faucet.

### What changed — file by file

**New files (backend plumbing, invisible to user):**

| File | Purpose |
|------|---------|
| `src/lib/api.ts` | Typed fetch wrapper — knows every Django endpoint URL, sends session cookies, parses JSON responses. Exports namespaced functions: `api.dashboard.get()`, `api.transactions.list()`, etc. |
| `src/lib/adapters.ts` | Transforms Django response shapes → React type shapes. Handles differences like: `api.account_type` → `type`, `int id` → `string id`, `Decimal string` → `number`, `category_name` → `TransactionCategory` enum. |
| `src/hooks/useApi.ts` | React hooks: `useDashboard()`, `useBudgets()`, `useGoals()`, `useTransactions()`, `useAccounts()`, `useRecurring()`. Each calls api.ts → adapters.ts → returns data. On failure, returns mock data. Tracks `loading`, `error`, `isDemo` state. |

**Modified files (import swaps only, no visual changes):**

| Page | Old import | New import | What it does NOW | What it'll do after Day 4 |
|------|-----------|-----------|-----------------|--------------------------|
| **Today** (`app/page.tsx`) | `import { envelopes, upcomingBills } from "@/data/mock-data"` | `useDashboard()` + `useBudgets()` + `useTransactions()` | Tries API → 401 → mock data. Added: demo banner, dynamic date, `dash.user.name` in greeting. | Shows logged-in user's real dashboard |
| **Envelopes** (`app/envelopes/page.tsx`) | `import { envelopes } from "@/data/mock-data"` | `useBudgets()` | Tries API → 401 → mock envelopes | Shows user's real budget categories with spending |
| **Goals** (`app/goals/page.tsx`) | `import { goals } from "@/data/mock-data"` | `useGoals()` | Tries API → 401 → mock goals | Shows user's real savings goals with progress |
| **Ask Bamboo** | Not wired yet | — | Still fully mock | Will connect to `POST /api/chat/` |

**Django side:**
- Added `corsheaders` to `INSTALLED_APPS` + middleware → allows React on `:3000` to call Django on `:8002` without browser blocking it

### How does it know which account/user?

Session-based authentication. The flow (once Day 4 is complete):

1. React login page sends `POST /api/auth/login/` with username + password
2. Django validates credentials → returns a session cookie in the response
3. Every subsequent `fetch()` in `api.ts` includes `credentials: "include"` → browser automatically sends that cookie
4. Django reads the cookie → looks up which `User` it belongs to → `request.user`
5. Every query is filtered: `BudgetCategory.objects.filter(user=request.user)`
6. So `GET /api/budgets/` returns **only that user's** budget categories

**Right now we're at step 0** — no React login UI, no cookie, all API calls get 401, all pages show mock data.

### What the user sees: before vs after Day 2

**Identical.** Same pages, same data, same layout. The only differences:
- Under the hood, pages try the API before falling back to mocks
- If you could manually inject a session cookie, you'd see real data appear and the "Demo mode" banner disappear

---

## Capability Coverage Map

### ✅ Active — 24 endpoints built and tested

**Auth:** login, register, logout, me
**Today page:** dashboard summary, accounts, alerts (list/dismiss/dismiss-all), recurring
**Transactions:** list (filtered), create, edit, delete, quick category change
**Envelopes:** list (with computed spending/rollover), create, edit, delete
**Goals:** list, create, detail, delete, contribute
**Ask Bamboo:** chat

### ⚪ Parked — 16 capabilities intentionally not exposed

| Category | Capabilities | Why Parked |
|----------|-------------|-----------|
| **CSV Import** (3) | upload, preview, confirm | Complex wizard UX. React v1 = manual entry. v2. |
| **Export** (2) | transaction Excel, net worth export | Not core value prop. v2+. |
| **Net Worth Mgmt** (4) | history chart, add/edit/delete entries | No dedicated page designed yet. v2. |
| **Recurring Mgmt** (3) | AI detect, confirm, toggle/delete | Should surface automatically, not as settings page. |
| **Categorization Rules** (3) | list, CRUD, apply-all | "Intelligence over labor" — should be invisible. |
| **Cash Flow** (1) | Sankey diagram | Confusing visualization, doesn't fit "calm" philosophy. Maybe v3. |

---

## Roadmap Status

| Day | Focus | Status |
|-----|-------|--------|
| 1 | API Layer — 24 Django Ninja endpoints | ✅ Complete |
| 2 | Connect React — api client, adapters, hooks, CORS, wire 3 pages | ✅ Complete |
| 3 | Missing React Pages — Transactions CRUD, Net Worth, Recurring, CSV | ⬜ Not started |
| 4 | Auth & State — Login/register pages, React Query, protected routes | ⬜ Not started |
| 5 | Polish & Deploy — Chatbot, dashboard real data, tests, Docker, monorepo | ⬜ Not started |
| 6 | Precision Rewrites — Extract 14 components, 75% less code per page, zero visual change | ⬜ Not started |

---

## Architecture Decision: Mock Data Fallback

Mock data files (`src/data/mock-data.ts`, `accounts.ts`, `transactions.ts`) are **kept permanently**, not deleted. They serve as:

1. **Offline/demo mode** — app works without Django running
2. **Development** — frontend devs can work without backend
3. **Type reference** — the mock shapes define what React expects
4. **Testing** — predictable data for component tests

The hooks in `useApi.ts` implement the fallback: try API → catch → return mock → set `isDemo = true`.
