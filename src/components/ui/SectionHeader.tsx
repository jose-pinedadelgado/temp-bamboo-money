import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  total?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, total, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-baseline justify-between gap-4 mb-4", className)}>
      <div className="flex items-baseline gap-3 min-w-0">
        <h2 className="text-base font-body font-semibold text-text-primary truncate">
          {title}
        </h2>
        {total && (
          <span className="font-display font-semibold text-sm text-text-secondary whitespace-nowrap">
            {total}
          </span>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
