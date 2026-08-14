"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // Check if the user is on a touch device; if so, we don't want a custom cursor
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      // Offset by half the width/height (16px / 2 = 8px) to center it
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    // Hide native cursor while this component is mounted, on every element.
    const style = document.createElement("style");
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      style.remove();
    };
    // isVisible must stay out of this list. With it in, the very first mouse move
    // re-ran the whole effect: listeners detached and reattached, and the global
    // cursor-hiding <style> was destroyed and rebuilt mid-interaction.
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 border-[2px] border-primary bg-primary/20 z-[10000] pointer-events-none"
      style={{
        x: cursorX,
        y: cursorY,
        rotate: 45 // This makes the square a diamond
      }}
    >
      {/* Adding a tiny dot in the center for precision */}
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  );
}
