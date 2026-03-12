# Debugging Knowledge Base

## How to Use This File

**When to read**: Only when encountering an error, debugging a failure, or about to log a new bug. Do NOT load this file during normal feature work, design reviews, or planning sessions.

**When to write**: After resolving any error. Follow the maintenance rules below.

**Maintenance rules — every time you add a new entry:**
1. Check if the new error fits an existing pattern. If yes, add it as a sub-entry under that pattern — don't create a new section.
2. If it's a genuinely new pattern, create a new `## Pattern:` section.
3. Review all existing entries. If any have been permanently resolved (root cause eliminated, not just worked around), move them to `## Resolved` — keep the trigger and fix as a one-liner, drop the narrative. Resolved doesn't mean forgotten; it means low-priority but retrievable if the problem recurs.
4. If the file exceeds ~80 lines of active patterns, consolidate: merge similar entries, tighten wording, drop redundant examples.

The goal: this file should get *smarter* with each bug, not *longer*.

---

## Pattern: Environment artifacts causing false failures

The app works fine, but dev/test tooling misbehaves due to environment state.

**Diagnose environment before app code.** Check ports, lockfiles, parent directories, and process state first.

| Trigger | Root Cause | Fix |
|---------|-----------|-----|
| Dev server hangs 120s+ | Stale `package-lock.json` in `C:\Users\coche\` causes Turbopack workspace root misdetection | Delete root lockfile or set `turbopack.root` in `next.config.ts` |
| Playwright elements invisible (opacity: 0) | IntersectionObserver doesn't fire in headless mode with instant `scrollTo()` | Add `.revealed` class via `page.evaluate()`, or use `[data-testmode]` CSS override |

**Pre-flight checklist before dev server:**
- No rogue node on port 3000
- No lockfile in parent directories (or `turbopack.root` set)
- `npm run build` passes before visual testing

## Pattern: Cascading failures from aggressive recovery

Killing processes to fix one problem creates new problems (e.g., killing node also kills Playwright browser).

**Rule**: Diagnose before killing. Check what's actually stuck. Surgical fixes over `taskkill /f`.

---

## Resolved

Entries here have had their root cause eliminated, but the fix is preserved in case the problem recurs.

_Nothing yet._
