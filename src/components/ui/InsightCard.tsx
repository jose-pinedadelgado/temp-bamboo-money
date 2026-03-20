import { Card } from "./Card";
import { cn } from "@/lib/utils";
import type { Insight } from "@/data/mock-data";

interface InsightCardProps {
  insight: Insight;
  className?: string;
}

export function InsightCard({ insight, className }: InsightCardProps) {
  return (
    <Card
      className={cn("border-l-[3px] border-l-green-accent", className)}
      bordered
    >
      <div className="flex items-start gap-3">
        {/* Leaf icon */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="text-green-accent flex-shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <path
            d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-text-tertiary font-body mb-1.5">
            {insight.date}
          </p>
          <p className="text-base text-text-primary font-body leading-relaxed">
            {insight.content}
          </p>
          {insight.data && (
            <div className="mt-3 pt-3 border-t border-border-divider space-y-1.5">
              {insight.data.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between text-sm font-body"
                >
                  <span className="text-text-secondary">{item.label}</span>
                  <span className="font-display font-semibold text-text-primary tabular-nums">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}
          {insight.followUp && (
            <button className={cn(
              "mt-3 text-sm text-green-primary font-body font-medium",
              "bg-green-light px-3 py-1.5 rounded-full",
              "hover:bg-green-glow transition-colors cursor-pointer focus-ring",
              `duration-[var(--motion-normal)]`
            )}>
              {insight.followUp}
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
