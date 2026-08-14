import { TRUST_METRICS, TECH_STACK } from "@/constants/content";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion-wrappers";
import { AnimatedCounter } from "@/components/shared/indicators";
import { Badge } from "@/components/ui/badge";

export function TrustMetrics() {
  return (
    <section id="trust" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Animated Metrics Strip */}
        <div className="mb-24">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-sm p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
            <StaggerContainer className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-border/30">
              {TRUST_METRICS.map((metric, index) => {
                const numericValue = parseInt(metric.value.replace(/[^0-9]/g, ''), 10);
                const suffix = metric.value.replace(/[0-9]/g, '');
                
                return (
                  <StaggerItem key={index} className="flex flex-col items-center text-center px-4 pt-8 md:pt-0 first:pt-0">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-3 flex items-center justify-center">
                      <AnimatedCounter value={numericValue} suffix={suffix} />
                    </span>
                    <span className="text-xs md:text-sm font-mono text-muted-foreground uppercase tracking-wider font-semibold">
                      {metric.label}
                    </span>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>

        {/* Technology Highlights */}
        <FadeIn delay={0.4} className="flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6">
            Core Technology Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
            {TECH_STACK.map((tech, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-4 py-2 text-sm font-medium bg-white/60 backdrop-blur border border-white/50 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors shadow-sm"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
