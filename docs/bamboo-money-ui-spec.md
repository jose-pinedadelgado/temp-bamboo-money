# Bamboo Money UI Specification

Status: Active  
Authority: Canonical source for current Bamboo Money UI rules  
Last Updated: 2026-03-15  
Primary Audience: Design, Product, Engineering, Agentic AI implementation agents  

Companion Files:
- `bamboo-money-design-tokens.json` — canonical reusable design values
- `bamboo-money-ui-reserved.md` — non-canonical reserved, aspirational, and future-facing UI notes

## Document Purpose and Authority

Status: Active  
Priority: High  
Applies To: Entire document  

### Purpose
This file defines the active UI rules for Bamboo Money. It is written to be readable by humans and implementation agents. It should help the product remain trustworthy, structured, readable, and consistent across screens and breakpoints.

### Canonical Status
This file is the canonical source for active Bamboo Money UI behavior and rules.

### Conflict Resolution
If guidance conflicts across files:
1. `bamboo-money-ui-spec.md` wins for active UI behavior.
2. `bamboo-money-design-tokens.json` wins for concrete reusable values.
3. `bamboo-money-ui-reserved.md` does not override active implementation rules.

### Scope
This file covers active UI behavior, layout, navigation, components, content hierarchy, data display rules, accessibility expectations, and implementation constraints. It does not store future-facing ideas, raw brainstorming, abandoned alternatives, or token definitions.

---

## Product UX Goals and Design Principles

Status: Active  
Priority: High  
Applies To: All product surfaces  

### UX Goals
- Let users understand their financial position at a glance.
- Make high-frequency tasks fast, predictable, and low-stress.
- Present financial information with clarity, stability, and minimal ambiguity.
- Support a personal, warm product voice without reducing financial seriousness.

### Design Principles
- **Trust first.** The product must feel reliable before it feels clever.
- **Scan first.** Important balances, changes, and actions must be easy to identify quickly.
- **Structure over decoration.** Hierarchy, borders, spacing, and alignment should do more work than visual effects.
- **Warm but serious.** The interface may feel friendly, but it must never feel toy-like.
- **Visible navigation when space allows.** Primary destinations should remain exposed on larger layouts.
- **Consistency over novelty.** Repeated patterns are preferred over one-off design inventions.

### Non-Goals
- The product should not optimize for flashy fintech styling.
- The product should not rely on novelty, gimmicky motion, or decorative density to feel modern.
- The product should not bury core navigation or financial status behind extra interaction steps when space allows visibility.

---

## Information Architecture

Status: Active  
Priority: High  
Applies To: All navigable product areas  

### Primary Destinations
- **Dashboard** — overall financial snapshot and immediate priorities
- **Accounts** — asset, liability, and account-level detail
- **Budget** — category planning, targets, and monthly control
- **Transactions** — activity review, search, filters, and classification
- **Goals** — savings targets, payoff targets, and future planning
- **Settings** — profile, institutions, preferences, alerts, and household controls

### Utility / Secondary Destinations
- Search
- Notifications
- Help / support
- Profile / account menu
- Contextual quick links within a screen

### Navigation Hierarchy Rules
- Primary destinations represent the core mental model of the product and must remain stable over time.
- Utility destinations may appear in headers, contextual panels, or menus, but should not replace core navigation.
- A destination should enter primary navigation only if it is a top-level user job, not merely a feature.

### Content Placement Rules
- Primary navigation contains major product areas only.
- Secondary navigation contains settings, alerts, help, and contextual tools.
- Screen-specific shortcuts must never compete visually with core navigation.
- High-frequency financial views must never be more than one navigation step away from a primary destination.

---

## App Shell and Responsive Navigation

Status: Active  
Priority: High  
Applies To: All authenticated app screens  

### App Shell Overview
The Bamboo Money shell uses a stable application frame with a primary navigation region, a main content region, and an optional secondary contextual region on larger layouts. Navigation adapts across three modes while preserving the same top-level destinations.

### Desktop Navigation
#### Purpose
Expose primary destinations persistently and support fast movement across the product.

#### Rules
- Desktop uses a persistent left sidebar with icon and text label for each primary destination.
- The sidebar remains visible on authenticated screens unless the screen is explicitly immersive or modal in nature.
- The active destination must be visually distinct through background, indicator, or both.
- The desktop sidebar may include a clearly separated utility cluster near the bottom.

### Medium-Width Navigation
#### Purpose
Preserve visibility of primary destinations while reducing horizontal footprint.

#### Rules
- Medium-width layouts use a compact navigation rail.
- The rail prioritizes icons and supports short labels when space permits.
- Rail interaction must remain equivalent to desktop navigation in destination coverage.
- The compact state must not introduce a hidden menu for primary destinations if the rail can still expose them.

### Mobile Navigation
#### Purpose
Provide direct access to core destinations on small screens with minimal cognitive load.

#### Rules
- Mobile uses a bottom navigation bar for primary destinations.
- Bottom navigation should expose only the most essential destinations; overflow must move to a clear "More" or equivalent pattern if needed.
- The bottom nav remains persistent across primary app surfaces unless it conflicts with a focused task flow.
- The active tab must remain obvious at a glance.

### Navigation State Rules
- Active state must remain visible without hover.
- Hover is additive, not essential, for understanding navigation.
- Focus states must be clearly visible for keyboard users.
- Navigation labels should be short, concrete, and front-loaded.
- Hidden navigation is a last resort on larger screens, not the default.

### Header Behavior
- The header may contain page title, search, notifications, and profile controls.
- The header should not duplicate the primary navigation model.
- The header should remain visually lighter than the primary content and navigation structure.

### Global Actions
- Global actions must be limited to cross-product tasks such as search, notifications, and support.
- A global action must not be visually stronger than the page’s primary financial content.

---

## Layout System

Status: Active  
Priority: High  
Applies To: All layouts and responsive breakpoints  

### Layout Philosophy
Bamboo Money uses structured density. The interface should feel organized, calm, and information-rich without feeling cramped. Space should clarify groups and hierarchy, not create emptiness for its own sake.

### Page Width and Content Bounds
- Page shells, content widths, gutters, and navigation widths must use layout tokens from the companion token file.
- Main content should expand comfortably on desktop but avoid overly long reading lines.
- Dense financial data should remain aligned to a clear grid.

### Grid / Column Behavior
- Desktop may use a main content column plus an optional secondary content column.
- Medium-width layouts should reduce secondary content before reducing primary readability.
- Mobile uses a single primary content column.
- Adjacent sections should align to shared horizontal boundaries whenever possible.

### Section Spacing
- Section spacing must follow a consistent rhythm defined by spacing tokens.
- Separate major regions with spacing first; use borders and background changes second.
- Avoid stacking many unrelated panels without clear grouping.

### Desktop Layout Rules
- Desktop prioritizes visibility, comparison, and scan efficiency.
- Sidebar + main content is the default structure.
- Secondary panels may appear on the right when they support the current task without competing with core financial data.

### Tablet / Medium Layout Rules
- Medium layouts preserve content hierarchy while compressing the shell.
- Secondary content should move below primary content before primary content becomes cramped.
- Multi-column patterns should simplify before text or controls become crowded.

### Mobile Layout Rules
- Mobile uses single-column content flow.
- Important financial values and primary actions must appear early in the scroll.
- Mobile stacking order must preserve meaning, not just visual order from desktop.

### Secondary Content Areas
- Secondary regions may contain quick links, reminders, educational prompts, or contextual shortcuts.
- Secondary regions must never visually overpower balances, transactions, or budget information.

---

## Visual Style Overview

Status: Active  
Priority: Medium  
Applies To: All product surfaces  

### Visual Direction
The product should feel like a personal financial control center: calm, legible, structured, and quietly premium. It should borrow the confidence of institutional financial software while remaining slightly warmer and more modern.

### Structural Style
- Use borders, contrast, and spacing to define regions clearly.
- Prefer quiet surfaces over heavy shadows and floating-card excess.
- Use emphasis sparingly so that important numbers, actions, and alerts stand out.
- Maintain a neutral background that allows structured content to lead.

### Desired Qualities
- Calm
- Clean
- Trustworthy
- Readable
- Deliberate

### Avoid
- Gamified or toy-like styling
- Excessive gradients or ornamental glass effects
- Overly soft card stacks that reduce financial clarity
- Overuse of bright accent colors

---

## Typography and Content Hierarchy

Status: Active  
Priority: High  
Applies To: All text, numeric summaries, and labels  

### Typography Philosophy
Typography should support fast scanning first and comfortable reading second. The system must make totals, section titles, row labels, and supporting metadata easy to distinguish.

### Text Roles
- **Display / Page Title** — major page identity
- **Section Title** — groups content regions
- **Body** — standard readable text
- **Secondary Body** — supporting context and metadata
- **Label** — control labels and concise descriptors
- **Caption** — minor metadata and helper text
- **Numeric Emphasis** — balances, totals, category sums, and other financial highlights

### Heading Hierarchy Rules
- Each screen must have one clear page title.
- Section titles should be short, concrete, and consistent across screens.
- Heading levels must reflect actual content structure, not styling convenience.

### Body Text Rules
- Use plain language by default.
- Keep body copy concise in high-frequency financial flows.
- Supporting explanations should help interpretation, not narrate the obvious.

### Label and Caption Rules
- Labels must identify the field or value clearly.
- Captions should remain secondary in size, contrast, and visual weight.
- Avoid ambiguous micro-labels such as "Info" or "Details" when a concrete term is available.

### Numeric Hierarchy Rules
- Primary balances and totals must be the most visually prominent numbers in their region.
- Secondary financial values such as subtotals, category values, or comparison numbers must remain clearly subordinate.
- Currency values should align consistently, especially in lists and tables.
- Numeric displays should prefer tabular numerals when supported by the type system.

### Casing and Emphasis Rules
- Prefer sentence case or title case with consistency.
- Avoid unnecessary all-caps except for small supporting labels where readability remains intact.
- Bold should indicate importance, not compensate for weak hierarchy.

---

## Color Usage and Semantic States

Status: Active  
Priority: High  
Applies To: All visual surfaces, states, and feedback patterns  

### Color Philosophy
Color should communicate structure, emphasis, and state. It must never be the only signal for meaning, and it must be used with restraint so the interface remains calm and trustworthy.

### Structural Color Usage
- Use a stable structural color family for navigation, key framework elements, and high-trust surfaces.
- Use neutral surfaces for most content backgrounds.
- Borders and separators should support grouping without becoming visually loud.

### Accent Color Usage
- Accent color should highlight selected states, key actions, or limited emphasis moments.
- Accent color should not become the default fill for many unrelated elements.
- One accent is preferable to a large decorative palette.

### Semantic States
#### Positive
- Use for healthy or successful states such as income completion, savings progress, or confirmed success.
- Positive color must still preserve legibility and not imply celebration in serious financial contexts.

#### Warning
- Use for upcoming due dates, review-needed states, partial completion, or cautionary notices.
- Warning should draw attention without causing alarm.

#### Negative
- Use for overdraft risk, failed actions, overspending, or destructive actions.
- Negative state must always be paired with explicit language, not color alone.

#### Informational
- Use for neutral updates, helper banners, and context that requires awareness but not urgency.

### Prohibited / Discouraged Usage
- Do not use many bright colors at the same hierarchy level.
- Do not rely on color alone to show gain, loss, or urgency.
- Do not use brand accent colors as decoration when they do not communicate structure or state.

---

## Core Interaction Patterns

Status: Active  
Priority: High  
Applies To: All interactive elements and state changes  

### Interaction Philosophy
Interactions should feel deliberate, predictable, and low-friction. The user should not have to guess whether a region is clickable, whether a state changed, or how to reverse an action.

### Click / Tap Behavior
- Clickable surfaces must look interactive.
- Large row-based patterns are acceptable when the click target is clear and consistent.
- Small icon targets should be used only for secondary actions, not the primary interaction in dense data rows.

### Drill-Down Behavior
- Rows that lead to detail views should preserve enough summary information to justify the drill-down.
- Drill-down affordances must remain visually consistent across the product.
- Avoid mixing inline expansion and full drill-down unpredictably within the same pattern.

### Selection Behavior
- Selected state must be visible and persistent.
- Selection patterns should remain consistent across filters, tabs, category pickers, and navigation.

### Hover, Focus, and Pressed States
- Hover can enrich discoverability on desktop but must not be required for comprehension.
- Focus states must be visible, not subtle to the point of disappearance.
- Pressed states should confirm interaction without exaggerated motion.

### Inline Actions
- Inline actions should be limited to high-frequency actions directly related to the row or card.
- Inline actions must not crowd numeric or text hierarchy.

### Confirmation Patterns
- Confirm destructive or high-impact actions.
- Do not require confirmation for low-risk, easily reversible actions.
- Confirmation language must state the consequence clearly.

### Destructive Actions
- Destructive actions must be visually distinct from normal actions.
- Destructive actions require explicit labels and clear intent.
- Destructive actions should not sit immediately adjacent to the primary safe action without separation.

### Loading, Empty, and Error Behavior
- Every major surface should define loading, empty, and error states.
- Loading states should preserve layout expectation when possible.
- Empty states should explain the absence and offer the next useful step.
- Error states should describe what happened, what remains safe, and what the user can do next.

---

## Core Components

Status: Active  
Priority: High  
Applies To: Shared UI components in current product scope  

### Component Standards
- Shared components must use the token system.
- Shared components should solve repeated interface needs, not one page only.
- Variants should remain limited and purposeful.
- Components must not encode page-specific styling that belongs in screen patterns.

### App Shell
#### Purpose
Provide the stable frame for the product.

#### Anatomy
- Navigation region
- Header region
- Main content region
- Optional secondary region

#### Rules
- The shell must preserve user orientation across screens.
- The shell should not shift drastically between adjacent destinations.

### Sidebar / Navigation Rail / Bottom Navigation
#### Purpose
Provide access to the primary product destinations.

#### Anatomy
- Destination item
- Active state indicator
- Optional utility cluster

#### Rules
- All three nav modes must represent the same core information architecture.
- Destination labels must remain concrete and short.

### Section Header with Total
#### Purpose
Introduce a content region and, when relevant, summarize its most important numeric value.

#### Anatomy
- Section title
- Optional total or summary value
- Optional supporting action

#### Rules
- The total must not visually overpower the page’s most important total.
- Supporting actions should remain secondary to the section identity.

### Summary Panel / Summary Card
#### Purpose
Present concise grouped financial information with clear structure.

#### Anatomy
- Container
- Title
- Primary value
- Supporting metadata or actions

#### Rules
- Use summary panels for grouped insight, not for decorative fragmentation.
- Borders and spacing should do more work than heavy shadow.

### Account Summary Row
#### Purpose
Show an account in a scannable, list-friendly format.

#### Anatomy
- Account name
- Account type or institution metadata
- Primary balance
- Optional secondary balance or status

#### Rules
- Primary balance must align consistently across rows.
- Secondary metadata must never compete with the balance.

### Transaction Row
#### Purpose
Show a transaction clearly enough for quick review and categorization.

#### Anatomy
- Merchant or transaction name
- Date
- Category or status
- Amount
- Optional pending marker

#### Rules
- Amount alignment must remain consistent across rows.
- Pending status must be obvious without overpowering the amount.
- Category chips or tags must remain secondary to the transaction identity and amount.

### Quick Links / Shortcut Block
#### Purpose
Offer contextual shortcuts for common supporting tasks.

#### Anatomy
- Block title
- Shortcut items

#### Rules
- Quick links are secondary support, not primary navigation.
- Limit shortcuts to genuinely common actions.

### Buttons
#### Purpose
Trigger primary and secondary actions.

#### Variants
- Primary
- Secondary
- Tertiary / Text
- Destructive

#### Rules
- Each screen should have a clear visual primary action only when a primary action truly exists.
- Button hierarchy must reflect action hierarchy.
- Avoid presenting many equal-strength buttons in one cluster.

### Tabs / Segmented Controls
#### Purpose
Switch between closely related views inside a screen.

#### Rules
- Use tabs for peer views, not unrelated destinations.
- Keep tab labels concise and parallel.
- Tabs should not duplicate the role of primary navigation.

### Filters and Search
#### Purpose
Help users narrow or locate content within dense financial data.

#### Rules
- Common filters should remain visible in high-volume views such as transactions.
- Advanced filters may collapse behind a secondary action.
- Search should support quick refinement without replacing strong information architecture.

### Form Fields
#### Purpose
Collect user input accurately and with minimal friction.

#### Rules
- Every field must have a visible label.
- Helper text should clarify unusual requirements, not explain standard behavior.
- Validation should be specific and timely.

### Banners / Alerts
#### Purpose
Communicate important status, guidance, or warnings at the screen or product level.

#### Rules
- Use banners for content that requires attention, not for decorative messaging.
- Alert severity must match real user impact.
- A screen should not accumulate many simultaneous banners by default.

### Modals / Drawers
#### Purpose
Support focused tasks, confirmations, and secondary workflows.

#### Rules
- Use a modal when the user must finish or dismiss a focused decision.
- Use a drawer for contextual work that benefits from staying anchored to the current screen.
- Do not move core navigation tasks into modals.

### Empty States
#### Purpose
Guide the user when a screen, list, or module has no content yet.

#### Rules
- State why the area is empty when known.
- Offer the next useful step.
- Avoid overly playful copy in serious financial contexts.

### Loading States
#### Purpose
Communicate that content is in progress without harming orientation.

#### Rules
- Preserve the expected content structure when possible.
- Loading should not cause major layout jumps.

### Error States
#### Purpose
Help users recover when content or actions fail.

#### Rules
- State what failed in plain language.
- Clarify whether the user’s financial data or action state is safe.
- Offer a next action when appropriate.

---

## Screen Patterns

Status: Active  
Priority: High  
Applies To: Current product screen archetypes  

### Screen Pattern Standards
- Start with orientation: title, summary, or both.
- Place the most decision-relevant information above secondary tools.
- Keep core actions close to the information they affect.
- Preserve consistent order across similar screens.

### Dashboard / Home
#### Purpose
Provide the user’s overall financial snapshot and immediate priorities.

#### Primary Content
- Net position or high-level financial summary
- Key balances or grouped account summaries
- Budget progress or monthly status
- High-priority alerts or upcoming obligations

#### Secondary Content
- Shortcuts
- Supporting insights
- Educational or reflective prompts

#### Rules
- The dashboard should answer “Where do I stand?” quickly.
- The dashboard must prioritize clarity over feature density.

### Accounts Overview
#### Purpose
Provide a structured view of assets, liabilities, and grouped account categories.

#### Primary Content
- Grouped account lists
- Section totals and subtotals
- Drill-down access to account details

#### Rules
- Group similar accounts together consistently.
- Make balance comparison easy.
- Do not bury account totals beneath secondary controls.

### Account Detail
#### Purpose
Show the current state, history, and relevant actions for a single account.

#### Primary Content
- Account identity and current balance
- Available balance where relevant
- Recent transaction activity
- Core account actions

#### Rules
- Account detail must clearly distinguish current vs available values when both exist.
- The most important account status must appear near the top.

### Budget Overview
#### Purpose
Show planned vs actual spending and category-level control.

#### Primary Content
- Overall budget status
- Category group summaries
- Category detail or overspend indicators

#### Rules
- Budget views must foreground variance and remaining room clearly.
- Categories should be easy to scan and compare.

### Transaction Review
#### Purpose
Support review, search, categorization, and interpretation of activity.

#### Primary Content
- Transaction list
- Search and common filters
- Status and category visibility

#### Rules
- The list must support fast scanning across merchant, date, amount, and status.
- Filtering and search should reduce effort without obscuring the default list.

### Goals
#### Purpose
Support savings and payoff planning with clear progress tracking.

#### Primary Content
- Goal list or cards
- Progress amount and target
- Timing or milestone information

#### Rules
- Goals should present progress clearly without replacing the importance of current financial reality.
- Progress visuals must be secondary to exact numeric values.

### Settings
#### Purpose
Provide access to preferences, connected institutions, household controls, alerts, and profile settings.

#### Primary Content
- Profile and account settings
- Institution and connection management
- Notification preferences
- Household or collaboration controls

#### Rules
- Settings should use a straightforward list architecture.
- Settings labels must be plain and predictable.
- Irreversible changes require stronger confirmation than ordinary preferences.

---

## Financial Data Display Rules

Status: Active  
Priority: High  
Applies To: All monetary, balance, transaction, and summary displays  

### Financial Display Philosophy
Financial information must be clear enough to support trust. The product should prefer explicit labels, aligned numbers, and straightforward interpretation over visual flair.

### Currency Formatting
- Use consistent currency formatting across the product.
- Show negative values consistently.
- Decimal precision should follow context; dense lists may de-emphasize cents when appropriate, but should do so consistently.

### Positive and Negative Values
- Negative values must be immediately recognizable through symbol, wording, and visual treatment.
- Positive and negative states should not rely on color alone.

### Current vs Available Balances
- When both are present, label them explicitly.
- Available balance should never be mistaken for the current ledger balance.
- One must be visually primary based on the user’s likely decision context.

### Pending vs Posted Transactions
- Pending transactions must be marked clearly.
- Pending should be visually secondary to the transaction amount itself.
- Do not mix pending and posted semantics ambiguously.

### Totals, Subtotals, and Breakdowns
- Totals should lead a section.
- Subtotals and category breakdowns must remain subordinate but clearly associated.
- Use grouping, alignment, and spacing to clarify relationships.

### Dates and Time-Related Financial Information
- Use dates consistently and in a format appropriate to the user context.
- Clarify due dates, posting dates, and processing dates when the distinction matters.
- Relative time labels may supplement but should not replace precise dates where money is involved.

### Trend Indicators
- Trend indicators are secondary explanatory aids, not replacements for the actual amount.
- Use trend indicators only where change over time is relevant and readable.
- Do not display trend indicators so aggressively that they distract from the present value.

### Rows vs Cards vs Charts
- Use rows for dense comparison and repeatable records.
- Use summary panels for grouped financial information or modular summaries.
- Use charts only when they reveal a pattern better than plain numbers; always preserve access to the underlying values.

---

## Accessibility Requirements

Status: Active  
Priority: High  
Applies To: All user-facing interfaces  

### Accessibility Standard
Bamboo Money targets WCAG AA as the baseline for active interfaces.

### Contrast Requirements
- Text contrast must meet or exceed WCAG AA requirements.
- Interactive component boundaries and essential visual states must remain perceivable against their background.

### Keyboard and Focus Behavior
- All interactive elements must be reachable by keyboard where applicable.
- Focus order must follow meaningful visual order.
- Focus visibility is required, not optional.

### Touch Target Requirements
- Touch targets must be comfortably tappable on mobile.
- Dense row layouts must still preserve reliable tap behavior.

### Heading and Landmark Structure
- Heading hierarchy must reflect content structure.
- Repeated page regions should map to meaningful landmarks where supported.

### Labels and Control Naming
- Controls must have visible or programmatically associated labels.
- Labels must be concrete enough to predict the action or content.

### Icon-Only Controls
- Icon-only controls require accessible names.
- Icon-only controls should be used sparingly in financial flows where explicit language improves confidence.

### Screen Reader Expectations
- Important financial summaries should be understandable when read linearly.
- Repeated row patterns should expose clear names, values, and statuses.

### Reduced Motion / Motion Sensitivity
- Motion must be subtle and avoid unnecessary flourish.
- Any nonessential motion should respect reduced-motion preferences.

---

## Content Design Rules

Status: Active  
Priority: Medium  
Applies To: All interface copy, labels, and system messages  

### Content Design Philosophy
The product voice should be clear, calm, and direct. It may be warm and supportive, but it should never undermine financial seriousness or precision.

### Naming Conventions
- Use concrete, familiar financial language.
- Prefer “Accounts,” “Transactions,” and “Budget” over branded or abstract labels.
- Use one term consistently for each concept.

### Button and CTA Labels
- Use action-led labels when possible.
- Prefer specific labels such as “Review Transactions” over vague labels such as “Continue.”
- Use shorter labels for repeated controls and more explicit labels for high-impact actions.

### Section and Screen Titles
- Titles should describe the content plainly.
- Avoid metaphor-heavy or motivational headings in core financial areas.

### Empty State Copy
- Explain why the area is empty when possible.
- Suggest the next useful step.
- Keep the tone supportive, not overly cute.

### Error and Validation Copy
- State what went wrong in plain language.
- Explain what the user can do next.
- Avoid technical jargon unless it is necessary for troubleshooting.

### Confirmation and Success Copy
- Confirm what happened clearly.
- Use success messaging with restraint.
- Do not over-celebrate routine financial tasks.

### Financial Terminology Consistency
- Distinguish “available,” “current,” “pending,” and “posted” consistently.
- Distinguish “goal,” “budget,” and “balance” consistently.
- Avoid interchangeable wording when the underlying financial meaning differs.

---

## Implementation Notes and Non-Negotiable Constraints

Status: Active  
Priority: High  
Applies To: Design, engineering, and agentic implementation workflows  

### Implementation Standards
- Implement shared decisions in shared systems, not as local one-off overrides.
- Use the active spec and token file together.
- Favor the existing system before inventing a new pattern.

### Token Usage Rules
- Colors, spacing, type sizes, layout widths, radii, borders, and elevations must come from the token file when tokenized.
- Do not hardcode new reusable visual values into product code without updating the token system.

### Component Governance
- Do not introduce a new shared component variant unless an existing one cannot support the need cleanly.
- If a new reusable pattern appears in more than one place, update the spec and component system.

### Reserved File Usage Rules
- The reserved file is reference material for future thinking, not active implementation authority.
- Do not implement aspirational or reserved guidance as though it were active without updating this spec first.

### When the Spec Must Be Updated
- Update the spec when a new shared pattern enters the product.
- Update the spec when navigation, layout, hierarchy, or financial display behavior changes meaningfully.
- Update the spec when accessibility expectations or core content conventions change.

---

## Change Log

Status: Active  
Priority: Medium  
Applies To: Entire document  

| Date | Section | Summary of Change |
|------|---------|-------------------|
| 2026-03-15 | Initial Draft | Created filled first draft of Bamboo Money UI specification |
