import GalleryCanvas from "./GalleryCanvas";
import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <GalleryCanvas id="experience" index="II" title="Experience" year="The Journey">
      <header className="mb-10 text-center">
        <h2 className="font-serif text-4xl tracking-tight text-[#2A241D] sm:text-6xl">
          Experience
        </h2>
        <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[#2A241D]/50">
          Progression &amp; growth
        </p>
      </header>

      <ol className="relative mx-auto max-w-3xl border-l border-[#2A241D]/15 pl-8 sm:pl-10">
        {experiences.map((exp) => (
          <li key={exp.company} className="relative mb-12 last:mb-0">
            <span className="absolute -left-[37px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-[#bfa779] ring-4 ring-[#F6F1E7] sm:-left-[45px]" />
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#6B6B45]">
              {exp.duration}
            </p>
            <h3 className="mt-1 font-serif text-2xl text-[#2A241D] sm:text-3xl">
              {exp.company}
            </h3>
            <p className="mt-0.5 text-sm italic text-[#2A241D]/60">{exp.role}</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {exp.groups.flatMap((g) => g.points).slice(0, 6).map((p) => (
                <li
                  key={p}
                  className="text-sm leading-relaxed text-[#2A241D]/75 before:mr-2 before:text-[#bfa779] before:content-['—']"
                >
                  {p}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </GalleryCanvas>
  );
}
