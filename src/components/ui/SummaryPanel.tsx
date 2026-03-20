import { cn } from "@/lib/utils";
import { Card } from "./Card";

interface SummaryPanelProps {
  title: string;
  value: string;
  subtitle?: string;
  metadata?: { label: string; value: string }[];
  action?: React.ReactNode;
  className?: string;
}

export function SummaryPanel({
  title,
  value,
  subtitle,
  metadata,
  action,
  className,
}: SummaryPanelProps) {
  return (
    <Card bordered className={cn("", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-body text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-display font-bold text-text-primary tracking-tight">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs font-body text-text-tertiary mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      {metadata && metadata.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border-divider space-y-1.5">
          {metadata.map((item) => (
            <div key={item.label} className="flex justify-between text-sm font-body">
              <span className="text-text-secondary">{item.label}</span>
              <span className="font-display font-semibold text-text-primary tabular-nums">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
