"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function SmokeTrail() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);

  // Very heavy, slow spring for the massive ambient glow to trail smoothly behind the cursor
  const springConfig = { damping: 40, stiffness: 100, mass: 1.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      // Offset by half the size of the orb (500px / 2 = 250px)
      cursorX.set(e.clientX - 250);
      cursorY.set(e.clientY - 250);
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
    // isVisible is intentionally not a dependency — including it tore down and
    // re-attached the listener on the first mouse move.
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[10]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        // No filter: blur() here. A 60px blur on a 500px element forced a
        // full-screen repaint on every mouse move; the radial gradient already
        // falls off softly enough to read as a glow on its own.
        background:
          "radial-gradient(circle, rgba(16,124,65,0.28) 0%, rgba(33,200,120,0.14) 35%, rgba(16,124,65,0.05) 55%, rgba(16,124,65,0) 72%)",
      }}
    />
  );
}
