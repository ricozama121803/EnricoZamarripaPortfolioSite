"use client";
import { GlowingEffect } from "./ui/glowing-effect";
import { cn } from "../lib/utils";

// Aceternity "glowing effect" card: a thin border that lights up in electric blue near the cursor.
const GlowCard = ({ children, className, innerClassName }) => (
  <div className={cn("relative h-full rounded-2xl border border-neutral-800 p-1.5", className)}>
    <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
    <div className={cn("relative h-full rounded-xl bg-neutral-900/70 backdrop-blur-sm", innerClassName)}>{children}</div>
  </div>
);

export default GlowCard;
