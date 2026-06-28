import GalleryCanvas from "./GalleryCanvas";
import { projects } from "@/lib/data";

export default function Collection() {
  return (
    <GalleryCanvas id="projects" index="IV" title="Collection of Works" year="Selected" wide>
      <header className="mb-10 text-center">
        <h2 className="font-serif text-4xl tracking-tight text-[#2A241D] sm:text-6xl">
          Collection of Works
        </h2>
        <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[#2A241D]/50">
          Curated projects
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p) => {
          const Icon = p.icon;
          return (
            <a
              key={p.title}
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group block bg-[#1b1712] p-2 shadow-[0_24px_50px_-30px_rgba(28,24,19,0.55)] transition-transform duration-500 hover:-translate-y-2"
            >
              {/* mini framed artwork */}
              <div className="flex h-44 items-center justify-center bg-gradient-to-br from-[#efe7d6] to-[#ded2bb] ring-1 ring-[#caa75f]/30">
                <Icon
                  size={44}
                  strokeWidth={1.1}
                  className="text-[#2A241D]/55 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="bg-[#F6F1E7] px-4 py-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#6B6B45]">
                  {p.category}
                </p>
                <h3 className="mt-1 font-serif text-lg leading-snug text-[#2A241D]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2A241D]/65">
                  {p.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="border border-[#2A241D]/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#2A241D]/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </GalleryCanvas>
  );
}
