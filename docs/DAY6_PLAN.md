# Day 6: Page Rewrites — Precision Surgery

## Philosophy

Every page currently works. The goal is to make them **simpler, faster, and easier to maintain** without any visible change to the user. Like refactoring a house's plumbing without touching the walls.

**Rules:**
1. One component at a time — never rewrite two things simultaneously
2. Visual diff after every change — screenshot before/after must be identical
3. Build + test after every atomic change
4. If a change touches more than ~30 lines, break it smaller

---

## Audit: Current Page Complexity

### Today Page (`app/page.tsx`)
**Lines:** ~210
**Data sources:** 3 hooks (`useDashboard`, `useBudgets`, `useTransactions`) + `getSpendingByCategory` helper
**Sections:** 8 (greeting, net worth, insight, spending-by-category, envelope summary, upcoming bills, recent transactions, accounts)
**Problems:**
- 210 lines in one file — too much for one component
- Inline computed values (activeEnvelopes filter, spendingByCategory)
- Each section is ~25-30 lines of JSX that could be its own component
- The page is a layout orchestrator pretending to be a component

**Target:** ~40 lines — just data hooks + section components

### Envelopes Page (`app/envelopes/page.tsx`)
**Lines:** ~180
**Problems:**
- Icon mapping object (iconMap) is 10+ lines of boilerplate
- Group rendering logic is repeated 3x (essentials/lifestyle/growth)
- Inline envelope card JSX is ~30 lines per card

**Target:** ~50 lines — EnvelopeGroup + EnvelopeCard components

### Goals Page (`app/goals/page.tsx`)
**Lines:** ~150
**Problems:**
- Bamboo growth visualization logic is complex and inline
- Goal card JSX is ~40 lines
- goalKeyMap translation lookup is fragile

**Target:** ~40 lines — GoalCard + BambooProgress components

### Ask Bamboo Page (`app/ask/page.tsx`)
**Lines:** ~TBD (check current state)
**Target:** Clean separation of chat state, message display, input

---

## Execution: Piece by Piece

### Phase A: Extract Today Page Sections (6 changes)

Each change = extract one section into its own component. Build + screenshot between each.

| # | Extract | From | To | Lines saved |
|---|---------|------|-----|-------------|
| A1 | Greeting section | page.tsx:38-50 | `components/today/Greeting.tsx` | ~12 |
| A2 | Spending by category | page.tsx:60-95 | `components/today/SpendingByCategory.tsx` | ~35 |
| A3 | Envelope summary strip | page.tsx:98-145 | `components/today/EnvelopeSummary.tsx` | ~47 |
| A4 | Upcoming bills list | page.tsx:148-175 | `components/today/UpcomingBills.tsx` | ~27 |
| A5 | Recent transactions list | page.tsx:178-210 | `components/today/RecentTransactions.tsx` | ~32 |
| A6 | Final page assembly | page.tsx | Clean orchestrator | ~153 saved |

**After Phase A, page.tsx should look like:**
```tsx
export default function TodayView() {
  const { data: dash, isDemo } = useDashboard();
  const { data: envelopes } = useBudgets();
  const { data: transactions } = useTransactions();

  return (
    <div className="space-y-[var(--section-gap)] animate-view-enter">
      {isDemo && <DemoBanner />}
      <Greeting name={dash.user.name} />
      <NetWorthSummary />
      <InsightCard insight={bambooInsight} />
      <SpendingByCategory transactions={transactions} />
      <EnvelopeSummary envelopes={envelopes} />
      <UpcomingBills bills={dash.upcomingBills} />
      <RecentTransactions transactions={dash.recentTransactions} />
      <AccountsList />
    </div>
  );
}
```

### Phase B: Extract Envelopes Page Components (3 changes)

| # | Extract | To | Notes |
|---|---------|-----|-------|
| B1 | Icon resolver | `lib/icons.ts` | Single source of truth for icon name → component mapping |
| B2 | Envelope card | `components/envelopes/EnvelopeCard.tsx` | Reusable card with progress bar, pace note, budget display |
| B3 | Envelope group | `components/envelopes/EnvelopeGroup.tsx` | Section header + grid of EnvelopeCards |

### Phase C: Extract Goals Page Components (3 changes)

| # | Extract | To | Notes |
|---|---------|-----|-------|
| C1 | Bamboo growth viz | `components/goals/BambooProgress.tsx` | The vertical progress with leaf nodes |
| C2 | Goal card | `components/goals/GoalCard.tsx` | Name, progress, insight, contribute button |
| C3 | Goal summary header | `components/goals/GoalSummary.tsx` | Total saved, total target, overall progress |

### Phase D: Performance (2 changes)

| # | Change | Notes |
|---|--------|-------|
| D1 | Memoize expensive computations | `useMemo` for getSpendingByCategory, envelope filtering, goal totals |
| D2 | Lazy load below-fold sections | Today page: AccountsList, RecentTransactions load after initial paint |

### Phase E: Shared patterns (2 changes)

| # | Change | Notes |
|---|--------|-------|
| E1 | `DemoBanner` component | Reusable across all pages — "Demo mode — showing sample data" |
| E2 | `DataSection` wrapper | Common pattern: SectionHeader + Card + loading skeleton. Reduces boilerplate in every section. |

---

## Verification Protocol

For EVERY change (A1 through E2):

1. **Before:** Screenshot the page in current state
2. **Change:** Make the extraction (< 30 lines of diff)
3. **Build:** `npm run build` — must pass
4. **Test:** `npm run test` — must pass  
5. **After:** Screenshot the page — must be pixel-identical to Before
6. **Commit:** One commit per change with clear message

If After ≠ Before at any step → revert immediately, investigate, retry.

---

## What NOT to change

- Design tokens, colors, fonts, spacing — locked
- Animation classes and timing — locked
- Component public APIs (props) — extend only, don't break
- Mock data structure — still needed for fallback
- i18n translation keys — don't rename

---

## Expected outcome

| Page | Before (lines) | After (lines) | Components created |
|------|----------------|---------------|-------------------|
| Today | ~210 | ~40 | 5 new section components |
| Envelopes | ~180 | ~50 | 3 new components |
| Goals | ~150 | ~40 | 3 new components |
| Shared | — | — | 3 new (DemoBanner, DataSection, icons) |
| **Total** | **~540** | **~130** | **14 new components** |

Net effect: Same UX, 75% less code per page, every piece independently testable.
