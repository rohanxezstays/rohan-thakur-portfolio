import GalleryCanvas from "./GalleryCanvas";
import { skillCategories } from "@/lib/data";

export default function Craftsmanship() {
  return (
    <GalleryCanvas id="skills" index="V" title="Craftsmanship" year="The Tools">
      <header className="mb-10 text-center">
        <h2 className="font-serif text-4xl tracking-tight text-[#2A241D] sm:text-6xl">
          Craftsmanship
        </h2>
        <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[#2A241D]/50">
          Specimens &amp; instruments
        </p>
      </header>

      <div className="grid gap-px bg-[#2A241D]/10 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.name}
              className="group bg-[#F6F1E7] p-6 transition-colors duration-500 hover:bg-[#efe7d6]"
            >
              <div className="mb-4 flex items-center gap-3">
                <Icon size={22} strokeWidth={1.2} className="text-[#6B6B45]" />
                <h3 className="font-serif text-xl text-[#2A241D]">{cat.name}</h3>
              </div>
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                {cat.skills.map((s) => (
                  <li
                    key={s}
                    className="text-sm text-[#2A241D]/70 before:mr-1.5 before:text-[#bfa779] before:content-['·']"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </GalleryCanvas>
  );
}
