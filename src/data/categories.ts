// ─── Category Definitions ───────────────────────────────
// Maps each transaction category to display metadata.

import type { TransactionCategory } from "@/types";

export interface CategoryMeta {
  id: TransactionCategory;
  label: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class for the dot/badge
}

export const categories: CategoryMeta[] = [
  { id: "groceries", label: "Groceries", icon: "ShoppingCart", color: "bg-green-accent" },
  { id: "dining", label: "Dining", icon: "UtensilsCrossed", color: "bg-warning" },
  { id: "transportation", label: "Transportation", icon: "Car", color: "bg-info" },
  { id: "utilities", label: "Utilities", icon: "Zap", color: "bg-caution" },
  { id: "rent", label: "Rent / Mortgage", icon: "Home", color: "bg-green-deep" },
  { id: "shopping", label: "Shopping", icon: "ShoppingBag", color: "bg-gold" },
  { id: "entertainment", label: "Entertainment", icon: "Tv", color: "bg-[#9B59B6]" },
  { id: "subscriptions", label: "Subscriptions", icon: "CreditCard", color: "bg-sand" },
  { id: "health", label: "Health", icon: "Heart", color: "bg-positive" },
  { id: "travel", label: "Travel", icon: "Plane", color: "bg-info" },
  { id: "education", label: "Education", icon: "GraduationCap", color: "bg-green-primary" },
  { id: "personal-care", label: "Personal Care", icon: "Sparkles", color: "bg-gold" },
  { id: "gifts", label: "Gifts", icon: "Gift", color: "bg-warning" },
  { id: "income", label: "Income", icon: "ArrowDownLeft", color: "bg-positive" },
  { id: "transfer", label: "Transfer", icon: "ArrowLeftRight", color: "bg-text-tertiary" },
  { id: "other", label: "Other", icon: "MoreHorizontal", color: "bg-text-tertiary" },
];

export const categoryMap = new Map(categories.map((c) => [c.id, c]));

export function getCategoryMeta(id: TransactionCategory): CategoryMeta {
  return categoryMap.get(id) ?? categories[categories.length - 1];
}
