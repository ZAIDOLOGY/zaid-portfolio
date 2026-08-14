import { cn } from "@/lib/utils";

export function TechBadge({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium",
        "bg-secondary text-secondary-foreground border border-border/50",
        "hover:border-primary/50 transition-colors duration-300",
        className
      )}
    >
      {label}
    </div>
  );
}
