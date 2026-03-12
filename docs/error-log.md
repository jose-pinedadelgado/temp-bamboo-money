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

<!-- Entries will be appended below by Claude Code. Do not delete this file. -->