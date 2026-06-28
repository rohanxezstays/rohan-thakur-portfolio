"use client";

import { motion } from "framer-motion";
import { Database, Briefcase, Box, Brain } from "lucide-react";
import { about } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const icons = [Database, Briefcase, Box, Brain];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="01" eyebrow="About" title={about.title} />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <div className="glass rounded-3xl p-8">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="mb-4 text-white/70 last:mb-0">
                {p}
              </p>
            ))}
            <p className="mt-6 text-sm uppercase tracking-widest text-white/40">
              I enjoy working at the intersection of
            </p>
          </div>
        </Reveal>

        {/* floating intersection cards */}
        <div className="grid grid-cols-2 gap-4">
          {about.intersections.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl glass p-7 text-center transition-colors hover:border-accent-blue/40"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-grad-cool text-black transition-transform group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <span className="font-display font-semibold">{item}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
