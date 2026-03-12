# Bamboo Money — Decision Log

Architectural, design, and product decisions with context and rationale. Read this before making similar decisions to maintain consistency.

---

## 2026-03-10 — Four-View Navigation Architecture
**Context**: Needed to define the app's primary navigation structure
**Decision**: Four views only — Today, Envelopes, Goals, Ask Bamboo. Bottom tabs on mobile, sidebar on desktop.
**Alternatives Considered**: Five+ tabs (adding a separate Subscriptions view, a Reports view, a Settings tab), hamburger menu, single-page dashboard
**Rationale**: Competitors like Monarch (7 tabs) and Rocket Money (6 tabs) spread user attention too thin. Four views forces every feature to fit within an existing view, preventing feature bloat. Each view answers one question: "What's happening now?" / "Where's my money going?" / "What am I building?" / "Help me understand."

---

## 2026-03-10 — Organic Luxury Design Direction
**Context**: Needed to define visual aesthetic that differentiates from competitors
**Decision**: "Organic Luxury" — warm ivory backgrounds, forest green palette, Fraunces serif headlines, grain textures, spring-eased animations
**Alternatives Considered**: Minimalist tech (Copilot-style), playful/Gen Z (Cleo-style), corporate fintech (blue gradients), dark-mode-first
**Rationale**: Every major finance app uses sans-serif typography and cool colors. The warm serif + natural palette creates instant visual differentiation. The aesthetic signals "calm and grounded" rather than "cold and technical," which aligns with the behavior-change mission.

---

## 2026-03-10 — Assistant as Structured Cards, Not Chat Bubbles
**Context**: Designing the Ask Bamboo view interaction pattern
**Decision**: Query → structured response cards with data, narrative, and follow-up suggestions. No chat bubble UI, no typing indicator, no avatar.
**Alternatives Considered**: Full chatbot UI (like Cleo), inline chat within each view, voice-first interface
**Rationale**: Chat bubbles signal "casual conversation" which undermines the financial authority the assistant needs. Structured cards signal "informed analysis." The pattern is closer to a search engine for your finances than a messenger app. This also avoids the Cleo problem where personality overshadows substance.

---

## 2026-03-10 — Landing Page and App Shell Under Separate Routes
**Context**: Landing page and app shell both need to exist in the same Next.js project
**Decision**: Landing page at `/`, app views at `/app`, `/app/envelopes`, `/app/goals`, `/app/ask`. Uses a regular `app/` folder (not a route group) to keep URL segments visible.
**Alternatives Considered**: Route group `(app)` (stripped URL prefix, caused conflict with `/`), separate Next.js projects, landing page at `/landing`
**Rationale**: Clean separation between marketing and product. In production, `/` would redirect authenticated users to `/app`. Using a real `app/` folder ensures routes show in URL for navigation clarity.

---

## 2026-03-10 — Tailwind v4 CSS-First Theme Configuration
**Context**: Next.js 16 ships with Tailwind v4 which uses CSS `@theme` instead of `tailwind.config.ts`
**Decision**: All design tokens defined inline in `globals.css` using CSS custom properties mapped to `@theme` block. No JS config file.
**Alternatives Considered**: Downgrading to Tailwind v3 with JS config
**Rationale**: Tailwind v4 is the default in the scaffolded project. CSS-first approach keeps tokens co-located with the grain texture, animations, and base styles. One file for the entire design foundation.

---

## 2026-03-10 — Custom SVG Bamboo Icon Instead of Library Icon
**Context**: Need a bamboo/leaf icon for branding; Lucide doesn't have a bamboo icon
**Decision**: Custom inline SVG for the Bamboo Money logo and leaf accent icons throughout
**Alternatives Considered**: Using a generic Lucide icon (Leaf, Sprout), importing a third-party icon set
**Rationale**: The bamboo stalk icon is a brand asset — it needs to be distinctive and consistent. A custom SVG is lightweight (no additional dependencies) and can be tuned to match the organic aesthetic. The leaf icon for insight cards uses a simplified version of the same path language.

---

## 2026-03-10 — Dark Mode via CSS Variable Swap + Class Strategy
**Context**: Implementing dark mode across the app
**Decision**: Use Tailwind v4 class strategy (`@variant dark`) with CSS custom properties that swap under `.dark` on `<html>`. Anti-FOUC via inline `<script>` in `<head>`. Theme state read via `useSyncExternalStore` watching DOM class mutations. No React context/provider needed.
**Alternatives Considered**: `prefers-color-scheme` media query (no user control), React context provider (unnecessary overhead when DOM is the source of truth), `next-themes` package (external dependency for a simple feature)
**Rationale**: CSS variable swap means most components get dark mode for free — no `dark:` prefixes needed. Only hardcoded colors (badge backgrounds, sidebar gradient) need explicit `dark:` overrides. `useSyncExternalStore` is the React 19-correct way to subscribe to external DOM state, avoiding the setState-in-effect anti-pattern.

---

## 2026-03-10 — Never Pure White Text
**Context**: Dark mode text color selection
**Decision**: All light-on-dark text uses `--text-inverse` (#FAF8F5, warm ivory), never `#FFFFFF`. All sidebar, footer, and button text references changed from `text-white` to `text-text-inverse`.
**Alternatives Considered**: Using pure white (#FFFFFF) with reduced opacity
**Rationale**: Pure white on dark backgrounds creates harsh contrast that causes eye strain. The warm ivory (#FAF8F5) maintains the "Organic Luxury" warmth even in dark mode. Opacity variants (`text-text-inverse/70`) provide the same hierarchy as `text-white/70` without the coldness.

---

## 2026-03-10 — i18n with next-intl, No Routing
**Context**: Adding English/Spanish support per product spec
**Decision**: Use `next-intl` without i18n routing. Locale stored in cookie (`bamboo-locale`), switched via server action that revalidates the layout. No `[locale]` URL segment.
**Alternatives Considered**: URL-based routing (`/en/app`, `/es/app`), `react-intl`, custom context-based solution
**Rationale**: URL-based routing would require restructuring all route files under `[locale]/` and changing every internal link — high disruption for a user-preference setting. Cookie-based locale is simpler, keeps the current URL structure, and the locale toggle is in the sidebar alongside theme. `next-intl` provides `useTranslations` for client components and `getTranslations` for server components with the same API.

---

## 2026-03-10 — Scoped Dark Mode to App Shell
**Context**: Dark mode toggle in the app sidebar was also darkening the landing page because `.dark` lived on `<html>`, and CSS variable overrides cascaded everywhere.
**Decision**: Scope dark CSS variables to `#app-shell.dark` instead of `.dark` on `<html>`. The app layout (`/app`) is a client component that reads `useTheme()` and conditionally applies `.dark` on its own wrapper. Landing page always stays light. Anti-FOUC script uses `MutationObserver` to add `.dark` to `#app-shell` before paint.
**Alternatives Considered**: Two separate `<html>` themes via route groups (not possible in Next.js), CSS `@layer` isolation (too fragile), separate CSS files for landing vs app (duplicates tokens)
**Rationale**: Minimal change — only the selector scope moves from `.dark` to `#app-shell.dark`. All existing `dark:` Tailwind utilities still work because they match `.dark` ancestors via `@variant dark`. The landing page is the brand's first impression and should always present the "Organic Luxury" light aesthetic.

---

## 2026-03-12 — Transactions as Sub-Page, Not Fifth View
**Context**: Phase 1 of Monarch parity roadmap requires a transaction list page, but CLAUDE.md specifies "four views only"
**Decision**: Transactions lives at `/app/transactions` as a detail page accessible from "See all transactions" link. No nav tab added.
**Alternatives Considered**: Adding a fifth tab, embedding full transaction list within Today view, modal overlay
**Rationale**: Respects the four-view architecture constraint. Transaction list is a utility page (search, filter, review) — not a primary mental model. Monarch also separates transactions from the main nav hierarchy.

---

## 2026-03-12 — Account Balances: Positive = Asset, Negative = Liability
**Context**: Defining the Account type for the data layer
**Decision**: `balance` field uses accounting sign convention: positive for assets (checking, savings, investments), negative for credit cards and loans
**Alternatives Considered**: Always-positive balance with a separate `isLiability` boolean, separate `debt` field
**Rationale**: Single-field sign convention makes net worth calculation trivial (`accounts.reduce(sum + balance)`). Matches how financial APIs (Plaid) return data. Avoids boolean branching in aggregation logic.

---

## 2026-03-12 — Aggregation Helpers as Pure Functions in data/helpers.ts
**Context**: Dashboard and components need computed values (net worth, spending by category, monthly totals)
**Decision**: All aggregation logic lives in `src/data/helpers.ts` as pure functions that take data arrays and return computed results
**Alternatives Considered**: Computing inside components, React context/store, server-side computation
**Rationale**: Pure functions are independently testable, have no React dependency, and make the swap to real API data trivial — only the data source changes, not the computation logic. When a real backend exists, these functions become the interface contract.

---

<!-- Future decisions will be appended below by Claude Code. Do not delete existing entries. -->