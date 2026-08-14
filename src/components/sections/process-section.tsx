"use client";

import { PROCESS } from "@/constants/content";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, StaggerContainer } from "@/components/shared/motion-wrappers";
import { motion } from "framer-motion";

export function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="The Engineering Process"
          subtitle="Methodology"
          description="A structured, predictable consulting workflow designed to eliminate ambiguity and deliver enterprise-grade software."
          titleAnimation="mask-left"
          titleClassName="text-6xl md:text-7xl lg:text-8xl"
        />

        <StaggerContainer className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto mt-16 relative">
          {/* Connecting line for desktop */}
          <motion.div 
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hidden md:block absolute top-12 left-0 h-[1px] bg-border z-0" 
          />
          
          {PROCESS.map((item, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { type: "spring", bounce: 0.4, duration: 1.2 }
                }
              }}
              className="flex-1 relative z-10 bg-background/60 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-lg hover:shadow-xl transition-shadow transform-gpu will-change-transform"
            >
              <div className="flex flex-col gap-6 p-8">
                <div className="w-20 h-20 rounded-2xl bg-card border border-white/50 flex items-center justify-center shadow-inner relative group mx-auto md:mx-0">
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl font-mono font-black text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.step}
                  </span>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
