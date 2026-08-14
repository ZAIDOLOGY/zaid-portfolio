import { Footer } from "@/components/layout/footer";
import { ScrollSidebarWrapper } from "@/components/layout/scroll-sidebar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { CaseStudySection } from "@/components/sections/case-study-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { SkillsAmoeba } from "@/components/sections/skills-amoeba";
import { WorkShowcase } from "@/components/sections/work-showcase";
import { ProcessSection } from "@/components/sections/process-section";
import { TrustMetrics } from "@/components/sections/trust-metrics";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ScrollFadeSection, ParallaxLayer } from "@/components/shared/scroll-motion";
import { FloatingAmoeba, FloatingExcelLogo } from "@/components/shared/visuals";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden">
      
      {/* Background Decorative Amoebas Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-50]">
        {[...Array(18)].map((_, i) => {
          const isLeft = i % 2 === 0;
          
          // Group into Left/Right pairs (rows)
          const rowIndex = Math.floor(i / 2);
          
          // Base vertical position for the pair
          const baseTop = 4.5 + rowIndex * 11.5; 
          
          // Add a stagger: left amoeba pushed up to sit above the glass card, right amoeba stays perfectly positioned
          const stagger = isLeft ? -3 : 4;
          const topPosition = baseTop + stagger;
          
          const facts = [
            "5,000+ Hours Saved",
            "Zero-Error Reporting",
            "Data Architecture",
            "Enterprise Scalable",
            "VBA Mastery",
            "Automated Workflows",
            "Custom Solutions",
            "Dashboard UI/UX",
            "Process Optimization",
            "Power Query",
            "System Design",
            "API Integration",
            "Data Pipelines",
            "Actionable Insights",
            "Future-Proof",
            "Scalability",
            "Financial Modeling",
            "100% Accuracy",
            "Legacy System Repair",
            "Instant Calculations"
          ];
          
          const fact = facts[i % facts.length];
          const delay = (i * 3) % 10;
          
          // Alternate styling slightly for variety
          const isLarge = i % 3 === 0;
          const widthClass = isLarge ? "w-[240px] h-[240px] md:w-[320px] md:h-[320px]" : "w-[180px] h-[180px] md:w-[260px] md:h-[260px]";
          
          // Randomize the horizontal inset slightly to feel organic instead of a straight line
          const insetOffsets = ["2%", "5%", "8%", "1%"];
          const inset = insetOffsets[i % insetOffsets.length];
          
          return (
            <ParallaxLayer 
              key={`amoeba-${i}`} 
              offset={isLeft ? 200 : 150} 
              direction={isLeft ? "up" : "down"} 
              className="absolute w-full"
              style={{
                top: `${topPosition}%`,
              }}
            >
              <FloatingAmoeba 
                className={widthClass} 
                delay={delay} 
                text={fact} 
                style={{
                  left: isLeft ? inset : undefined,
                  right: isLeft ? undefined : inset,
                }}
              />
            </ParallaxLayer>
          );
        })}

        {/* Floating Excel Logos - Independent Layer */}
        {[...Array(6)].map((_, i) => {
          // Push the first few logos down or up to avoid the hero nav section
          const topPosition = 5 + i * 20; // Spread them out more vertically
          const delay = (i * 4) % 10;
          
          const excelPositions = ["center", "right", "right", "left", "center", "right"]; // Removed left for the first viewport
          const excelPos = excelPositions[i % excelPositions.length];
          const centerOffsets = ["75%", "50%", "75%", "35%", "65%"]; // Pushed center items to the right in the first viewport
          const excelCenter = centerOffsets[i % centerOffsets.length];
          
          const excelWidthClass = i % 2 === 0 ? "w-[120px] h-[120px] md:w-[160px] md:h-[160px]" : "w-[80px] h-[80px] md:w-[120px] md:h-[120px]";
          
          return (
            <ParallaxLayer 
              key={`excel-${i}`} 
              offset={180} 
              direction={i % 2 === 0 ? "down" : "up"} 
              className="absolute w-full"
              style={{
                top: `${topPosition}%`,
              }}
            >
              <FloatingExcelLogo 
                className={excelWidthClass} 
                delay={delay} 
                style={{
                  left: excelPos === "left" ? "8%" : excelPos === "center" ? excelCenter : undefined,
                  right: excelPos === "right" ? "8%" : undefined,
                  transform: excelPos === "center" ? 'translateX(-50%)' : undefined,
                }}
              />
            </ParallaxLayer>
          );
        })}
      </div>

      <ScrollSidebarWrapper>
        {/* STICKY SCROLL TRAP: Releases halfway through the animation (400px) so the next section slides up to fill the screen while the sidebar finishes morphing */}
        <div className="h-[calc(100vh+400px)] relative w-full">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <HeroSection />
          </div>
        </div>
        
        {/* The rest of the content needs to be padded so it sits to the right of the sidebar */}
        <div className="w-full flex justify-end">
          <div className="w-[80%] pt-20">
            <ScrollFadeSection>
              <AboutSection />
            </ScrollFadeSection>
            
            <ScrollFadeSection>
              <ServicesSection />
            </ScrollFadeSection>
            
            <ScrollFadeSection>
              <CaseStudySection />
            </ScrollFadeSection>
            
            {/* SelectedProjectsSection will go here */}
            
            <ScrollFadeSection>
              <PhilosophySection />
            </ScrollFadeSection>
            
            <ScrollFadeSection>
              <SkillsAmoeba />
            </ScrollFadeSection>
            
            <ScrollFadeSection>
              <WorkShowcase />
            </ScrollFadeSection>
            
            <ScrollFadeSection>
              <ProcessSection />
            </ScrollFadeSection>
            
            <ScrollFadeSection>
              <TrustMetrics />
            </ScrollFadeSection>
            
            <ScrollFadeSection>
              <FaqSection />
            </ScrollFadeSection>
            
            <ContactSection />
            <Footer />
          </div>
        </div>
      </ScrollSidebarWrapper>
    </main>
  );
}
