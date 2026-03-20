# Bamboo Money — Integration Roadmap

**Goal:** Merge React frontend (`temp-bamboo-money`) + Django backend (`bamboo-money`) into one full-stack app.

**Target Architecture:** Next.js React frontend → Django REST API backend

**Timeline:** ~1 week (5 working sessions)

---

## Current State

### React Version (temp-bamboo-money)
- **Has:** Design system, responsive nav, 4 pages (Today/Envelopes/Goals/Ask), TypeScript types, mock data, Tailwind CSS, dark mode, Fraunces/Jakarta fonts
- **Missing:** Real backend, auth, database, CSV import, chatbot, recurring detection, net worth tracking, cash flow

### Django Version (bamboo-money)
- **Has:** 13 models, full CRUD for everything, CSV import/export, budget rollovers, recurring detection, LLM chatbot, net worth tracking, cash flow/Sankey, categorization rules, alerts, auth (login/register)
- **Missing:** Modern UI (server-rendered Django templates), responsive design, polished UX

### What We're Building
```
┌─────────────────────────────┐     ┌──────────────────────────────┐
│  React Frontend (Next.js)   │────▶│  Django Backend (REST API)   │
│  - Design system ✓          │ API │  - 13 models ✓               │
│  - Responsive nav ✓         │     │  - Business logic ✓          │
│  - TypeScript types ✓       │     │  - CSV import/export ✓       │
│  - Tailwind/dark mode ✓     │     │  - LLM chatbot ✓             │
│  - 4 polished pages ✓       │     │  - Recurring detection ✓     │
└─────────────────────────────┘     └──────────────────────────────┘
```

---

## Phase 1: API Layer (Day 1)
**Convert Django from template-serving to REST API**

### 1a. Install Django Ninja (already a dependency)
Django Ninja is already in the Django project. Create API schemas that mirror the React TypeScript types.

### 1b. Create API endpoints
Map existing Django views to REST endpoints:

| React Page | Django API Endpoints Needed |
|------------|---------------------------|
| **Today** (dashboard) | `GET /api/dashboard/summary` — net worth, budget overview, recent transactions, alerts |
| **Transactions** | `GET/POST /api/transactions/`, `PUT/DELETE /api/transactions/{id}/`, `POST /api/transactions/import/` |
| **Envelopes** (budgets) | `GET/POST /api/budgets/`, `PUT/DELETE /api/budgets/{id}/`, `GET /api/budgets/summary/` |
| **Goals** | `GET/POST /api/goals/`, `PUT/DELETE /api/goals/{id}/`, `POST /api/goals/{id}/contribute/` |
| **Net Worth** | `GET/POST /api/networth/`, `GET /api/networth/history/` |
| **Ask Bamboo** | `POST /api/chat/` |
| **Auth** | `POST /api/auth/login/`, `POST /api/auth/register/`, `POST /api/auth/logout/` |
| **Recurring** | `GET /api/recurring/`, `POST /api/recurring/detect/`, `PUT /api/recurring/{id}/toggle/` |
| **Cash Flow** | `GET /api/cashflow/data/` |

### 1c. API response schemas
Align Django Ninja schemas with existing React TypeScript types:

```
Django Model          →  API Schema         →  React Type
─────────────────────────────────────────────────────────
Account               →  AccountSchema       →  Account
Transaction           →  TransactionSchema   →  Transaction
BudgetCategory        →  BudgetSchema        →  Envelope
SavingsGoal           →  GoalSchema          →  Goal
NetWorthEntry         →  NetWorthSchema      →  NetWorthEntry
RecurringTransaction  →  RecurringSchema     →  RecurringTransaction
```

### Deliverable
- `api/` Django app with all endpoints
- Swagger docs at `/api/docs`
- All endpoints return JSON matching React types

---

## Phase 2: Connect React to API (Day 2)
**Replace mock data with real API calls**

### 2a. API client
Create `src/lib/api.ts` — typed fetch wrapper pointing to Django backend.

```typescript
// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchDashboard(): Promise<DashboardSummary> { ... }
export async function fetchTransactions(params?: TransactionFilters): Promise<Transaction[]> { ... }
export async function fetchBudgets(): Promise<Envelope[]> { ... }
export async function fetchGoals(): Promise<Goal[]> { ... }
export async function sendChatMessage(message: string): Promise<ChatResponse> { ... }
```

### 2b. Replace mock data files
- `src/data/accounts.ts` → API call
- `src/data/transactions.ts` → API call
- Keep mock data as fallback for offline/demo mode

### 2c. CORS setup
Add `django-cors-headers` to Django, allow Next.js dev server origin.

### Deliverable
- React app fetches real data from Django
- Mock data still works as fallback
- CORS configured

---

## Phase 3: Missing React Pages (Day 3)
**Build pages that exist in Django but not yet in React**

### 3a. Transactions page (full CRUD)
- Transaction list with filters (date range, category, account, search)
- Add/edit transaction modal
- Category quick-edit
- CSV import flow (upload → preview → confirm)
- Export to Excel

### 3b. Net Worth page
- Account balances grouped by type (assets vs liabilities)
- Historical chart (line graph over months)
- Add/edit net worth entries

### 3c. Recurring transactions
- List of detected recurring transactions
- Confirm/dismiss/toggle recurring status
- "Detect" button triggers AI analysis

### Deliverable
- All Django features accessible from React UI
- Consistent design system across all pages

---

## Phase 4: Auth & State Management (Day 4)
**Wire up authentication and app-wide state**

### 4a. Auth flow
- Login/register pages (styled with Bamboo design system)
- Session or JWT token management
- Protected routes (redirect to login if unauthenticated)
- User context provider

### 4b. State management
- React Query (TanStack Query) for server state caching
- Optimistic updates for transaction edits
- Real-time budget recalculation on transaction changes

### 4c. Categorization rules
- Rules management page
- "Create rule from transaction" action
- Auto-apply rules on import

### Deliverable
- Full auth flow working
- Cached data with smart invalidation
- Rules engine accessible from UI

---

## Phase 5: Polish & Deploy (Day 5)
**Final integration, testing, deployment setup**

### 5a. Ask Bamboo (chatbot)
- Connect to Django LLM chatbot endpoint
- Structured insight cards (NOT chat bubbles — per design system)
- Context-aware responses using financial data

### 5b. Dashboard (Today page)
- Wire real data: net worth summary, budget health, upcoming bills, recent activity
- Alerts from Django (budget overspend, goal milestones)
- Insight card from AI

### 5c. Testing
- API integration tests (Django side)
- Component tests (React side)
- E2E smoke test (login → add transaction → see in budget → check goal progress)

### 5d. Deployment config
- Docker Compose (Django + Next.js + Postgres)
- Or: Next.js on Vercel + Django on Railway/Render
- Environment variable management

### 5e. Repo consolidation
- Move React code into `frontend/` subdirectory of `bamboo-money` repo
- Or: monorepo with `apps/web` + `apps/api`
- Archive `temp-bamboo-money` repo
- Update README with full setup instructions

### Deliverable
- Single repo, one `docker-compose up` to run everything
- All features working end-to-end

---

## Feature Mapping: Django → React

| Feature | Django Status | React Status | Phase |
|---------|-------------|-------------|-------|
| Auth (login/register/logout) | ✅ Working | ❌ Missing | 4 |
| Dashboard summary | ✅ Working | 🟡 UI only (mock) | 5 |
| Transactions CRUD | ✅ Working | 🟡 List only (mock) | 3 |
| CSV import/export | ✅ Working | ❌ Missing | 3 |
| Budget categories | ✅ Working (with rollover) | 🟡 Envelopes UI (mock) | 2 |
| Savings goals | ✅ Working (with contributions) | 🟡 Goals UI (mock) | 2 |
| Net worth tracking | ✅ Working (with history) | ❌ Missing | 3 |
| Recurring detection | ✅ Working (AI-powered) | ❌ Missing | 3 |
| Categorization rules | ✅ Working | ❌ Missing | 4 |
| Budget alerts | ✅ Working | ❌ Missing | 5 |
| Cash flow / Sankey | ✅ Working | ❌ Missing | Future |
| LLM chatbot | ✅ Working | 🟡 Ask page (no backend) | 5 |
| Dark mode | ❌ Basic | ✅ Full Tailwind | — |
| Responsive design | ❌ Basic | ✅ Mobile/tablet/desktop | — |
| Design system | ❌ None | ✅ Full (Bamboo aesthetic) | — |
| i18n (en/es) | ✅ Working | ❌ Missing | Future |

---

## Decision: Monorepo Structure

```
bamboo-money/
├── frontend/              ← React (from temp-bamboo-money)
│   ├── src/
│   ├── package.json
│   └── next.config.ts
├── backend/               ← Django (current bamboo-money)
│   ├── interface/
│   ├── bamboo_budget/
│   ├── api/               ← NEW: REST API app
│   ├── manage.py
│   └── requirements.txt
├── docker-compose.yml
├── README.md
└── docs/
    ├── INTEGRATION_ROADMAP.md
    └── Bamboo_Money_Strategy.md
```

---

## Quick Start (After Integration)

```bash
# Clone
git clone https://github.com/jose-pinedadelgado/bamboo-money.git
cd bamboo-money

# Backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo_data
python manage.py runserver

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 (React) → talks to http://localhost:8000 (Django API)
