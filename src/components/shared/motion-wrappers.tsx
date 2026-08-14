"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export function FadeIn({ children, delay = 0, direction = "up", className }: FadeInProps) {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: "0px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // The Phase 8 defined cubic-bezier
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}

export function StaggerContainer({
  children,
  className,
  delayChildren = 0,
  staggerChildren = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export interface MaskRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "bottom" | "top";
  delay?: number;
  className?: string;
  useParentTrigger?: boolean;
}

export function MaskReveal({
  children,
  direction = "bottom",
  delay = 0,
  className,
  useParentTrigger = false,
}: MaskRevealProps) {
  const directions = {
    up: { y: "100%" },
    down: { y: "-100%" },
    bottom: { y: "100%" },
    top: { y: "-100%" },
    left: { x: "100%" },
    right: { x: "-100%" },
  };

  const startX = direction === "left" || direction === "right" ? directions[direction].x : "0%";
  const startY = direction === "up" || direction === "down" || direction === "bottom" || direction === "top" ? directions[direction].y : "0%";

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        variants={{
          hidden: { x: startX, y: startY },
          visible: { 
            x: "0%", 
            y: "0%", 
            transition: { duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] } 
          }
        }}
        initial={useParentTrigger ? undefined : "hidden"}
        whileInView={useParentTrigger ? undefined : "visible"}
        viewport={useParentTrigger ? undefined : { once: false, margin: "0px" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
