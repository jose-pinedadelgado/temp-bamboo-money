import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  elevated?: boolean;
  bordered?: boolean;
}

export function Card({
  hoverable = false,
  elevated = false,
  bordered = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-bg-card rounded-lg relative z-10",
        "p-[var(--card-padding)]",
        bordered
          ? "border border-border-default shadow-card"
          : elevated
            ? "shadow-elevated"
            : "shadow-card",
        hoverable && "card-hover cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
