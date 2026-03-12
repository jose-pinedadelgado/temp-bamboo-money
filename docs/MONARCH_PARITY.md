# Bamboo Money → Monarch Parity Roadmap

**Goal:** Match or exceed Monarch Money's core features while maintaining Bamboo Money's unique identity (envelope budgeting + "Organic Luxury" design + AI insights).

**Monarch pricing:** $99.99/yr ($8.33/mo). No ads, no data selling.

---

## Feature Comparison: Monarch vs Bamboo Money

### ✅ Already in Bamboo Money (at least scaffolded)
- [ ] Today dashboard with greeting, net worth, insights
- [ ] Envelope budgeting (grouped: Essentials/Lifestyle/Growth)
- [ ] Goals with visual progress tracking
- [ ] AI assistant ("Ask Bamboo") for insights
- [ ] Dark mode support
- [ ] Mobile-first responsive design

### 🔴 Critical Gap — Must Build (Monarch Core)

#### 1. Account Aggregation & Sync
- [ ] **Plaid integration** — Connect bank accounts, credit cards, loans, investments
- [ ] **Multi-institution support** — Support 10,000+ financial institutions
- [ ] **Auto-sync** — Daily automatic transaction import
- [ ] **Manual accounts** — For accounts that can't sync (cash, crypto, property)
- [ ] **Account grouping** — Checking, Savings, Credit Cards, Loans, Investments, Property

#### 2. Transaction Management
- [ ] **Transaction list** — Searchable, filterable, sortable
- [ ] **Auto-categorization** — ML/rules-based category assignment
- [ ] **Manual categorization** — Override auto-categories
- [ ] **Category management** — Create/edit/merge categories
- [ ] **Split transactions** — Split one transaction across multiple categories
- [ ] **Transaction notes** — Add context/notes to transactions
- [ ] **Mark as reviewed** — Track which transactions you've checked
- [ ] **Merchant recognition** — Clean merchant names from raw bank data
- [ ] **Exclude from budget** — Mark transfers, refunds, etc.

#### 3. Net Worth Tracking
- [ ] **Net worth dashboard** — Total assets minus total liabilities
- [ ] **Historical chart** — Net worth over time (line chart)
- [ ] **Asset breakdown** — Pie/bar chart by account type
- [ ] **Investment tracking** — Holdings, performance, allocation
- [ ] **Real estate values** — Manual entry or Zillow-like estimates
- [ ] **Vehicle values** — Manual entry
- [ ] **Crypto tracking** — Manual or API-based

#### 4. Budget System
- [ ] **Monthly budget** — Set spending limits per category
- [ ] **Rollover** — Unspent budget carries to next month
- [ ] **Budget vs actual** — Visual progress bars per category
- [ ] **Income tracking** — Expected vs actual income
- [ ] **Budget templates** — Pre-built starting budgets (50/30/20, etc.)
- [ ] **Flexible periods** — Monthly, bi-weekly, custom pay periods

#### 5. Recurring Transaction Detection
- [ ] **Auto-detect subscriptions** — Identify recurring charges
- [ ] **Subscription dashboard** — Total monthly recurring spend
- [ ] **Bill calendar** — Upcoming bills with due dates
- [ ] **Payment reminders** — Notify before bills are due
- [ ] **Recurring income** — Track paychecks and regular income

#### 6. Reports & Analytics
- [ ] **Spending by category** — Bar/pie charts, monthly/yearly
- [ ] **Income vs expenses** — Cash flow trend over time
- [ ] **Spending trends** — Month-over-month category comparisons
- [ ] **Net worth trend** — Long-term wealth trajectory
- [ ] **Custom date ranges** — Filter all reports by date
- [ ] **Export** — CSV/PDF export of transactions and reports

#### 7. Goals & Savings
- [ ] **Savings goals** — Target amount + deadline
- [ ] **Goal progress** — Visual progress (Bamboo's growth metaphor)
- [ ] **Link accounts to goals** — Tie specific savings accounts to goals
- [ ] **Goal projections** — "At this rate, you'll reach your goal by..."
- [ ] **Multiple goals** — Parallel tracking

### 🟡 Nice-to-Have (Monarch Has, Lower Priority)

#### 8. Collaboration
- [ ] **Household/partner sharing** — Two users, one financial picture
- [ ] **Advisor sharing** — Share read-only view with financial advisor
- [ ] **Shared budgets** — Collaborative budget management

#### 9. Cross-Platform
- [ ] **iOS app** — Native or PWA
- [ ] **Android app** — Native or PWA
- [ ] **Web app** — Desktop browser (already building this)

#### 10. Cash Flow Forecasting
- [ ] **Cash flow calendar** — Day-by-day projected balance
- [ ] **Upcoming transactions** — Bills + expected income
- [ ] **Low balance alerts** — Warning when projected balance drops

### 🟢 Bamboo Money Unique Advantages (Not in Monarch)
- **Envelope budgeting** — Visual, intuitive, grouped by life area
- **AI-powered insights** — "Ask Bamboo" structured insight cards
- **Bamboo growth visualization** — Goals as growing bamboo (emotional design)
- **Calm-first design** — No anxiety language, progress-oriented
- **Organic Luxury aesthetic** — Premium feel, warm natural palette

---

## Implementation Priority (Overnight Loop)

### Phase 1: Core Data Layer (Tonight)
1. Transaction data model + mock data
2. Account data model + mock data  
3. Transaction list page with search/filter
4. Basic categorization system
5. Net worth calculation from accounts

### Phase 2: Budget Engine
6. Monthly budget model (per-category limits)
7. Budget vs actual progress bars
8. Budget page/view with category breakdown
9. Rollover logic

### Phase 3: Recurring & Reports
10. Recurring transaction detection
11. Subscription dashboard
12. Spending reports (by category, over time)
13. Income vs expenses chart

### Phase 4: Polish & Integration Points
14. Account connection UI (Plaid placeholder)
15. Cash flow calendar
16. Export functionality
17. Onboarding flow
18. Full test suite

---

*Each iteration of the overnight loop should pick the next unbuilt item, implement it with tests, verify the build passes, and update this doc with ✅ status.*
