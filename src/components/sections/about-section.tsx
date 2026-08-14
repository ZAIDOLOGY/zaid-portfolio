import { FadeIn, MaskReveal } from "@/components/shared/motion-wrappers";
import { SectionHeader } from "@/components/shared/section-header";

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="The Engineering Mindset"
            subtitle="About Muhammad Zaid"
            align="center"
            titleClassName="text-6xl md:text-7xl lg:text-9xl font-bold tracking-normal"
            titleStyle={{ fontFamily: "'Victory Striker Sans Demo', sans-serif" }}
            titleAnimation="mask-left"
          />
          <div className="mt-8 space-y-6 text-xl md:text-2xl text-white font-medium leading-relaxed drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
            <MaskReveal direction="bottom" delay={0.3}>
              <p>
                I don&apos;t just write macro scripts. I architect robust, maintainable systems that solve complex business bottlenecks and protect your most critical data.
              </p>
            </MaskReveal>
            <MaskReveal direction="bottom" delay={0.4}>
              <p>
                With deep expertise in Excel VBA and modern automation pipelines, I transform chaotic, manual spreadsheet workflows into lightning-fast, automated engines. When leadership needs instant visibility and teams need hours back in their week, I build the systems that make it happen.
              </p>
            </MaskReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
