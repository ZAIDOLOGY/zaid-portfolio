"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  children?: ReactNode;
  offset?: number; // How far it moves (e.g., 50 for subtle, 200 for dramatic)
  className?: string;
  direction?: "up" | "down";
  style?: React.CSSProperties;
}

export function ParallaxLayer({ 
  children, 
  offset = 50, 
  className, 
  direction = "up",
  style
}: ParallaxLayerProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth the scroll progress to avoid jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate movement range
  const yRange = direction === "up" ? [offset, -offset] : [-offset, offset];
  const y = useTransform(smoothProgress, [0, 1], yRange);

  if (prefersReducedMotion) {
    return <div className={cn("relative", className)} style={style}>{children}</div>;
  }

  return (
    <motion.div 
      ref={ref} 
      style={{ y, ...style }} 
      className={cn("relative will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

interface ScrollFadeSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function ScrollFadeSection({ children, className, id }: ScrollFadeSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Fade out as it leaves the top of the screen (progress near 1)
  // Fade in as it enters the bottom (progress near 0)
  // Full opacity in the middle (0.2 to 0.8)
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  if (prefersReducedMotion) {
    return (
      <section id={id} className={cn("relative", className)}>
        {children}
      </section>
    );
  }

  return (
    <motion.section 
      id={id}
      ref={ref} 
      style={{ opacity, scale }} 
      className={cn("relative will-change-transform", className)}
    >
      {children}
    </motion.section>
  );
}
