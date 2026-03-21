# Bamboo Money — Capability Coverage Map

Last updated: 2026-03-20 (Day 1 complete)

## Status Legend
- ✅ **Active** — API endpoint built and tested
- ⚪ **Parked** — Exists in Django, intentionally not exposed in API yet
- ❌ **Orphaned** — Dead code, candidate for deletion

---

## ✅ Active — Powers the 4 React Pages (24 endpoints)

### Auth
| Capability | Endpoint | React Consumer | Description |
|-----------|----------|---------------|-------------|
| Login | `POST /api/auth/login/` | Auth page | Authenticates user, starts session |
| Register | `POST /api/auth/register/` | Auth page | Creates account + default budget categories |
| Logout | `POST /api/auth/logout/` | Nav button | Ends session |
| Current user | `GET /api/auth/me/` | App layout | Returns logged-in user info for header/nav |

### Today Page
| Capability | Endpoint | Description |
|-----------|----------|-------------|
| Dashboard summary | `GET /api/dashboard/` | Aggregated view: net worth, budget health, 5 recent transactions, unread alerts, upcoming bills |
| List accounts | `GET /api/accounts/` | Financial accounts grouped by type (checking, savings, credit, etc.) |
| List alerts | `GET /api/alerts/` | Unread budget alerts (overspend warnings, goal milestones) |
| Dismiss alert | `POST /api/alerts/{id}/dismiss/` | Mark single alert as read |
| Dismiss all alerts | `POST /api/alerts/dismiss-all/` | Clear all notifications |
| List recurring | `GET /api/recurring/` | Confirmed active recurring bills for "upcoming bills" section |

### Transactions (Today page recent activity + future dedicated page)
| Capability | Endpoint | Description |
|-----------|----------|-------------|
| List transactions | `GET /api/transactions/?date_from=&date_to=&category=&search=` | Filtered list — powers recent activity and eventual full transaction view |
| Create transaction | `POST /api/transactions/` | Add spending/income manually |
| Edit transaction | `PUT /api/transactions/{id}/` | Fix mistakes, recategorize |
| Delete transaction | `DELETE /api/transactions/{id}/` | Remove accidental entries |
| Quick category change | `PATCH /api/transactions/{id}/category/` | Fast recategorization without full edit |

### Envelopes Page
| Capability | Endpoint | Description |
|-----------|----------|-------------|
| List budgets | `GET /api/budgets/` | All categories with computed `spent_this_month`, `remaining`, `percent_used`, `rollover_amount`, `effective_limit` |
| Create budget | `POST /api/budgets/` | Add new envelope/category |
| Edit budget | `PUT /api/budgets/{id}/` | Change limit, toggle rollover, rename |
| Delete budget | `DELETE /api/budgets/{id}/` | Remove unused category |

### Goals Page
| Capability | Endpoint | Description |
|-----------|----------|-------------|
| List goals | `GET /api/goals/` | All savings goals with `progress_percent` calculated |
| Create goal | `POST /api/goals/` | Set a new savings target with deadline |
| Goal detail | `GET /api/goals/{id}/` | Full detail with contribution history |
| Delete goal | `DELETE /api/goals/{id}/` | Remove completed/abandoned goal |
| Contribute | `POST /api/goals/{id}/contribute/` | Add money toward a goal — the primary Goals action |

### Ask Bamboo Page
| Capability | Endpoint | Description |
|-----------|----------|-------------|
| Chat | `POST /api/chat/` | Send message → LLM builds financial context from user's data → returns structured insight |

---

## ⚪ Parked — Not Needed for React v1 (16 capabilities)

### CSV Import (3) — *"Import is messy UX. React v1 focuses on manual entry."*
| Capability | Django Source | Why Parked |
|-----------|-------------|-----------|
| CSV upload | `csv_upload` | Requires column mapping UI, bank format detection. Complex wizard that doesn't fit "calm" philosophy. Add in v2 with a proper import experience. |
| CSV preview | `csv_preview` | Part of import flow |
| CSV confirm | `csv_confirm` | Part of import flow |

### Export (2) — *"Users aren't coming to Bamboo to make spreadsheets."*
| Capability | Django Source | Why Parked |
|-----------|-------------|-----------|
| Transaction export (Excel) | `transaction_export` | Nice-to-have. Not core value prop. v2+. |
| Net worth export | `networth_export_sheets/csv` | Same |

### Net Worth Management (4) — *"No dedicated page designed yet."*
| Capability | Django Source | Why Parked |
|-----------|-------------|-----------|
| Net worth history chart | `NetWorthSnapshot`, `NetWorthEntryHistory` | Today page shows current total. Historical view requires a new page. v2. |
| Add net worth entry | `networth_add` | Requires net worth management page — not designed yet |
| Edit net worth entry | `networth_edit` | Same |
| Delete net worth entry | `networth_delete` | Same |

### Recurring Management (3) — *"Should surface automatically, not as a settings page."*
| Capability | Django Source | Why Parked |
|-----------|-------------|-----------|
| AI detect recurring | `recurring_detect` | Should run as background job, not user-triggered button. Results surface in Today page naturally. |
| Confirm recurring | `recurring_confirm` | Part of recurring management flow |
| Toggle/delete recurring | `recurring_toggle/delete` | Same |

### Categorization Rules (3) — *"Intelligence over labor — should be invisible."*
| Capability | Django Source | Why Parked |
|-----------|-------------|-----------|
| List rules | `rules_list` | Power-user settings feature. Auto-categorization should happen transparently. |
| CRUD rules | `rule_add/edit/delete` | Settings page, not core UX |
| Apply all rules | `rules_apply_all` | Bulk operation — belongs in background, not UI |

### Cash Flow (1) — *"Sankey diagrams are confusing, not calm."*
| Capability | Django Source | Why Parked |
|-----------|-------------|-----------|
| Cash flow Sankey | `cashflow_view/data` | Complex visualization most users won't understand. Doesn't align with "clarity over completeness." Maybe v3. |

---

## Day 1 Test Results (2026-03-20)

```
Auth:         ✅ Login → session → dashboard (tested)
Dashboard:    ✅ Net worth $470K, 12 budgets, 5 recent txns
Transactions: ✅ 50 returned with merchant/amount/date
Budgets:      ✅ 12 categories, computed spending fields
Goals:        ✅ 3 goals, progress % (70.2% Emergency Fund)
Accounts:     ✅ 6 accounts
Recurring:    ✅ 0 (none seeded, endpoint works)
Alerts:       ✅ 0 (none active, endpoint works)
Chat:         ✅ Built (needs OpenAI key for live test)
Swagger docs: ✅ http://localhost:8002/api/docs
```

---

## Review Schedule
- **Weekly** during integration: promote ⚪→✅ as features are built
- **After v1 launch**: anything still ⚪ for 30+ days gets discussed — keep or prune
- **Quarterly**: full audit — any ❌ Orphaned gets deleted
