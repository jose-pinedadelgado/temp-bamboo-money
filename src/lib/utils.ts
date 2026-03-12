export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number, showSign = false): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));

  if (showSign && amount > 0) return `+${formatted}`;
  if (amount < 0) return `-${formatted}`;
  return formatted;
}

export function getProgressColor(percentage: number): string {
  if (percentage >= 95) return "bg-warning";
  if (percentage >= 75) return "bg-caution";
  return "bg-green-accent";
}

export function getProgressPercentage(spent: number, budgeted: number): number {
  if (budgeted === 0) return 0;
  return Math.min((spent / budgeted) * 100, 100);
}
