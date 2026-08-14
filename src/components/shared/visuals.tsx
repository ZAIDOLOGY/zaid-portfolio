"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * A subtle film grain noise layer to add texture to backgrounds.
 */
export function NoiseLayer({ className, opacity = 0.03, ...props }: HTMLAttributes<HTMLDivElement> & { opacity?: number }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-0 h-full w-full", className)}
      style={{
        backgroundImage: 'url("/assets/noise.png")', // Assumes a noise.png will be provided in Phase 10 assets
        backgroundRepeat: "repeat",
        opacity,
      }}
      {...props}
    />
  );
}

/**
 * An engineering/blueprint style grid background.
 */
export function GridBackground({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]",
        className
      )}
      {...props}
    />
  );
}

interface GlowEffectProps extends HTMLAttributes<HTMLDivElement> {
  color?: "primary" | "secondary" | "destructive";
  position?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * A reusable radial ambient glow effect for premium SaaS aesthetics.
 */
export function GlowEffect({ 
  className, 
  color = "primary", 
  position = "center",
  size = "lg",
  ...props 
}: GlowEffectProps) {
  
  const colors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    destructive: "bg-destructive",
  };

  const positions = {
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  };

  const sizes = {
    sm: "w-[200px] h-[200px] blur-[60px]",
    md: "w-[400px] h-[400px] blur-[100px]",
    lg: "w-[600px] h-[600px] blur-[150px]",
    xl: "w-[800px] h-[800px] blur-[200px]",
  };

  return (
    <div
      className={cn(
        "absolute rounded-full pointer-events-none -z-10 opacity-20",
        colors[color],
        positions[position],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

/**
 * A gradient overlay to create smooth fades over content or images.
 */
export function GradientOverlay({ 
  className, 
  direction = "to-b",
  ...props 
}: HTMLAttributes<HTMLDivElement> & { direction?: "to-t" | "to-b" | "to-l" | "to-r" }) {
  const directions = {
    "to-t": "bg-gradient-to-t",
    "to-b": "bg-gradient-to-b",
    "to-l": "bg-gradient-to-l",
    "to-r": "bg-gradient-to-r",
  };

  return (
    <div
      className={cn("absolute inset-0 pointer-events-none z-10 from-background to-transparent", directions[direction], className)}
      {...props}
    />
  );
}

/**
 * A smaller, floating amoeba used as a decorative background element.
 */
export function FloatingAmoeba({
  className,
  delay = 0,
  text,
  style,
}: {
  className?: string;
  delay?: number;
  text?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={cn("absolute z-0 pointer-events-none flex items-center justify-center opacity-90", className)} style={style}>
      <motion.div
        // Only transform properties are animated here. The previous version keyframed
        // borderRadius, which the compositor cannot handle — it repainted all 18 of
        // these every frame, permanently. The organic shape is now static and the
        // motion comes from rotate/scale, which run on the GPU.
        animate={{
          rotate: [0, 90, 180, 360],
          scale: [1, 1.06, 0.97, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
        className="absolute inset-0 shadow-xl"
        style={{
          borderRadius: "20% 80% 30% 70% / 70% 30% 80% 20%",
          background: "linear-gradient(135deg, var(--foreground) 0%, var(--primary) 100%)",
        }}
      />
      {text && (
        <span className="relative z-10 font-extrabold text-white text-center px-8 text-xl md:text-2xl leading-tight drop-shadow-xl max-w-[80%]">
          {text}
        </span>
      )}
    </div>
  );
}

/**
 * A floating Excel logo used as a decorative background element.
 */
export function FloatingExcelLogo({
  className,
  delay = 0,
  style,
}: {
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div className={cn("absolute z-0 pointer-events-none flex items-center justify-center opacity-80", className)} style={style}>
      <motion.div
        animate={{
          y: [0, -40, 0, 40, 0],
          rotate: [-15, 5, 15, -5, -15],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
        className="relative w-full h-full drop-shadow-2xl"
      >
        <Image 
          src="/excel.svg"
          alt="Excel Logo"
          fill
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
