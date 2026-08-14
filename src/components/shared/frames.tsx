import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FrameProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * A sleek MacOS-style window wrapper for showcasing web software.
 */
export function BrowserFrame({ children, className, ...props }: FrameProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-border bg-card overflow-hidden shadow-2xl flex flex-col",
        className
      )}
      {...props}
    >
      {/* Browser Header Controls */}
      <div className="flex h-10 items-center gap-2 border-b border-border/50 bg-secondary/50 px-4">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        {/* Fake URL Bar */}
        <div className="mx-auto w-1/2 max-w-sm rounded-md bg-background/50 h-6 border border-border/30" />
      </div>
      
      {/* Browser Content */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}

/**
 * A specialized wrapper for rendering Excel/VBA dashboards aesthetically.
 */
export function DashboardFrame({ children, className, ...props }: FrameProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-border bg-background overflow-hidden shadow-2xl",
        className
      )}
      {...props}
    >
      {/* Dashboard Top Ribbon / Nav Area (Mocking Excel/Data Tool Interface) */}
      <div className="flex h-12 items-center justify-between border-b border-border/80 bg-secondary px-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-1 items-end">
            <div className="h-4 w-1.5 bg-green-600 rounded-sm" />
            <div className="h-5 w-1.5 bg-green-600 rounded-sm" />
            <div className="h-3 w-1.5 bg-green-600 rounded-sm" />
          </div>
          <span className="text-xs font-medium text-foreground/80 font-mono tracking-wider">
            AUTOMATION_DASHBOARD.xlsm
          </span>
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded bg-card border border-border/50" />
          <div className="h-6 w-16 rounded bg-card border border-border/50" />
        </div>
      </div>
      
      {/* Formula/Control Bar */}
      <div className="flex h-8 items-center gap-3 border-b border-border/50 bg-card px-4">
        <span className="text-xs font-mono text-muted-foreground italic select-none">
          fx
        </span>
        <div className="h-4 flex-1 bg-background rounded-sm border border-border/30" />
      </div>

      {/* Main App Content Area */}
      <div className="flex-1 relative w-full h-full p-4 bg-muted/20">
        {children}
      </div>
    </div>
  );
}
