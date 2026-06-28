"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { experiences } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function Experience() {
  // first card open by default
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-28">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Where I've made impact"
        subtitle="Click any role to expand what I actually did."
      />

      <div className="relative mt-14 space-y-6 pl-6">
        {/* vertical timeline rail */}
        <span className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent-blue via-accent-purple to-transparent" />

        {experiences.map((exp, idx) => {
          const open = openIdx === idx;
          const Icon = exp.icon;
          const accent =
            exp.accent === "blue" ? "text-accent-blue" : "text-accent-purple";
          return (
            <Reveal key={exp.company} delay={idx * 0.08}>
              <div className="relative">
                {/* node */}
                <span
                  className={cn(
                    "absolute -left-[1.65rem] top-7 h-3.5 w-3.5 rounded-full border-2 bg-bg",
                    exp.accent === "blue"
                      ? "border-accent-blue shadow-glow"
                      : "border-accent-purple shadow-glow-purple"
                  )}
                />
                <div className="overflow-hidden rounded-2xl glass transition-colors hover:border-white/20">
                  <button
                    onClick={() => setOpenIdx(open ? null : idx)}
                    className="flex w-full items-center gap-5 p-6 text-left"
                  >
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-grad-primary text-black">
                      <Icon size={24} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-lg font-semibold">
                        {exp.role}
                      </span>
                      <span className={cn("block text-sm font-medium", accent)}>
                        {exp.company}
                      </span>
                      <span className="block font-mono text-xs text-white/40">
                        {exp.duration}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-full border border-white/10",
                        open && "bg-grad-primary text-black"
                      )}
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-5 px-6 pb-7 pt-1 sm:grid-cols-2">
                          {exp.groups.map((g, gi) => (
                            <motion.div
                              key={g.heading}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: gi * 0.06 }}
                              className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
                            >
                              <p className={cn("mb-2 text-sm font-semibold", accent)}>
                                {g.heading}
                              </p>
                              <ul className="space-y-1.5">
                                {g.points.map((pt) => (
                                  <li
                                    key={pt}
                                    className="flex gap-2 text-sm text-white/65"
                                  >
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-blue" />
                                    {pt}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
