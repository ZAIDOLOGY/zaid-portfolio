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

    const moveCursor = (e: MouseEvent) => {
      // Offset by half the size of the massive orb (600px / 2 = 300px)
      cursorX.set(e.clientX - 300);
      cursorY.set(e.clientY - 300);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[10]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        background: "radial-gradient(circle, rgba(16,124,65,0.4) 0%, rgba(33,200,120,0.15) 40%, rgba(16,124,65,0) 70%)",
        filter: "blur(60px)",
      }}
    />
  );
}
