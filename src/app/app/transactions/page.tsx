"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { transactions } from "@/data/transactions";
import { getCategoryMeta } from "@/data/categories";
import { formatCurrency } from "@/lib/utils";
import type { TransactionCategory, TransactionStatus } from "@/types";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronLeft,
  CheckCircle2,
  Circle,
  Clock,
} from "lucide-react";
import Link from "next/link";

type SortField = "date" | "amount" | "merchant";
type SortDir = "asc" | "desc";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<TransactionCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "all">("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [showFilters, setShowFilters] = useState(false);

  // Derive unique categories from data
  const activeCategories = useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category));
    return Array.from(cats)
      .map((c) => getCategoryMeta(c))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  // Filter + sort
  const filtered = useMemo(() => {
    let result = [...transactions];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.merchant.toLowerCase().includes(q) ||
          t.note?.toLowerCase().includes(q) ||
          getCategoryMeta(t.category).label.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((t) => t.category === categoryFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((t) => t.status === statusFilter);
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "date") cmp = a.date.localeCompare(b.date);
      else if (sortField === "amount") cmp = Math.abs(a.amount) - Math.abs(b.amount);
      else cmp = a.merchant.localeCompare(b.merchant);
      return sortDir === "desc" ? -cmp : cmp;
    });

    return result;
  }, [search, categoryFilter, statusFilter, sortField, sortDir]);

  // Group by date for display
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const t of filtered) {
      const list = map.get(t.date) ?? [];
      list.push(t);
      map.set(t.date, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  function formatDate(iso: string) {
    const d = new Date(iso + "T12:00:00");
    const today = new Date("2026-03-12T12:00:00");
    const diff = Math.floor((today.getTime() - d.getTime()) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }

  const statusIcon = (s: TransactionStatus) => {
    if (s === "reviewed") return <CheckCircle2 className="w-3.5 h-3.5 text-positive" aria-label="Reviewed" />;
    if (s === "pending") return <Clock className="w-3.5 h-3.5 text-caution" aria-label="Pending" />;
    return <Circle className="w-3.5 h-3.5 text-text-tertiary" aria-label="Posted" />;
  };

  return (
    <div className="space-y-6 animate-view-enter">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/app"
          className="p-1.5 rounded-[var(--radius-md)] hover:bg-bg-subtle transition-colors text-text-secondary focus-ring"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display font-semibold text-lg text-text-primary">
            Transactions
          </h1>
          <p className="text-xs text-text-tertiary font-body tabular-nums">
            {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <label htmlFor="txn-search" className="sr-only">Search transactions</label>
          <input
            id="txn-search"
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[var(--input-height)] pl-9 pr-3 bg-input-bg border border-input-border rounded-[var(--input-radius)] text-sm font-body text-input-text placeholder:text-input-placeholder focus:outline-none focus:ring-2 focus:ring-border-focus/30 focus:border-border-focus transition-colors"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Toggle filters"
          aria-expanded={showFilters}
          className={`p-2.5 rounded-[var(--input-radius)] border transition-colors cursor-pointer focus-ring ${
            showFilters
              ? "bg-green-light border-green-accent text-green-primary"
              : "bg-input-bg border-input-border text-text-secondary hover:text-text-primary"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card bordered className="space-y-4 animate-fade-up">
          {/* Category filter */}
          <div>
            <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium mb-2">
              Category
            </p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-2.5 py-1 rounded-sm text-xs font-body font-medium transition-colors cursor-pointer focus-ring ${
                  categoryFilter === "all"
                    ? "bg-green-accent text-text-inverse"
                    : "bg-bg-subtle text-text-secondary hover:text-text-primary"
                }`}
              >
                All
              </button>
              {activeCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-2.5 py-1 rounded-sm text-xs font-body font-medium transition-colors cursor-pointer focus-ring ${
                    categoryFilter === cat.id
                      ? "bg-green-accent text-text-inverse"
                      : "bg-bg-subtle text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status filter */}
          <div>
            <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium mb-2">
              Status
            </p>
            <div className="flex gap-1.5">
              {(["all", "pending", "posted", "reviewed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2.5 py-1 rounded-sm text-xs font-body font-medium transition-colors capitalize cursor-pointer focus-ring ${
                    statusFilter === s
                      ? "bg-green-accent text-text-inverse"
                      : "bg-bg-subtle text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Sort buttons */}
          <div>
            <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium mb-2">
              Sort by
            </p>
            <div className="flex gap-1.5">
              {(["date", "amount", "merchant"] as SortField[]).map((f) => (
                <button
                  key={f}
                  onClick={() => toggleSort(f)}
                  className={`px-2.5 py-1 rounded-sm text-xs font-body font-medium transition-colors capitalize inline-flex items-center gap-1 cursor-pointer focus-ring ${
                    sortField === f
                      ? "bg-green-accent text-text-inverse"
                      : "bg-bg-subtle text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {f}
                  {sortField === f && (
                    <ArrowUpDown className="w-3 h-3" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Transaction List */}
      {grouped.length === 0 ? (
        <Card bordered className="text-center py-8">
          <p className="text-text-tertiary font-body text-sm">
            No transactions match your filters.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {grouped.map(([date, txns]) => (
            <div key={date}>
              <p className="text-xs uppercase tracking-[0.05em] text-text-tertiary font-body font-medium mb-2 px-1">
                {formatDate(date)}
              </p>
              <Card bordered className="divide-y divide-border-divider p-0">
                {txns.map((tx) => {
                  const cat = getCategoryMeta(tx.category);
                  return (
                    <div
                      key={tx.id}
                      className="flex items-center gap-3 px-4 min-h-[var(--row-min-height)] py-3"
                    >
                      {/* Category dot */}
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${cat.color}`}
                      />

                      {/* Merchant + category */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-body font-medium text-text-primary truncate">
                            {tx.merchant}
                          </p>
                          {statusIcon(tx.status)}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="default">{cat.label}</Badge>
                          {tx.isRecurring && (
                            <span className="text-[10px] text-text-tertiary font-body">
                              Recurring
                            </span>
                          )}
                          {tx.note && (
                            <span className="text-[10px] text-text-tertiary font-body truncate">
                              {tx.note}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Amount */}
                      <span
                        className={`font-display font-semibold text-sm flex-shrink-0 tabular-nums ${
                          tx.amount > 0 ? "text-positive" : "text-text-primary"
                        }`}
                      >
                        {formatCurrency(tx.amount, tx.amount > 0)}
                      </span>
                    </div>
                  );
                })}
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
