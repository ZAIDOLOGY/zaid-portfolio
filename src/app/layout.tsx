import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { CustomCursor } from "@/components/shared/custom-cursor";
import { SmokeTrail } from "@/components/shared/smoke-trail";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zaid | Principal Excel VBA Automation Engineer",
  description: "Premium Excel automation, custom VBA development, and executive dashboard engineering for businesses looking to scale their operations.",
  openGraph: {
    title: "Zaid | Principal Excel VBA Automation Engineer",
    description: "Transform messy spreadsheets into high-performance business systems.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Lock theme to light mode and prevent Dark Reader from hijacking styles */}
        <meta name="color-scheme" content="light only" />
        <meta name="darkreader-lock" />
      </head>
      <body 
        className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/30"
        suppressHydrationWarning
      >
        <SmokeTrail />
        <CustomCursor />
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
