"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";
import { MaskReveal } from "@/components/shared/motion-wrappers";
import { X } from "lucide-react";

const WORK_ITEMS = [
  {
    title: "Executive Performance Overview",
    image: "/images/dashboard-1.jpeg",
    description: "An executive-level view tracking the critical KPI '47.NTM NR RET NSA SN Total Drops'. This dashboard features a clear Daily Volume Trend bar chart, granular Cell Performance Detail tables, and At-A-Glance insights. It effectively isolates top-performing cells (e.g., ANM01465A31) and calculates overall network volatility (70.4%), enabling rapid management decisions.",
    rotate: -16,
    y: 80,
    x: "-120%",
    zIndex: 10,
    scale: 0.7,
  },
  {
    title: "Time-Series Anomaly Detection",
    image: "/images/dashboard-2.jpeg",
    description: "Detailed time-series analysis focusing on '5.NTM NR RET NSA SN Total Drops'. By mapping multiple Cell IDs (AH01407C11, etc.) across a 30-day timeline, this visualization instantly highlights a massive anomaly spike occurring in early April. The overlapping data streams allow engineers to pinpoint exact days where network stability degraded across specific clusters.",
    rotate: -12,
    y: 60,
    x: "-90%",
    zIndex: 20,
    scale: 0.75,
  },
  {
    title: "Granular Cell Cluster Tracking",
    image: "/images/dashboard-3.jpeg",
    description: "A highly focused analysis of a 15-cell cluster tracking '47.NTM NR RET NSA SN Total Drops' during mid-March. This dashboard utilizes a smoothed multi-line chart to compare localized drop rates. It excels at identifying problematic peaks within a tightly scoped geographic or logical site cluster, stripping away network-wide noise.",
    rotate: -8,
    y: 40,
    x: "-60%",
    zIndex: 30,
    scale: 0.85,
  },
  {
    title: "System Reliability Tracking",
    image: "/images/dashboard-4.jpeg",
    description: "Broad-scale reliability tracking for '11.NR SA Overall Accessibility' spanning 257 total cells and 23 sites. The dense, high-frequency line chart demonstrates overall accessibility hovering tightly near 100%, while clearly exposing occasional sharp, critical dips. This view is essential for monitoring strict SLA compliance across 7 distinct network technologies.",
    rotate: -4,
    y: 20,
    x: "-30%",
    zIndex: 40,
    scale: 0.95, 
  },
  {
    title: "Statistical Volatility & Distribution",
    image: "/images/dashboard-5.jpeg",
    description: "Advanced statistical analytics applied to '11.NR SA Overall Accessibility'. This dashboard moves beyond simple tracking by introducing Mean, Standard Deviation (Volatility: 0.71), and Moving Averages (7-point). The inclusion of a frequency distribution bar chart provides deep insight into the normal operating variance versus extreme outlier events.",
    rotate: 0,
    y: 0,
    x: "0%",
    zIndex: 50,
    scale: 1, 
  },
  {
    title: "DL MAC Traffic Volume Matrix",
    image: "/images/dashboard-6.jpeg",
    description: "High-density traffic analysis tracking 'NR DL MAC Traffic Volume gNB (MB)' across a massive array of Cell IDs. The chaotic but structured data streams reveal macro network utilization patterns, peak load hours, and systemic congestion points across the entire mapped geography.",
    rotate: 4,
    y: 20,
    x: "30%",
    zIndex: 40,
    scale: 0.95, 
  },
  {
    title: "Multi-KPI Correlation Board",
    image: "/images/dashboard-7.jpeg",
    description: "A segmented Multi-KPI dashboard designed for rapid cross-referencing. It tracks 6 distinct metrics simultaneously (e.g., SA AFR%, ENDC Setup Fail Rate, RET SA DRB Drops) on identical timelines, allowing analysts to instantly spot cascading failures or correlated network events.",
    rotate: 8,
    y: 40,
    x: "60%",
    zIndex: 30,
    scale: 0.85, 
  },
  {
    title: "Accessibility Failure Deep-Dive",
    image: "/images/dashboard-8.jpeg",
    description: "A focused, high-contrast view into '19.NTM NR ACC SA DRB Accessibility Failures'. Showcasing a massive +411.7% trend shift over 95 days, this board combines a sprawling timeline chart with hard numerical insights (Daily Avg, Peak Day, Lowest Day) to quantify severe network deterioration.",
    rotate: 12,
    y: 60,
    x: "90%",
    zIndex: 20,
    scale: 0.75, 
  },
  {
    title: "Comprehensive Traffic Analytics",
    image: "/images/dashboard-9.jpeg",
    description: "A full-scale, uncropped view of the DL MAC Traffic Volume analysis. This iteration provides a broader contextual view of the 30-day timeline, emphasizing the extreme spikes in traffic volume and highlighting the stability of specific high-performing nodes against the volatile background noise.",
    rotate: 16,
    y: 80,
    x: "120%",
    zIndex: 10,
    scale: 0.7, 
  },
];

export function WorkShowcase() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    };
    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  const selectedItem = selectedIndex !== null ? WORK_ITEMS[selectedIndex] : null;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <>
      <section id="work" className="py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          
          <SectionHeader 
            title="Featured Work" 
            subtitle="Real projects for real businesses, driving measurable results."
            align="center"
            titleAnimation="mask-left"
            titleClassName="text-6xl md:text-7xl lg:text-8xl leading-[0.9]"
            titleStyle={{ fontFamily: "'Victory Striker Sans Demo', sans-serif" }}
          />

          <div className="mt-4 md:mt-8 relative flex justify-center items-center max-w-[1400px] mx-auto h-[350px] md:h-[450px]">
            <div className="flex justify-center items-center w-full relative">
              {WORK_ITEMS.map((item, index) => {
                return (
                  <motion.div
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    initial={{ opacity: 0, y: 0, x: "0%", rotate: 0, scale: 1 }}
                    whileInView={{ 
                      opacity: 1, 
                      x: item.x,
                      y: item.y,
                      rotate: item.rotate,
                      scale: item.scale
                    }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ 
                      opacity: { duration: 0.8 },
                      default: { type: "spring", bounce: 0.35, duration: 2.0, delay: 0.1 }
                    }}
                    whileHover={
                      selectedIndex === null ? {
                        scale: item.scale * 1.05,
                        y: item.y - 10,
                        transition: { duration: 0.3, ease: "easeOut" }
                      } : {}
                    }
                    className="absolute w-[280px] md:w-[450px] aspect-[16/10] rounded-xl overflow-hidden shadow-2xl cursor-pointer group border border-border/20 will-change-transform transform-gpu"
                    style={{
                      zIndex: item.zIndex,
                      transformOrigin: "bottom center",
                    }}
                  >
                    {/* Dark overlay that fades on hover */}
                    <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-500 z-20 pointer-events-none" />
                    
                    <div className="w-full h-full bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center relative overflow-hidden">
                      <span className="text-muted-foreground font-mono text-sm z-0">Placeholder {index + 1}</span>
                      <span className="text-muted-foreground/50 font-mono text-xs z-0 mt-2">{item.title}</span>
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <MaskReveal direction="bottom" delay={0.6} className="mt-16 text-center w-full flex justify-center">
            <a href="#contact" className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors group">
              View full portfolio 
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">↗</span>
            </a>
          </MaskReveal>
        </div>
      </section>

      {/* Lightbox Modal rendered via Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12"
            >
              {/* Dark blur backdrop */}
              <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                onClick={() => setSelectedIndex(null)}
              />

              {/* Modal Content container */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "linear" }}
                className="relative w-full max-w-6xl max-h-[90vh] flex flex-col bg-background border border-border/50 rounded-2xl overflow-hidden shadow-2xl z-10 will-change-transform transform-gpu"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedIndex(null)}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Image Container */}
                <div className="relative w-full flex-1 min-h-[40vh] border-b border-border/50 bg-background">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title}
                    className="absolute inset-0 w-full h-full object-contain p-4 md:p-8"
                  />
                </div>

                {/* Text Description Container */}
                <div className="shrink-0 p-6 md:p-8 flex flex-col gap-3 bg-card max-h-[30vh] overflow-y-auto">
                  <h3 className="text-2xl font-bold text-card-foreground">
                    {selectedItem.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {selectedItem.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
