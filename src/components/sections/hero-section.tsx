"use client";

import { useRef } from "react";
import { FadeIn } from "@/components/shared/motion-wrappers";
import { ScrollIndicator } from "@/components/shared/indicators";
import { buttonVariants } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Roboto_Condensed } from "next/font/google";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY: rawScrollY } = useScroll();
  const scrollY = useSpring(rawScrollY, {
    stiffness: 250,
    damping: 40,
    mass: 0.5,
    restDelta: 0.001
  });
  
  // Smooth scroll animations for the hero content (lazy start, fast finish)
  const opacity = useTransform(scrollY, [0, 400, 800], [1, 0.9, 0]);
  const scale = useTransform(scrollY, [0, 400, 800], [1, 0.98, 0.95]);
  const blurRaw = useTransform(scrollY, [0, 400, 800], [0, 2, 15]);
  const filter = useTransform(blurRaw, (blur) => `blur(${blur}px)`);

  return (
    <section id="top" ref={containerRef} className={cn("relative min-h-screen pt-32 pb-12 md:pb-16 overflow-hidden flex flex-col justify-end", robotoCondensed.className)}>
      
      <motion.div 
        style={{ opacity, scale, filter }} 
        className="w-full h-full absolute inset-0 z-10 flex flex-col justify-end"
      >
        
        {/* BACKGROUND TEXT REMOVED - NOW HANDLED GLOBALLY BY ScrollSidebarWrapper */}
        {/* PORTRAIT REMOVED - NOW HANDLED GLOBALLY BY ScrollSidebarWrapper */}

        {/* FLOATING GLASS CARDS (Z-20) */}
        <div className="absolute inset-0 pointer-events-none z-20 hidden lg:block font-sans">
           {/* Left cards moved to ScrollSidebarWrapper for morphing animation */}
           <FadeIn delay={0.6} className="absolute top-[40%] right-[5%] xl:right-[12%]">
              <div className="bg-background/85 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl p-6 w-56 pointer-events-auto transform hover:scale-105 transition-transform duration-300">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm font-bold text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-[#107c41] fill-[#107c41]/20" /> Creative
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-[#107c41] fill-[#107c41]/20" /> Reliable
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-[#107c41] fill-[#107c41]/20" /> Efficient
                  </li>
                </ul>
              </div>
           </FadeIn>
        </div>

        {/* FOREGROUND HEADLINE & CTAS (Z-30) */}
        <div className="container mx-auto px-6 relative z-30 flex flex-col items-center text-center pb-8 md:pb-12 pointer-events-auto">
          
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-background/90 backdrop-blur-md border border-border text-foreground text-xs md:text-sm font-bold tracking-widest uppercase mb-6 shadow-xl font-sans">
              <span className="flex h-2 w-2 rounded-full bg-[#107c41] animate-pulse" />
              The Excel Expert. That&apos;s Zaid.
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h1 
              className="text-[3.5rem] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9] drop-shadow-2xl"
              style={{ textShadow: "0px 4px 40px rgba(0,0,0,0.6), 0px 2px 10px rgba(0,0,0,0.8)" }}
            >
              Excel Automation,<br/>
              <span className="text-[#33c481]">Applied Differently.</span>
            </h1>
          </FadeIn>
        </div>
      </motion.div>
      
      {/* Scroll Affordance (Z-40) */}
      <FadeIn delay={1.0} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none hidden md:block">
        <ScrollIndicator />
      </FadeIn>
    </section>
  );
}
