"use client";

import { useEffect, useState } from "react";

/**
 * A classic analog wall clock that shows the live local time with all three
 * hands (hour, minute, second). Brass rim, cream face, Roman ticks.
 */
export default function WallClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const s = now ? now.getSeconds() : 0;
  const m = now ? now.getMinutes() : 0;
  const h = now ? now.getHours() % 12 : 0;

  const secDeg = s * 6;
  const minDeg = m * 6 + s * 0.1;
  const hourDeg = h * 30 + m * 0.5;

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-label="Gallery clock">
      {/* outer brass rim */}
      <circle cx="50" cy="50" r="47" fill="#1b1712" />
      <circle cx="50" cy="50" r="45" fill="none" stroke="#c9a24b" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="41" fill="#f6f1e7" />

      {/* hour ticks — coords rounded so server (Node) and client (browser)
          serialise the Math.sin/cos values identically (no hydration drift) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const r1 = 38;
        const r2 = i % 3 === 0 ? 31 : 34;
        const r = (n: number) => Number(n.toFixed(2));
        return (
          <line
            key={i}
            x1={r(50 + r1 * Math.sin(a))}
            y1={r(50 - r1 * Math.cos(a))}
            x2={r(50 + r2 * Math.sin(a))}
            y2={r(50 - r2 * Math.cos(a))}
            stroke="#2a241d"
            strokeWidth={i % 3 === 0 ? 2 : 1}
            strokeLinecap="round"
          />
        );
      })}

      {/* hour hand */}
      <line
        x1="50" y1="50" x2="50" y2="28"
        stroke="#2a241d" strokeWidth="3.4" strokeLinecap="round"
        transform={`rotate(${hourDeg} 50 50)`}
      />
      {/* minute hand */}
      <line
        x1="50" y1="50" x2="50" y2="18"
        stroke="#2a241d" strokeWidth="2.2" strokeLinecap="round"
        transform={`rotate(${minDeg} 50 50)`}
      />
      {/* second hand */}
      <line
        x1="50" y1="56" x2="50" y2="16"
        stroke="#a8442f" strokeWidth="1" strokeLinecap="round"
        transform={`rotate(${secDeg} 50 50)`}
      />
      {/* centre cap */}
      <circle cx="50" cy="50" r="2.6" fill="#2a241d" />
      <circle cx="50" cy="50" r="1.1" fill="#c9a24b" />
    </svg>
  );
}
