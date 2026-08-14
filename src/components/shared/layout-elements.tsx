import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode, ElementType } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  as?: ElementType;
}

/**
 * Standard constrained container for horizontally centering content.
 */
export function Container({ className, size = "lg", as: Component = "div", ...props }: ContainerProps) {
  const maxW = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[1400px]",
    full: "max-w-full",
  };

  return (
    <Component className={cn("mx-auto px-6 md:px-8", maxW[size], className)} {...props} />
  );
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  borderBottom?: boolean;
}

/**
 * A semantic section element with standardized vertical rhythm.
 */
export function Section({ className, spacing = "lg", borderBottom = false, ...props }: SectionProps) {
  const pad = {
    none: "py-0",
    sm: "py-12 md:py-16",
    md: "py-16 md:py-24",
    lg: "py-24 md:py-32",
    xl: "py-32 md:py-48",
  };

  return (
    <section 
      className={cn(
        "relative w-full",
        pad[spacing],
        borderBottom && "border-b border-border/50",
        className
      )} 
      {...props} 
    />
  );
}

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  gradient?: boolean;
}

/**
 * A semantic divider (hr) that supports gradient fades.
 */
export function Divider({ className, orientation = "horizontal", gradient = false, ...props }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div 
        className={cn(
          "w-px h-full bg-border", 
          gradient && "bg-gradient-to-b from-transparent via-border to-transparent border-0",
          className
        )} 
        {...props} 
      />
    );
  }

  return (
    <hr 
      className={cn(
        "w-full h-px bg-border border-0", 
        gradient && "bg-gradient-to-r from-transparent via-border to-transparent",
        className
      )} 
      {...props} 
    />
  );
}
