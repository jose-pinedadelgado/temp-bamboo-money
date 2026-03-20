# Bamboo Money — Capability Coverage Map

Last updated: 2026-03-20

## Status Legend
- ✅ **Active** — API exists, React uses it
- 🟡 **Available** — API exists, React doesn't use it yet (intentional backlog)
- ⚪ **Parked** — Capability exists in Django, not migrated to API (may never be)
- ❌ **Orphaned** — Dead code, candidate for deletion

---

## Capabilities

### Core Data
| Capability | Django Source | API Endpoint | React Consumer | Status |
|-----------|-------------|-------------|---------------|--------|
| User auth (login) | `login_view` | `POST /api/auth/login/` | Auth page | 🟡 |
| User auth (register) | `register_view` | `POST /api/auth/register/` | Auth page | 🟡 |
| User auth (logout) | `logout_view` | `POST /api/auth/logout/` | Nav button | 🟡 |
| Default categories on signup | `_create_default_categories` | (internal, no API) | — | ⚪ |

### Transactions
| Capability | Django Source | API Endpoint | React Consumer | Status |
|-----------|-------------|-------------|---------------|--------|
| List transactions (filtered) | `transaction_list`, `_get_filtered_transactions` | `GET /api/transactions/` | Today (recent), future Transactions page | 🟡 |
| Add transaction | `transaction_add` | `POST /api/transactions/` | — | 🟡 |
| Edit transaction | `transaction_edit` | `PUT /api/transactions/{id}/` | — | 🟡 |
| Delete transaction | `transaction_delete` | `DELETE /api/transactions/{id}/` | — | 🟡 |
| Quick-change category | `transaction_update_category` | `PATCH /api/transactions/{id}/category/` | — | 🟡 |
| Export to Excel | `transaction_export` | `GET /api/transactions/export/` | — | ⚪ |

### CSV Import
| Capability | Django Source | API Endpoint | React Consumer | Status |
|-----------|-------------|-------------|---------------|--------|
| Upload CSV | `csv_upload` | `POST /api/import/upload/` | — | ⚪ |
| Preview import | `csv_preview` | `POST /api/import/preview/` | — | ⚪ |
| Confirm import | `csv_confirm` | `POST /api/import/confirm/` | — | ⚪ |

### Budgets (Envelopes)
| Capability | Django Source | API Endpoint | React Consumer | Status |
|-----------|-------------|-------------|---------------|--------|
| List budgets with spending | `budget_list` | `GET /api/budgets/` | Envelopes page | 🟡 |
| Add budget category | `budget_add` | `POST /api/budgets/` | — | 🟡 |
| Edit budget | `budget_edit` | `PUT /api/budgets/{id}/` | — | 🟡 |
| Delete budget | `budget_delete` | `DELETE /api/budgets/{id}/` | — | 🟡 |
| Rollover calculation | `calculate_rollovers` mgmt cmd | (computed in GET response) | Envelopes page | 🟡 |
| Budget alerts | `_check_budget_alerts` | `GET /api/alerts/` | Today page | 🟡 |

### Savings Goals
| Capability | Django Source | API Endpoint | React Consumer | Status |
|-----------|-------------|-------------|---------------|--------|
| List goals | `goals_list` | `GET /api/goals/` | Goals page | 🟡 |
| Add goal | `goal_add` | `POST /api/goals/` | Goals page | 🟡 |
| Goal detail + contributions | `goal_detail` | `GET /api/goals/{id}/` | Goals page | 🟡 |
| Delete goal | `goal_delete` | `DELETE /api/goals/{id}/` | — | 🟡 |

### Net Worth
| Capability | Django Source | API Endpoint | React Consumer | Status |
|-----------|-------------|-------------|---------------|--------|
| Net worth summary | `_calc_net_worth`, `networth` | `GET /api/networth/` | Today page (summary) | 🟡 |
| Net worth history | `NetWorthSnapshot`, `NetWorthEntryHistory` | `GET /api/networth/history/` | — | ⚪ |
| Add/edit/delete entries | `networth_add/edit/delete` | CRUD `/api/networth/entries/` | — | ⚪ |
| Export net worth | `networth_export_sheets/csv` | — | — | ⚪ |

### Recurring Transactions
| Capability | Django Source | API Endpoint | React Consumer | Status |
|-----------|-------------|-------------|---------------|--------|
| List recurring | `recurring_list` | `GET /api/recurring/` | Today (upcoming bills) | 🟡 |
| AI detect recurring | `recurring_detect` | `POST /api/recurring/detect/` | — | ⚪ |
| Confirm/toggle/delete | `recurring_confirm/toggle/delete` | PUT/DELETE endpoints | — | ⚪ |

### Categorization Rules
| Capability | Django Source | API Endpoint | React Consumer | Status |
|-----------|-------------|-------------|---------------|--------|
| List rules | `rules_list` | — | — | ⚪ |
| CRUD rules | `rule_add/edit/delete` | — | — | ⚪ |
| Apply all rules | `rules_apply_all` | — | — | ⚪ |
| Create rule from transaction | `create_rule_from_transaction` | — | — | ⚪ |

### AI / Chatbot
| Capability | Django Source | API Endpoint | React Consumer | Status |
|-----------|-------------|-------------|---------------|--------|
| Chat message | `chatbot_message`, `process_message` | `POST /api/chat/` | Ask Bamboo page | 🟡 |
| Build financial context | `_build_context` | (internal, feeds chat) | — | 🟡 |

### Cash Flow
| Capability | Django Source | API Endpoint | React Consumer | Status |
|-----------|-------------|-------------|---------------|--------|
| Sankey diagram data | `cashflow_view/data` | — | — | ⚪ |

### Alerts
| Capability | Django Source | API Endpoint | React Consumer | Status |
|-----------|-------------|-------------|---------------|--------|
| Dismiss alert | `alert_dismiss` | `POST /api/alerts/{id}/dismiss/` | — | ⚪ |
| Dismiss all | `alert_dismiss_all` | `POST /api/alerts/dismiss-all/` | — | ⚪ |

---

## Summary

| Status | Count | Notes |
|--------|-------|-------|
| ✅ Active | 0 | Nothing connected yet |
| 🟡 Available | 18 | Day 1 API targets |
| ⚪ Parked | 16 | Will not build API yet — revisit later |
| ❌ Orphaned | 0 | Clean so far |

---

## Review Schedule
- **Weekly** during integration: promote ⚪→🟡 or 🟡→✅ as we connect things
- **After integration complete**: anything still ⚪ for 30+ days gets discussed — keep or prune
- **Quarterly**: full audit — any ❌ Orphaned gets deleted
