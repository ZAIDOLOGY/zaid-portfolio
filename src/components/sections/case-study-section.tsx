"use client";

import { CASE_STUDY } from "@/constants/content";
import { MaskReveal } from "@/components/shared/motion-wrappers";
import { TechBadge } from "@/components/shared/tech-badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function CaseStudySection() {
  return (
    <section id="case-studies" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
          
          {/* Left Column (Sticky Details) */}
          <div className="w-full lg:w-[55%] lg:sticky lg:top-32">
            <MaskReveal direction="bottom">
              <span className="text-primary font-mono text-sm uppercase tracking-wider mb-3 block font-semibold">
                Featured Case Study
              </span>
            </MaskReveal>
            <MaskReveal direction="left" delay={0.1}>
              <h2 
                className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-normal text-foreground mb-8 leading-[0.9]"
                style={{ fontFamily: "'Victory Striker Sans Demo', sans-serif" }}
              >
                {CASE_STUDY.title}
              </h2>
            </MaskReveal>

            <div className="space-y-10 text-lg text-muted-foreground mt-8 pr-0 lg:pr-8">
              <div>
                <MaskReveal direction="bottom" delay={0.2}>
                  <h3 className="font-semibold text-foreground mb-3 text-base uppercase tracking-wider font-mono">The Challenge</h3>
                </MaskReveal>
                <MaskReveal direction="bottom" delay={0.25}>
                  <p className="leading-relaxed">{CASE_STUDY.challenge}</p>
                </MaskReveal>
              </div>
              
              <div>
                <MaskReveal direction="bottom" delay={0.3}>
                  <h3 className="font-semibold text-foreground mb-3 text-base uppercase tracking-wider font-mono">Technical Approach</h3>
                </MaskReveal>
                <MaskReveal direction="bottom" delay={0.35}>
                  <p className="leading-relaxed">{CASE_STUDY.technicalApproach}</p>
                </MaskReveal>
              </div>

              <div>
                <MaskReveal direction="bottom" delay={0.4}>
                  <h3 className="font-semibold text-primary mb-3 text-base uppercase tracking-wider font-mono">Business Impact</h3>
                </MaskReveal>
                <MaskReveal direction="bottom" delay={0.45}>
                  <p className="text-foreground leading-relaxed font-medium">{CASE_STUDY.impact}</p>
                </MaskReveal>
              </div>
            </div>

            <MaskReveal direction="bottom" delay={0.5} className="mt-10">
              <div className="flex flex-wrap gap-2">
                {CASE_STUDY.tech.map((t) => (
                  <TechBadge key={t} label={t} />
                ))}
              </div>
            </MaskReveal>

            <MaskReveal direction="bottom" delay={0.6} className="mt-12">
               <Button variant="outline" className="rounded-full group bg-white/50 backdrop-blur-sm border-white/40 hover:bg-white/80 h-12 px-8">
                 Read Full Case Study
                 <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Button>
            </MaskReveal>
          </div>

          {/* Right Column (Scrolling Visuals) */}
          <div className="w-full lg:w-[45%] flex flex-col gap-8 mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-[650px] rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 relative overflow-hidden flex flex-col justify-between"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-60" />
                
                {/* Top Section: Multiple inputs */}
                <div className="flex justify-between items-start relative z-10 w-full mt-4">
                  <div className="flex flex-col gap-5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-28 h-12 rounded-xl border border-dashed border-primary/40 bg-white/60 backdrop-blur-md flex items-center justify-center shadow-sm relative group z-20">
                        <span className="text-primary/80 font-mono text-xs font-bold tracking-wide">CSV Data {i}</span>
                        {/* Flow line right */}
                        <div className="absolute -right-16 top-1/2 w-16 h-px bg-border/80">
                          <div className="absolute left-0 top-0 w-full h-full bg-primary/60 origin-left animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Floating decorative elements */}
                  <div className="absolute right-4 top-8 opacity-50 blur-[0.5px]">
                    <div className="w-36 h-28 rounded-xl bg-white shadow-xl border border-border/40 p-4 transform rotate-12 transition-transform duration-700 hover:rotate-6">
                      <div className="w-20 h-2 bg-muted/80 rounded mb-3" />
                      <div className="w-full h-2 bg-muted/40 rounded mb-3" />
                      <div className="w-4/5 h-2 bg-muted/40 rounded mb-3" />
                      <div className="w-2/3 h-2 bg-muted/40 rounded" />
                    </div>
                  </div>
                </div>

                {/* Central Engine */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full flex justify-center">
                  <div className="relative">
                    {/* Pulsing ring */}
                    <div className="absolute inset-[-10px] rounded-[2rem] bg-primary/20 animate-ping opacity-30" style={{ animationDuration: '3s' }} />
                    <div className="w-56 h-36 rounded-[1.5rem] border border-primary/40 bg-white/90 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center relative z-20">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <span className="text-primary font-bold text-2xl">{"</>"}</span>
                      </div>
                      <span className="text-primary font-mono font-bold text-sm tracking-wider uppercase">VBA Engine</span>
                      <span className="text-primary/60 font-mono font-semibold text-xs mt-1">+ Power Query</span>
                    </div>
                  </div>
                </div>

                {/* Output flow */}
                <div className="flex flex-col items-center relative z-10 w-full mb-4 mt-auto">
                  <div className="w-px h-24 bg-border/80 relative mb-5">
                     <div className="absolute top-0 w-full h-full bg-primary/60 origin-top animate-pulse delay-700" />
                  </div>
                  <div className="w-[85%] h-16 rounded-xl border-2 border-primary/30 bg-primary/5 backdrop-blur-sm flex items-center justify-center shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[200%] animate-[shimmer_2s_infinite]" />
                    <span className="text-primary font-bold tracking-wide relative z-10 text-sm">Executive Financial Dashboard</span>
                  </div>
                </div>
                
                {/* Decorative background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
