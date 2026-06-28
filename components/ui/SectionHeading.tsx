"use client";

import Reveal from "./Reveal";

/** Standard eyebrow + title + optional subtitle block used by every section. */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  center,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <div
          className={`mb-3 flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-accent-blue ${
            center ? "justify-center" : ""
          }`}
        >
          {index && <span className="text-white/40">{index}</span>}
          <span className="h-px w-8 bg-accent-blue" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-white/60">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
