"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

/* single card with pointer-driven 3D tilt */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const Icon = project.icon;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${
      -y * 10
    }deg) translateZ(8px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <Reveal delay={index * 0.08}>
      <a
        ref={ref}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        onMouseLeave={reset}
        data-cursor
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-7 transition-[transform,border-color] duration-150 ease-out hover:border-accent-blue/40"
      >
        {/* hover glow */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-purple opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />

        <div className="mb-5 flex items-center justify-between">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-grad-primary text-black shadow-glow">
            <Icon size={26} />
          </span>
          <ArrowUpRight
            size={20}
            className="text-white/30 transition-colors group-hover:text-accent-blue"
          />
        </div>

        <span className="font-mono text-xs uppercase tracking-wider text-accent-blue">
          {project.category}
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm text-white/60">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.7rem] text-white/65"
            >
              {t}
            </span>
          ))}
        </div>

        <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-accent-blue">
          <Github size={14} /> View Repository
        </span>
      </a>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="05"
        eyebrow="Projects"
        title="Things I've built"
        subtitle="Tilt the cards · click to open the GitHub repository."
      />
      <motion.div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
