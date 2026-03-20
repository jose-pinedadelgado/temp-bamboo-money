import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-btn-primary-bg text-btn-primary-text hover:brightness-110 shadow-card hover:shadow-elevated",
  secondary:
    "bg-btn-secondary-bg border border-btn-secondary-border text-btn-secondary-text hover:bg-bg-subtle",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-bg-subtle",
  destructive:
    "bg-btn-destructive-bg text-btn-destructive-text hover:brightness-110",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-[var(--btn-height-sm)] px-[var(--btn-padding-sm)] text-sm",
  md: "h-[var(--btn-height-md)] px-[var(--btn-padding-md)] text-base",
  lg: "h-[var(--btn-height-lg)] px-[var(--btn-padding-lg)] text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-body font-semibold",
        "rounded-[var(--btn-radius)] transition-all focus-ring cursor-pointer",
        `duration-[var(--motion-normal)]`,
        "hover:scale-[1.02] active:scale-[0.98]",
        "disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
