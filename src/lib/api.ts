/**
 * Bamboo Money API Client
 * Typed fetch wrapper for Django REST API.
 * All responses are raw API shapes — use adapters.ts to convert to React types.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api";

// ── Raw API response types (match Django schemas.py) ─────────────

export interface ApiUser {
  id: number;
  username: string;
  email: string;
}

export interface ApiAuthResponse {
  ok: boolean;
  user: ApiUser | null;
  error: string | null;
}

export interface ApiAccount {
  id: number;
  name: string;
  account_type: string;
  institution: string;
  balance: string; // Decimal comes as string
}

export interface ApiTransaction {
  id: number;
  date: string;
  description: string;
  merchant: string;
  amount: string;
  is_income: boolean;
  category_id: number | null;
  category_name: string | null;
  account_id: number | null;
  account_name: string | null;
  notes: string;
}

export interface ApiBudget {
  id: number;
  name: string;
  icon: string;
  color: string;
  monthly_limit: string;
  is_income: boolean;
  rollover_enabled: boolean;
  rollover_cap: string | null;
  spent_this_month: string;
  remaining: string;
  rollover_amount: string;
  effective_limit: string;
  percent_used: number;
}

export interface ApiContribution {
  id: number;
  amount: string;
  date: string;
  note: string;
}

export interface ApiGoal {
  id: number;
  name: string;
  target_amount: string;
  current_amount: string;
  deadline: string | null;
  icon: string;
  progress_percent: number;
  contributions: ApiContribution[];
}

export interface ApiRecurring {
  id: number;
  merchant: string;
  category_name: string | null;
  expected_amount: string;
  frequency: string;
  next_expected_date: string | null;
  is_confirmed: boolean;
  is_active: boolean;
  icon: string;
}

export interface ApiAlert {
  id: number;
  category_name: string;
  alert_type: string;
  message: string;
  month: number;
  year: number;
  created_at: string;
}

export interface ApiNetWorth {
  assets: string;
  liabilities: string;
  total: string;
}

export interface ApiBudgetSummary {
  total_budgeted: string;
  total_spent: string;
  remaining: string;
}

export interface ApiDashboard {
  net_worth: ApiNetWorth;
  budget_summary: ApiBudgetSummary;
  recent_transactions: ApiTransaction[];
  alerts: ApiAlert[];
  upcoming_bills: ApiRecurring[];
}

export interface ApiChatResponse {
  response: string;
  context_used: boolean;
}

// ── Fetch helper ─────────────────────────────────────────

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    credentials: "include", // send session cookie
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new ApiError(res.status, text);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// ── Auth ─────────────────────────────────────────────────

export const auth = {
  login: (username: string, password: string) =>
    apiFetch<ApiAuthResponse>("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  register: (username: string, password: string, email = "") =>
    apiFetch<ApiAuthResponse>("/auth/register/", {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
    }),

  logout: () =>
    apiFetch<ApiAuthResponse>("/auth/logout/", { method: "POST" }),

  me: () => apiFetch<ApiUser>("/auth/me/"),
};

// ── Dashboard ───────────────────────────────────────────

export const dashboard = {
  get: () => apiFetch<ApiDashboard>("/dashboard/"),
};

// ── Transactions ────────────────────────────────────────

export interface TransactionFilters {
  date_from?: string;
  date_to?: string;
  category?: string;
  search?: string;
  account_id?: number;
}

export const transactions = {
  list: (filters?: TransactionFilters) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== "") params.set(k, String(v));
      });
    }
    const qs = params.toString();
    return apiFetch<ApiTransaction[]>(`/transactions/${qs ? `?${qs}` : ""}`);
  },

  create: (data: {
    date: string;
    description: string;
    merchant?: string;
    amount: number;
    is_income?: boolean;
    category_id?: number;
    account_id?: number;
    notes?: string;
  }) =>
    apiFetch<ApiTransaction>("/transactions/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<{
    date: string;
    description: string;
    merchant: string;
    amount: number;
    is_income: boolean;
    category_id: number;
    account_id: number;
    notes: string;
  }>) =>
    apiFetch<ApiTransaction>(`/transactions/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    apiFetch<void>(`/transactions/${id}/`, { method: "DELETE" }),

  updateCategory: (id: number, categoryId: number) =>
    apiFetch<ApiTransaction>(`/transactions/${id}/category/`, {
      method: "PATCH",
      body: JSON.stringify({ category_id: categoryId }),
    }),
};

// ── Budgets (Envelopes) ─────────────────────────────────

export const budgets = {
  list: () => apiFetch<ApiBudget[]>("/budgets/"),

  create: (data: {
    name: string;
    icon?: string;
    color?: string;
    monthly_limit: number;
    is_income?: boolean;
    rollover_enabled?: boolean;
    rollover_cap?: number;
  }) =>
    apiFetch<ApiBudget>("/budgets/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<{
    name: string;
    icon: string;
    color: string;
    monthly_limit: number;
    is_income: boolean;
    rollover_enabled: boolean;
    rollover_cap: number;
  }>) =>
    apiFetch<ApiBudget>(`/budgets/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    apiFetch<void>(`/budgets/${id}/`, { method: "DELETE" }),
};

// ── Goals ───────────────────────────────────────────────

export const goals = {
  list: () => apiFetch<ApiGoal[]>("/goals/"),

  create: (data: { name: string; target_amount: number; deadline?: string; icon?: string }) =>
    apiFetch<ApiGoal>("/goals/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  get: (id: number) => apiFetch<ApiGoal>(`/goals/${id}/`),

  delete: (id: number) =>
    apiFetch<void>(`/goals/${id}/`, { method: "DELETE" }),

  contribute: (id: number, amount: number, note = "") =>
    apiFetch<ApiGoal>(`/goals/${id}/contribute/`, {
      method: "POST",
      body: JSON.stringify({ amount, note }),
    }),
};

// ── Accounts ────────────────────────────────────────────

export const accounts = {
  list: () => apiFetch<ApiAccount[]>("/accounts/"),
};

// ── Recurring ───────────────────────────────────────────

export const recurring = {
  list: () => apiFetch<ApiRecurring[]>("/recurring/"),
};

// ── Alerts ──────────────────────────────────────────────

export const alerts = {
  list: () => apiFetch<ApiAlert[]>("/alerts/"),
  dismiss: (id: number) =>
    apiFetch<{ ok: boolean }>(`/alerts/${id}/dismiss/`, { method: "POST" }),
  dismissAll: () =>
    apiFetch<{ ok: boolean }>("/alerts/dismiss-all/", { method: "POST" }),
};

// ── Chat ────────────────────────────────────────────────

export const chat = {
  send: (message: string) =>
    apiFetch<ApiChatResponse>("/chat/", {
      method: "POST",
      body: JSON.stringify({ message }),
    }),
};
