# Bamboo Money — Session Log

Summary of each development session: what was accomplished, decisions made, and open items.

---

## Session 1 — 2026-03-10

**Goal**: Build the Bamboo Money landing page and core app shell from scratch, then audit against the Experience Design spec.

### What Was Accomplished

**Phase 1 — Scaffolding & Build**
- Scaffolded Next.js 16 project with TypeScript, Tailwind v4, App Router
- Configured complete design system in `globals.css`: all color tokens (light + dark), typography variables, spacing, shadows, grain texture, and 8 animation keyframes
- Built 5 shared UI components: Button (3 variants), Card (hoverable/elevated), ProgressBar (color-shifting), Badge (4 variants), InsightCard (leaf SVG + green left border)
- Built 2 navigation components: Sidebar (260px, forest green gradient, radial glow) and BottomNav (64px, backdrop blur, dot indicator)
- Built landing page with all 8 sections: hero with CSS bamboo growth animation, pain points, three pillars, assistant insight cards, competitive positioning, personas, pricing tiers, footer CTA with email capture
- Built all 4 app views with realistic mock data:
  - **Today**: greeting, net worth sparkline card, Bamboo insight, horizontal-scrolling envelope summary, upcoming bills, recent transactions
  - **Envelopes**: grouped by Essentials/Lifestyle/Growth, search bar, progress bars with pace notes, "Add Envelope" button
  - **Goals**: vertical bamboo stalk visualization with leaf SVGs at 25/50/75/100% milestones, 3 goals (savings, travel, debt payoff)
  - **Ask Bamboo**: search input, suggested query pills, structured response card with data table + follow-up suggestions, recent insights feed
- Created mock data file (`src/data/mock-data.ts`) with realistic merchant names, amounts, dates, insights
- Created `useScrollReveal` hook for IntersectionObserver-based scroll animations
- Created `docs/TODO.md` with 9 deferred items
- Logged 6 decisions to `docs/decisions.md`, 2 errors to `docs/error-log.md`

**Phase 2 — Design Audit**
- Full cross-reference of all source files against `docs/Bamboo_Money_Experience_Design.md`
- Found and fixed 7 spec deviations:
  1. Today greeting: `text-xl` (20px) → `text-lg` (18px) per spec wireframe
  2. Label letter-spacing (all views + landing): `tracking-[0.15em]` → `tracking-[0.05em]` — was 3x spec value
  3. Label font size (all views): `text-[10px]` → `text-xs` (12px) — spec floor is `--text-xs`
  4. BottomNav label: `text-[10px]` → `text-xs` per spec nav design
  5. Envelopes group label color: `text-text-tertiary` → `text-text-secondary` per spec wireframe
  6. Sidebar inactive nav opacity: `text-white/60` → `text-white/70` per spec (70% → 100% on active)
  7. Landing section label tracking: same `0.15em` → `0.05em` fix
- Confirmed correct (no changes needed): all colors, shadows, `@theme inline` radius overrides (`rounded-lg` = 16px, `rounded-md` = 10px), fonts, grain texture (3.5% opacity, multiply blend), all animation timings and keyframes
- Final build: all 6 routes compile as static pages, lint clean, zero errors

### Decisions Made
- Landing page at `/`, app at `/app/*` using a regular folder (not route groups) — see `docs/decisions.md`
- Tailwind v4 CSS-first theme: all tokens in `globals.css` via `@theme inline`, no `tailwind.config.ts`
- Custom inline SVG for bamboo brand icon — Lucide lacks a bamboo icon
- Bamboo stalk growth on Goals view uses vertical progress bar with leaf nodes at quartile milestones

### Patterns Discovered
- Tailwind v4 `@theme inline` block maps CSS custom properties to utility classes and correctly overrides defaults (e.g., `--radius-lg: 16px` overrides Tailwind's default 8px for `rounded-lg`)
- Next.js route groups `(name)` strip the segment from URL — use regular folders when URL path matters
- Inline SVG components avoid hydration issues that external SVG files can cause in Next.js
- `useScrollReveal` hook with IntersectionObserver is a clean reusable pattern for scroll animations
- IntersectionObserver does not trigger reliably in Playwright headless — manually add `.revealed` class for visual testing

### Errors Encountered
1. **Route group conflict**: `(app)` route group stripped URL prefix, causing Today view to conflict with landing page at `/`. Fixed by switching to regular `app/` folder.
2. **Dev server hang**: Multiple lockfiles (root `C:\Users\coche\package-lock.json` + project) caused Turbopack workspace root inference issues. Fixed by killing all node processes and restarting fresh.
3. **Scroll-reveal invisible in Playwright**: IntersectionObserver didn't fire in headless mode. Worked around by manually adding `.revealed` class.

### Files Created (19 new files)
- `src/app/globals.css` — complete design token system + animations
- `src/app/layout.tsx` — root layout with Fraunces + Plus Jakarta Sans fonts
- `src/app/page.tsx` — landing page (8 sections)
- `src/app/app/layout.tsx` — app shell with sidebar + bottom nav
- `src/app/app/page.tsx` — Today view
- `src/app/app/envelopes/page.tsx` — Envelopes view
- `src/app/app/goals/page.tsx` — Goals view
- `src/app/app/ask/page.tsx` — Ask Bamboo view
- `src/components/ui/Button.tsx`, `Card.tsx`, `ProgressBar.tsx`, `Badge.tsx`, `InsightCard.tsx`
- `src/components/app/Sidebar.tsx`, `BottomNav.tsx`
- `src/data/mock-data.ts`
- `src/lib/utils.ts`
- `src/hooks/useScrollReveal.ts`
- `docs/TODO.md`

### Open Items
- Visual review in browser still needed — fonts, colors, spacing, and animations should be verified by a human eye
- Dark mode tokens wired but not yet refined per-component
- No tests written (test framework not configured)
- No onboarding flow, settings view, or backend integration
- Accessibility audit not done (keyboard nav, screen reader, ARIA)
- See `docs/TODO.md` for the full deferred items list (9 items)

---

## Session 2 — 2026-03-12 (Overnight Loop, Iteration 1)

**Goal**: Monarch Parity Phase 1 — Core Data Layer. Build transaction/account types, rich mock data, transactions page, net worth component, accounts list, and wire the Today dashboard to real aggregated data.

### What Was Accomplished

- Created TypeScript types for Transaction (with category, status, recurring, excludeFromBudget) and Account (with type, balance, institution, mask)
- Defined 16 transaction categories with icons and colors
- Created 55 mock transactions across March and late February 2026 (realistic merchants, amounts, dates, statuses)
- Created 10 mock accounts across 6 types (checking, savings, credit cards, investments, loans, vehicles, cash)
- Built aggregation helpers: calculateNetWorth, groupAccounts, getSpendingByCategory, getRecentTransactions, getMonthlyTotals
- Built full Transactions page at `/app/transactions` with search, category filters, status filters, date/amount/merchant sorting, date grouping, status icons, category dots
- Built NetWorthSummary component with sparkline, assets/liabilities breakdown, monthly cash flow
- Built AccountsList component grouped by type with subtotals and icons
- Rewired Today dashboard: net worth from real accounts, recent transactions from data layer, new "Spending This Month" section, accounts section, link to transactions page
- Added i18n translations for new "Spending This Month" label (en + es)

### Decisions Made
- Transactions page is a sub-route, not a fifth view (see decisions.md)
- Account balances use accounting sign convention (positive = asset, negative = liability)
- Aggregation helpers as pure functions for testability and API-swappability

### Patterns Discovered
- ISO date strings with `T12:00:00` suffix avoids timezone-shift issues when formatting dates in `toLocaleDateString()`
- `Map`-based grouping pattern (for both accounts and date-grouped transactions) is clean and efficient
- Category metadata separated from transaction data enables future category management features

### Open Items
- Phase 2 (Budget Engine) is next on the Monarch parity roadmap
- No tests written for aggregation helpers yet (would be high-value, pure function tests)
- Transaction "reviewed" toggle is display-only — needs state management to be interactive
- Net worth history is still simulated (16 hardcoded points) — needs to be computed from historical account snapshots

### Files Created (10 new files)
- `src/types/transaction.ts`, `src/types/account.ts`, `src/types/index.ts`
- `src/data/categories.ts`, `src/data/accounts.ts`, `src/data/transactions.ts`, `src/data/helpers.ts`
- `src/app/app/transactions/page.tsx`
- `src/components/app/NetWorthSummary.tsx`, `src/components/app/AccountsList.tsx`
- `docs/BUILD_LOG.md`

### Files Modified (3 files)
- `src/app/app/page.tsx` — rewired to real data layer
- `messages/en.json` — added spending.label
- `messages/es.json` — added spending.label

---

## Session 4 — 2026-03-15 (Parallel UI Polish)

**Goal**: Fix dark mode token gaps, accessibility violations, breakpoint mismatch, zero test coverage, and landing page polish — using 5 parallel worktree agents.

### What Was Accomplished

**Stream 1 — CSS Tokens + Dark Mode**
- Added `--caution-text` token (light: `#b8860b`, dark: `#E9C46A`) + registered in `@theme inline`
- Added dark mode overrides for `--btn-destructive-text` (`#E8E4DF`) and `--caution-soft`
- Added `.grain-overlay` CSS class with `mix-blend-mode: multiply` (light) / `overlay` (dark)
- Fixed Badge caution variant: replaced hardcoded `text-[#b8860b] dark:text-caution` with `text-caution-text`

**Stream 2 — Accessibility**
- Added skip-to-content link in root layout (sr-only, visible on focus)
- Added sr-only labels + ids to transaction search input and ask search input
- Added `aria-label="Toggle filters"` + `aria-expanded` to transaction filter button

**Stream 3 — Breakpoint Alignment**
- Sidebar: `hidden lg:flex` → `hidden min-[1200px]:flex` (spec says 1200px, not 1024px)
- NavRail: `hidden md:flex lg:hidden` → `hidden md:flex min-[1200px]:hidden`
- App layout: `lg:ml-*` → `min-[1200px]:ml-*`, `lg:px-*` → `min-[1200px]:px-*`
- Applied grain-overlay class to DarkGrainOverlay, added `id="main-content"` to `<main>`

**Stream 4 — Testing Infrastructure**
- Installed vitest + @vitejs/plugin-react + jsdom
- Created `vitest.config.ts` with path aliases
- 30 tests for `data/helpers.ts` (calculateNetWorth, groupAccounts, getSpendingByCategory, getRecentTransactions, getMonthlyTotals)
- 24 tests for `lib/utils.ts` (cn, formatCurrency, getProgressColor, getProgressPercentage)
- All 108 tests pass (including 54 pre-existing from previous session's data layer)

**Stream 5 — Landing Page Polish**
- Footer links: `<span>` → `<a href="#">` with focus-ring class
- Email input: added sr-only label + id
- Submit button: added `type="submit"`

### Decisions Made
- Vitest over Jest for testing (see decisions.md)
- `--caution-text` token for dark-mode-aware badge colors (see decisions.md)
- `min-[1200px]:` arbitrary breakpoint instead of overriding `lg:` (see decisions.md)

### Patterns Discovered
- Parallel worktree agents can run 5 independent streams simultaneously, but worktree cleanup is critical — leftover `.next/` build artifacts pollute ESLint
- CSS variable swap pattern eliminates `dark:` prefix proliferation — one token definition handles both modes
- Vitest with `@` path alias resolves cleanly when mirroring tsconfig paths

### Open Items
- Visual browser review (dark mode toggle, responsive breakpoints) — not yet done
- Component-level React tests (with @testing-library/react) — not yet set up
- Accessibility audit with axe-core or Lighthouse — not yet run
- See `docs/TODO.md` for full deferred items

### Files Created (3 new files)
- `vitest.config.ts`
- `src/data/__tests__/helpers.test.ts`
- `src/lib/__tests__/utils.test.ts`

### Files Modified (10 files)
- `package.json` — added test scripts + dev deps
- `src/app/globals.css` — caution-text token, grain-overlay class, dark mode tokens
- `src/components/ui/Badge.tsx` — token-based caution variant
- `src/app/layout.tsx` — skip-to-content link
- `src/app/app/layout.tsx` — breakpoint alignment, grain-overlay class, main-content id
- `src/components/app/Sidebar.tsx` — 1200px breakpoint
- `src/components/app/NavRail.tsx` — 1200px breakpoint
- `src/app/app/transactions/page.tsx` — search label, filter aria attributes
- `src/app/app/ask/page.tsx` — search label
- `src/app/page.tsx` — footer links, email label, submit button type

---

## Session 5 — 2026-03-15 (NavRail/Sidebar Overlap Fix)

**Goal**: Fix the NavRail/Sidebar overlap bug where both navigation components rendered simultaneously at ≥1200px viewport widths.

### What Was Accomplished

- Diagnosed Tailwind v4 arbitrary breakpoint cascade ordering bug: `min-[1200px]:hidden` was generated before `md:flex` in the CSS output, so `md:flex` won at all widths ≥768px
- Attempted fix via `@theme { --breakpoint-desktop: 1200px; }` — Turbopack did not generate any CSS for the named breakpoint
- Implemented working fix: plain CSS `@media (min-width: 1200px)` rules in `globals.css` targeting `.sidebar`, `.nav-rail`, and `#main-content`
- Verified all three nav tiers visually in Playwright:
  - Mobile (375px): BottomNav only
  - Tablet (900px): NavRail only
  - Boundary (1199px): NavRail only
  - Desktop (1300px): Sidebar only
- Verified dark mode toggle, Goals, Envelopes, and landing page — all clean
- Build, lint, and all 54 tests pass

### Decisions Made
- Plain CSS `@media` rules for 1200px breakpoint instead of Tailwind utilities (see decisions.md — updated existing entry)

### Patterns Discovered
- Tailwind v4 with Turbopack has unreliable CSS generation for both arbitrary breakpoints (`min-[Xpx]:`) and `@theme`-registered named breakpoints. Plain CSS `@media` rules are the reliable fallback for custom breakpoints.
- Adding semantic CSS class names (`.sidebar`, `.nav-rail`) to components enables clean CSS-level targeting without needing Tailwind-specific selectors.

### Errors Encountered
- Tailwind v4 arbitrary breakpoint cascade ordering bug (see error-log.md)
- `@theme { --breakpoint-desktop }` not recognized by Turbopack (see error-log.md)

### Files Modified (4 files)
- `src/app/globals.css` — added `@media (min-width: 1200px)` rules for three-tier nav
- `src/components/app/Sidebar.tsx` — added `.sidebar` class, removed broken `min-[1200px]:flex`
- `src/components/app/NavRail.tsx` — added `.nav-rail` class, removed broken `min-[1200px]:hidden`
- `src/app/app/layout.tsx` — simplified margin/padding classes (desktop overrides now in CSS)

### Open Items
- Component-level React tests (with @testing-library/react) — not yet set up
- Accessibility audit with axe-core or Lighthouse — not yet run
- See `docs/TODO.md` for full deferred items

---

<!-- Entries will be appended below by Claude Code. Do not delete this file. -->