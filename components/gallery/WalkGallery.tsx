"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FrameArt from "./FrameArt";
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
const START = 520; // px to first frame
const END_PAD = 520;
const WORLD_W = START + (EXHIBITS.length - 1) * GAP + END_PAD;
const SPEED = 6; // walk px per frame
const NEAR = 150; // proximity to a frame to "view" it
const Y_OFFSET = [10, -34, 26, -18, 22, -30, 6]; // organic hang heights

function frameX(i: number) {
  return START + i * GAP;
}

export default function WalkGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);

  const charX = useRef(START); // start at first frame
  const dir = useRef(0); // -1 / 0 / 1
  const facing = useRef(1);
  const camX = useRef(0); // smoothed camera position
  const prevX = useRef(START);
  const stride = useRef(0); // distance since last footprint
  const side = useRef(1);
  const printId = useRef(0);

  const [active, setActive] = useState<number | null>(0);
  const [open, setOpen] = useState<number | null>(null);
  const [prints, setPrints] = useState<{ id: number; x: number; s: number }[]>([]);

  const openAt = useCallback((i: number | null) => setOpen(i), []);

  /* ── input ── */
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (["ArrowLeft", "a", "A"].includes(e.key)) {
        dir.current = -1;
        e.preventDefault();
      } else if (["ArrowRight", "d", "D"].includes(e.key)) {
        dir.current = 1;
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

      if (dir.current !== 0) facing.current = dir.current;
      charX.current += dir.current * SPEED;
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

      const moving = dir.current !== 0;
      charRef.current?.classList.toggle("walking", moving);

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

  const press = (d: number) => () => (dir.current = d);
  const release = () => (dir.current = 0);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-[#e9e4d9] text-espresso"
    >
      {/* ── moving world ── */}
      <div
        ref={worldRef}
        className="absolute inset-y-0 left-0 will-change-transform"
        style={{ width: WORLD_W }}
      >
        {/* floor */}
        <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-b from-[#e0d9c8] to-[#d6cdb8]" />
        <div className="absolute inset-x-0 bottom-[24%] h-px bg-[#2a241d]/15" />

        {/* frames + spotlights */}
        {EXHIBITS.map((ex, i) => {
          const x = frameX(i);
          const isActive = active === i;
          return (
            <div key={ex.id}>
              {/* floor spotlight */}
              <div
                className="absolute bottom-[20%] z-0 h-10 w-56 -translate-x-1/2 rounded-[50%] bg-white/55 blur-xl transition-opacity duration-300"
                style={{ left: x, opacity: isActive ? 0.9 : 0.5 }}
              />
              {/* wall glow */}
              <div
                className="absolute top-[12%] z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.6),transparent_65%)] transition-opacity duration-300"
                style={{ left: x, opacity: isActive ? 1 : 0.35 }}
              />

              {/* the framed artwork */}
              <button
                onClick={() => openAt(i)}
                className="group absolute z-10 -translate-x-1/2 cursor-pointer bg-[#1b1712] p-2.5 shadow-[0_30px_55px_-28px_rgba(28,24,19,0.6)] transition-transform duration-500 hover:-translate-y-2"
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
              {/* head + hair */}
              <div className="absolute bottom-[60px] left-1/2 h-7 w-7 -translate-x-1/2 rounded-full bg-[#c89d77]" />
              <div className="absolute bottom-[72px] left-1/2 h-3.5 w-[30px] -translate-x-1/2 rounded-t-full bg-[#241c16]" />
            </div>
          </div>
        </div>
      </div>

      {/* ── soft museum vignette (focuses the eye centre) ── */}
      <div className="pointer-events-none absolute inset-0 z-[34] bg-[radial-gradient(130%_120%_at_50%_42%,transparent_58%,rgba(42,36,29,0.13))]" />

      {/* ── fixed UI overlay ── */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-8 pt-7 sm:px-12">
        <div className="pointer-events-auto flex gap-7 font-serif text-lg">
          <a href="#hero" className="text-espresso/80 hover:text-espresso">Home</a>
          <span className="text-espresso">Gallery</span>
        </div>
        <span className="font-serif text-xl">Rohan Thakur</span>
      </header>

      {/* controls hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-40 -translate-x-1/2 text-center text-[11px] uppercase tracking-[0.25em] text-espresso/55">
        ← / → or A · D to walk · ↑ to view an exhibit
      </div>

      {/* touch arrows */}
      <button
        aria-label="Walk left"
        onPointerDown={press(-1)}
        onPointerUp={release}
        onPointerLeave={release}
        className="absolute bottom-16 left-5 z-40 grid h-14 w-14 place-items-center rounded-full border border-espresso/25 bg-bone/70 text-2xl text-espresso backdrop-blur sm:hidden"
      >
        ‹
      </button>
      <button
        aria-label="Walk right"
        onPointerDown={press(1)}
        onPointerUp={release}
        onPointerLeave={release}
        className="absolute bottom-16 right-5 z-40 grid h-14 w-14 place-items-center rounded-full border border-espresso/25 bg-bone/70 text-2xl text-espresso backdrop-blur sm:hidden"
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
