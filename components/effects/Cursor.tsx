"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated dual-ring cursor with magnetic "grow" state over interactive
 * elements. Disabled on touch / coarse pointers (CSS keeps native cursor).
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      raf: number;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current)
        dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current)
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const grow = () => ring.current?.classList.add("scale-150", "bg-white/10");
    const shrink = () =>
      ring.current?.classList.remove("scale-150", "bg-white/10");

    window.addEventListener("mousemove", move);
    document
      .querySelectorAll("a, button, [data-cursor]")
      .forEach((el) => {
        el.addEventListener("mouseenter", grow);
        el.addEventListener("mouseleave", shrink);
      });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border border-white/70 mix-blend-difference transition-[transform,background-color,scale] duration-200"
      />
    </>
  );
}
