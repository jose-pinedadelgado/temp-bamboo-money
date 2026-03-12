# Claude Code Prompt: Bamboo Money — Landing Page & Core App

## Project Overview

Build the landing page and core application shell for **Bamboo Money**, a behavior-first personal finance platform that unifies envelope budgeting, subscription management, and net worth tracking into a single, minimalist experience with an intelligent assistant.

**Read these context files before starting — they are the source of truth for every design and product decision:**

- `docs/Bamboo_Money_Experience_Design.md` — **READ THIS FIRST.** The complete experience design specification: color palette (hex values), typography system (Fraunces + Plus Jakarta Sans), spacing scale, elevation/shadow system, all four view layouts with ASCII wireframes, animation specs, interaction patterns, onboarding flow, and the "Organic Luxury" design philosophy. This is the primary design reference.
- `docs/Bamboo_Money_Strategy_v2.md` — Full product strategy, competitive comparisons, the three-pillar integration architecture (Envelopes + Subscriptions + Net Worth), assistant design, MVP phasing, and monetization
- `docs/Bamboo_Money_Users_and_Integration.md` — Detailed user personas with demographics, the five target personas, the four-view navigation architecture (Today | Envelopes | Goals | Ask Bamboo), the elevated assistant concept, notification system, and competitive aesthetic positioning
- `docs/Personal_Finance_App_Market_Research.md` — Competitive landscape across 5 market segments, CAGR data, market sizing, and the strategic white space Bamboo Money occupies

**The existing app already has an established visual direction ("Organic Luxury") with these core decisions already made:**
- Primary: Deep forest green #1B4332 (not navy, not tech-blue)
- Accent: Sage #52B788 (warm, natural green)  
- Gold: #D4A574 for highlights and CTAs
- Background: Warm ivory #FAF8F5 (not cold gray or pure white)
- Expense indicator: Warm terracotta #E76F51 (not harsh red)
- Cards: White with warm-toned shadows, 16px border-radius
- Headers: Fraunces (soft-serif, editorial feel)
- Body: Plus Jakarta Sans (clean geometric sans-serif)
- Grain/noise texture overlay for organic depth
- Staggered fade-up animations
- Spring-eased hover interactions
- Dark mode: Warm charcoal #1A1D21 (not pure black)

**Do not deviate from these established decisions. Build upon them.**

---

## Part 1: Landing Page

### Purpose
A conversion-focused marketing landing page that communicates Bamboo Money's value proposition clearly, differentiates it from competitors (YNAB, Monarch, Rocket Money, Copilot, EveryDollar), and drives signups for early access / waitlist.

### Design Direction — "Quiet Confidence"

**Aesthetic**: The intersection of a premium financial tool (Copilot's precision) and a wellness app (Calm's serenity). Not cold/corporate. Not loud/startup. Grounded, warm, natural, elevated.

**Tone**: Refined minimalism with organic warmth. Think a Japanese garden — everything is intentional, nothing is cluttered, natural materials create calm.

**Color Palette**:
- Background: Warm off-white (#FAFAF7 or similar warm neutral — NOT pure white)
- Primary text: Deep charcoal (#2D2D2D) — NOT pure black
- Accent: Muted bamboo green (#5B8C5A or similar natural green — NOT neon, NOT tech-green)
- Secondary accent: Warm sand/stone (#C4B5A0) for subtle elements
- Highlight: A restrained warm gold (#B8954F) for CTAs and important moments
- Depth: Very subtle sage (#E8EDE5) for section backgrounds
- Avoid: Purple gradients, electric blue, neon anything, pure black backgrounds

**Typography**:
- Display/Headlines: A distinctive serif or humanist font — something with personality but not flashy. Consider: DM Serif Display, Fraunces, Newsreader, or Lora. The headlines should feel editorial, like a well-designed magazine, not a tech startup.
- Body: A clean, warm sans-serif. Consider: DM Sans, Plus Jakarta Sans, Outfit, or Satoshi. NOT Inter, NOT Roboto, NOT system fonts.
- Data/numbers: A slightly different weight or the monospace variant of the body font for financial figures — numbers should feel precise.
- Load from Google Fonts or Fontsource.

**Visual Elements**:
- Subtle textures: Paper-like grain overlay on backgrounds (very light, 2-5% opacity). Bamboo fiber or woven texture as an accent (not dominant).
- Photography style (if using images): Lifestyle moments — couple at a kitchen table, someone on their phone at a coffee shop, hands planting something. Warm, natural light. Diverse. NOT stock-photo corporate.
- Illustrations (preferred over photography for MVP): Simple, elegant line illustrations in the accent green — bamboo stalks, leaves, minimal icons. Think Headspace/Calm illustration style but with a financial context.
- Avoid: Isometric illustrations, 3D renders, gradient blobs, abstract geometric patterns, dashboard screenshots as hero images.

**Motion/Animation**:
- Subtle, purposeful. Elements fade in gently on scroll (staggered, not simultaneous).
- A single hero animation: bamboo growing — a thin line that draws upward and sprouts leaves as the page loads. This is the memorable moment.
- Numbers that count up when they scroll into view (e.g., "$2,400 average annual savings").
- Hover states on CTAs: subtle scale (1.02) with a color shift, not dramatic transforms.
- Parallax: Very subtle (10-15px max) on background texture layers. No aggressive parallax.

### Landing Page Structure

**Section 1: Hero**
- Headline: Something that captures the core promise. Suggestions from our strategy work:
  - "Your money, growing." 
  - "Financial clarity, without the complexity."
  - "The budgeting app that's actually about your life."
  - "See where you are. Know where you're going."
- Subheadline: One sentence that explains the product — "Bamboo Money brings your spending, subscriptions, and net worth into one calm, intelligent space — so you can focus on building the life you want."
- CTA: "Join the Waitlist" or "Get Early Access" — warm gold button, prominent but not aggressive
- Visual: The bamboo growing animation or a minimal mockup of the app's "Today" view
- Below fold hint: subtle scroll indicator

**Section 2: The Problem (3 pain points)**
- Frame: "Managing money shouldn't feel like this."
- Three pain points with icons/illustrations:
  1. "Budgeting apps that feel like homework" (reference: 60% of users abandon budgeting apps within 90 days)
  2. "Dashboards that show everything but change nothing" (reference: knowing you spent $847 on dining doesn't help you spend less next month)
  3. "Five different apps for one financial life" (reference: budget in one app, subscriptions in another, net worth in a third)
- Transition: "There's a better way."

**Section 3: The Solution (What Bamboo Money Does)**
- Frame: "One app. Three pillars. Your whole financial picture."
- Three pillars with visual representation (could be three elegant cards, or three bamboo stalks growing from the same root):
  1. **Envelopes** — "Know exactly what you have left to spend — in real time, for every category. Not after the month ends. Right now."
  2. **Subscriptions** — "Every recurring charge, detected and tracked. See what you're paying, what you're not using, and what that money could do instead."
  3. **Net Worth** — "All your accounts — checking, savings, investments, debt — in one quiet number that grows over time."
- Connecting thread: "And an intelligent assistant that ties it all together."

**Section 4: The Assistant (Bamboo's Intelligence)**
- Frame: "Not a chatbot. Not a mascot. An intelligence woven into everything."
- Show 2-3 example interactions in a clean, card-based format:
  - "Your grocery envelope has $62 remaining this week. Past months show this is where spending spikes — a good moment to plan ahead."
  - "Three subscriptions haven't been used in 60+ days. Canceling all three adds $912/year to your travel fund."
  - "Your net worth has grown $2,340 in the last 90 days. At this rate, you'll reach your $50K milestone in November."
- Design these as elegant message cards — not chat bubbles. Clean typography, subtle green accent on the left border or a small leaf icon. They should feel like insights, not conversations.

**Section 5: Competitive Positioning (Why Bamboo)**
- Frame: "Built different." or "What other apps miss."
- Comparison (NOT a feature matrix — use narrative cards):
  - "YNAB gives every dollar a job. Bamboo gives your dollars jobs for you — based on the life you told us you want."
  - "Monarch shows you everything. Bamboo shows you what to do about it."
  - "Rocket Money cleans up your past. Bamboo builds your future."
- Keep this concise. Three comparisons max. No competitor bashing — respectful differentiation.

**Section 6: Who It's For**
- Frame: "Designed for real financial lives."
- 3-4 persona cards (simplified from our research):
  - The couple merging finances who want shared clarity without shared stress
  - The person who's tried budgeting before and quit because it felt like a second job
  - The goal-setter who wants to connect daily spending to their dream life
  - Available in English and Spanish (mention this — it's a differentiator)

**Section 7: Pricing Preview**
- Frame: "Financial clarity should be accessible."
- Two tiers, clean presentation:
  - **Free** — 5 envelopes, basic tracking, 2 goals, single user
  - **Premium** — $49.99/year ($4.17/month) — Unlimited everything, bank sync, household sharing, full assistant, net worth tracking
- Emphasis: "Less than $1 per week. Less than half the cost of Monarch or YNAB."
- CTA: "Get Early Access"

**Section 8: Footer / Final CTA**
- Email signup for waitlist
- "Built by [Jose Pineda]" — personal touch, indie credibility
- Links: Privacy, Terms, Contact
- Social links if applicable
- Small bamboo illustration or the tagline

### Technical Requirements for Landing Page
- **Framework**: Next.js or standalone HTML/CSS/JS — whichever is cleaner for a single page. If Next.js, use App Router.
- **Styling**: Tailwind CSS with custom theme configuration matching the design language above. Custom CSS for animations and texture overlays.
- **Responsive**: Mobile-first. Must look excellent on iPhone, iPad, and desktop. The mobile experience is the primary experience.
- **Performance**: Lighthouse score 90+ on all metrics. Lazy load below-fold content. Optimize all assets.
- **Animations**: CSS-only where possible. For the bamboo growing animation, use CSS keyframes or a lightweight library (not GSAP unless needed). Intersection Observer for scroll-triggered animations.
- **Fonts**: Load via Google Fonts with font-display: swap. Preload the display font.
- **Accessibility**: Semantic HTML, proper heading hierarchy, sufficient color contrast, keyboard navigable, screen reader friendly.
- **Analytics-ready**: Include spots for analytics script tags (Plausible or similar).

---

## Part 2: Core App Shell

### Purpose
Build the structural shell of the Bamboo Money web application — the navigation, layout system, and the four primary views with placeholder content that establishes the design language. This isn't the full app — it's the skeleton that proves the experience works.

### App Navigation Architecture

Four views. That's it. This is the most important design decision — resist adding more.

```
┌─────────────────────────────────────────┐
│  🎋 Bamboo Money          [Avatar] [⚙]  │
├─────────────────────────────────────────┤
│                                         │
│            [Active View Content]         │
│                                         │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│  Today  │  Envelopes  │  Goals  │  ✨   │
│    ●    │             │         │       │
└─────────────────────────────────────────┘
```

- Bottom navigation on mobile (4 icons + labels)
- Sidebar navigation on desktop (collapsible)
- The ✨ icon is "Ask Bamboo" — the assistant
- Active state: subtle fill or underline, not heavy highlighting
- Top bar: Bamboo Money wordmark (left), user avatar (right), settings gear (right)

### View 1: Today (Home)

The first thing users see every time they open the app. It should answer: "What do I need to know right now?"

**Content blocks (top to bottom):**
1. **Greeting + Net Worth Snapshot** — "Good morning, Jose. Net worth: $47,230 (+$340 this month)" — small, calm, top of screen
2. **Bamboo Insight** — The assistant's current observation. One card, clean typography, subtle green left border. Example: "You're on day 14 with 62% of your envelopes still in good shape. Strong month so far."
3. **Envelope Summary** — The 3-4 most active envelopes with remaining balances. Horizontal scroll or compact cards. Each shows: name, remaining amount, visual progress (a thin bar). Tap to expand.
4. **Upcoming Bills** — Next 2-3 recurring charges with dates and amounts. Subtle, not alarming.
5. **Recent Activity** — Last 3-5 transactions with auto-categorized envelope assignments. Minimal: merchant, amount, envelope.

**Design notes:**
- Generous white space between blocks
- No donut charts on the home screen. No complex visualizations. Those live in Insights.
- The mood should be: opening a well-organized notebook, not opening a Bloomberg terminal.

### View 2: Envelopes

All envelopes in one view, organized by type.

**Envelope groups (from our strategy doc):**
- **Essentials** — Rent/Mortgage, Utilities, Insurance, Groceries, Transportation
- **Lifestyle** — Dining, Entertainment, Shopping, Subscriptions, Personal Care
- **Growth** — Savings, Debt Payoff, Investing, Emergency Fund
- **Custom** — User-created envelopes

**Each envelope card shows:**
- Name and icon
- Budgeted amount / Remaining amount
- Visual progress bar (thin, elegant — muted green when healthy, warm amber when >75% spent, soft red only when overspent)
- Tap to see: transaction list, spending trend, Bamboo's observation for this envelope

**Design notes:**
- Cards should feel like actual envelopes — perhaps a subtle paper texture or a slight shadow that suggests depth
- The "Add Envelope" action should be obvious but not dominant
- Total remaining across all envelopes shown at top: "You have $1,240 remaining across all envelopes this month"

### View 3: Goals

The Rich Life goals / bamboo shoots — what you're building toward.

**Each goal shows:**
- Goal name (e.g., "Emergency Fund," "Japan Trip," "Debt Freedom")
- Target amount and current progress
- A visual growth element — this is where the bamboo metaphor can shine. Consider: a vertical progress indicator styled as a bamboo stalk that grows taller as you approach the goal. Or a more abstract but elegant progress visualization that feels organic rather than mechanical.
- Projected completion date based on current pace
- Monthly contribution amount

**Design notes:**
- This view should feel aspirational and motivating — it's the "why" behind the envelope discipline
- Less data-dense than Envelopes. More visual. More white space.
- A "Plant a New Goal" action (language consistent with the bamboo metaphor)

### View 4: Ask Bamboo (The Assistant)

A clean interaction surface for the intelligent assistant.

**Design:**
- NOT a traditional chatbot UI with bubbles and avatars
- More like a search/command interface: a prominent text input at top ("Ask anything about your finances...")
- Below: a feed of Bamboo's recent insights (the proactive observations that also appear on the Today view, but collected here for reference)
- When the user asks a question, the response appears as a structured card: text, possibly a small inline chart or table, and suggested follow-up questions
- The visual language of responses: clean typography, data highlighted with the accent green, charts rendered inline (Chart.js or similar)

**Example interactions to mock up:**
- User: "How did we do this month?"
- Bamboo: [Card with: total spending vs. budget, envelopes over/under, net worth change, one key observation]
- User: "What happens if we increase our debt payment by $200?"
- Bamboo: [Card with: new payoff date, interest saved, suggested envelope adjustments to fund it]

**Design notes:**
- Elevated and grounded — the assistant should feel like consulting a knowledgeable advisor, not chatting with a bot
- No emoji in the assistant's responses. No exclamation marks. Calm, confident prose.
- Suggested follow-up questions appear as subtle pill buttons below each response

### Shared Design System

**Component library to build:**
- Button (primary with gold accent, secondary with outline, ghost)
- Card (standard, envelope-style, insight/assistant, goal)
- Progress bar (thin, elegant, with color states: green/amber/red)
- Input (text, search, numeric)
- Navigation (bottom bar mobile, sidebar desktop)
- Badge/tag (for categories, status)
- Toggle/switch
- Modal/sheet (for transaction details, envelope expansion)
- Notification card (for alerts/insights)

**Spacing system:**
- Use a 4px base grid (4, 8, 12, 16, 24, 32, 48, 64, 96)
- Generous spacing between sections (48-64px on mobile, 64-96px on desktop)
- Card internal padding: 16-24px

**Elevation/shadows:**
- Very subtle. Cards should barely float. One level: `box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)`
- No heavy drop shadows. No glassmorphism. No neumorphism.

**Border radius:**
- Consistent: 12px for cards, 8px for buttons and inputs, 4px for tags/badges

**Icons:**
- Lucide icons (consistent, clean, available in React). NOT Font Awesome, NOT Heroicons.
- Thin/light weight. Icons should not draw attention — they should orient.

### Technical Requirements for App Shell
- **Framework**: Next.js 14+ with App Router, React, TypeScript
- **Styling**: Tailwind CSS with custom theme. CSS variables for the color system.
- **State**: React state for now (useState/useReducer). No external state management yet.
- **Data**: Mock data in JSON files — realistic transaction data, envelope configurations, goal progress, sample assistant responses. Make the mock data feel real (actual merchant names, realistic amounts, proper dates).
- **Responsive**: Mobile-first. Bottom nav on mobile, sidebar on desktop. Breakpoint at 768px.
- **Routing**: Four main routes: `/`, `/envelopes`, `/goals`, `/ask`
- **Components**: Build a reusable component library in `/components/ui/` — this is the design system.
- **Dark mode**: Support it via Tailwind's dark mode (class strategy). Default to light.
- **i18n ready**: Use a translation pattern (even if only English for now) so Spanish can be added without refactoring.

---

## Design Principles (Apply Everywhere)

1. **Calm over urgent.** No red alerts, no aggressive notifications, no anxiety-inducing language. Even warnings are delivered calmly.
2. **Progress over perfection.** Always show how far the user has come, not just how far they have to go.
3. **Clarity over completeness.** Show less, mean more. Every element must earn its place on the screen.
4. **Warmth over sterility.** Natural colors, organic textures, human language. Not a medical chart.
5. **Intelligence over labor.** The system should feel smarter than you expect. Auto-categorize, auto-suggest, auto-adjust.

---

## Reference: Competitive Aesthetic Benchmarks

Study these for inspiration (but don't copy):
- **Copilot Money** — Best-in-class minimalism in finance. Learn from their restraint.
- **Calm app** — Warmth, natural imagery, typography-forward design. Learn from their emotional register.
- **Linear** — Clean, fast, information-dense but never cluttered. Learn from their spacing and hierarchy.
- **Notion** — Understated power. Simple surface, depth beneath. Learn from their progressive disclosure.
- **Headspace** — Friendly without being childish. Illustrations that feel adult. Learn from their tone.

**What Bamboo should NOT look like:**
- YNAB (spreadsheet energy)
- Mint/Credit Karma (ad-supported, cluttered)
- Cleo (Gen Z playful, purple, emoji-heavy)
- Generic fintech (blue gradients, stock photos of smiling people looking at phones)

---

## Deliverables

1. Landing page — fully responsive, production-ready, with all sections above
2. App shell — four views with navigation, design system components, and realistic mock data
3. Shared design system — reusable components that work across both landing page and app
4. README with setup instructions

Build this to the quality level where it could be shown to investors, put in front of beta testers, or submitted to a design showcase. This is the first impression of Bamboo Money — make it count.
