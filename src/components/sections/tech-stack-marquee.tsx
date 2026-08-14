"use client";

import { TECH_STACK } from "@/constants/content";
import { motion } from "framer-motion";
import { TechBadge } from "@/components/shared/tech-badge";

export function TechStackMarquee() {
  // Duplicate the array to create a seamless loop
  const marqueeItems = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="py-12 overflow-hidden relative flex items-center">
      {/* Left and Right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="flex w-[200%]">
        <motion.div
          className="flex items-center gap-6 pr-6 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Adjust speed here
          }}
        >
          {marqueeItems.map((tech, index) => (
            <div key={index} className="text-xl font-mono text-muted-foreground font-semibold px-4">
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
