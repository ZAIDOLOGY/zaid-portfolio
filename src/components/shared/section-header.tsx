import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FadeIn, MaskReveal } from "./motion-wrappers";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  titleStyle?: React.CSSProperties;
  titleAnimation?: "fade" | "mask-left" | "mask-bottom";
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className,
  titleClassName,
  titleStyle,
  titleAnimation = "fade",
}: SectionHeaderProps) {
  const TitleElement = (
    <h2 
      className={cn("text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4", titleClassName)}
      style={titleStyle}
    >
      {title}
    </h2>
  );

  return (
    <div
      className={cn(
        "flex flex-col mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {subtitle && (
        <MaskReveal direction="bottom" delay={0}>
          <span className="text-primary font-mono text-sm uppercase tracking-wider mb-3 block font-semibold">
            {subtitle}
          </span>
        </MaskReveal>
      )}
      
      {titleAnimation === "fade" ? (
        <FadeIn delay={0.1}>{TitleElement}</FadeIn>
      ) : (
        <MaskReveal direction={titleAnimation === "mask-left" ? "left" : "bottom"} delay={0.1}>
          {TitleElement}
        </MaskReveal>
      )}

      {description && (
        <MaskReveal direction="bottom" delay={0.2}>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {description}
          </p>
        </MaskReveal>
      )}
    </div>
  );
}
