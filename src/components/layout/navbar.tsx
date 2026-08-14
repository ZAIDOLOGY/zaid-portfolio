"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useBodyLock } from "@/hooks/use-body-lock";

const NAV_LINKS = [
  { name: "About", id: "about" },
  { name: "Services", id: "services" },
  { name: "Work", id: "case-study" },
  { name: "Process", id: "process" },
];

/**
 * Handles smooth scrolling with an offset for the fixed header
 */
const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  
  const element = document.getElementById(id);
  if (element) {
    const navHeight = 90; // Approximate height of sticky nav
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - navHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

/**
 * Reusable Logo Component
 */
function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a 
      href="#top" 
      onClick={(e) => {
        scrollToSection(e, "top");
        onClick?.();
      }}
      className="text-xl font-bold tracking-tighter text-foreground flex items-center gap-2 group relative z-50"
    >
      Zaid<span className="text-primary transition-transform duration-300 group-hover:scale-125 inline-block">.</span>
    </a>
  );
}

/**
 * Main Navbar Component
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Track active section for scroll spy highlighting
  const activeSection = useScrollSpy(NAV_LINKS.map(link => link.id), 100);
  
  // Lock body scroll when mobile menu is open
  useBodyLock(isMobileMenuOpen);

  // Handle transparent -> blur background transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/70 backdrop-blur-xl border-white/50 py-4 shadow-sm"
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="relative text-sm font-medium transition-colors hover:text-foreground py-1"
              >
                <span className={cn("relative z-10", isActive ? "text-foreground" : "text-muted-foreground")}>
                  {link.name}
                </span>
                
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, "contact")}
            className={cn(buttonVariants({ variant: "default" }), "rounded-full px-6 group")}
          >
            Discuss Project 
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground relative z-50 p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer & Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            
            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-card border-l border-border z-40 md:hidden flex flex-col pt-24 px-6 shadow-2xl"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      className={cn(
                        "text-2xl font-semibold tracking-tight transition-colors py-2 border-b border-border/50",
                        isActive ? "text-primary border-primary/50" : "text-foreground"
                      )}
                      onClick={(e) => {
                        setIsMobileMenuOpen(false);
                        // Timeout allows the drawer to close before scrolling
                        setTimeout(() => scrollToSection(e, link.id), 300);
                      }}
                    >
                      {link.name}
                    </a>
                  );
                })}
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    setTimeout(() => scrollToSection(e, "contact"), 300);
                  }}
                  className={cn(buttonVariants({ variant: "default", size: "lg" }), "mt-8 w-full rounded-full group")}
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
