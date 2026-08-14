"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, MaskReveal } from "@/components/shared/motion-wrappers";
import { ParallaxLayer } from "@/components/shared/scroll-motion";

const skills = [
  "Excel VBA & Macros",
  "Power Query & DAX",
  "Executive Dashboards",
  "Process Optimization",
  "Data Engineering",
  "Workflow Automation",
];

export function SkillsAmoeba() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      <div className="container px-6 relative z-10 flex flex-col items-center justify-center">
        
        {/* The Animated Amoeba Blob */}
        <ParallaxLayer offset={50} direction="up" className="relative w-full max-w-4xl aspect-square md:aspect-[4/3] flex items-center justify-center">
          
          <motion.div
            animate={{
              borderRadius: [
                "20% 80% 30% 70% / 70% 30% 80% 20%",
                "80% 20% 70% 30% / 30% 70% 20% 80%",
                "40% 60% 20% 80% / 80% 20% 60% 40%",
                "20% 80% 30% 70% / 70% 30% 80% 20%",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-primary/90 shadow-2xl backdrop-blur-md"
            style={{
              background: "linear-gradient(135deg, var(--primary) 0%, #21a366 100%)",
            }}
          />

          {/* Skills Content Overlay */}
          <div className="relative z-10 flex flex-col items-center text-center p-8 md:p-16 w-full">
            <MaskReveal direction="left" delay={0.1}>
              <h2 
                className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-white mb-8 leading-[0.9]"
                style={{ fontFamily: "'Victory Striker Sans Demo', sans-serif" }}
              >
                Engineering <br className="hidden md:block" /> Core Skills
              </h2>
            </MaskReveal>
            
            <StaggerContainer className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-lg mx-auto">
              {skills.map((skill, i) => (
                <StaggerItem key={i}>
                  <div className="px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-sm md:text-base shadow-lg hover:bg-white/30 transition-colors">
                    {skill}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

        </ParallaxLayer>

      </div>
    </section>
  );
}
