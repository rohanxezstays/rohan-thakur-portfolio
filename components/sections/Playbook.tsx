"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { playbook, impactFramework } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function Playbook() {
  return (
    <section id="playbook" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="04"
        eyebrow="Founder's Office Playbook"
        title="How I Drive Business Growth"
        subtitle="Turning ambiguity into execution through data, strategy, and cross-functional collaboration."
      />

      {/* flow label */}
      <Reveal>
        <div className="mt-10 flex flex-wrap items-center gap-2 font-mono text-sm text-white/50">
          {impactFramework.flow.map((f, i) => (
            <span key={f} className="flex items-center gap-2">
              <span className="text-gradient-cool">{f}</span>
              {i < impactFramework.flow.length - 1 && (
                <ArrowRight size={14} className="text-white/30" />
              )}
            </span>
          ))}
        </div>
      </Reveal>

      {/* roadmap: horizontal scroll on desktop, vertical stack on mobile */}
      <div className="relative mt-12">
        {/* glowing connecting pathway */}
        <span className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-accent-blue via-accent-purple to-accent-gold lg:left-0 lg:top-[3.25rem] lg:h-px lg:w-full lg:bg-gradient-to-r" />

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-5 lg:overflow-x-auto lg:pb-4">
          {playbook.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="relative flex-1 lg:min-w-[230px]"
              >
                {/* stage marker on the pathway */}
                <div className="relative z-10 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-grad-primary text-black shadow-glow">
                  <Icon size={22} />
                  <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-bg text-[0.6rem] font-bold text-accent-blue ring-1 ring-accent-blue/40">
                    {i + 1}
                  </span>
                </div>

                <div className="h-full rounded-2xl glass p-5">
                  <h3 className="font-display text-lg font-semibold">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">
                    {stage.description}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {stage.activities.map((a) => (
                      <li
                        key={a}
                        className="flex gap-2 text-xs text-white/55"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-purple" />
                        {a}
                      </li>
                    ))}
                  </ul>

                  {stage.tools && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {stage.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[0.65rem] text-accent-blue"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="mt-4 border-t border-white/5 pt-3 text-[0.7rem] italic text-white/35">
                    {stage.visual}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* final impact card */}
      <Reveal>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="group relative mt-12 overflow-hidden rounded-3xl glass-strong p-10 text-center"
        >
          <div className="absolute inset-0 -z-10 bg-grad-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
          <h3 className="font-display text-2xl font-bold text-gradient md:text-3xl">
            {impactFramework.headline}
          </h3>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 font-display text-lg">
            {impactFramework.flow.map((f, i) => (
              <span key={f} className="flex items-center gap-3">
                <span>{f}</span>
                {i < impactFramework.flow.length - 1 && (
                  <ArrowRight size={18} className="text-accent-blue" />
                )}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-white/60">
            {impactFramework.supporting}
          </p>
        </motion.div>
      </Reveal>
    </section>
  );
}
