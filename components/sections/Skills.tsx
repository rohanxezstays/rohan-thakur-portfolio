"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const accentRing: Record<string, string> = {
  blue: "hover:border-accent-blue/50 hover:shadow-glow",
  purple: "hover:border-accent-purple/50 hover:shadow-glow-purple",
  gold: "hover:border-accent-gold/50",
};
const accentText: Record<string, string> = {
  blue: "text-accent-blue",
  purple: "text-accent-purple",
  gold: "text-accent-gold",
};

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="03"
        eyebrow="Skills"
        title="An animated skills galaxy"
        subtitle="Grouped capabilities across data, business, AI, development and marketing."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <Reveal key={cat.name} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                className={cn(
                  "group h-full rounded-2xl glass p-6 transition-all duration-300",
                  accentRing[cat.accent]
                )}
              >
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-xl bg-white/5 transition-transform group-hover:rotate-12",
                      accentText[cat.accent]
                    )}
                  >
                    <Icon size={20} />
                  </span>
                  <h3 className="font-display text-lg font-semibold">
                    {cat.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s, si) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: si * 0.03 }}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/70 transition-colors hover:border-white/30 hover:text-white"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
