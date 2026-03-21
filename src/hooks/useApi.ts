/**
 * Data-fetching hooks with automatic mock-data fallback.
 * If the API is unreachable, pages still work with demo data.
 */

"use client";

import { useState, useEffect, useCallback } from "react";

// API client
import * as api from "@/lib/api";

// Adapters
import {
  adaptAccount,
  adaptTransaction,
  adaptBudget,
  adaptGoal,
  adaptDashboard,
  adaptRecurringToBill,
  type DashboardData,
} from "@/lib/adapters";

// Mock data (fallback)
import { envelopes as mockEnvelopes, goals as mockGoals, upcomingBills as mockBills, user as mockUser } from "@/data/mock-data";
import { accounts as mockAccounts } from "@/data/accounts";
import { transactions as mockTransactions } from "@/data/transactions";

import type { Account, Transaction } from "@/types";
import type { Envelope, Goal, Bill } from "@/data/mock-data";

// ── Generic hook factory ────────────────────────────────

interface UseApiResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
  isDemo: boolean;
  refetch: () => void;
}

function useApiData<TApi, TLocal>(
  fetcher: () => Promise<TApi>,
  adapter: (api: TApi) => TLocal,
  fallback: TLocal
): UseApiResult<TLocal> {
  const [data, setData] = useState<TLocal>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await fetcher();
      setData(adapter(raw));
      setIsDemo(false);
    } catch (err) {
      console.warn("[Bamboo] API unavailable, using demo data:", err);
      setData(fallback);
      setIsDemo(true);
      setError(err instanceof Error ? err.message : "API unavailable");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, isDemo, refetch: fetchData };
}

// ── Dashboard ───────────────────────────────────────────

const mockDashboard: DashboardData = {
  user: { name: mockUser.name },
  netWorth: {
    total: mockUser.netWorth,
    assets: 75830.32,
    liabilities: 12400,
    change: mockUser.netWorthChange,
  },
  budgetSummary: { totalBudgeted: 4800, totalSpent: 2140, remaining: 2660 },
  recentTransactions: mockTransactions.slice(0, 5),
  upcomingBills: mockBills,
  alertCount: 0,
};

export function useDashboard(): UseApiResult<DashboardData> {
  return useApiData(
    () => api.dashboard.get(),
    (raw) => adaptDashboard(raw, "Jose"), // TODO: get username from auth context
    mockDashboard
  );
}

// ── Accounts ────────────────────────────────────────────

export function useAccounts(): UseApiResult<Account[]> {
  return useApiData(
    () => api.accounts.list(),
    (raw) => raw.map(adaptAccount),
    mockAccounts
  );
}

// ── Transactions ────────────────────────────────────────

export function useTransactions(filters?: api.TransactionFilters): UseApiResult<Transaction[]> {
  return useApiData(
    () => api.transactions.list(filters),
    (raw) => raw.map(adaptTransaction),
    mockTransactions
  );
}

// ── Budgets (Envelopes) ─────────────────────────────────

export function useBudgets(): UseApiResult<Envelope[]> {
  return useApiData(
    () => api.budgets.list(),
    (raw) => raw.map(adaptBudget),
    mockEnvelopes
  );
}

// ── Goals ───────────────────────────────────────────────

export function useGoals(): UseApiResult<Goal[]> {
  return useApiData(
    () => api.goals.list(),
    (raw) => raw.map(adaptGoal),
    mockGoals
  );
}

// ── Recurring (Bills) ───────────────────────────────────

export function useRecurring(): UseApiResult<Bill[]> {
  return useApiData(
    () => api.recurring.list(),
    (raw) => raw.map(adaptRecurringToBill),
    mockBills
  );
}
