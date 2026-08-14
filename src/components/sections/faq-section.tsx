import { FAQS } from "@/constants/content";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, StaggerItem } from "@/components/shared/motion-wrappers";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Common Questions"
          subtitle="FAQ"
          description="Straightforward answers to the most common questions about the consulting engagement."
          titleAnimation="mask-left"
          titleClassName="text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tighter"
        />

        <FadeIn delay={0.2} className="max-w-3xl mx-auto">
          <Accordion className="w-full text-left">
            {FAQS.map((faq, index) => (
              <StaggerItem key={index}>
                <AccordionItem value={`item-${index}`} className="bg-background/60 backdrop-blur-3xl border border-border/50 rounded-xl px-6 py-2 shadow-sm data-open:bg-card/60 transition-colors">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline hover:text-primary transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </StaggerItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
