import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "positive" | "caution" | "warning" | "info";
  className?: string;
}

const variantStyles = {
  default: "bg-bg-subtle text-text-secondary",
  positive: "bg-positive-soft text-green-primary",
  caution: "bg-caution-soft text-caution-text",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-info",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-body font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
