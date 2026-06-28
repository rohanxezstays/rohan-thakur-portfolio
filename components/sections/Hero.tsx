"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { profile, socials } from "@/lib/data";

/**
 * Editorial "warm bone" hero — inspired by Robert Mccombe.
 * A big serif name marquees slowly leftward BEHIND a centered cutout
 * portrait. The marquee is self-calibrating: it measures one repeating
 * tile and animates at an exact, constant vw/second so the speed is
 * resolution-independent and matches the reference.
 */

// Marquee speed in viewport-widths per second (tuned to the reference).
const SPEED_VW_PER_SEC = 7;
// One repeating unit of the moving name (single space inside the name,
// two non-breaking spaces as the gap before it repeats).
const NAME_UNIT = "Rohan Thakur  ";
const TILE_COUNT = 6;

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tileRef = useRef<HTMLSpanElement>(null);

  // ── continuous, constant-speed leftward marquee (Web Animations API) ──
  useEffect(() => {
    let anim: Animation | null = null;

    const start = () => {
      const track = trackRef.current;
      const tile = tileRef.current;
      if (!track || !tile) return;
      anim?.cancel();

      const tileW = tile.offsetWidth; // px width of one repeating unit
      if (!tileW) return;
      const pxPerSec = (SPEED_VW_PER_SEC / 100) * window.innerWidth;
      const durationMs = (tileW / pxPerSec) * 1000;

      anim = track.animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(${-tileW}px)` },
        ],
        { duration: durationMs, iterations: Infinity, easing: "linear" }
      );
    };

    // wait for the serif font to load so tile width is correct
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.ready) fonts.ready.then(start);
    else start();

    window.addEventListener("resize", start);
    return () => {
      window.removeEventListener("resize", start);
      anim?.cancel();
    };
  }, []);

  // ── subtle pointer parallax on the moving-name layer ──
  const onMove = (e: React.MouseEvent) => {
    const el = parallaxRef.current;
    if (!el) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 22;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <section
      id="hero"
      onMouseMove={onMove}
      className="relative h-screen w-full overflow-hidden bg-bone text-espresso"
    >
      {/* ── top nav ── */}
      <nav className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-8 pt-8 sm:px-12 sm:pt-10">
        <a href="#hero" className="font-serif text-xl tracking-tight sm:text-2xl">
          Rohan
        </a>

        <div className="flex items-start gap-8 text-xs tracking-tight text-espresso/70 sm:gap-14 sm:text-[13px]">
          <span className="hidden sm:block">2026</span>

          <ul className="flex flex-col gap-1.5">
            <li><a className="transition-colors hover:text-espresso" href="#gallery">Gallery</a></li>
            <li><a className="transition-colors hover:text-espresso" href={profile.resumeUrl} target="_blank" rel="noreferrer">Resume</a></li>
          </ul>

          <ul className="flex flex-col gap-1.5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  className="transition-colors hover:text-espresso"
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── moving name (behind portrait) ── */}
      <motion.div
        ref={parallaxRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-10 flex items-start pt-[31vh] transition-transform duration-300 ease-out will-change-transform"
      >
        <div
          ref={trackRef}
          className="flex w-max select-none whitespace-nowrap will-change-transform"
        >
          {Array.from({ length: TILE_COUNT }).map((_, i) => (
            <span
              key={i}
              ref={i === 0 ? tileRef : undefined}
              style={{ fontFamily: '"Engravers MT", var(--font-cormorant), Georgia, serif' }}
              className="text-[clamp(96px,11.5vw,168px)] font-normal leading-[0.9] tracking-[-0.03em] text-espresso/90"
            >
              {NAME_UNIT}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── soft contact shadow under portrait (3D grounding) ── */}
      <div className="pointer-events-none absolute bottom-[5vh] left-1/2 z-[15] h-16 w-[40vw] max-w-2xl -translate-x-1/2 rounded-[50%] bg-espresso/25 blur-2xl" />

      {/* ── centered cutout portrait ──
          NOTE: x:"-50%" lives in the motion transform (not a Tailwind
          -translate-x-1/2) because framer-motion's inline transform would
          otherwise override the utility and push the image off-centre. */}
      <motion.img
        src="/hero.png"
        alt={profile.name}
        initial={{ opacity: 0, y: 44, scale: 0.97, x: "-50%" }}
        animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute -bottom-[8vh] left-1/2 z-20 h-[112vh] max-w-none select-none object-contain object-bottom [filter:contrast(1.04)_saturate(1.04)_drop-shadow(0_40px_70px_rgba(42,36,29,0.28))]"
        draggable={false}
      />

      {/* ── bottom-right tagline ── */}
      <div className="absolute bottom-8 right-8 z-30 text-right text-[13px] leading-relaxed text-espresso/75 sm:bottom-10 sm:right-12 sm:text-sm">
        <p>Building products that scale.</p>
        <p>Designing systems that last.</p>
        <p>Turning ideas into measurable impact.</p>
      </div>

      {/* ── bottom-left role tags ── */}
      <div className="absolute bottom-8 left-8 z-30 text-[13px] leading-relaxed text-espresso/75 sm:bottom-10 sm:left-12 sm:text-sm">
        <p>Founder&apos;s Office <b className="font-semibold text-olive">Executive</b></p>
        <p>AI <b className="font-semibold text-olive">Engineer</b></p>
        <p>Data <b className="font-semibold text-olive">Storyteller</b></p>
      </div>

      {/* ── scroll-down cue → enter the gallery ── */}
      <a
        href="#gallery"
        className="group absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full bg-espresso px-6 py-3 text-bone shadow-[0_14px_34px_-10px_rgba(42,36,29,0.6)] ring-1 ring-espresso/10 transition-transform duration-300 hover:scale-[1.04]"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.26em]">
          Scroll to enter the Gallery
        </span>
        <span className="grid h-6 w-6 animate-bounce place-items-center rounded-full bg-bone text-sm leading-none text-espresso">
          ↓
        </span>
      </a>
    </section>
  );
}
