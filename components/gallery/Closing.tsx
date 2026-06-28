import GalleryCanvas from "./GalleryCanvas";
import { profile, socials } from "@/lib/data";

export default function Closing() {
  return (
    <GalleryCanvas id="contact" index="VII" title="Thank You" year="Fin">
      <div className="py-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#2A241D]/50">
          End of exhibition
        </p>
        <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-tight tracking-tight text-[#2A241D] sm:text-6xl">
          Thank you for visiting my gallery.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#2A241D]/70">
          Every chapter here is a work in progress. If something resonated and
          you&apos;d like to build, analyse, or create together — the door is open.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="bg-[#2A241D] px-7 py-3 text-sm uppercase tracking-[0.2em] text-[#F6F1E7] transition-colors hover:bg-[#6B6B45]"
          >
            Let&apos;s collaborate
          </a>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="border-b border-[#2A241D]/40 pb-0.5 text-sm uppercase tracking-[0.2em] text-[#2A241D]/70 transition-colors hover:text-[#2A241D]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </GalleryCanvas>
  );
}
