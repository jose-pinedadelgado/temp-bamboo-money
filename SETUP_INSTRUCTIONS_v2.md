# Bamboo Money — Claude Code Setup (Revised)

## Project Folder Structure

```
C:\Users\coche\Documents\Research_Projects\0_bamboo_money\
│
├── CLAUDE.md                          ← Concise project instructions (auto-read every session)
│
├── .claude/
│   └── skills/
│       └── frontend-design.md         ← Full frontend design skill (read conditionally for UI work)
│
├── docs/
│   ├── Bamboo_Money_Experience_Design.md   ← Primary design reference (wireframes, tokens, animations)
│   ├── Bamboo_Money_Strategy_v2.md         ← Product strategy, competitive positioning
│   ├── Bamboo_Money_Users_and_Integration.md ← User personas, navigation architecture
│   ├── Personal_Finance_App_Market_Research.md ← Market data, CAGRs, landscape
│   ├── CLAUDE_CODE_PROMPT.md               ← Detailed build specs for landing page + app shell
│   ├── error-log.md                        ← Error tracking (appended by Claude Code)
│   └── session-log.md                      ← Session summaries (appended by Claude Code)
│
├── src/                               ← Next.js app (created during build)
├── public/
├── package.json
└── ...
```

## Setup Steps

### 1. Create the folder structure
```bash
mkdir -p 0_bamboo_money/.claude/skills
mkdir -p 0_bamboo_money/docs
```

### 2. Place the files
- Copy `CLAUDE.md` → project root
- Copy the frontend-design SKILL.md content → `.claude/skills/frontend-design.md`
  (Get it from: https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md — copy the raw markdown content)
- Copy all five strategy/design docs → `docs/`
- Copy both log templates (`error-log.md`, `session-log.md`) → `docs/`

### 3. How the CLAUDE.md works

The revised CLAUDE.md is ~100 lines and follows best practices:

**What's IN the CLAUDE.md** (always loaded, every session):
- Project identity (one line)
- Tech stack (what to use)
- Commands (how to build/test/lint)
- Design system tokens (the non-negotiable colors, fonts, spacing)
- Architecture (four views, navigation rules)
- Design principles (five rules)
- Workflow instructions (plan → build → verify → log)
- Gotchas (things Claude gets wrong without explicit reminders)

**What's NOT in the CLAUDE.md** (loaded on demand via progressive disclosure):
- Full frontend design skill → `.claude/skills/frontend-design.md`
- Detailed wireframes and animation specs → `docs/Bamboo_Money_Experience_Design.md`
- Product strategy and competitor analysis → `docs/Bamboo_Money_Strategy_v2.md`
- User personas → `docs/Bamboo_Money_Users_and_Integration.md`
- Market research → `docs/Personal_Finance_App_Market_Research.md`
- Detailed build specifications → `docs/CLAUDE_CODE_PROMPT.md`

The CLAUDE.md tells Claude Code *when* to read each file — only when the task requires it.

### 4. The three workflow features

**Planning**: Claude Code will state its plan and wait for confirmation before coding anything multi-file. This prevents wasted work and lets you course-correct early.

**Verification**: After every implementation, Claude Code runs build + lint + test and describes the output. This catches issues immediately rather than accumulating debt.

**Error logging** (`docs/error-log.md`): Every error gets logged with: what happened, root cause, what was tried, what worked, and how to prevent it. This creates a project-specific knowledge base that compounds over time — Claude Code can reference past errors to avoid repeating them.

**Session logging** (`docs/session-log.md`): At the end of each session (or when you ask), Claude Code writes a summary of what was accomplished, decisions made, and open items. This is your minute-taker — it creates continuity between sessions so you never lose context on what happened.

### 5. Prompt 1 — Context Setup

Send this as your first message to Claude Code:

---

```
I'm building Bamboo Money — a behavior-first personal finance app. Read the CLAUDE.md in the project root for core instructions, then confirm you understand:
1. The tech stack (Next.js, TypeScript, Tailwind)
2. The design system (forest green, Fraunces + Plus Jakarta Sans, warm ivory)
3. The four-view architecture (Today, Envelopes, Goals, Ask Bamboo)
4. The workflow (plan before coding, verify after, log errors and sessions)
5. The progressive context files in docs/ that you should read when relevant

Then read docs/Bamboo_Money_Experience_Design.md and docs/CLAUDE_CODE_PROMPT.md since we're about to build the frontend.

Confirm you're ready.
```

---

### 6. Prompt 2 — Build Request

After confirmation, send:

---

```
Build the Bamboo Money landing page and core app shell.

Start with the landing page — a conversion-focused marketing page for waitlist signups. The detailed spec is in docs/CLAUDE_CODE_PROMPT.md (Part 1: Landing Page) and the design tokens are in docs/Bamboo_Money_Experience_Design.md.

Key sections:
1. Hero with bamboo growth animation and waitlist CTA
2. Three pain points ("budgeting feels like homework" / "dashboards show everything but change nothing" / "five apps for one life")
3. Three pillars (Envelopes / Subscriptions / Net Worth)
4. Assistant examples as structured insight cards (not chat bubbles)
5. Competitive positioning (vs YNAB, Monarch, Rocket Money — one sentence each)
6. Who it's for (persona cards)
7. Pricing (Free vs $49.99/yr Premium)
8. Footer with waitlist signup

Then build the app shell with all four views populated with realistic mock data. Wireframes for each view are in the Experience Design doc section 4. Use real merchant names, realistic amounts, proper dates.

Read .claude/skills/frontend-design.md before starting any frontend code.

Plan your approach first, then build.
```

---

### 7. Follow-up prompts

**After the initial build:**
```
Review the build against docs/Bamboo_Money_Experience_Design.md. Check every color, font, shadow, radius, and animation against the spec. Fix any deviations. Then run build + lint + test and log any errors.
```

**To get a session summary:**
```
Write a session summary to docs/session-log.md covering everything we accomplished, decisions made, and open items.
```

**To review the error log:**
```
Read docs/error-log.md and identify any patterns in the errors we've encountered. Suggest preventive measures.
```

**For dark mode:**
```
Implement dark mode using the dark palette from the Experience Design doc. Use Tailwind class strategy. Sidebar shifts to deeper forest tones. Text uses warm off-white #E8E4DF, never pure white.
```

**For Spanish:**
```
Add i18n support with next-intl. Create English and Spanish translation files for all UI labels, navigation, onboarding, and landing page. The assistant's example insights need Spanish versions too.
```

---

## Tips from Best Practices Research

1. **If Claude Code ignores a rule**, the CLAUDE.md is probably too long or the rule is buried. Move the ignored rule higher or add "IMPORTANT" emphasis.

2. **Use `/compact` when context gets long** — but add a note like `/compact Focus on the current build task and preserve the design system rules`.

3. **Use `/clear` between major tasks** — if you finish the landing page and start the app shell, clear context to avoid contamination.

4. **Review CLAUDE.md monthly** — delete rules Claude already follows naturally, add rules for things it keeps getting wrong. The file should evolve with the project.

5. **The error log is your compounding advantage** — after 10-20 sessions, Claude Code can reference past errors to avoid repeating them. This is rare and valuable.
