Bamboo Money — Error Log
Errors encountered during development, including root cause analysis and resolutions.

## 2026-03-10 — Dev server hang on /app route
**Task**: Starting dev server and navigating to /app in Playwright
**Error**: Navigation timeout — page.goto hung for 120s+
**Root Cause**: Multiple lockfiles (root `C:\Users\coche\package-lock.json` + project `package-lock.json`) caused Next.js workspace root inference to slow Turbopack compilation. Combined with killing node processes which severed the Playwright browser connection.
**Resolution**: Killed all node processes, restarted dev server fresh, waited for "Ready" message. `/app` returned 200 in ~1s after restart.
**Rule**: Always wait for the "Ready in Xms" dev server message before navigating. If dev server seems stuck, check for lockfile conflicts in parent directories.

---

## 2026-03-10 — Scroll-reveal sections invisible in Playwright screenshots
**Task**: Visual review of landing page in Playwright headless browser
**Error**: Sections using `.scroll-reveal` class were invisible (opacity: 0) — IntersectionObserver didn't trigger
**Root Cause**: Playwright's `scrollTo()` jumps instantly, which may not trigger IntersectionObserver reliably in headless mode. The observer needs time to process entries.
**Resolution**: Manually added `.revealed` class to all scroll-reveal elements via `page.evaluate()`. In real browsers, scroll animations work normally.
**Rule**: For automated visual testing, either disable scroll animations or manually trigger reveals. Don't rely on IntersectionObserver in headless Playwright.

---

## 2026-03-15 — NavRail/Sidebar overlap at ≥1200px (Tailwind v4 arbitrary breakpoint cascade)
**Task**: Implementing three-tier responsive nav with Sidebar (≥1200px), NavRail (768–1199px), BottomNav (<768px)
**Error**: Both Sidebar and NavRail rendered simultaneously at ≥1200px. NavRail's `min-[1200px]:hidden` did not override `md:flex`.
**Root Cause**: Tailwind v4 (with Turbopack/Next.js) generates arbitrary breakpoint media queries (`min-[1200px]:`) in a CSS cascade position that comes *before* standard breakpoints (`md:`). Since both `@media (min-width: 768px)` and `@media (min-width: 1200px)` match at ≥1200px, the later-appearing `md:flex` wins over the earlier-appearing `min-[1200px]:hidden`. Attempted fix with `@theme { --breakpoint-desktop: 1200px; }` also failed — Tailwind v4 with Turbopack did not generate any CSS for the custom named breakpoint.
**Resolution**: Replaced Tailwind utility classes with explicit CSS `@media (min-width: 1200px)` rules in `globals.css` targeting `.sidebar`, `.nav-rail`, and `#main-content`. These rules have guaranteed cascade ordering since they're plain CSS.
**Rule**: In Tailwind v4 with Turbopack, do NOT use arbitrary breakpoint values (`min-[Xpx]:`) to override standard breakpoints (`md:`, `lg:`). The CSS cascade ordering is unreliable. Use explicit `@media` rules in CSS for custom breakpoints, or verify that `@theme` breakpoint registration works in your build pipeline before relying on named custom breakpoints.

---

<!-- Entries will be appended below by Claude Code. Do not delete this file. -->