"use client";

import { motion } from "framer-motion";
import { achievements } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

export default function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-6 py-28">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          index="06"
          eyebrow="Achievements"
          title="Recognition & credentials"
        />
        <Reveal>
          <div className="glass rounded-2xl px-6 py-4 text-center">
            <p className="font-display text-3xl font-bold text-gradient">
              <Counter to={achievements.length} suffix="+" />
            </p>
            <p className="text-xs text-white/50">Certifications & Awards</p>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => {
          const Icon = a.icon;
          return (
            <Reveal key={a.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6, rotateZ: -0.5 }}
                className="group relative h-full overflow-hidden rounded-2xl glass p-6"
              >
                <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-accent-gold/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-40" />
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-accent-gold animate-float">
                  <Icon size={22} />
                </div>
                <h3 className="font-display font-semibold leading-snug">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-white/55">{a.detail}</p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
