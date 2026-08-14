"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/**
 * A standard, animated loading spinner.
 */
export function Spinner({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };
  return <Loader2 className={cn("animate-spin text-primary", sizes[size], className)} />;
}

/**
 * Animated number counter that counts up to the target value when scrolled into view.
 */
function RollingDigit({ 
  targetValue, 
  delay, 
  isInView 
}: { 
  targetValue: string; 
  delay: number; 
  isInView: boolean 
}) {
  if (isNaN(parseInt(targetValue))) {
    return <span className="inline-flex h-[1.5em] items-center justify-center">{targetValue}</span>;
  }
  
  const num = parseInt(targetValue);
  
  // Create an array that loops 0-9 three times for a long rolling effect
  const loops = 3;
  const digits = Array.from({ length: 10 * loops }, (_, i) => i % 10);
  
  // The target index is in the last loop
  const targetIndex = (loops - 1) * 10 + num;
  
  // Calculate percentage based on total height
  const percentage = (targetIndex / digits.length) * 100;

  return (
    <span className="relative inline-block h-[1.5em] overflow-hidden align-bottom px-[0.1em] -mx-[0.1em]">
      <motion.div
        initial={{ y: "0%" }}
        animate={isInView ? { y: `-${percentage}%` } : { y: "0%" }}
        transition={{ 
          duration: 2.5, 
          delay: delay, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="flex flex-col will-change-transform"
      >
        {digits.map((n, i) => (
          <span key={i} className="flex-none h-[1.5em] flex items-center justify-center text-center tabular-nums">
            {n}
          </span>
        ))}
      </motion.div>
    </span>
  );
}

export function AnimatedCounter({ 
  value, 
  suffix = "", 
  className 
}: { 
  value: number; 
  suffix?: string; 
  className?: string; 
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  
  const targetString = value.toLocaleString();

  return (
    <span ref={ref} className={cn("inline-flex items-center", className)}>
      {targetString.split("").map((char, index) => (
        <RollingDigit 
          key={index} 
          targetValue={char} 
          delay={index * 0.1} 
          isInView={isInView} 
        />
      ))}
      {suffix && (
        <span className="inline-flex h-[1.5em] items-center justify-center ml-1">{suffix}</span>
      )}
    </span>
  );
}

/**
 * A floating chevron scroll indicator that disappears on scroll.
 */
export function ScrollIndicator({ className }: { className?: string }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <motion.div 
      style={{ opacity }}
      className={cn("flex flex-col items-center justify-center gap-2", className)}
    >
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown className="h-4 w-4 text-primary" />
      </motion.div>
    </motion.div>
  );
}
