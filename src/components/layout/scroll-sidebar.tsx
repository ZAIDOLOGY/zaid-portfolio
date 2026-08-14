"use client";

import { ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue, useSpring } from "framer-motion";
import { TrendingUp } from "lucide-react";

/**
 * Everything in this file animates on scroll, so every animated property is a
 * transform (x / y / scale) or opacity — the two things the compositor can handle
 * without touching layout or paint.
 *
 * All the fixed-position elements below are anchored at left:0 / top:0 and placed
 * with translate in vw/vh units. Driving `left` and `top` directly, as this file
 * used to, forced a full layout recalculation on every scroll frame for each of
 * the eleven elements.
 */
export function ScrollSidebarWrapper({ children }: { children: ReactNode }) {
  const { scrollY: rawScrollY } = useScroll();
  const scrollY = useSpring(rawScrollY, {
    stiffness: 250,
    damping: 40,
    mass: 0.5,
    restDelta: 0.001
  });

  // ZAID Text transformations.
  // Split across two elements: the outer one carries the viewport-relative position,
  // the inner one carries the element-relative centering offset. Keeping them apart
  // lets both stay pure transforms instead of mixing % and vh in one interpolation.
  const zaidX = useTransform(scrollY, [0, 400, 800], ["50vw", "42vw", "2.5vw"]);
  const zaidY = useTransform(scrollY, [0, 400, 800], ["20vh", "18vh", "3vh"]);
  const zaidSelfX = useTransform(scrollY, [0, 400, 800], ["-50%", "-40%", "0%"]);
  const zaidScale = useTransform(scrollY, [0, 400, 800], [1, 0.85, 0.1]);
  const zaidColor = useTransform(scrollY, [0, 400, 800], ["rgba(16,124,65,0.05)", "rgba(16,124,65,0.2)", "rgba(16,124,65,1)"]);

  // Global Portrait focus pull.
  // Cross-fades a sharp copy over a permanently blurred one. Animating filter:blur()
  // on an 85vh image repainted it from scratch every frame; a static blur is
  // rasterized once and opacity is free.
  const portraitSharpOpacity = useTransform(scrollY, [0, 400, 800], [1, 0.65, 0]);

  // Glassmorphic Backdrop Box Transformations (Sliding in from left)
  // Staggered appearance for a cascading effect
  const box1X = useTransform(scrollY, [200, 700], ["-150%", "0%"]);
  const box2X = useTransform(scrollY, [300, 800], ["-150%", "0%"]);
  const box3X = useTransform(scrollY, [400, 900], ["-150%", "0%"]);

  // Left Card 1 (5000+ Hours) transformations
  // End at 14vh (centered between ZAID logo and nav links), scale down to 0.85
  const card1Y = useTransform(scrollY, [0, 400, 800], ["35vh", "30vh", "14vh"]);
  const card1X = useTransform(scrollY, [0, 400, 800], ["12vw", "10vw", "2.2vw"]);
  const card1Scale = useTransform(scrollY, [0, 400, 800], [1, 0.95, 0.85]);

  // Left Card 2 (80+ Projects) transformations
  // End at exactly 14vh to align, pushed to 11vw for mathematical centering in tighter box
  const card2Y = useTransform(scrollY, [0, 400, 800], ["52vh", "58vh", "14vh"]);
  const card2X = useTransform(scrollY, [0, 400, 800], ["10vw", "9vw", "11vw"]);
  const card2Scale = useTransform(scrollY, [0, 400, 800], [1, 0.95, 0.85]);

  return (
    <>
      {/* GLOBAL PORTRAIT (Fixed Background) */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-end h-screen w-full overflow-hidden">
        {/* Subtle glow behind the person — static blur, painted once */}
        <div className="absolute inset-0 bg-[#107c41]/30 blur-[100px] rounded-full scale-75 opacity-60 translate-y-20" />

        {/* Blurred copy underneath */}
        <img
          src="/zaid.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto h-[85vh] object-contain z-10 origin-bottom"
          style={{ filter: "blur(25px)" }}
        />

        {/* Sharp copy on top, fades away as the sidebar takes over */}
        <motion.img
          src="/zaid.png"
          alt="Muhammad Zaid"
          className="w-auto h-[85vh] object-contain relative z-10 origin-bottom"
          style={{ opacity: portraitSharpOpacity }}
        />
      </div>

      {/* Fixed ZAID Logo */}
      <motion.div
        className="fixed top-0 left-0 z-[55] pointer-events-none select-none"
        style={{ x: zaidX, y: zaidY }}
      >
        <motion.h1
          className="text-[28vw] font-black tracking-tighter leading-none whitespace-nowrap drop-shadow-sm origin-top-left"
          style={{ x: zaidSelfX, scale: zaidScale, color: zaidColor }}
        >
          ZAID.
        </motion.h1>
      </motion.div>

      {/* BACKGROUND GLASS BOXES FOR SIDEBAR */}
      {/* These are large, fixed, and sit over scrolling content, so backdrop-blur here
          meant re-compositing a 19vw x 50vh region every frame. A more opaque
          background reads the same at a glance and costs nothing. */}
      <motion.div
        className="fixed z-[45] bg-background/80 border border-border/50 shadow-2xl rounded-3xl pointer-events-none"
        style={{ top: "1.5vh", left: "1vw", width: "19vw", height: "8vh", x: box1X }}
      />
      <motion.div
        className="fixed z-[45] bg-background/80 border border-border/50 shadow-2xl rounded-3xl pointer-events-none"
        style={{ top: "12vh", left: "1vw", width: "19vw", height: "16vh", x: box2X }}
      />
      <motion.div
        className="fixed z-[45] bg-background/80 border border-border/50 shadow-2xl rounded-3xl pointer-events-none"
        style={{ top: "30.5vh", left: "1vw", width: "19vw", height: "50vh", x: box3X }}
      />

      {/* Floating Morphing Cards */}
      <motion.div
        className="fixed top-0 left-0 z-[60] bg-background/85 backdrop-blur-md border border-border/50 shadow-2xl rounded-2xl flex flex-col items-center justify-center gap-2 w-44 h-32 p-4 origin-top-left pointer-events-none"
        style={{ x: card1X, y: card1Y, scale: card1Scale }}
      >
        <TrendingUp className="w-8 h-8 text-[#107c41]" />
        <div className="flex flex-col text-center">
          <span className="font-black text-xl text-foreground leading-none mb-1">5000+</span>
          <span className="text-[10px] font-bold text-[#107c41] uppercase tracking-wider">Hours Saved</span>
        </div>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-[60] bg-background/85 backdrop-blur-md border border-border/50 shadow-2xl rounded-2xl p-4 flex flex-col items-center justify-center gap-2 w-44 h-32 pointer-events-none origin-top-left"
        style={{ x: card2X, y: card2Y, scale: card2Scale }}
      >
        <span className="font-black text-3xl text-[#107c41] leading-none mb-1">80+</span>
        <div className="flex flex-col text-center">
          <span className="text-[10px] font-bold text-foreground leading-tight uppercase tracking-wider">Projects</span>
          <span className="text-[10px] font-bold text-[#107c41] leading-tight uppercase tracking-wider">Delivered</span>
        </div>
      </motion.div>

      {/* TRUE MORPHING NAV LINKS */}
      <MorphingNavLink scrollY={scrollY} name="HOME" href="#top" heroLeft="8vw" heroTop="68vh" sidebarLeft="3vw" sidebarTop="32vh" />
      <MorphingNavLink scrollY={scrollY} name="ABOUT ME" href="#about" heroLeft="15vw" heroTop="68vh" sidebarLeft="3vw" sidebarTop="37vh" />
      <MorphingNavLink scrollY={scrollY} name="WORK" href="#work" heroLeft="26vw" heroTop="68vh" sidebarLeft="3vw" sidebarTop="42vh" />

      <MorphingNavLink scrollY={scrollY} name="SERVICES" href="#services" heroLeft="66vw" heroTop="68vh" sidebarLeft="3vw" sidebarTop="47vh" />
      <MorphingNavLink scrollY={scrollY} name="PROCESS" href="#process" heroLeft="76vw" heroTop="68vh" sidebarLeft="3vw" sidebarTop="52vh" />
      <MorphingNavLink scrollY={scrollY} name="FAQ" href="#faq" heroLeft="85vw" heroTop="68vh" sidebarLeft="3vw" sidebarTop="57vh" />

      {/* Morphing CTAs */}
      <MorphingCTA scrollY={scrollY} text="Book a Call" href="#contact" variant="primary" heroLeft="38vw" heroTop="88vh" sidebarLeft="3vw" sidebarTop="65vh" />
      <MorphingCTA scrollY={scrollY} text="About Me" href="#about" variant="outline" heroLeft="53vw" heroTop="88vh" sidebarLeft="3vw" sidebarTop="73vh" />

      {/* Page Content wrapped in a relative div. Subsequent sections will be padded in page.tsx */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </>
  );
}

function MorphingNavLink({
  scrollY, name, href, heroLeft, heroTop, sidebarLeft, sidebarTop
}: {
  scrollY: MotionValue<number>, name: string, href: string, heroLeft: string, heroTop: string, sidebarLeft: string, sidebarTop: string
}) {
  const x = useTransform(scrollY, [0, 400, 800], [heroLeft, heroLeft, sidebarLeft]);
  const y = useTransform(scrollY, [0, 400, 800], [heroTop, heroTop, sidebarTop]);
  const color = useTransform(scrollY, [0, 400, 800], ["#ffffff", "#ffffff", "#107c41"]);
  const scale = useTransform(scrollY, [0, 400, 800], [1.3, 1.25, 1.25]);

  return (
    <motion.a
      href={href}
      className="fixed top-0 left-0 z-[60] font-black hover:text-[#107c41] transition-colors whitespace-nowrap drop-shadow-sm origin-top-left"
      style={{ x, y, color, scale }}
    >
      {name}
    </motion.a>
  );
}

function MorphingCTA({
  scrollY, text, href, variant, heroLeft, heroTop, sidebarLeft, sidebarTop
}: {
  scrollY: MotionValue<number>, text: string, href: string, variant: "primary" | "outline", heroLeft: string, heroTop: string, sidebarLeft: string, sidebarTop: string
}) {
  const x = useTransform(scrollY, [0, 400, 800], [heroLeft, heroLeft, sidebarLeft]);
  const y = useTransform(scrollY, [0, 400, 800], [heroTop, heroTop, sidebarTop]);
  const scale = useTransform(scrollY, [0, 400, 800], [1.1, 1.0, 0.8]);

  const isPrimary = variant === "primary";
  const baseClasses = "fixed top-0 left-0 z-[60] rounded-full text-lg h-14 px-10 font-bold shadow-xl flex items-center justify-center whitespace-nowrap origin-top-left transition-colors";
  const primaryClasses = "bg-[#107c41] hover:bg-[#0c5d31] text-white";
  const outlineClasses = "bg-background/80 backdrop-blur-md border-2 text-foreground hover:bg-secondary";

  return (
    <motion.a
      href={href}
      className={`${baseClasses} ${isPrimary ? primaryClasses : outlineClasses}`}
      style={{ x, y, scale }}
    >
      {text}
    </motion.a>
  );
}
