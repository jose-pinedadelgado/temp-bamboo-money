# Day 8: Production Hardening

## Issues to Fix (from Day 4 QA)

### 1. Rate Limiting (Critical)
- Install `django-ratelimit`
- Login: max 5 attempts per minute per IP
- Register: max 3 accounts per hour per IP
- API endpoints: 60 requests/minute per user
- Return 429 with `Retry-After` header

### 2. Cross-Origin Cookie Strategy (Critical for deploy)
- **Development**: SameSite=None (current — working)
- **Production**: Set up nginx reverse proxy so React and Django share same domain:
  ```
  bamboo.money/        → Next.js (frontend)
  bamboo.money/api/    → Django (backend)
  ```
- This eliminates all cross-origin cookie issues
- Alternative: SameSite=None + Secure=True + HTTPS everywhere

### 3. Password Reset Flow
- "Forgot password?" link on login page
- `POST /api/auth/reset-request/` — sends email with reset token
- `POST /api/auth/reset-confirm/` — validates token, sets new password
- Reset page styled with Bamboo design system
- Requires email service (SendGrid, SES, or SMTP)

### 4. Cookie Secure Flag
- `SESSION_COOKIE_SECURE = True` in production
- `CSRF_COOKIE_SECURE = True` in production
- Requires HTTPS (handled by reverse proxy or hosting platform)

### 5. Account Security
- Password strength validation (Django's built-in validators)
- Account lockout after 10 failed attempts (30 min cooldown)
- Session expiry notification in React (detect 401 → redirect to login gracefully)
- Optional: email verification on register

### 6. HTTPS & Headers
- `SECURE_SSL_REDIRECT = True` in production
- `SECURE_HSTS_SECONDS = 31536000`
- `SECURE_CONTENT_TYPE_NOSNIFF = True`
- `X_FRAME_OPTIONS = "DENY"`

### Testing
- Load test login endpoint with 100 concurrent requests → verify rate limiting
- Test password reset email flow end-to-end
- Verify all cookies have Secure flag over HTTPS
- Penetration test: OWASP ZAP scan against API endpoints
