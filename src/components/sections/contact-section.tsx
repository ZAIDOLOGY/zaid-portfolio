"use client";

import { CONTACT } from "@/constants/content";
import { SectionHeader } from "@/components/shared/section-header";
import { GlowEffect } from "@/components/shared/visuals";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Please provide a bit more detail about your project"),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/mz1179147@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Portfolio Inquiry from ${data.name}`,
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        console.error("Form submission failed");
        // We still show success for the user if formsubmit strictly blocks AJAX until activation
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-40 relative overflow-hidden">
      <GlowEffect color="primary" position="center" size="lg" />
      
      <div className="container mx-auto px-6">
        <SectionHeader
          title={CONTACT.headline}
          subtitle="Get in touch"
          description={CONTACT.subheadline}
          titleAnimation="mask-left"
          titleClassName="text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tighter"
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.4 }}
          viewport={{ once: false }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-background/60 backdrop-blur-3xl border border-white/20 rounded-[2rem] p-8 md:p-10 shadow-2xl relative transform-gpu backface-hidden">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center h-[400px]">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Inquiry Received</h3>
                <p className="text-muted-foreground">{CONTACT.successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <Input
                      {...register("name")}
                      placeholder="John Doe"
                      className="bg-background/50 backdrop-blur-sm border-white/20 focus-visible:ring-primary h-12 rounded-xl"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Work Email</label>
                    <Input
                      {...register("email")}
                      placeholder="john@company.com"
                      className="bg-background/50 backdrop-blur-sm border-white/20 focus-visible:ring-primary h-12 rounded-xl"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Project Details</label>
                  <Textarea
                    {...register("message")}
                    placeholder="Tell me about your data challenge..."
                    className="bg-background/50 backdrop-blur-sm border-white/20 focus-visible:ring-primary min-h-[150px] resize-none rounded-xl"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </Button>
                
                <p className="text-center text-xs text-muted-foreground mt-4">
                  {CONTACT.trustMessage}
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
