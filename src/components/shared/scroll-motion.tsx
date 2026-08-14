"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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

  // Drive the transform straight off scroll progress. A spring here would add a
  // second animation loop per layer (24 of them on the homepage) purely to smooth
  // a value that is already frame-aligned with the scroll.
  const yRange = direction === "up" ? [offset, -offset] : [-offset, offset];
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  if (prefersReducedMotion) {
    return <div className={cn("relative", className)} style={style}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ y, ...style }}
      className={cn("relative", className)}
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

  // Opacity only. Scaling a whole section forces the browser to re-rasterize its
  // entire subtree on every frame, and the old 0.3 floor meant content spent most
  // of the scroll visibly dimmed.
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.6]);

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
      style={{ opacity }}
      className={cn("relative", className)}
    >
      {children}
    </motion.section>
  );
}
