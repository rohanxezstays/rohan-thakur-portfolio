"use client";

import dynamic from "next/dynamic";

// Three.js must stay client-only — load the canvas after hydration.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

/**
 * Layered site background: animated grid + dynamic 3D scene + ambient orbs.
 */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20">
      {/* animated dotted grid */}
      <div className="absolute inset-0 bg-grid opacity-60 mask-fade-b" />
      {/* ambient gradient orbs */}
      <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-accent-purple/20 blur-[140px]" />
      <div className="absolute -bottom-40 -right-40 h-[440px] w-[440px] rounded-full bg-accent-blue/15 blur-[140px]" />
      {/* 3D universe */}
      <Scene />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_100%)]" />
    </div>
  );
}
