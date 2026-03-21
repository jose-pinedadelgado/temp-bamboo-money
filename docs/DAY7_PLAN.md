# Day 7: Production OAuth (Google + Apple)

## Prerequisites
- Day 4 complete (username/password auth working end-to-end)
- Google Cloud Console project with OAuth 2.0 credentials
- Apple Developer account (for Sign in with Apple)

## Setup

### Django Side
1. Install `django-allauth` (supports 50+ OAuth providers in one package)
2. Configure Google and Apple providers in Django settings
3. Callback URLs: `http://localhost:8002/accounts/google/login/callback/`
4. `django-allauth` creates a Django `User` on first OAuth login — same user model the API already filters by
5. Session cookie works identically whether user logged in via OAuth or password

### React Side
1. "Sign in with Google" button → redirects to Google consent screen
2. Google redirects back to Django callback → Django creates session → redirects to React
3. React detects session via `GET /api/auth/me/` → user is logged in
4. "Sign in with Apple" — same flow, different provider

### Google Cloud Console Setup
1. Create project → APIs & Services → Credentials → OAuth 2.0 Client ID
2. Authorized redirect URI: `https://yourdomain.com/accounts/google/login/callback/`
3. Get Client ID + Client Secret → store in Django `.env`

### Apple Developer Setup
1. Certificates, Identifiers & Profiles → Sign in with Apple
2. Create Service ID → configure redirect URL
3. Generate private key → store in Django `.env`

### Files Changed
```
Django:
  requirements.txt          ← Add django-allauth
  bamboo_site/settings.py   ← INSTALLED_APPS, AUTHENTICATION_BACKENDS, provider config
  bamboo_site/urls.py       ← Add allauth URLs

React:
  src/app/login/page.tsx    ← Add OAuth buttons above username/password form
  src/lib/api.ts            ← Add OAuth redirect helpers
```

### Testing
1. Google login → creates user → redirected to Today page → real data loads
2. Same Google user logs in again → same Django user (no duplicate)
3. Username/password still works alongside OAuth
4. Logout clears both OAuth and session state

---

*This plan will be executed after Days 4-6 are complete. OAuth buttons will be added to the login page built in Day 4.*
