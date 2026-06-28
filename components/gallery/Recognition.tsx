import GalleryCanvas from "./GalleryCanvas";
import { achievements } from "@/lib/data";

export default function Recognition() {
  return (
    <GalleryCanvas id="achievements" index="VI" title="Recognition" year="Honours">
      <header className="mb-10 text-center">
        <h2 className="font-serif text-4xl tracking-tight text-[#2A241D] sm:text-6xl">
          Recognition
        </h2>
        <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[#2A241D]/50">
          Awards &amp; milestones
        </p>
      </header>

      <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
        {achievements.map((a) => {
          const Icon = a.icon;
          return (
            <div
              key={a.title}
              className="flex items-start gap-4 border border-[#2A241D]/12 bg-[#F6F1E7] px-5 py-4 transition-transform duration-500 hover:-translate-y-1"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#efe7d6] text-[#6B6B45] ring-1 ring-[#caa75f]/40">
                <Icon size={18} strokeWidth={1.3} />
              </span>
              <div>
                <h3 className="font-serif text-base leading-snug text-[#2A241D]">
                  {a.title}
                </h3>
                <p className="mt-0.5 text-sm text-[#2A241D]/60">{a.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </GalleryCanvas>
  );
}
