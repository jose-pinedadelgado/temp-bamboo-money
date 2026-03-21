# Day 4: Auth & Protected Routes

## Goal
Build a login/register flow so React can authenticate with Django, get a session cookie, and load real user data on every page. This is the unlock — after Day 4, the pipes from Day 2 actually flow.

---

## Step 1: Auth context provider (30 min)

### What
`src/contexts/AuthContext.tsx` — React context that:
- On app load: calls `GET /api/auth/me/` to check if already logged in (existing session cookie)
- Provides: `user`, `isAuthenticated`, `isLoading`, `login()`, `logout()`, `register()`
- Wraps the entire app

### Test
- No cookie → `isAuthenticated = false`, `user = null`
- Valid cookie → `isAuthenticated = true`, `user = { id, username, email }`

---

## Step 2: Login page (30 min)

### What
`src/app/login/page.tsx` — styled with Bamboo design system:
- Username + password fields
- "Sign in" button
- "Don't have an account? Register" link
- Error display for wrong credentials
- On success: redirect to `/app` (Today page)

Design notes (matching Bamboo aesthetic):
- Card centered on page, ivory background
- Fraunces for "Welcome back" heading
- Jakarta Sans for form labels
- Forest green primary button
- No harsh red errors — warm terracotta for validation

### Test
1. Enter valid credentials → redirected to Today → real data loads
2. Enter wrong password → warm error message, no redirect
3. Empty fields → client-side validation prevents submit

---

## Step 3: Register page (20 min)

### What
`src/app/register/page.tsx`:
- Username, email (optional), password, confirm password
- "Create account" button
- "Already have an account? Sign in" link
- On success: auto-login → redirect to `/app`

### Test
1. Register new user → logged in → Today page with empty data (new user, no transactions)
2. Register existing username → error message
3. Passwords don't match → client-side validation

---

## Step 4: Protected route wrapper (20 min)

### What
`src/components/auth/ProtectedRoute.tsx`:
- Wraps all `/app/*` pages
- If `isAuthenticated = false` and `isLoading = false` → redirect to `/login`
- If `isLoading = true` → show loading skeleton (not blank flash)
- If `isAuthenticated = true` → render children

Wire into `src/app/app/layout.tsx` so all app pages are protected.

### Test
1. Not logged in → visit `/app` → redirected to `/login`
2. Logged in → visit `/app` → Today page loads
3. Refresh page → session cookie persists → still logged in (no re-login)
4. Visit `/login` while logged in → redirected to `/app`

---

## Step 5: Logout (10 min)

### What
- Add logout button to Sidebar/BottomNav (small, bottom of nav)
- Calls `POST /api/auth/logout/` → clears session
- Redirects to `/login`

### Test
1. Click logout → redirected to login
2. Hit back button → still on login (session gone, protected route kicks in)
3. Try `/api/dashboard/` directly → 401

---

## Step 6: Wire user data into pages (15 min)

### What
Update hooks to use auth context:
- `useDashboard()` passes `user.username` to `adaptDashboard()` for greeting
- Demo mode banner only shows when `isDemo = true` (not just when API fails — could fail for other reasons)

Update Today page:
- Greeting uses real username from auth context
- If new user with no data → show "Let's set up your first envelope" prompt instead of empty cards

### Test
1. Login as demo2 → Today shows "Good evening, demo2" with real net worth
2. Login as new user → Today shows onboarding prompts

---

## Step 7: Session persistence & CSRF (15 min)

### What
Django sessions use cookies. Verify:
- `SESSION_COOKIE_SAMESITE = "Lax"` (allows cross-origin with credentials)
- `SESSION_COOKIE_HTTPONLY = True` (JS can't read cookie — XSS safe)
- CSRF is already exempted for `/api/*` routes via `ApiCsrfExemptMiddleware`
- Session expiry: default 2 weeks (Django default) — fine for now

### Test
1. Login → close browser → reopen → still logged in
2. Wait 24h → still logged in (2-week expiry)
3. Inspect cookies in DevTools → session cookie is httpOnly, SameSite=Lax

---

## Step 8: End-to-end test (15 min)

Full flow:
1. Open `http://localhost:3000` → redirected to `/login`
2. Click "Register" → create account "testuser"
3. Redirected to Today → "Welcome, testuser" → empty dashboard (new user)
4. Navigate to Envelopes → empty (no budgets yet)
5. Navigate to Goals → empty
6. Click Logout → back to login
7. Login as "demo2" → Today shows real data (net worth, transactions, envelopes)
8. Envelopes page → 12 real budget categories with spending
9. Goals page → 3 real goals with progress
10. Refresh page → still logged in, same data

---

## Files Created/Modified

```
NEW:
  src/contexts/AuthContext.tsx        ← Auth state provider
  src/app/login/page.tsx             ← Login page
  src/app/register/page.tsx          ← Register page  
  src/components/auth/ProtectedRoute.tsx  ← Route guard

MODIFIED:
  src/app/layout.tsx                 ← Wrap with AuthProvider
  src/app/app/layout.tsx             ← Wrap with ProtectedRoute
  src/hooks/useApi.ts                ← Use auth context for username
  src/app/app/page.tsx               ← Greeting from auth user
  src/components/app/Sidebar.tsx     ← Add logout button
  src/components/app/BottomNav.tsx   ← Add logout option

DJANGO:
  bamboo_site/settings.py            ← Session cookie settings verification
```

---

## Verification Checklist

- [ ] `npm run build` passes
- [ ] Login with valid credentials → redirected to Today → real data
- [ ] Login with invalid credentials → error message
- [ ] Register new account → auto-login → empty Today
- [ ] `/app` without login → redirected to `/login`
- [ ] `/login` while logged in → redirected to `/app`
- [ ] Logout → session cleared → redirected to login
- [ ] Page refresh → session persists
- [ ] Demo mode banner gone when logged in with API running
- [ ] Demo mode banner shows when Django is down
