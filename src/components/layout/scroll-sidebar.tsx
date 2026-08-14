"use client";

import { ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export function ScrollSidebarWrapper({ children }: { children: ReactNode }) {
  const { scrollY: rawScrollY } = useScroll();
  const scrollY = useSpring(rawScrollY, {
    stiffness: 250,
    damping: 40,
    mass: 0.5,
    restDelta: 0.001
  });

  // ZAID Text transformations
  const zaidTop = useTransform(scrollY, [0, 400, 800], ["20%", "18%", "3vh"]);
  const zaidLeft = useTransform(scrollY, [0, 400, 800], ["50%", "42%", "2.5vw"]);
  const zaidScale = useTransform(scrollY, [0, 400, 800], [1, 0.85, 0.1]);
  const zaidColor = useTransform(scrollY, [0, 400, 800], ["rgba(16,124,65,0.05)", "rgba(16,124,65,0.2)", "rgba(16,124,65,1)"]); 
  const zaidX = useTransform(scrollY, [0, 400, 800], ["-50%", "-40%", "0%"]);

  // Global Portrait Blur
  const portraitBlurRaw = useTransform(scrollY, [0, 400, 800], [0, 4, 25]);
  const portraitBlur = useTransform(portraitBlurRaw, (blur) => `blur(${blur}px)`);

  // Glassmorphic Backdrop Box Transformations (Sliding in from left)
  // Staggered appearance for a cascading effect
  const box1X = useTransform(scrollY, [200, 700], ["-150%", "0%"]);
  const box2X = useTransform(scrollY, [300, 800], ["-150%", "0%"]);
  const box3X = useTransform(scrollY, [400, 900], ["-150%", "0%"]);

  // Sidebar fade-in removed as well

  // Left Card 1 (5000+ Hours) transformations
  // End at 14vh (centered between ZAID logo and nav links), scale down to 0.85
  const card1Top = useTransform(scrollY, [0, 400, 800], ["35vh", "30vh", "14vh"]);
  const card1Left = useTransform(scrollY, [0, 400, 800], ["12vw", "10vw", "2.2vw"]);
  const card1Scale = useTransform(scrollY, [0, 400, 800], [1, 0.95, 0.85]);

  // Left Card 2 (80+ Projects) transformations
  // End at exactly 14vh to align, pushed to 11vw for mathematical centering in tighter box
  const card2Top = useTransform(scrollY, [0, 400, 800], ["52vh", "58vh", "14vh"]);
  const card2Left = useTransform(scrollY, [0, 400, 800], ["10vw", "9vw", "11vw"]);
  const card2Scale = useTransform(scrollY, [0, 400, 800], [1, 0.95, 0.85]);

  // Morphing Navigation Transformations
  // Each link will animate its left and top properties individually
  return (
    <>
      {/* GLOBAL BLURRING PORTRAIT (Fixed Background) */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-end h-screen w-full overflow-hidden">
        {/* Subtle glow behind the person */}
        <div className="absolute inset-0 bg-[#107c41]/30 blur-[100px] rounded-full scale-75 opacity-60 translate-y-20" />
        <motion.img 
          src="/zaid.png" 
          alt="Muhammad Zaid" 
          className="w-auto h-[85vh] object-contain brightness-110 contrast-125 saturate-110 relative z-10 origin-bottom"
          style={{ filter: portraitBlur }}
        />
      </div>

      {/* Fixed ZAID Logo */}
      <motion.div
        className="fixed z-[55] pointer-events-none select-none origin-top-left"
        style={{ 
          top: zaidTop, 
          left: zaidLeft, 
          scale: zaidScale, 
          color: zaidColor,
          x: zaidX
        }}
      >
        <h1 className="text-[28vw] font-black tracking-tighter leading-none whitespace-nowrap drop-shadow-sm">
          ZAID.
        </h1>
      </motion.div>

      {/* BACKGROUND GLASS BOXES FOR SIDEBAR */}
      <motion.div 
        className="fixed z-[45] bg-background/40 backdrop-blur-3xl border border-border/50 shadow-2xl rounded-3xl pointer-events-none"
        style={{ top: "1.5vh", left: "1vw", width: "19vw", height: "8vh", x: box1X }}
      />
      <motion.div 
        className="fixed z-[45] bg-background/40 backdrop-blur-3xl border border-border/50 shadow-2xl rounded-3xl pointer-events-none"
        style={{ top: "12vh", left: "1vw", width: "19vw", height: "16vh", x: box2X }}
      />
      <motion.div 
        className="fixed z-[45] bg-background/40 backdrop-blur-3xl border border-border/50 shadow-2xl rounded-3xl pointer-events-none"
        style={{ top: "30.5vh", left: "1vw", width: "19vw", height: "50vh", x: box3X }}
      />

      {/* Floating Morphing Cards */}
      <motion.div 
        className="fixed z-[60] bg-background/85 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl flex flex-col items-center justify-center gap-2 w-44 h-32 p-4 origin-top-left pointer-events-none"
        style={{ left: card1Left, top: card1Top, scale: card1Scale }}
      >
        <TrendingUp className="w-8 h-8 text-[#107c41]" />
        <div className="flex flex-col text-center">
          <span className="font-black text-xl text-foreground leading-none mb-1">5000+</span>
          <span className="text-[10px] font-bold text-[#107c41] uppercase tracking-wider">Hours Saved</span>
        </div>
      </motion.div>

      <motion.div 
        className="fixed z-[60] bg-background/85 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl p-4 flex flex-col items-center justify-center gap-2 w-44 h-32 pointer-events-none origin-top-left"
        style={{ left: card2Left, top: card2Top, scale: card2Scale }}
      >
        <span className="font-black text-3xl text-[#107c41] leading-none mb-1">80+</span>
        <div className="flex flex-col text-center">
          <span className="text-[10px] font-bold text-foreground leading-tight uppercase tracking-wider">Projects</span>
          <span className="text-[10px] font-bold text-[#107c41] leading-tight uppercase tracking-wider">Delivered</span>
        </div>
      </motion.div>

      {/* TRUE MORPHING NAV LINKS */}
      <MorphingNavLink scrollY={scrollY} name="HOME" href="#top" heroLeft="8%" heroTop="68%" sidebarLeft="3%" sidebarTop="32vh" />
      <MorphingNavLink scrollY={scrollY} name="ABOUT ME" href="#about" heroLeft="15%" heroTop="68%" sidebarLeft="3%" sidebarTop="37vh" />
      <MorphingNavLink scrollY={scrollY} name="WORK" href="#work" heroLeft="26%" heroTop="68%" sidebarLeft="3%" sidebarTop="42vh" />
      
      <MorphingNavLink scrollY={scrollY} name="SERVICES" href="#services" heroLeft="66%" heroTop="68%" sidebarLeft="3%" sidebarTop="47vh" />
      <MorphingNavLink scrollY={scrollY} name="PROCESS" href="#process" heroLeft="76%" heroTop="68%" sidebarLeft="3%" sidebarTop="52vh" />
      <MorphingNavLink scrollY={scrollY} name="FAQ" href="#faq" heroLeft="85%" heroTop="68%" sidebarLeft="3%" sidebarTop="57vh" />

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
  const left = useTransform(scrollY, [0, 400, 800], [heroLeft, heroLeft, sidebarLeft]);
  const top = useTransform(scrollY, [0, 400, 800], [heroTop, heroTop, sidebarTop]);
  const color = useTransform(scrollY, [0, 400, 800], ["#ffffff", "#ffffff", "#107c41"]); 
  const scale = useTransform(scrollY, [0, 400, 800], [1.3, 1.25, 1.25]); 

  return (
    <motion.a
      href={href}
      className="fixed z-[60] font-black hover:text-[#107c41] transition-colors whitespace-nowrap drop-shadow-sm origin-top-left"
      style={{ left, top, color, scale }}
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
  const left = useTransform(scrollY, [0, 400, 800], [heroLeft, heroLeft, sidebarLeft]);
  const top = useTransform(scrollY, [0, 400, 800], [heroTop, heroTop, sidebarTop]);
  const scale = useTransform(scrollY, [0, 400, 800], [1.1, 1.0, 0.8]); 

  const isPrimary = variant === "primary";
  const baseClasses = "fixed z-[60] rounded-full text-lg h-14 px-10 font-bold shadow-xl flex items-center justify-center whitespace-nowrap origin-top-left transition-colors";
  const primaryClasses = "bg-[#107c41] hover:bg-[#0c5d31] text-white";
  const outlineClasses = "bg-background/80 backdrop-blur-md border-2 text-foreground hover:bg-secondary";

  return (
    <motion.a
      href={href}
      className={`${baseClasses} ${isPrimary ? primaryClasses : outlineClasses}`}
      style={{ left, top, scale }}
    >
      {text}
    </motion.a>
  );
}
