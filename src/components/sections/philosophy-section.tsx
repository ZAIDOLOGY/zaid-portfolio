"use client";

import { ENGINEERING_PRINCIPLES } from "@/constants/content";
import { SectionHeader } from "@/components/shared/section-header";
import { FeatureCard } from "@/components/shared/advanced-cards";
import { ShieldCheck, Zap, TrendingUp, FileCode2, CheckCircle2, Lock, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

// Map string icon names to actual Lucide components
const IconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Zap,
  TrendingUp,
  FileCode2,
  CheckCircle2,
  Lock,
};

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        <SectionHeader 
          title="Engineering Philosophy" 
          subtitle="Core principles that guarantee reliability, speed, and zero data loss in every automation system."
          align="center"
          titleAnimation="mask-left"
          titleClassName="text-6xl md:text-7xl lg:text-8xl leading-[0.9]"
          titleStyle={{ fontFamily: "'Victory Striker Sans Demo', sans-serif" }}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
          {ENGINEERING_PRINCIPLES.map((principle, index) => {
            const IconComponent = IconMap[principle.iconName];
            const staggerDelay = (index % 3) * 0.1 + 0.1;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.6, delay: staggerDelay, ease: [0.16, 1, 0.3, 1] }}
                className="flex"
              >
                <FeatureCard 
                  title={principle.title}
                  description={principle.description}
                  icon={IconComponent as LucideIcon}
                  className="h-full w-full bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
