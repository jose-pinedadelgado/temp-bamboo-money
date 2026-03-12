# Bamboo Money

Behavior-first personal finance platform — envelope budgeting, subscription management, net worth tracking. "Organic Luxury" aesthetic: calm, warm, natural.

## Tech Stack
- Next.js 14+ (App Router), React, TypeScript, Tailwind CSS
- Icons: Lucide React (not Font Awesome, not Heroicons)
- Fonts: Fraunces (headlines) + Plus Jakarta Sans (body) via Google Fonts
- State: React useState/useReducer. No external state management yet.
- Dark mode: Tailwind class strategy

## Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run linter
npm run test         # Run test suite
npm run test:watch   # Tests in watch mode
```

## Design System — Non-Negotiable
These are locked decisions. Do not deviate or substitute:
- Forest green `#1B4332` · Sage `#52B788` · Gold `#D4A574` · Ivory `#FAF8F5` · Terracotta `#E76F51`
- Dark mode: `#1A1D21` (never pure black). Cards: white, 16px radius, warm shadows.
- Typography: Fraunces for ALL headlines/stat values. Plus Jakarta Sans for ALL body/UI. NEVER Inter, Roboto, Arial, or system fonts.
- Spacing: 4px grid. Radius: 16px cards, 10px buttons, 6px tags.

## Architecture
Four views only — do not add more:
1. **Today** (`/`) — greeting, net worth, insight card, envelope summary, bills, recent activity
2. **Envelopes** (`/envelopes`) — grouped by Essentials/Lifestyle/Growth
3. **Goals** (`/goals`) — bamboo growth visualization, aspirational
4. **Ask Bamboo** (`/ask`) — structured insight cards, NOT chat bubbles

Navigation: bottom tabs on mobile (<768px), sidebar on desktop.

## Design Principles
1. Calm over urgent — no harsh red alerts or anxiety language
2. Progress over perfection — show how far they've come
3. Clarity over completeness — every element earns its place
4. Warmth over sterility — organic textures, human language
5. Intelligence over labor — auto-categorize, auto-suggest

## Progressive Context — Read When Relevant
- **UI/frontend/design work** → Read `.claude/skills/frontend-design.md` FIRST, then `docs/Bamboo_Money_Experience_Design.md`
- **Product decisions** → Read `docs/Bamboo_Money_Strategy_v2.md`
- **User personas/targeting** → Read `docs/Bamboo_Money_Users_and_Integration.md`
- **Market context/competitors** → Read `docs/Personal_Finance_App_Market_Research.md`
- **Detailed build specs** → Read `docs/CLAUDE_CODE_PROMPT.md`
- **Before any task** → Check `docs/error-log.md` for past mistakes in similar work, and `docs/decisions.md` for prior choices

## Workflow — Compound Engineering Loop

Follow this loop for every task. 80% of value comes from Plan + Review, 20% from Work + Compound.

### 1. Plan (before any code)
YOU MUST plan before coding any multi-file task:
1. **Research**: Read relevant codebase files, check `docs/error-log.md` for past issues with similar work, and check `docs/decisions.md` for prior architectural choices
2. State what you understand the task to be
3. List the files you will create or modify
4. Describe your approach in 3-5 bullet points
5. Identify risks, edge cases, and how you'll test
6. Wait for confirmation before proceeding (unless told to proceed autonomously)

### 2. Work (implement the plan)
Build according to the approved plan. Write tests alongside implementation, not after.

### 3. Review (verify against standards)
After implementation, YOU MUST:
1. Run `npm run build` — confirm no build errors
2. Run `npm run lint` — confirm no lint errors
3. Run `npm run test` — confirm all tests pass
4. Review your own output against the design system (correct colors, fonts, spacing, radius?)
5. Describe what was built and how to see/navigate to it
6. Flag anything you're uncertain about

### 4. Compound (feed learnings back)
After every completed task:
- If an error occurred → append to `docs/error-log.md` (format below)
- If a design/architecture decision was made → append to `docs/decisions.md`
- If you discovered a pattern worth reusing → note it in the session log
- If something in this CLAUDE.md is wrong or missing → tell me so we can update it

**The system should get smarter with each task.** Every bug becomes a permanent lesson. Every decision becomes a documented standard. Every pattern becomes a reusable tool.

### Error Log Format (`docs/error-log.md`)
```markdown
## [DATE] — [Brief Description]
**Task**: What you were doing
**Error**: Actual error message or behavior
**Root Cause**: Why it happened
**Resolution**: What fixed it (or "UNRESOLVED")
**Rule**: What to always/never do to prevent this
---
```

### Decision Log Format (`docs/decisions.md`)
```markdown
## [DATE] — [Decision Title]
**Context**: What prompted this decision
**Decision**: What was decided
**Alternatives Considered**: What else was an option
**Rationale**: Why this choice
---
```

### Session Log (`docs/session-log.md`)
At the END of each session (or when asked), append:
```markdown
## Session — [DATE]
**Goal**: What we set out to do
**Completed**: [What was accomplished]
**Decisions Made**: [Any choices — also log these in decisions.md]
**Patterns Discovered**: [Reusable approaches worth remembering]
**Open Items**: [What's unresolved]
**Files Changed**: [List of files created/modified]
---
```

## Gotchas
- The grain/noise texture goes on background surfaces ONLY, never on cards or interactive elements
- Assistant responses use structured cards, never chat bubbles. No emoji. No exclamation marks.
- Envelope progress bars are 4px thin. Color shifts: sage → amber → terracotta (never harsh red).
- The bamboo growth visualization on goals uses vertical progress with leaf nodes at 25/50/75/100%.
- All financial numbers should use Fraunces (the serif display font), not the body sans-serif.