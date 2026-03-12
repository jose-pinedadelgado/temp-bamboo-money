# Bamboo Money — Experience Design Specification

*The complete guide to how Bamboo Money looks, feels, moves, and behaves.*

---

## 1. The Design Philosophy: "Organic Luxury"

Bamboo Money's aesthetic lives at the intersection of **nature and precision** — the warmth of a well-designed home and the confidence of a financial tool that knows what it's doing. Every surface should feel like it was designed by someone who cares about both beautiful typography and compound interest.

The guiding metaphor: **a leather-bound journal in a sunlit room, not a Bloomberg terminal in a fluorescent office.**

### The Three Principles

**1. Calm Authority**
The app should feel like it has everything under control — even when the user's finances don't. This means: steady visual rhythms, unhurried animations, generous breathing room, and language that's confident without being aggressive. When an envelope is overspent, the app doesn't panic. It observes, contextualizes, and suggests.

**2. Organic Warmth**
Nothing should feel cold, sterile, or machine-generated. The forest green palette, the warm ivory backgrounds, the grain texture, the serif headlines — these all contribute to a feeling of something handcrafted, natural, and alive. Financial data should feel like it belongs on a beautiful page, not in a spreadsheet cell.

**3. Progressive Depth**
The surface is simple. The depth is powerful. Every screen follows the same pattern: the most important information is immediately visible, presented with generous white space and clear hierarchy. Details are one tap away. Advanced analysis is two taps away. The user never sees more than they need — but everything they might want is reachable.

---

## 2. The Design System

### Color Palette

```
LIGHT MODE (Primary)

Background & Surfaces
  --bg-primary:        #FAF8F5    Warm ivory — the canvas everything lives on
  --bg-card:           #FFFFFF    Pure white cards — clean, lifted from the ivory
  --bg-subtle:         #F3F0EB    Slightly darker warm neutral — section dividers, input fields
  --bg-section:        #EDE9E3    Warm stone — alternating sections on landing page

Primary Brand
  --green-deep:        #1B4332    Deep forest — sidebar, headers, primary text emphasis
  --green-primary:     #2D6A4F    Forest — primary interactive elements
  --green-accent:      #52B788    Sage — progress bars, positive indicators, icon accents
  --green-light:       #D8F3DC    Mint wash — subtle tag backgrounds, hover states
  --green-glow:        rgba(82, 183, 136, 0.15)   Ambient glow behind key elements

Warm Accents
  --gold:              #D4A574    Warm gold — CTAs, premium moments, milestone celebrations
  --gold-light:        #F0DFC8    Soft gold — hover backgrounds, subtle highlights
  --sand:              #C4B5A0    Sandy stone — borders, dividers, muted elements

Text
  --text-primary:      #1B1B1B    Near-black with warmth — primary body text
  --text-secondary:    #6B6B6B    Warm gray — secondary labels, descriptions
  --text-tertiary:     #9B9B9B    Light gray — placeholders, timestamps
  --text-inverse:      #FAF8F5    Light text on dark backgrounds

Semantic
  --positive:          #52B788    Sage green — under budget, growth, good
  --caution:           #E9C46A    Warm amber — approaching limit, attention needed
  --warning:           #E76F51    Warm terracotta — overspent, needs action (NEVER harsh red)
  --info:              #457B9D    Muted blue — neutral information, links

Shadows
  --shadow-card:       0 1px 3px rgba(27, 67, 50, 0.04), 0 1px 2px rgba(0,0,0,0.04)
  --shadow-elevated:   0 4px 12px rgba(27, 67, 50, 0.08), 0 2px 4px rgba(0,0,0,0.04)
  --shadow-hover:      0 8px 24px rgba(27, 67, 50, 0.10), 0 4px 8px rgba(0,0,0,0.04)


DARK MODE

Background & Surfaces
  --bg-primary:        #1A1D21    Warm charcoal (NOT pure black)
  --bg-card:           #242830    Slightly lifted card surface
  --bg-subtle:         #2C3038    Input fields, subtle sections
  --bg-section:        #1E2126    Alternating section backgrounds

Primary Brand (adjusted for dark)
  --green-deep:        #143328    Deep forest — sidebar, darker variant
  --green-primary:     #40916C    Slightly brighter forest for dark readability
  --green-accent:      #52B788    Sage — stays consistent across modes
  --green-light:       rgba(82, 183, 136, 0.12)   Reduced opacity for dark

Warm Accents
  --gold:              #D4A574    Stays consistent
  --gold-light:        rgba(212, 165, 116, 0.15)
  --sand:              #8A7B6B    Muted for dark backgrounds

Text
  --text-primary:      #E8E4DF    Warm off-white (NOT pure white)
  --text-secondary:    #9B9590    Warm gray
  --text-tertiary:     #6B6560    Muted
```

### Typography

```
FONTS

Display / Headlines:
  Fraunces (Google Fonts)
  - Optical sizing enabled
  - Soft-serif with personality — editorial, warm, distinctive
  - Used for: page titles, section headers, stat values, goal names, hero text
  - Weights: 400 (regular), 600 (semibold), 700 (bold)

Body / UI:
  Plus Jakarta Sans (Google Fonts)  
  - Clean geometric sans-serif with warmth
  - Used for: body text, labels, navigation, buttons, input text
  - Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

Monospace / Data:
  JetBrains Mono or IBM Plex Mono
  - Used sparingly: transaction amounts in lists, code-like references
  - Weight: 400 only


TYPE SCALE (mobile-first, rem-based)

  --text-xs:     0.75rem / 1rem       12px — timestamps, fine print
  --text-sm:     0.875rem / 1.25rem   14px — secondary labels, captions
  --text-base:   1rem / 1.5rem        16px — body text, primary UI
  --text-lg:     1.125rem / 1.75rem   18px — card titles, emphasis
  --text-xl:     1.25rem / 1.75rem    20px — section headers
  --text-2xl:    1.5rem / 2rem        24px — page titles (mobile)
  --text-3xl:    1.875rem / 2.25rem   30px — hero subheadlines
  --text-4xl:    2.25rem / 2.5rem     36px — hero headlines (mobile)
  --text-5xl:    3rem / 1             48px — hero headlines (desktop)
  --text-6xl:    3.75rem / 1          60px — landing page hero (desktop)

  Stat values (financial numbers):
  Use Fraunces at --text-2xl to --text-4xl depending on prominence.
  Financial figures should always feel substantial and precise.


HEADING PATTERNS

  Page titles:      Fraunces 700, --text-2xl (mobile) / --text-3xl (desktop)
  Section headers:  Fraunces 600, --text-xl, with uppercase --text-xs label above
  Card titles:      Plus Jakarta Sans 600, --text-lg
  Labels:           Plus Jakarta Sans 500, --text-xs, uppercase, letter-spacing 0.05em
  Body:             Plus Jakarta Sans 400, --text-base
```

### Spacing & Layout

```
SPACING SCALE (4px base grid)

  --space-1:    4px
  --space-2:    8px
  --space-3:    12px
  --space-4:    16px
  --space-5:    20px
  --space-6:    24px
  --space-8:    32px
  --space-10:   40px
  --space-12:   48px
  --space-16:   64px
  --space-20:   80px
  --space-24:   96px


LAYOUT PRINCIPLES

  Mobile (< 768px):
  - Single column, full-width cards
  - Bottom navigation (64px height)
  - Content padding: 16px horizontal
  - Card gaps: 12px
  - Section gaps: 32px

  Tablet (768px – 1024px):
  - Two-column grid where appropriate
  - Sidebar navigation (240px collapsed to 72px)
  - Content padding: 24px
  - Card gaps: 16px

  Desktop (> 1024px):
  - Sidebar navigation (260px, collapsible to 72px)
  - Content max-width: 1080px, centered
  - Content padding: 32px
  - Card gaps: 20px
  - Two or three column grids for cards


BORDER RADIUS

  --radius-sm:    6px    Tags, badges, small elements
  --radius-md:    10px   Buttons, inputs
  --radius-lg:    16px   Cards, modals
  --radius-xl:    24px   Feature sections, hero elements
  --radius-full:  9999px Pills, avatars
```

### Elevation & Surfaces

```
CARD HIERARCHY

Level 0 — Flush (no elevation):
  Background sections, grouped content areas
  Background: --bg-subtle or --bg-section
  Border: none or 1px solid rgba(0,0,0,0.04)

Level 1 — Resting card:
  Standard content cards, envelope cards, transaction rows
  Background: --bg-card
  Shadow: --shadow-card
  Border-radius: --radius-lg
  Hover: translate Y -2px, shadow transitions to --shadow-elevated
  Transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)  (spring easing)

Level 2 — Elevated:
  Active/focused cards, modals, popovers, the assistant response cards
  Background: --bg-card  
  Shadow: --shadow-elevated
  Subtle top-border gradient reveal on hover:
    border-top: 2px solid transparent → gradient from --green-accent to --gold

Level 3 — Floating:
  Dropdowns, tooltips, bottom sheets
  Background: --bg-card
  Shadow: --shadow-hover
  Border-radius: --radius-xl (top only for bottom sheets)


TEXTURE & GRAIN

  Apply a subtle noise/grain overlay to --bg-primary backgrounds:
  - Use a CSS pseudo-element or SVG filter
  - Opacity: 3-5% (barely perceptible, adds organic depth)
  - Blend mode: multiply (light mode) / soft-light (dark mode)
  - This prevents the "flat digital" feeling and adds the organic warmth

  Do NOT apply grain to cards or interactive elements — only background surfaces.
```

---

## 3. App Structure & Navigation

### The Four Views

The entire app lives within four views. No more. Every feature fits inside one of these.

```
TODAY          ENVELOPES       GOALS          ASK BAMBOO
(home)         (spending)      (building)     (intelligence)

"What's        "Where is       "What am I     "Help me
happening      my money        working        understand
right now?"    going?"         toward?"       my money"
```

### Navigation Design

**Mobile (Bottom Tab Bar)**
```
┌─────────────────────────────────────────────┐
│                                             │
│              [View Content]                 │
│                                             │
├─────────────────────────────────────────────┤
│   🏠        💌         🎯        ✨          │
│  Today    Envelopes   Goals    Ask Bamboo   │
│   ●                                         │
└─────────────────────────────────────────────┘

- Height: 64px + safe area inset bottom
- Background: --bg-card with subtle top border (1px --bg-subtle)
- Icons: Lucide icons, 22px, stroke-width 1.75
- Active: --green-primary icon + label, 4px dot indicator below
- Inactive: --text-tertiary icon + label
- Labels: --text-xs, Plus Jakarta Sans 500
- Subtle blur backdrop on iOS (backdrop-filter: blur(20px))
- No hard shadows — just the thin top border for separation
```

**Desktop (Sidebar)**
```
┌──────────────┬──────────────────────────────┐
│ 🎋           │                              │
│ Bamboo Money │     [View Content]           │
│              │                              │
│ ─────────    │     Max-width: 1080px        │
│              │     Centered                 │
│ 🏠 Today     │                              │
│ 💌 Envelopes │                              │
│ 🎯 Goals     │                              │
│ ✨ Ask Bamboo│                              │
│              │                              │
│              │                              │
│              │                              │
│ ─────────    │                              │
│ ⚙ Settings   │                              │
│ 👤 Jose      │                              │
└──────────────┴──────────────────────────────┘

- Width: 260px expanded, 72px collapsed (icon-only)
- Background: gradient from --green-deep to slightly lighter variant
- Subtle radial glow accent at top-center (--green-accent at 8% opacity)
- Brand mark: 🎋 icon + "Bamboo Money" in Fraunces 600, --text-inverse
- Nav items: Plus Jakarta Sans 500, --text-sm, --text-inverse at 70% → 100% on active
- Active item: left bar (3px --green-accent) + subtle right glow + text at full opacity
- Hover: text brightens to 90%, subtle background shift
- Collapse trigger: hamburger icon or auto-collapse at 1024px breakpoint
- Custom thin scrollbar (if needed): 4px wide, --green-accent thumb
- Bottom: Settings gear + User avatar + name
```

### Transitions Between Views

- View content cross-fades (200ms ease-out) — no sliding, no page transitions that feel like separate pages. The four views should feel like *facets of one experience*, not four separate screens.
- On first load, content stagger-animates in (each card delays 50ms from the previous)
- Tab switching is instant — no loading states for cached views

---

## 4. View-by-View Experience Design

### View 1: Today (Home)

The emotional goal: **reassurance**. When the user opens Bamboo, they should feel "I know where I stand."

```
┌─────────────────────────────────────┐
│ Good morning, Jose                  │  ← Fraunces 600, --text-lg, --text-primary
│ March 9, 2026                       │  ← Plus Jakarta Sans 400, --text-sm, --text-secondary
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ NET WORTH              +$340 ↑ │ │  ← Label: uppercase --text-xs
│ │ $47,230                        │ │  ← Fraunces 700, --text-3xl, --green-deep
│ │ ▔▔▔▔▔▔▔▔▔▔▔▔▁▁▂▂▃▃▄▅▅▆▆▇    │ │  ← Tiny sparkline (last 90 days), --green-accent
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │  ← Bamboo Insight card
│ │ 🍃                              │ │  ← Small leaf icon, not emoji — custom SVG
│ │ Day 9 of March. Four of six     │ │  ← Plus Jakarta Sans 400, --text-base
│ │ envelopes are on pace. Dining   │ │
│ │ is running 20% ahead of last    │ │
│ │ month — worth watching.         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ENVELOPES                           │  ← Section label: uppercase --text-xs, letter-spacing
│                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────┐ │  ← Horizontal scroll on mobile
│ │Groceries │ │ Dining   │ │ Gas  │ │
│ │ $142     │ │ $68      │ │ $95  │ │  ← Remaining amount, Fraunces 600
│ │ remaining│ │ remaining│ │ rem. │ │  ← Plus Jakarta Sans 400, --text-xs
│ │ ████░░░░ │ │ ██░░░░░░ │ │█████ │ │  ← Thin progress bar (4px height)
│ │          │ │ ⚠        │ │      │ │  ← Amber warning dot when >75% spent
│ └──────────┘ └──────────┘ └──────┘ │
│                                     │
│ UPCOMING                            │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Netflix        Mar 12    $17.99 │ │  ← Clean row, minimal
│ │ Car Insurance  Mar 15    $89.00 │ │
│ │ Spotify        Mar 18     $9.99 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ RECENT                              │
│                                     │
│  Trader Joe's    Groceries   -$34.20│  ← Transaction rows: merchant, envelope, amount
│  Shell Gas       Gas         -$48.50│
│  Amazon          Shopping    -$23.99│
│  Venmo from Lisa             +$45.00│
│                                     │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│           See all transactions →    │
└─────────────────────────────────────┘
```

**Key design decisions:**
- Net worth is the first data point. It grounds the user in their overall position. The sparkline shows trajectory without demanding analysis.
- The Bamboo insight is one card with one observation. Not three insights, not a feed. One thing to notice today.
- Envelope summary is a horizontal scroll of compact cards. Only shows the 4-5 most active envelopes. Tap any to go to Envelopes view with that envelope expanded.
- Upcoming bills are just the next 3. Clean rows, no icons, no cards — just data.
- Recent transactions are 4-5 rows with merchant, envelope assignment, and amount. Tap to see details or reassign.

### View 2: Envelopes

The emotional goal: **control**. The user should feel "I know exactly where my money is."

```
┌─────────────────────────────────────┐
│ Envelopes                           │  ← Fraunces 700, --text-2xl
│ $1,242 remaining · 21 days left     │  ← Total remaining across all envelopes
│                                     │
│ ┌─────── Search / Filter ─────────┐ │  ← Subtle search bar, --bg-subtle
│ └─────────────────────────────────┘ │
│                                     │
│ ESSENTIALS                          │  ← Group label: uppercase --text-xs, --text-secondary
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🛒 Groceries                    │ │
│ │                                 │ │
│ │ $142 remaining    of $600       │ │  ← Fraunces 600 for amount, Plus Jakarta for label
│ │ ████████████████░░░░░░░░░░░░░░ │ │  ← Progress bar: --green-accent fill
│ │                                 │ │
│ │ $458 spent · $15.26/day pace    │ │  ← --text-sm, --text-secondary
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🏠 Rent / Mortgage              │ │
│ │                                 │ │
│ │ $0 remaining      of $1,800     │ │  ← This envelope is fully spent (paid rent)
│ │ ████████████████████████████████│ │  ← Full bar but in neutral gray — "complete"
│ │                                 │ │
│ │ Paid Mar 1 ✓                    │ │  ← Subtle check, not celebration — it's routine
│ └─────────────────────────────────┘ │
│                                     │
│ LIFESTYLE                           │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🍽 Dining                       │ │
│ │                                 │ │
│ │ $68 remaining     of $300       │ │
│ │ █████████████████████████░░░░░░ │ │  ← --caution amber — approaching limit
│ │                                 │ │
│ │ $232 spent · Pace: 22% ahead ⚠ │ │  ← Warning indicator when pace exceeds plan
│ └─────────────────────────────────┘ │
│                                     │
│ [... more envelopes ...]            │
│                                     │
│ GROWTH                              │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 📈 Debt Payoff                  │ │
│ │                                 │ │
│ │ $400 allocated    this month    │ │
│ │ Remaining balance: $8,200       │ │  ← Different display — shows what's left to pay
│ │ Debt-free by: Nov 2027          │ │  ← Projected date, --green-accent
│ └─────────────────────────────────┘ │
│                                     │
│       ╔═══════════════════════╗     │
│       ║   + Add Envelope      ║     │  ← Dashed border, --text-secondary
│       ╚═══════════════════════╝     │
│                                     │
└─────────────────────────────────────┘
```

**Expanded envelope (tap to open):**
When you tap an envelope card, it expands inline (not a new page) to show:
- Transaction list for this envelope (current month)
- Small bar chart: daily spending pattern this month
- Bamboo's observation: "You tend to overspend groceries on weekends after payday. This weekend is the 15th — payday for many households."
- "Adjust Budget" action

**Key design decisions:**
- Group headers (Essentials, Lifestyle, Growth) provide structure without adding navigation
- Progress bars are 4px thin — prominent enough to see at a glance, not so thick they dominate
- Colors shift naturally: --green-accent (healthy) → --caution (approaching) → --warning (over). No harsh red.
- The daily pace calculation ("$15.26/day pace") is the behavioral insight that prevents month-end surprises
- Growth envelopes display differently — showing what you're building, not what you're spending

### View 3: Goals

The emotional goal: **aspiration**. The user should feel "This is what I'm building."

```
┌─────────────────────────────────────┐
│ Your Goals                          │  ← Fraunces 700, --text-2xl
│ 3 active · $14,800 total target     │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │  EMERGENCY FUND                 │ │  ← Uppercase label, --text-xs, --green-accent
│ │                                 │ │
│ │     $3,400                      │ │  ← Fraunces 700, --text-3xl, --green-deep
│ │     of $10,000                  │ │  ← Plus Jakarta 400, --text-sm, --text-secondary
│ │                                 │ │
│ │  ┃                              │ │
│ │  ┃  ← Vertical progress        │ │  ← A thin vertical bar (or bamboo stalk)
│ │  ┃     styled as bamboo         │ │     that grows upward as progress increases.
│ │  ┃     growth                   │ │     34% filled = 34% of stalk height.
│ │  ┃                              │ │     Subtle leaf nodes at 25%, 50%, 75%, 100%.
│ │  ┃                              │ │
│ │  ╻ ← 34%                       │ │
│ │                                 │ │
│ │  $200/month · On pace for       │ │
│ │  January 2029                   │ │
│ │                                 │ │
│ │  "At current pace, you'll       │ │  ← Bamboo insight, inline, --text-sm
│ │   reach 3 months of expenses    │ │
│ │   by August. Half a safety      │ │
│ │   net is still a safety net."   │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  JAPAN TRIP                     │ │
│ │                                 │ │
│ │     $1,800                      │ │
│ │     of $4,000                   │ │
│ │                                 │ │
│ │  ┃┃┃┃┃┃┃┃┃┃╻╻╻╻╻╻╻╻╻╻        │ │  ← Horizontal variant also works
│ │  ████████████░░░░░░░░░░  45%   │ │
│ │                                 │ │
│ │  $150/month · Target: Oct 2026  │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  CREDIT CARD FREEDOM            │ │
│ │                                 │ │
│ │     $8,200 remaining            │ │  ← For debt goals, show remaining (shrinking)
│ │     of $12,000 original         │ │
│ │                                 │ │
│ │  ████████████████░░░░░░░  32%   │ │  ← 32% paid off
│ │                                 │ │
│ │  $400/month · Debt-free by      │ │
│ │  November 2027                  │ │
│ │                                 │ │
│ │  "You've eliminated $3,800 in   │ │
│ │   debt since you started.       │ │
│ │   That's $3,800 that isn't      │ │
│ │   accruing interest anymore."   │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│       ╔═══════════════════════╗     │
│       ║   + Plant a New Goal  ║     │  ← Bamboo-metaphor language
│       ╚═══════════════════════╝     │
│                                     │
└─────────────────────────────────────┘
```

**Key design decisions:**
- Goal cards are larger and more spacious than envelope cards — they deserve more visual weight because they represent what the user is building toward
- Each goal has an inline Bamboo insight — personalized, encouraging, data-grounded
- The bamboo stalk growth visualization is the signature visual moment. It can be implemented as a vertical progress bar with subtle leaf/node markers at quartile milestones. When a user reaches 25%, 50%, 75%, or 100%, the stalk "sprouts" a leaf node — a small celebratory visual moment.
- Debt goals invert the framing: instead of "amount saved," show "amount eliminated" — psychologically more powerful
- "Plant a New Goal" uses the bamboo metaphor naturally

### View 4: Ask Bamboo

The emotional goal: **understanding**. The user should feel "I can get answers about my money instantly."

```
┌─────────────────────────────────────┐
│ Ask Bamboo                          │  ← Fraunces 700, --text-2xl
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🔍 Ask anything about your      │ │  ← Large input, --bg-subtle, --radius-lg
│ │    finances...                   │ │     Placeholder text in --text-tertiary
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─── Suggested ───────────────────┐ │  ← Pill buttons for common queries
│ │ How did we do this month?       │ │
│ │ Am I on track for my goals?     │ │     --bg-subtle, --radius-full
│ │ Where can I cut spending?       │ │     Tap to auto-submit the query
│ │ Compare this month to last      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ RECENT INSIGHTS                     │  ← Feed of proactive observations
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🍃 Today                        │ │  ← Leaf icon, date label
│ │                                 │ │
│ │ Your grocery spending averaged  │ │
│ │ $187/week this month — $22      │ │
│ │ above your envelope target.     │ │
│ │ The increase is concentrated    │ │
│ │ on weekends.                    │ │
│ │                                 │ │
│ │  How can I reduce weekend       │ │  ← Suggested follow-up, pill button
│ │  grocery spending?              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🍃 Yesterday                    │ │
│ │                                 │ │
│ │ Three recurring charges         │ │
│ │ haven't been used in 60+ days:  │ │
│ │                                 │ │
│ │  Hulu           $17.99/mo       │ │  ← Clean data table inline
│ │  Headspace      $12.99/mo       │ │
│ │  Planet Fitness  $45.00/mo      │ │
│ │                                 │ │
│ │ Total: $75.98/month             │ │
│ │ Annual: $911.76                 │ │  ← Fraunces 600 for the total
│ │                                 │ │
│ │  Review subscriptions           │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**When the user asks a question:**
```
┌─────────────────────────────────────┐
│ "How did we do this month?"         │  ← User query shown at top, --text-secondary
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │ March Summary (through day 9)   │ │  ← Fraunces 600, --text-lg
│ │                                 │ │
│ │ Total spent     $2,140          │ │  ← Clean two-column data
│ │ Total budget    $4,800          │ │
│ │ Remaining       $2,660          │ │  ← --green-accent for positive
│ │ Daily pace      $237/day        │ │
│ │ Budget pace     $238/day        │ │  ← Almost exactly on track
│ │                                 │ │
│ │ ─────────────────────────────── │ │
│ │                                 │ │
│ │ Envelopes on pace:    4 of 6   │ │
│ │ Dining is 22% ahead of target  │ │  ← --caution for the item worth watching
│ │ Groceries running slightly hot  │ │
│ │                                 │ │
│ │ Net worth: +$340 this month     │ │  ← --green-accent
│ │                                 │ │
│ │ Overall: You're tracking well.  │ │
│ │ The main thing to watch is      │ │
│ │ dining — if the pace holds,     │ │
│ │ you'll go $66 over by month     │ │
│ │ end. Cooking three more meals   │ │
│ │ at home this month would close  │ │
│ │ that gap.                       │ │
│ │                                 │ │
│ │  What are my biggest expenses?  │ │  ← Follow-up suggestions
│ │  Show me a spending breakdown   │ │
│ │  How does this compare to Feb?  │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Key design decisions:**
- NOT a chat interface. No bubbles, no avatar, no typing indicator. It's a query → structured response pattern. More like a search engine for your money than a chatbot.
- Responses are structured cards with clear data hierarchy: summary stats at top, narrative analysis below, follow-up actions at bottom.
- Proactive insights populate the feed even when the user hasn't asked anything — this is the value that keeps users coming back.
- The suggested queries as pill buttons lower the friction to zero — you don't have to think of a question.

---

## 5. Interaction Patterns & Animation

### Page Load
- Staggered fade-up: each content block animates in with a 50ms delay from the previous
- Animation: `opacity 0 → 1, translateY 12px → 0, 400ms ease-out`
- Net worth number counts up from 0 (typewriter effect for numbers, 800ms)

### Card Hover (Desktop)
- Transform: `translateY(-2px)`
- Shadow: transition from --shadow-card to --shadow-elevated
- Top border: gradient reveal from transparent to `--green-accent → --gold`
- Timing: `300ms cubic-bezier(0.34, 1.56, 0.64, 1)` (spring easing)

### Envelope Progress Bars
- On first appearance: fill animates from 0% to current percentage over 600ms
- Color transitions: smooth shift from --green-accent to --caution to --warning as percentage increases
- When an envelope updates (new transaction): the bar adjusts with a 300ms ease-out

### Goal Growth Animation
- When a goal milestone is reached (25%, 50%, 75%, 100%): a subtle leaf/sprout animation at the node point
- The bamboo stalk growth should feel organic — use a slight wobble/ease-out that suggests natural growth rather than mechanical filling

### Tab Transitions
- Content cross-fades: 200ms ease-out
- No sliding, no page pushes — the four views are facets of one space

### Pull-to-Refresh (Mobile)
- Custom animation: a small bamboo leaf appears and "falls" as you pull down
- Refresh indicator: a gentle rotation, not a spinner

### Notification/Insight Cards
- Enter from bottom with a subtle slide + fade: `translateY(8px) → 0, opacity 0 → 1, 300ms ease-out`
- Dismiss with swipe right (mobile) or X button that fades out

---

## 6. The Settings & Profile Layer

Settings should be minimal and organized. Accessible from the sidebar (desktop) or top-right avatar (mobile).

**Settings sections:**
- **Profile** — Name, email, avatar, language preference (English / Español)
- **Accounts** — Connected bank accounts, add/remove, sync status
- **Household** — Invite partner, manage members, shared vs. individual envelopes
- **Envelopes** — Default categories, create custom, adjust monthly allocations
- **Notifications** — Envelope alerts (on/off, thresholds), bill reminders, weekly summary, Bamboo insights
- **Appearance** — Light/Dark mode toggle, compact/comfortable density
- **Data** — Export (CSV, Excel), import, delete account
- **Subscription** — Current plan, upgrade, billing

Settings should NOT be a place users need to visit often. The app should be smart enough that most configuration happens through the main experience (Bamboo suggests envelope adjustments, onboarding configures defaults, etc.).

---

## 7. Onboarding Flow

The first experience with Bamboo Money defines everything. It should take less than 5 minutes and end with the user seeing their personalized "Today" view.

**Step 1: Welcome**
- "Welcome to Bamboo Money."
- "Let's set up your financial picture. This takes about 3 minutes."
- [Get Started] button

**Step 2: What matters to you?** (1 screen, multi-select)
- "What are you working toward?"
- Options: Paying off debt / Building savings / Tracking spending / Saving for something specific / Getting organized with a partner / Just getting started
- This configures: default envelopes, goal suggestions, assistant focus

**Step 3: Connect accounts** (optional — can skip)
- "Connect your bank accounts for automatic tracking, or start manually."
- [Connect with Plaid] or [I'll add transactions manually] or [Import CSV]
- Emphasis: "You can always add accounts later."

**Step 4: Set up envelopes** (auto-generated with adjustment)
- Bamboo generates recommended envelopes based on Step 2 responses (and transaction history if accounts were connected)
- "Here's a starting plan based on your priorities. Adjust anything that doesn't feel right."
- User can tweak amounts, add/remove envelopes
- Simple sliders or number inputs — not a spreadsheet

**Step 5: Plant your first goal**
- "What's the first thing you want to grow toward?"
- Simple form: Goal name, target amount, target date
- Bamboo calculates: "That's $X per month. Based on your envelopes, that's achievable."

**Step 6: Your Today view**
- The personalized home screen appears with their data (or sample data if no accounts connected)
- Bamboo's first insight: "You're all set. I'll be here to help you stay on track. Check in anytime."

**Design for onboarding:**
- One question per screen. No long forms.
- Progress indicator: 6 small dots at top, filling in as user advances
- Background: subtle bamboo illustration that grows step by step (1 stalk at step 1, small leaves at step 3, full grove at step 6)
- Animation: each screen fades in gently, not slides

---

## 8. Summary of Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Navigation | 4 views, bottom tab (mobile), sidebar (desktop) | Simplicity is the product. Every addition dilutes. |
| Primary typeface | Fraunces (serif display) | Distinctive, warm, editorial. Immediately differentiates from every competitor using sans-serif. |
| Body typeface | Plus Jakarta Sans | Clean but not cold. Personality without distraction. |
| Color system | Forest green + warm gold on warm ivory | Natural, calming, premium. Anti-fintech-blue. |
| Card style | White on ivory, 16px radius, warm shadows, gradient top-border on hover | Organic luxury — cards feel like objects, not rectangles. |
| Progress bars | 4px thin, color-shifting (green → amber → terracotta) | Present but not dominant. Data, not decoration. |
| Assistant voice | Calm, grounded, confident. No emoji, no exclamation marks. | Elevated advisor, not chatbot. Respects user intelligence. |
| Assistant UI | Query → structured response cards, NOT chat bubbles | Financial analysis tool, not messenger. |
| Onboarding | 6 steps, one question per screen, < 5 minutes | Lower friction than any competitor. Smart defaults over manual setup. |
| Goal visualization | Vertical bamboo growth with leaf milestones | The signature visual moment. Organic, motivating, ownable. |
| Grain texture | 3-5% opacity noise on backgrounds | Organic depth. Prevents flat-digital feeling. |
| Dark mode | Warm charcoal (#1A1D21), not pure black | Consistent warmth across both modes. |
| Spanish support | First-class, not afterthought | Underserved market of 62M+ bilingual Americans. Real differentiator. |
| Price display | "$4.17/month" framing for annual plan | Psychological accessibility. Less than a coffee. |

---

*This specification should be treated as the source of truth for all Bamboo Money design decisions. It supersedes any earlier design documents. When in doubt, return to the three principles: Calm Authority, Organic Warmth, Progressive Depth.*
