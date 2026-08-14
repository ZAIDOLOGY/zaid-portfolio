"use client";

import { CORE_SERVICES } from "@/constants/content";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, MaskReveal } from "@/components/shared/motion-wrappers";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Code2, BarChart3, Database, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = [Code2, BarChart3, Database, Zap];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6">
        <SectionHeader
          title="Engineered Solutions"
          subtitle="Core Capabilities"
          description="Transforming manual spreadsheets into scalable, high-performance data pipelines and automated reporting systems."
          align="center"
          titleClassName="text-6xl md:text-7xl lg:text-9xl font-bold tracking-normal"
          titleStyle={{ fontFamily: "'Victory Striker Sans Demo', sans-serif" }}
          titleAnimation="mask-left"
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-20">
          {CORE_SERVICES.map((service, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div 
                key={index} 
                className="flex"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { 
                    opacity: 1, 
                    scale: 1, 
                    transition: { duration: 1.4, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
              >
                <Card className="flex flex-col h-full w-full bg-white/60 backdrop-blur-xl border border-white/50 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 shadow-sm hover:shadow-lg hover:shadow-primary/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <CardHeader className="pb-4">
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, scale: 0 },
                        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="w-14 h-14 rounded-xl bg-secondary/80 flex items-center justify-center text-primary mb-6 shadow-sm border border-border/50 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>
                    
                    <MaskReveal direction="bottom" delay={0.1} useParentTrigger={true}>
                      <CardTitle className="text-2xl font-bold tracking-tight">{service.title}</CardTitle>
                    </MaskReveal>
                  </CardHeader>
                  
                  <CardContent className="flex flex-col flex-1 space-y-6">
                    <div className="space-y-4 flex-1">
                      <div>
                        <MaskReveal direction="bottom" delay={0.2} useParentTrigger={true}>
                          <span className="block text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1">The Bottleneck</span>
                        </MaskReveal>
                        <MaskReveal direction="bottom" delay={0.25} useParentTrigger={true}>
                          <p className="text-sm text-foreground/80 leading-relaxed">{service.problem}</p>
                        </MaskReveal>
                      </div>
                      
                      <div className="h-px w-full bg-border/50" />
                      
                      <div>
                        <MaskReveal direction="bottom" delay={0.3} useParentTrigger={true}>
                          <span className="block text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-1">The Outcome</span>
                        </MaskReveal>
                        <MaskReveal direction="bottom" delay={0.35} useParentTrigger={true}>
                          <p className="text-sm text-foreground/90 font-medium leading-relaxed">{service.outcome}</p>
                        </MaskReveal>
                      </div>
                    </div>

                    <div className="mt-auto pt-6 flex items-center text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">
                      <MaskReveal direction="bottom" delay={0.4} useParentTrigger={true}>
                        <div className="flex items-center">
                          Discuss this solution
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </MaskReveal>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Action Banner */}
        <MaskReveal direction="left" delay={0.2} className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/50 p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
            
            <div className="relative z-10 max-w-xl">
              <MaskReveal direction="bottom" delay={0.1} useParentTrigger={true}>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Not sure which solution you need?</h3>
              </MaskReveal>
              <MaskReveal direction="bottom" delay={0.2} useParentTrigger={true}>
                <p className="text-muted-foreground">Every business is unique. Let&apos;s get on a brief discovery call to audit your current workflows and architect a custom automation roadmap.</p>
              </MaskReveal>
            </div>
            
            <div className="relative z-10 shrink-0 w-full md:w-auto">
              <MaskReveal direction="bottom" delay={0.3} useParentTrigger={true}>
                <a 
                  href="#contact" 
                  className={cn(
                    buttonVariants({ size: "lg" }), 
                    "w-full md:w-auto rounded-full h-14 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
                  )}
                >
                  Schedule Discovery Call
                </a>
              </MaskReveal>
            </div>
          </div>
        </MaskReveal>

      </div>
    </section>
  );
}
