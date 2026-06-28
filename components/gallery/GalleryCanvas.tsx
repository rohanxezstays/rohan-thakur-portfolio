"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  id?: string;
  index: string; // "II"
  title: string; // "Experience"
  year?: string;
  children: ReactNode;
  wide?: boolean; // larger frame (Collection of Works)
}

/**
 * A single museum "canvas": a premium matte-black frame with a cream mat,
 * a brass plaque beneath it, soft top-down museum lighting, GSAP reveal +
 * gentle parallax, and a hover lift. Each canvas fills ~the viewport.
 */
export default function GalleryCanvas({
  id,
  index,
  title,
  year,
  children,
  wide,
}: Props) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gc-frame", {
        opacity: 0,
        y: 64,
        scale: 0.975,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
      gsap.from(".gc-plaque", {
        opacity: 0,
        y: 18,
        duration: 0.8,
        delay: 0.25,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 74%" },
      });
      gsap.to(".gc-inner", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={root}
      className="relative flex min-h-screen w-full items-center justify-center px-5 py-24 sm:px-10"
    >
      {/* soft museum lighting from above */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_8%,rgba(255,253,247,0.7),transparent_70%)]" />

      <div className={`relative w-full ${wide ? "max-w-6xl" : "max-w-5xl"}`}>
        {/* matte-black frame */}
        <div className="gc-frame group relative bg-[#1b1712] p-2.5 shadow-[0_50px_90px_-35px_rgba(28,24,19,0.55)] transition-transform duration-500 ease-out will-change-transform hover:-translate-y-1.5 sm:p-3.5">
          {/* inner gold hairline + cream mat */}
          <div className="relative ring-1 ring-[#caa75f]/30">
            <div className="gc-inner bg-[#F6F1E7] px-6 py-12 sm:px-14 sm:py-16">
              {children}
            </div>
          </div>
        </div>

        {/* brass plaque */}
        <div className="gc-plaque mx-auto mt-7 w-max">
          <div className="bg-gradient-to-b from-[#d8c39a] to-[#bfa779] px-6 py-2 text-center shadow-[0_8px_18px_-10px_rgba(42,36,29,0.5)]">
            <p className="font-serif text-base text-[#2A241D] sm:text-lg">{title}</p>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#2A241D]/65">
              Canvas {index}
              {year ? ` · ${year}` : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
