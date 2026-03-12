import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "positive" | "caution" | "warning";
  className?: string;
}

const variantStyles = {
  default: "bg-bg-subtle text-text-secondary",
  positive: "bg-green-light text-green-primary",
  caution: "bg-[#fdf6e3] dark:bg-caution/15 text-[#b8860b] dark:text-caution",
  warning: "bg-[#fef0ec] dark:bg-warning/15 text-warning",
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
