import { cn, getProgressColor, getProgressPercentage } from "@/lib/utils";

interface ProgressBarProps {
  spent: number;
  budgeted: number;
  animate?: boolean;
  className?: string;
}

export function ProgressBar({
  spent,
  budgeted,
  animate = true,
  className,
}: ProgressBarProps) {
  const percentage = getProgressPercentage(spent, budgeted);
  const colorClass = getProgressColor(percentage);

  return (
    <div
      className={cn("w-full h-1 bg-bg-subtle rounded-full overflow-hidden", className)}
    >
      <div
        className={cn(
          "h-full rounded-full transition-colors duration-500",
          colorClass,
          animate && "animate-progress-fill"
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
