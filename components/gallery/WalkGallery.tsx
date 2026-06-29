"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FrameArt from "./FrameArt";
import WallClock from "./WallClock";
import {
  profile,
  socials,
  intro,
  experiences,
  education,
  certifications,
  projects,
  skillCategories,
  achievements,
} from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Exhibits hung along the wall (left → right)                        */
/* ------------------------------------------------------------------ */

const EXHIBITS = [
  { id: "beginning", label: "I", title: "The Beginning" },
  { id: "experience", label: "II", title: "Experience" },
  { id: "foundations", label: "III", title: "Foundations" },
  { id: "collection", label: "IV", title: "Collection of Works" },
  { id: "craftsmanship", label: "V", title: "Craftsmanship" },
  { id: "recognition", label: "VI", title: "Recognition" },
  { id: "thankyou", label: "VII", title: "Thank You" },
] as const;

const GAP = 600; // px between frame centres
const ENTRY = 150; // avatar's starting spot, in the entrance before Canvas I
const START = 560; // px to first frame
const END_PAD = 520;
const WORLD_W = START + (EXHIBITS.length - 1) * GAP + END_PAD;
const SPEED = 6; // walk px per frame
const NEAR = 150; // proximity to a frame to "view" it
const Y_OFFSET = [10, -34, 26, -18, 22, -30, 6]; // organic hang heights

function frameX(i: number) {
  return START + i * GAP;
}

/* small decorative motifs hung in the gaps between canvases */
function MiniMotif({ n }: { n: number }) {
  const s = {
    fill: "none",
    stroke: "#3a3128",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const inner = () => {
    switch (n) {
      case 1: // crescent moon + star
        return (
          <>
            <path d="M30 10 A14 14 0 1 0 30 38 A11 11 0 1 1 30 10 Z" fill="#d8c39a" stroke="#9c7d36" />
            <path d="M14 14 l1.5 3 l3 .5 l-2.2 2 l.6 3 l-2.9 -1.5 l-2.9 1.5 l.6 -3 l-2.2 -2 l3 -.5 Z" fill="#bfa779" stroke="none" />
          </>
        );
      case 2: // feather
        return (
          <g {...s}>
            <path d="M30 8 C18 18 14 30 16 42" />
            <path d="M30 8 C26 22 22 32 18 40" opacity="0.6" />
            <path d="M27 14 l-7 4 M28 20 l-8 4 M27 27 l-8 4 M25 34 l-7 3" strokeWidth="1" />
          </g>
        );
      case 3: // key
        return (
          <g {...s}>
            <circle cx="20" cy="16" r="8" />
            <circle cx="20" cy="16" r="3" />
            <line x1="20" y1="24" x2="20" y2="44" />
            <line x1="20" y1="38" x2="27" y2="38" />
            <line x1="20" y1="44" x2="26" y2="44" />
          </g>
        );
      case 4: // compass rose
        return (
          <>
            <circle cx="25" cy="26" r="14" fill="none" stroke="#9c7d36" strokeWidth="1.2" />
            <path d="M25 12 L29 26 L25 40 L21 26 Z" fill="#d8c39a" stroke="#9c7d36" strokeWidth="0.8" />
            <path d="M11 26 L25 22 L39 26 L25 30 Z" fill="#bfa779" stroke="#9c7d36" strokeWidth="0.8" />
          </>
        );
      default: // leaf
        return (
          <g {...s}>
            <path d="M14 42 C14 24 24 12 36 10 C36 28 26 40 14 42 Z" fill="#c5cda0" stroke="#5e6e3c" />
            <path d="M16 40 C22 30 30 20 34 14" stroke="#5e6e3c" />
          </g>
        );
    }
  };
  return (
    <svg viewBox="0 0 50 50" className="h-12 w-12">
      {inner()}
    </svg>
  );
}

export default function WalkGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);

  const charX = useRef(ENTRY); // start in the entrance, before Canvas I
  const dir = useRef(0); // -1 / 0 / 1
  const facing = useRef(1);
  const camX = useRef(0); // smoothed camera position
  const prevX = useRef(ENTRY);
  const stride = useRef(0); // distance since last footprint
  const side = useRef(1);
  const printId = useRef(0);
  const gotoIdx = useRef<number | null>(null); // tap-to-walk target frame

  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [prints, setPrints] = useState<{ id: number; x: number; s: number }[]>([]);
  const [greet, setGreet] = useState(true);

  const openAt = useCallback((i: number | null) => setOpen(i), []);

  /* ── input ── */
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (["ArrowLeft", "a", "A"].includes(e.key)) {
        dir.current = -1;
        gotoIdx.current = null;
        setGreet(false);
        e.preventDefault();
      } else if (["ArrowRight", "d", "D"].includes(e.key)) {
        dir.current = 1;
        gotoIdx.current = null;
        setGreet(false);
        e.preventDefault();
      } else if (["ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        setActive((a) => {
          if (a !== null) setOpen(a);
          return a;
        });
      } else if (e.key === "Escape") setOpen(null);
    };
    const up = (e: KeyboardEvent) => {
      if (["ArrowLeft", "a", "A", "ArrowRight", "d", "D"].includes(e.key))
        dir.current = 0;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  /* ── animation loop ── */
  useEffect(() => {
    let raf = 0;
    let lastActive = active;
    const tick = () => {
      const vw = containerRef.current?.clientWidth ?? 1280;

      // resolve movement direction: manual keys/arrows OR tap-to-walk target
      let move = dir.current;
      if (move === 0 && gotoIdx.current !== null) {
        const gx = frameX(gotoIdx.current);
        const d = gx - charX.current;
        if (Math.abs(d) <= SPEED + 1) {
          charX.current = gx;
          const arrived = gotoIdx.current;
          gotoIdx.current = null;
          setOpen(arrived); // auto-open the exhibit on arrival
        } else {
          move = d > 0 ? 1 : -1;
        }
      }

      if (move !== 0) facing.current = move;
      charX.current += move * SPEED;
      charX.current = Math.max(40, Math.min(WORLD_W - 40, charX.current));

      // smoothed (eased) camera follow
      const target = Math.max(0, Math.min(WORLD_W - vw, charX.current - vw / 2));
      camX.current += (target - camX.current) * 0.1;

      if (worldRef.current)
        worldRef.current.style.transform = `translate3d(${-camX.current}px,0,0)`;
      if (charRef.current)
        charRef.current.style.transform = `translate3d(${charX.current}px,0,0)`;
      if (artRef.current)
        artRef.current.style.transform = `scaleX(${facing.current})`;

      const moving = move !== 0;
      charRef.current?.classList.toggle("walking", moving);
      charRef.current?.classList.toggle("idle", !moving);

      // drop footprints while walking
      const delta = charX.current - prevX.current;
      prevX.current = charX.current;
      if (moving && delta !== 0) {
        stride.current += Math.abs(delta);
        if (stride.current >= 34) {
          stride.current = 0;
          side.current *= -1;
          const id = ++printId.current;
          const x = charX.current + side.current * 5 - facing.current * 8;
          const s = side.current;
          setPrints((p) => [...p.slice(-16), { id, x, s }]);
          window.setTimeout(
            () => setPrints((p) => p.filter((q) => q.id !== id)),
            2600
          );
        }
      }

      // nearest frame
      let best = 0;
      let bestD = Infinity;
      for (let i = 0; i < EXHIBITS.length; i++) {
        const d = Math.abs(charX.current - frameX(i));
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      const near = bestD < NEAR ? best : null;
      if (near !== lastActive) {
        lastActive = near;
        setActive(near);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const press = (d: number) => () => {
    dir.current = d;
    gotoIdx.current = null;
    setGreet(false);
  };
  const release = () => (dir.current = 0);

  const walkTo = (i: number) => {
    gotoIdx.current = i;
    dir.current = 0;
    setGreet(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-[#d6cdb8] text-espresso"
    >
      {/* ── moving world ── */}
      <div
        ref={worldRef}
        className="absolute inset-y-0 left-0 will-change-transform"
        style={{ width: WORLD_W }}
      >
        {/* wall depth gradient (deeper, warmer greige) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#dcd2bd] via-[#d4cab3] to-[#cabfa6]" />
        {/* dado rail (classic gallery wall moulding) */}
        <div className="absolute inset-x-0 top-[62%] h-[3px] bg-[#2a241d]/12" />
        <div className="absolute inset-x-0 top-[calc(62%+3px)] h-[10px] bg-gradient-to-b from-[#2a241d]/6 to-transparent" />
        {/* crown line near ceiling */}
        <div className="absolute inset-x-0 top-[6%] h-px bg-[#2a241d]/10" />
        {/* floor */}
        <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-b from-[#cdc4ac] to-[#bdb293]" />
        <div className="absolute inset-x-0 bottom-[24%] h-px bg-[#2a241d]/20" />

        {/* ── entrance title ── */}
        <div
          className="absolute z-[6] -translate-x-1/2 text-center"
          style={{ left: ENTRY, top: "20%" }}
        >
          <p className="font-serif text-[13px] italic text-espresso/70">The Gallery of</p>
          <p className="font-serif text-3xl leading-tight text-espresso">Rohan Thakur</p>
          <p className="mt-1.5 text-[9px] uppercase tracking-[0.4em] text-[#6b6b45]">Est. 2026</p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-espresso/45">A walk-through exhibition</p>
        </div>

        {/* ── decor in the gaps between canvases ── */}
        {Array.from({ length: EXHIBITS.length - 1 }).map((_, i) => {
          const gx = frameX(i) + GAP / 2;
          if (i === 0) {
            // live clock between Canvas I and II
            return (
              <div
                key="clock"
                className="absolute z-[6] -translate-x-1/2 text-center"
                style={{ left: gx, top: "20%" }}
              >
                <div className="mx-auto h-3 w-[3px] bg-[#2a241d]" />
                <div className="mx-auto h-24 w-24 drop-shadow-[0_14px_24px_rgba(28,24,19,0.35)]">
                  <WallClock />
                </div>
                <p className="mt-3 text-[9px] uppercase tracking-[0.32em] text-espresso/45">
                  Now showing
                </p>
              </div>
            );
          }
          return (
            <div
              key={`gap-${i}`}
              className="absolute z-[5] -translate-x-1/2"
              style={{ left: gx, top: "34%" }}
            >
              <div className="mx-auto h-3 w-px bg-[#2a241d]/40" />
              <div className="bg-[#1b1712] p-1.5 shadow-[0_16px_30px_-20px_rgba(28,24,19,0.6)]">
                <div className="ring-1 ring-[#caa75f]/30">
                  <div className="flex h-16 w-14 items-center justify-center bg-gradient-to-br from-[#efe7d4] to-[#ddd1b6]">
                    <MiniMotif n={i} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* frames + spotlights */}
        {EXHIBITS.map((ex, i) => {
          const x = frameX(i);
          const isActive = active === i;
          return (
            <div key={ex.id}>
              {/* warm wall glow */}
              <div
                className="absolute top-[10%] z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,243,214,0.75),transparent_62%)] transition-opacity duration-500"
                style={{ left: x, opacity: isActive ? 1 : 0.4 }}
              />
              {/* floor light pool */}
              <div
                className="absolute bottom-[18%] z-0 h-12 w-64 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(255,239,205,0.85),transparent_70%)] blur-md transition-opacity duration-500"
                style={{ left: x, opacity: isActive ? 0.95 : 0.45 }}
              />

              {/* tappable hotspot ring on the floor */}
              <button
                aria-label={`Walk to ${ex.title}`}
                onClick={() => walkTo(i)}
                className="absolute bottom-[13%] z-[12] -translate-x-1/2 cursor-pointer"
                style={{ left: x }}
              >
                <span
                  className="hotspot-ring block h-9 w-28 rounded-[50%] border-2"
                  style={{
                    borderColor: isActive ? "#bfa779" : "rgba(42,36,29,0.3)",
                    background: isActive
                      ? "radial-gradient(ellipse,rgba(191,167,121,0.3),transparent 70%)"
                      : "transparent",
                  }}
                />
                <span
                  className="mt-1 block text-center text-[9px] uppercase tracking-[0.2em] transition-opacity"
                  style={{ color: "#6b6b45", opacity: isActive ? 0 : 0.55 }}
                >
                  Stand
                </span>
              </button>

              {/* picture light (brass museum lamp above the frame) */}
              <div
                className="absolute z-[11] -translate-x-1/2"
                style={{ left: x, top: `calc(16% + ${Y_OFFSET[i]}px - 20px)` }}
              >
                <div className="mx-auto h-4 w-[3px] bg-[#2a241d]" />
                <div className="mx-auto h-2 w-12 rounded-b-[7px] bg-gradient-to-b from-[#d6b057] to-[#9c7d36]" />
                <div
                  className="absolute left-1/2 top-[22px] -z-10 h-28 w-24 -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,235,186,0.85),transparent_70%)] transition-opacity duration-500"
                  style={{ opacity: isActive ? 0.95 : 0.4 }}
                />
              </div>

              {/* the framed artwork */}
              <button
                onClick={() => openAt(i)}
                className={`group absolute z-10 -translate-x-1/2 cursor-pointer bg-[#1b1712] p-2.5 transition-all duration-500 hover:-translate-y-2 ${
                  isActive
                    ? "-translate-y-1.5 shadow-[0_45px_70px_-30px_rgba(28,24,19,0.75)] ring-2 ring-[#c9a24b]/50"
                    : "shadow-[0_30px_55px_-28px_rgba(28,24,19,0.6)]"
                }`}
                style={{ left: x, top: `calc(16% + ${Y_OFFSET[i]}px)` }}
              >
                <div className="ring-1 ring-[#caa75f]/30">
                  <div className="flex h-64 w-48 flex-col items-center justify-between bg-gradient-to-br from-[#f3ede0] to-[#e2d8c4] px-4 pb-5 pt-6 text-center">
                    <div className="flex h-40 w-full items-center justify-center">
                      <FrameArt id={ex.id} />
                    </div>
                    <span className="font-serif text-lg leading-tight text-[#2a241d]">
                      {ex.title}
                    </span>
                  </div>
                </div>
                {/* brass plaque */}
                <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gradient-to-b from-[#d8c39a] to-[#bfa779] px-3 py-1">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#2a241d]/75">
                    Canvas {ex.label}
                  </span>
                </div>
              </button>

              {/* "view" hint when near */}
              <div
                className="absolute z-20 -translate-x-1/2 text-center transition-all duration-300"
                style={{
                  left: x,
                  top: `calc(16% + ${Y_OFFSET[i]}px - 46px)`,
                  opacity: isActive ? 1 : 0,
                  transform: `translateX(-50%) translateY(${isActive ? 0 : 8}px)`,
                }}
              >
                <span className="bg-[#2a241d] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f6f1e7]">
                  View ↑
                </span>
              </div>
            </div>
          );
        })}

        {/* ── farewell sign at the end of the gallery ── */}
        <div
          className="absolute z-[6] -translate-x-1/2 text-center"
          style={{ left: frameX(EXHIBITS.length - 1) + 360, top: "30%" }}
        >
          <p className="font-serif text-2xl italic leading-snug text-espresso sm:text-3xl">
            Thank you for
            <br />
            visiting.
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-[#6b6b45]">
            Please come again
          </p>
          <span className="mx-auto mt-4 block h-px w-16 bg-[#2a241d]/25" />
        </div>

        {/* ── footprints left while walking ── */}
        {prints.map((p) => (
          <span
            key={p.id}
            className="footprint pointer-events-none absolute z-[16]"
            style={{ left: p.x, bottom: "calc(20% - 3px)" }}
          >
            <span
              className="block h-[5px] w-[11px] rounded-[50%] bg-[#2a241d]"
              style={{ transform: `rotate(${p.s > 0 ? 14 : -14}deg)` }}
            />
          </span>
        ))}

        {/* ── the walking character ── */}
        <div ref={charRef} className="absolute z-30" style={{ left: 0, bottom: "20%" }}>
          {/* contact shadow */}
          <span className="pointer-events-none absolute bottom-[-3px] left-0 h-[7px] w-12 -translate-x-1/2 rounded-[50%] bg-[#2a241d]/20 blur-[4px]" />

          {/* greeting + guide bubble */}
          {greet && (
            <div className="absolute bottom-[116px] left-0 z-40 w-52 -translate-x-1/2 sm:w-64">
              <div className="relative rounded-2xl bg-[#2a241d] px-5 py-4 text-center shadow-[0_18px_40px_-16px_rgba(28,24,19,0.7)]">
                <p className="font-serif text-base text-[#f6f1e7] sm:text-lg">
                  Welcome — I&apos;m your guide.
                </p>
                <button
                  onClick={() => setGreet(false)}
                  className="mt-2.5 text-[11px] uppercase tracking-[0.24em] text-[#d8c39a] transition-colors hover:text-[#f6f1e7]"
                >
                  Let&apos;s walk →
                </button>
                <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#2a241d]" />
              </div>
            </div>
          )}
          <div className="bob" style={{ marginLeft: -23 }}>
            <div
              ref={artRef}
              className="avatarArt relative"
              style={{ width: 46, height: 100, transformOrigin: "bottom center" }}
            >
              {/* legs */}
              <div className="legA absolute bottom-0 left-[12px] h-10 w-2.5 rounded bg-[#2b2b33]" style={{ transformOrigin: "top center" }} />
              <div className="legB absolute bottom-0 right-[12px] h-10 w-2.5 rounded bg-[#23232a]" style={{ transformOrigin: "top center" }} />
              {/* arms */}
              <div className="armA absolute bottom-[34px] left-[4px] h-9 w-2 rounded bg-[#23232a]" style={{ transformOrigin: "top center" }} />
              <div className="armB absolute bottom-[34px] right-[4px] h-9 w-2 rounded bg-[#33333d]" style={{ transformOrigin: "top center" }} />
              {/* jacket */}
              <div className="absolute bottom-9 left-1/2 h-12 w-[34px] -translate-x-1/2 rounded-t-[10px] bg-[#33333d]" />
              {/* shirt + tie */}
              <div className="absolute bottom-9 left-1/2 h-12 w-2 -translate-x-1/2 bg-[#ece7dc]" />
              <div className="absolute bottom-[38px] left-1/2 h-5 w-1 -translate-x-1/2 bg-[#7a2b2b]" />
              {/* hair mass (full, behind) */}
              <div className="absolute bottom-[57px] left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-[#221a12]" />
              {/* face (skin, sits lower so hair frames the top + sides) */}
              <div className="absolute bottom-[55px] left-1/2 h-[26px] w-[26px] -translate-x-1/2 rounded-full bg-[#c89d77]" />
              {/* hair fringe sweep over the forehead */}
              <div className="absolute bottom-[74px] left-1/2 h-2.5 w-[26px] -translate-x-1/2 rounded-t-full bg-[#1b140d]" />
            </div>
          </div>
        </div>
      </div>

      {/* ── drifting dust motes (ambience) ── */}
      <div className="pointer-events-none absolute inset-0 z-[33] overflow-hidden">
        {[
          { l: "14%", t: "30%", d: 9, delay: 0 },
          { l: "28%", t: "62%", d: 12, delay: 2 },
          { l: "47%", t: "22%", d: 10, delay: 4 },
          { l: "63%", t: "55%", d: 13, delay: 1 },
          { l: "78%", t: "34%", d: 11, delay: 3 },
          { l: "88%", t: "60%", d: 9, delay: 5 },
        ].map((m, i) => (
          <span
            key={i}
            className="mote absolute h-1 w-1 rounded-full bg-[#bfa779]"
            style={{ left: m.l, top: m.t, animationDuration: `${m.d}s`, animationDelay: `${m.delay}s` }}
          />
        ))}
      </div>

      {/* ── soft museum vignette (focuses the eye centre) ── */}
      <div className="pointer-events-none absolute inset-0 z-[34] bg-[radial-gradient(130%_120%_at_50%_42%,transparent_58%,rgba(42,36,29,0.13))]" />

      {/* ── fixed UI overlay ── */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-5 pt-5 sm:px-12 sm:pt-7">
        <div className="pointer-events-auto flex gap-5 font-serif text-sm sm:gap-7 sm:text-lg">
          <a href="#hero" className="text-espresso/80 hover:text-espresso">Home</a>
          <span className="text-espresso">Gallery</span>
        </div>
        <span className="font-serif text-base sm:text-xl">Rohan Thakur</span>
      </header>

      {/* progress dots + hint */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 z-40 flex w-full -translate-x-1/2 flex-col items-center gap-2 px-4">
        <div className="flex items-center gap-1.5">
          {EXHIBITS.map((ex, i) => (
            <span
              key={ex.id}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: active === i ? 18 : 6,
                background: active === i ? "#bfa779" : "rgba(42,36,29,0.25)",
              }}
            />
          ))}
        </div>
        <p className="text-center text-[10px] uppercase tracking-[0.2em] text-espresso/55 sm:tracking-[0.25em]">
          <span className="hidden sm:inline">Walk with ← → · tap a circle to go · ↑ to view</span>
          <span className="sm:hidden">Tap a circle to walk there · tap a frame to view</span>
        </p>
      </div>

      {/* touch / tap arrows (all sizes) */}
      <button
        aria-label="Walk left"
        onPointerDown={press(-1)}
        onPointerUp={release}
        onPointerLeave={release}
        className="absolute bottom-20 left-4 z-40 grid h-16 w-16 select-none place-items-center rounded-full bg-[#2a241d] text-3xl text-bone shadow-[0_10px_28px_-8px_rgba(28,24,19,0.6)] ring-1 ring-[#bfa779]/30 transition-transform active:scale-90 sm:bottom-24 sm:h-14 sm:w-14 sm:text-2xl"
      >
        ‹
      </button>
      <button
        aria-label="Walk right"
        onPointerDown={press(1)}
        onPointerUp={release}
        onPointerLeave={release}
        className="absolute bottom-20 right-4 z-40 grid h-16 w-16 select-none place-items-center rounded-full bg-[#2a241d] text-3xl text-bone shadow-[0_10px_28px_-8px_rgba(28,24,19,0.6)] ring-1 ring-[#bfa779]/30 transition-transform active:scale-90 sm:bottom-24 sm:h-14 sm:w-14 sm:text-2xl"
      >
        ›
      </button>

      {/* ── exhibit detail overlay ── */}
      {open !== null && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-[#1b1712]/55 px-4 py-10 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto bg-[#1b1712] p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ring-1 ring-[#caa75f]/30">
              <div className="bg-[#f6f1e7] px-7 py-10 sm:px-14 sm:py-14">
                <button
                  onClick={() => setOpen(null)}
                  aria-label="Close"
                  className="absolute right-6 top-6 z-10 text-2xl leading-none text-[#2a241d]/60 hover:text-[#2a241d]"
                >
                  ×
                </button>
                <ExhibitContent id={EXHIBITS[open].id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Per-exhibit detail content                                         */
/* ------------------------------------------------------------------ */

function Title({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <header className="mb-8 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-[#6b6b45]">Canvas {label}</p>
      <h2 className="mt-2 font-serif text-4xl text-[#2a241d] sm:text-5xl">{title}</h2>
      <p className="mt-2 text-sm uppercase tracking-[0.25em] text-[#2a241d]/45">{sub}</p>
    </header>
  );
}

function ExhibitContent({ id }: { id: string }) {
  if (id === "beginning")
    return (
      <div>
        <Title label="I" title="The Beginning" sub="Introduction" />
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <img src="/hero.png" alt={profile.name} className="h-40 w-auto object-contain" />
          <div>
            <h3 className="font-serif text-2xl text-[#2a241d]">{profile.name}</h3>
            <p className="mt-1 text-sm uppercase tracking-[0.2em] text-[#6b6b45]">
              Founder&apos;s Office Executive · AI Engineer · Data Storyteller
            </p>
            <p className="mt-4 leading-relaxed text-[#2a241d]/75">{intro}</p>
          </div>
        </div>
      </div>
    );

  if (id === "experience")
    return (
      <div>
        <Title label="II" title="Experience" sub="Progression & growth" />
        <ol className="space-y-7 border-l border-[#2a241d]/15 pl-7">
          {experiences.map((e) => (
            <li key={e.company} className="relative">
              <span className="absolute -left-[34px] top-1 h-3.5 w-3.5 rounded-full bg-[#bfa779] ring-4 ring-[#f6f1e7]" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#6b6b45]">{e.duration}</p>
              <h3 className="font-serif text-xl text-[#2a241d]">{e.company}</h3>
              <p className="text-sm italic text-[#2a241d]/60">{e.role}</p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                {e.groups.flatMap((g) => g.points).slice(0, 6).map((p) => (
                  <li key={p} className="text-sm text-[#2a241d]/75 before:mr-1.5 before:text-[#bfa779] before:content-['—']">{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    );

  if (id === "foundations")
    return (
      <div>
        <Title label="III" title="Foundations" sub="Education & research" />
        <div className="grid gap-8 sm:grid-cols-2">
          <ul className="space-y-5">
            {education.map((e) => (
              <li key={e.degree} className="border-l-2 border-[#bfa779]/50 pl-4">
                <h3 className="font-serif text-lg text-[#2a241d]">{e.degree}</h3>
                <p className="text-sm text-[#2a241d]/70">{e.org}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-[#2a241d]/45">{e.duration}</p>
                {e.note && <p className="mt-1 text-sm italic text-[#2a241d]/60">{e.note}</p>}
              </li>
            ))}
          </ul>
          <ul className="space-y-2.5">
            {certifications.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-[#2a241d]/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#bfa779]" />{c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

  if (id === "collection")
    return (
      <div>
        <Title label="IV" title="Collection of Works" sub="Curated projects" />
        <div className="grid gap-5 sm:grid-cols-3">
          {projects.map((p) => {
            const Icon = p.icon;
            return (
              <a key={p.title} href={p.href} target={p.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group block">
                <div className="flex h-28 items-center justify-center bg-gradient-to-br from-[#efe7d6] to-[#ded2bb] ring-1 ring-[#caa75f]/30">
                  <Icon size={34} strokeWidth={1.1} className="text-[#2a241d]/55 transition-transform group-hover:scale-110" />
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#6b6b45]">{p.category}</p>
                <h3 className="font-serif text-base leading-snug text-[#2a241d]">{p.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#2a241d]/65">{p.description}</p>
              </a>
            );
          })}
        </div>
      </div>
    );

  if (id === "craftsmanship")
    return (
      <div>
        <Title label="V" title="Craftsmanship" sub="Tools & specimens" />
        <div className="grid gap-5 sm:grid-cols-2">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.name}>
                <div className="mb-2 flex items-center gap-2.5">
                  <Icon size={18} strokeWidth={1.2} className="text-[#6b6b45]" />
                  <h3 className="font-serif text-lg text-[#2a241d]">{cat.name}</h3>
                </div>
                <ul className="flex flex-wrap gap-x-3 gap-y-1">
                  {cat.skills.map((s) => (
                    <li key={s} className="text-sm text-[#2a241d]/70 before:mr-1 before:text-[#bfa779] before:content-['·']">{s}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );

  if (id === "recognition")
    return (
      <div>
        <Title label="VI" title="Recognition" sub="Awards & milestones" />
        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.title} className="flex items-start gap-3 border border-[#2a241d]/12 px-4 py-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#efe7d6] text-[#6b6b45] ring-1 ring-[#caa75f]/40">
                  <Icon size={16} strokeWidth={1.3} />
                </span>
                <div>
                  <h3 className="font-serif text-sm leading-snug text-[#2a241d]">{a.title}</h3>
                  <p className="text-xs text-[#2a241d]/60">{a.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

  // thankyou
  return (
    <div className="text-center">
      <Title label="VII" title="Thank You" sub="End of exhibition" />
      <p className="mx-auto max-w-lg leading-relaxed text-[#2a241d]/75">
        Thank you for walking through my gallery. If something resonated and you&apos;d
        like to build, analyse, or create together — the door is open.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="https://wa.me/919311014728?text=Hi%20Rohan%2C%20I%20just%20walked%20through%20your%20gallery%20%E2%80%94%20let%27s%20collaborate."
          target="_blank"
          rel="noreferrer"
          className="bg-[#2a241d] px-6 py-3 text-sm uppercase tracking-[0.2em] text-[#f6f1e7] hover:bg-[#6b6b45]"
        >
          Let&apos;s collaborate
        </a>
        {socials.map((s) => (
          <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="border-b border-[#2a241d]/40 pb-0.5 text-sm uppercase tracking-[0.2em] text-[#2a241d]/70 hover:text-[#2a241d]">
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}
