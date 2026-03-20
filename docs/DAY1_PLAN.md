# Day 1: API Layer — Plan & Testing Strategy

## Goal
Create a Django Ninja REST API that exposes the 18 "Available" capabilities from the coverage map. Every step has a test before we move on.

---

## Pre-flight Check
Before writing any code:

```bash
cd bamboo-money  # Django project
python manage.py test tests/  # Existing tests still pass?
python manage.py runserver     # App boots?
python manage.py seed_demo_data  # Demo data loads?
```

✅ **Gate:** All three pass before proceeding.

---

## Step 1: Create the `api` Django app (30 min)

### What
- `python manage.py startapp api`
- Register in `INSTALLED_APPS`
- Add `api/schemas.py` (Pydantic models matching React TypeScript types)
- Add `api/router.py` (Django Ninja router)
- Wire into `urls.py` at `/api/`

### Test
```bash
# Start server
python manage.py runserver

# Hit the auto-generated docs
curl http://localhost:8000/api/docs
# Expected: HTML page with Swagger UI (even if empty)
```

✅ **Gate:** `/api/docs` loads in browser.

---

## Step 2: Dashboard summary endpoint (30 min)

### What
`GET /api/dashboard/` — returns:
```json
{
  "net_worth": { "assets": 45000, "liabilities": 12000, "total": 33000 },
  "budget_summary": { "total_budgeted": 3500, "total_spent": 2100, "remaining": 1400 },
  "recent_transactions": [ ... top 5 ... ],
  "alerts": [ ... unread alerts ... ],
  "upcoming_bills": [ ... next 5 recurring ... ]
}
```

Logic already exists in `dashboard()` view and `_calc_net_worth()` — extract and reuse.

### Test
```bash
# Seed data first
python manage.py seed_demo_data

# Test endpoint (need auth — use session for now)
python -c "
import requests
s = requests.Session()
# Login
s.post('http://localhost:8000/login/', data={'username':'demo','password':'demo123'})
r = s.get('http://localhost:8000/api/dashboard/')
print(r.status_code, r.json().keys())
"
# Expected: 200, dict_keys(['net_worth', 'budget_summary', 'recent_transactions', 'alerts', 'upcoming_bills'])
```

Also write a Django test:
```python
# api/tests.py
class DashboardAPITest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user('test', password='test123')
        self.client.login(username='test', password='test123')
    
    def test_dashboard_returns_expected_keys(self):
        r = self.client.get('/api/dashboard/')
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertIn('net_worth', data)
        self.assertIn('budget_summary', data)
        self.assertIn('recent_transactions', data)
```

✅ **Gate:** Endpoint returns 200 with all expected keys. Test passes.

---

## Step 3: Transactions endpoints (45 min)

### What
- `GET /api/transactions/` — list with filters (date_from, date_to, category, search, account)
- `POST /api/transactions/` — create
- `PUT /api/transactions/{id}/` — update
- `DELETE /api/transactions/{id}/` — delete
- `PATCH /api/transactions/{id}/category/` — quick category change

### Test each endpoint individually

```bash
# List
curl -b cookies.txt http://localhost:8000/api/transactions/
# Expected: JSON array of transactions

# List with filters
curl -b cookies.txt "http://localhost:8000/api/transactions/?category=groceries&date_from=2026-01-01"
# Expected: filtered subset

# Create
curl -b cookies.txt -X POST http://localhost:8000/api/transactions/ \
  -H "Content-Type: application/json" \
  -d '{"date":"2026-03-20","description":"Test","merchant":"TestCo","amount":25.50,"category_id":1}'
# Expected: 201, new transaction JSON with id

# Update
curl -b cookies.txt -X PUT http://localhost:8000/api/transactions/1/ \
  -H "Content-Type: application/json" \
  -d '{"description":"Updated","amount":30.00}'
# Expected: 200, updated transaction

# Delete
curl -b cookies.txt -X DELETE http://localhost:8000/api/transactions/999/
# Expected: 204 No Content

# Quick category change
curl -b cookies.txt -X PATCH http://localhost:8000/api/transactions/1/category/ \
  -H "Content-Type: application/json" \
  -d '{"category_id": 2}'
# Expected: 200
```

Django tests:
```python
class TransactionAPITest(TestCase):
    def test_list_returns_array(self):
        r = self.client.get('/api/transactions/')
        self.assertEqual(r.status_code, 200)
        self.assertIsInstance(r.json(), list)
    
    def test_create_returns_201(self):
        r = self.client.post('/api/transactions/', {...}, content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertIn('id', r.json())
    
    def test_filter_by_category(self):
        # Create transactions in different categories, filter, verify only matching returned
    
    def test_delete_others_transaction_returns_404(self):
        # Security: user A can't delete user B's transaction
```

✅ **Gate:** All 5 endpoints return correct status codes. Create→List shows new item. Delete→List confirms removal. Cross-user test fails correctly.

---

## Step 4: Budgets endpoints (30 min)

### What
- `GET /api/budgets/` — list with current month spending + rollover amounts
- `POST /api/budgets/` — create
- `PUT /api/budgets/{id}/` — update
- `DELETE /api/budgets/{id}/` — delete

The GET response enriches each budget with computed fields:
```json
{
  "id": 1,
  "name": "Groceries",
  "icon": "🛒",
  "monthly_limit": 500.00,
  "spent_this_month": 320.50,
  "remaining": 179.50,
  "rollover_amount": 45.00,
  "effective_limit": 545.00,
  "percent_used": 58.8
}
```

### Test
```python
class BudgetAPITest(TestCase):
    def test_list_includes_computed_fields(self):
        # Create budget + transactions → verify spent_this_month is correct
        r = self.client.get('/api/budgets/')
        budget = r.json()[0]
        self.assertIn('spent_this_month', budget)
        self.assertIn('percent_used', budget)
        self.assertAlmostEqual(budget['percent_used'], 64.1, places=1)
    
    def test_rollover_reflected_in_effective_limit(self):
        # Budget with rollover_enabled + last month underspend
        # Verify effective_limit > monthly_limit
```

✅ **Gate:** Budgets return computed spending. Rollover math is correct.

---

## Step 5: Goals endpoints (30 min)

### What
- `GET /api/goals/` — list with progress percentage
- `POST /api/goals/` — create
- `GET /api/goals/{id}/` — detail with contribution history
- `DELETE /api/goals/{id}/` — delete
- `POST /api/goals/{id}/contribute/` — add contribution

### Test
```python
class GoalAPITest(TestCase):
    def test_goal_progress_calculated(self):
        # Goal: target=1000, current=350
        r = self.client.get('/api/goals/')
        goal = r.json()[0]
        self.assertEqual(goal['progress_percent'], 35.0)
    
    def test_contribute_updates_amount(self):
        r = self.client.post('/api/goals/1/contribute/', {'amount': 50})
        self.assertEqual(r.status_code, 200)
        # Verify current_amount increased by 50
```

✅ **Gate:** Progress math correct. Contributions update totals.

---

## Step 6: Supporting endpoints (30 min)

### What
- `GET /api/recurring/` — upcoming bills (confirmed + active only)
- `GET /api/alerts/` — unread alerts
- `POST /api/chat/` — send message, get AI response
- `GET /api/accounts/` — list accounts

### Test
```python
class RecurringAPITest(TestCase):
    def test_only_active_confirmed_returned(self):
        # Create confirmed+active, unconfirmed, inactive
        # Only confirmed+active appears in response

class ChatAPITest(TestCase):
    def test_chat_returns_response(self):
        r = self.client.post('/api/chat/', {'message': 'How am I doing this month?'})
        self.assertEqual(r.status_code, 200)
        self.assertIn('response', r.json())
```

✅ **Gate:** Recurring filters correctly. Chat returns response.

---

## Step 7: Auth endpoints (20 min)

### What
- `POST /api/auth/login/` — returns session cookie or token
- `POST /api/auth/register/` — creates user + default categories
- `POST /api/auth/logout/` — clears session
- `GET /api/auth/me/` — current user info

### Test
```python
class AuthAPITest(TestCase):
    def test_login_success(self):
        User.objects.create_user('test', password='pass123')
        r = self.client.post('/api/auth/login/', {'username':'test','password':'pass123'})
        self.assertEqual(r.status_code, 200)
    
    def test_login_wrong_password(self):
        r = self.client.post('/api/auth/login/', {'username':'test','password':'wrong'})
        self.assertEqual(r.status_code, 401)
    
    def test_unauthenticated_returns_401(self):
        self.client.logout()
        r = self.client.get('/api/transactions/')
        self.assertEqual(r.status_code, 401)
```

✅ **Gate:** Login works. Wrong password rejected. Unauthenticated requests blocked.

---

## End-of-Day Verification

### Automated
```bash
python manage.py test api/
# Expected: All new API tests pass (should be ~20-25 tests)

python manage.py test tests/
# Expected: All EXISTING tests still pass (nothing broken)
```

### Manual — Swagger walkthrough
1. Open `http://localhost:8000/api/docs`
2. Click "Authorize" → login with demo user
3. Try each endpoint group:
   - Dashboard → verify JSON shape
   - Transactions → create one, list, verify it appears
   - Budgets → check computed spending matches
   - Goals → contribute, verify progress updates
   - Chat → send a message, get response
4. Screenshot the Swagger docs for reference

### Cross-check with Coverage Map
Update `COVERAGE_MAP.md`:
- All 18 "🟡 Available" items should now have real endpoint URLs filled in
- None should have moved to ❌

✅ **Final Gate:** All tests green + Swagger docs complete + Coverage map updated.

---

## Files Created/Modified

```
api/                    ← NEW Django app
├── __init__.py
├── router.py           ← Django Ninja API router
├── schemas.py          ← Pydantic request/response schemas  
├── endpoints/
│   ├── dashboard.py
│   ├── transactions.py
│   ├── budgets.py
│   ├── goals.py
│   ├── recurring.py
│   ├── chat.py
│   └── auth.py
└── tests.py            ← ~25 API tests

bamboo_site/urls.py     ← Modified: add api.urls
bamboo_site/settings.py ← Modified: add 'api' to INSTALLED_APPS
```

Estimated total: **~3.5 hours** of focused work.
