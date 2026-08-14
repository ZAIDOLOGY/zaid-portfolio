import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { MaskReveal } from "./motion-wrappers";

/**
 * A sleek card with backdrop-blur simulating frosted glass.
 */
export function GlassCard({ className, children, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        "bg-background/40 backdrop-blur-md border-border/40 shadow-lg shadow-black/5",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

/**
 * A minimalistic card designed specifically for displaying a single metric/KPI.
 */
export function MetricCard({ 
  label, 
  value, 
  trend,
  className 
}: { 
  label: string; 
  value: string; 
  trend?: { value: string; positive: boolean };
  className?: string; 
}) {
  return (
    <Card className={cn("border-border/50", className)}>
      <CardContent className="p-6">
        <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-3xl font-bold tracking-tight text-foreground">{value}</h4>
          {trend && (
            <span 
              className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full",
                trend.positive 
                  ? "bg-green-500/10 text-green-500" 
                  : "bg-destructive/10 text-destructive"
              )}
            >
              {trend.value}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * A descriptive feature card with an icon, title, and rich content support.
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  children
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Card className={cn("bg-card/50 border-border/50 hover:border-primary/50 transition-colors duration-300 relative overflow-hidden group", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <CardHeader>
        {Icon && (
          <MaskReveal direction="bottom" delay={0.1}>
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary mb-4">
              <Icon className="w-6 h-6" />
            </div>
          </MaskReveal>
        )}
        <MaskReveal direction="bottom" delay={0.15}>
          <CardTitle className="text-xl">{title}</CardTitle>
        </MaskReveal>
      </CardHeader>
      
      <CardContent className="space-y-4 text-sm relative z-10">
        {description && (
          <MaskReveal direction="bottom" delay={0.25}>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </MaskReveal>
        )}
        {children && (
          <MaskReveal direction="bottom" delay={0.35}>
            {children}
          </MaskReveal>
        )}
      </CardContent>
    </Card>
  );
}
