import GalleryCanvas from "./GalleryCanvas";
import { education, certifications } from "@/lib/data";

export default function Foundations() {
  return (
    <GalleryCanvas id="education" index="III" title="Foundations" year="Academia">
      <header className="mb-10 text-center">
        <h2 className="font-serif text-4xl tracking-tight text-[#2A241D] sm:text-6xl">
          Foundations
        </h2>
        <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[#2A241D]/50">
          Education &amp; research
        </p>
      </header>

      <div className="mx-auto grid max-w-3xl gap-10 sm:grid-cols-2">
        <div>
          <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#6B6B45]">
            Academic record
          </p>
          <ul className="space-y-6">
            {education.map((e) => (
              <li key={e.degree} className="border-l-2 border-[#bfa779]/50 pl-4">
                <h3 className="font-serif text-xl text-[#2A241D]">{e.degree}</h3>
                <p className="text-sm text-[#2A241D]/70">{e.org}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-[#2A241D]/45">
                  {e.duration}
                </p>
                {e.note && (
                  <p className="mt-1 text-sm italic text-[#2A241D]/60">{e.note}</p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#6B6B45]">
            Certifications
          </p>
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 text-sm leading-relaxed text-[#2A241D]/80"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#bfa779]" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GalleryCanvas>
  );
}
