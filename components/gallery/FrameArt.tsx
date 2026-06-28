/**
 * Detailed fine-line "pencil" illustrations hung inside each gallery frame.
 * One symbolic artwork per exhibit — espresso ink + soft hatching on cream.
 *  I  Beginning   → dawn breaking over hills, a path, a sprout, birds (a new start)
 *  II Experience  → a mountain ascent with switchback path + summit flag (the climb)
 *  III Foundations→ open book, graduation cap, column, gear (academia + engineering)
 *  IV Collection  → a gallery wall + easel (curation of works)
 *  V  Craftsmanship→ a maker's tools — nib, compass, brush, gear, ruler
 *  VI Recognition → laurel wreath + medal + rays (honour)
 *  VII Thank You  → a setting sun over water, a sailboat, departing birds (farewell)
 */

const BASE = {
  fill: "none" as const,
  stroke: "#2a241d",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 200 190" className="h-full w-full" aria-hidden>
      <g {...BASE}>{children}</g>
    </svg>
  );
}

// soft parallel-line shading
function Hatch({ lines }: { lines: [number, number, number, number][] }) {
  return (
    <g opacity="0.28" strokeWidth="0.8">
      {lines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}
    </g>
  );
}

export default function FrameArt({ id }: { id: string }) {
  switch (id) {
    case "beginning":
      return (
        <Svg>
          {/* birds */}
          <path d="M40 36 q7 -7 14 0" />
          <path d="M55 43 q7 -7 14 0" />
          <path d="M150 44 q6 -6 12 0" opacity="0.7" />
          {/* sun + rays */}
          <circle cx="100" cy="92" r="24" />
          <line x1="100" y1="56" x2="100" y2="44" />
          <line x1="124" y1="68" x2="134" y2="58" />
          <line x1="76" y1="68" x2="66" y2="58" />
          <line x1="136" y1="92" x2="150" y2="92" />
          <line x1="64" y1="92" x2="50" y2="92" />
          <line x1="119" y1="60" x2="125" y2="51" opacity="0.55" />
          <line x1="81" y1="60" x2="75" y2="51" opacity="0.55" />
          <Hatch lines={[[92, 92, 108, 92], [94, 98, 106, 98], [96, 104, 104, 104]]} />
          {/* rolling hills */}
          <path d="M0 134 C38 118 70 130 100 124 C138 116 168 130 200 122" />
          <path d="M0 152 C46 140 88 150 128 144 C158 140 184 148 200 144" />
          <Hatch
            lines={[
              [20, 140, 30, 134], [34, 144, 44, 138], [150, 138, 160, 132],
              [166, 142, 176, 136], [60, 158, 70, 152], [150, 156, 160, 150],
            ]}
          />
          {/* winding path to the sun */}
          <path d="M88 190 C82 176 110 168 98 156 C90 148 104 142 100 132" opacity="0.85" />
          <path d="M108 190 C104 178 120 170 110 160" opacity="0.5" />
          {/* sprout */}
          <path d="M100 156 C100 148 100 144 100 138" />
          <path d="M100 148 C93 142 88 142 84 145" />
          <path d="M100 143 C107 137 112 137 116 140" />
        </Svg>
      );

    case "experience":
      return (
        <Svg>
          {/* sun behind peaks */}
          <circle cx="150" cy="58" r="15" opacity="0.85" />
          {/* clouds */}
          <path d="M30 50 q10 -8 22 -2 q8 -6 16 2" opacity="0.55" />
          {/* mountain range */}
          <path d="M8 160 L58 78 L92 124 L120 96 L150 150" />
          <path d="M92 124 L150 60 L192 160" />
          <line x1="6" y1="160" x2="194" y2="160" />
          {/* snow caps + shading */}
          <path d="M150 60 L140 78 L162 78 Z" opacity="0.6" />
          <path d="M58 78 L50 92 L68 92 Z" opacity="0.6" />
          <Hatch
            lines={[
              [150, 80, 158, 96], [146, 90, 154, 106], [156, 96, 164, 112],
              [58, 96, 64, 110], [62, 104, 68, 118],
            ]}
          />
          {/* switchback path */}
          <path d="M70 160 C96 150 80 140 104 132 C122 126 110 116 132 104 C144 96 142 84 150 70" strokeDasharray="1.5 5" />
          {/* milestone dots */}
          <circle cx="104" cy="132" r="1.6" />
          <circle cx="132" cy="104" r="1.6" />
          {/* summit flag */}
          <line x1="150" y1="60" x2="150" y2="44" />
          <path d="M150 44 L166 50 L150 56" />
        </Svg>
      );

    case "foundations":
      return (
        <Svg>
          {/* graduation cap */}
          <path d="M70 44 L100 32 L130 44 L100 56 Z" />
          <path d="M82 50 L82 64 C82 72 118 72 118 64 L118 50" />
          <line x1="130" y1="44" x2="130" y2="60" />
          <circle cx="130" cy="62" r="2.2" />
          {/* open book */}
          <path d="M40 108 C62 100 88 100 100 110 C112 100 138 100 160 108" />
          <path d="M40 108 L40 150 C62 142 88 142 100 152 C112 142 138 142 160 150 L160 108" />
          <line x1="100" y1="110" x2="100" y2="152" />
          {/* text lines (hatch) */}
          <Hatch
            lines={[
              [52, 116, 90, 112], [52, 124, 90, 120], [52, 132, 86, 128],
              [110, 112, 148, 116], [110, 120, 148, 124], [114, 128, 148, 132],
            ]}
          />
          {/* engineering gear (ECE nod) */}
          <circle cx="150" cy="156" r="10" />
          <circle cx="150" cy="156" r="3.4" />
          <line x1="150" y1="143" x2="150" y2="148" />
          <line x1="150" y1="164" x2="150" y2="169" />
          <line x1="137" y1="156" x2="142" y2="156" />
          <line x1="158" y1="156" x2="163" y2="156" />
          {/* laurel sprig */}
          <path d="M40 168 C46 160 54 158 60 160" opacity="0.7" />
          <path d="M46 164 q-4 -4 -2 -8" opacity="0.7" />
          <path d="M54 161 q-3 -5 0 -9" opacity="0.7" />
        </Svg>
      );

    case "collection":
      return (
        <Svg>
          {/* gallery wall hairline */}
          <line x1="10" y1="40" x2="190" y2="40" opacity="0.4" />
          {/* three hanging mini frames */}
          <rect x="22" y="48" width="34" height="30" />
          <path d="M26 70 L34 60 L40 66 L52 54" />
          <circle cx="46" cy="56" r="2" />
          <rect x="150" y="46" width="32" height="34" />
          <path d="M154 76 L162 62 L172 70" />
          <Hatch lines={[[155, 60, 178, 58], [155, 66, 174, 64]]} />
          {/* easel */}
          <line x1="74" y1="170" x2="98" y2="70" />
          <line x1="138" y1="170" x2="114" y2="70" />
          <line x1="106" y1="120" x2="106" y2="166" opacity="0.6" />
          <line x1="86" y1="118" x2="126" y2="118" />
          {/* canvas on easel */}
          <rect x="84" y="74" width="46" height="44" />
          <circle cx="118" cy="86" r="4" />
          <path d="M89 112 L100 98 L108 106 L124 90" />
          {/* palette */}
          <path d="M150 150 q14 -6 22 4 q4 8 -6 12 q-18 6 -20 -6 q-1 -6 4 -10 Z" />
          <circle cx="158" cy="156" r="1.6" />
          <circle cx="165" cy="154" r="1.6" />
          <circle cx="166" cy="161" r="1.6" />
        </Svg>
      );

    case "craftsmanship":
      return (
        <Svg>
          {/* compass (drafting) */}
          <line x1="100" y1="44" x2="74" y2="150" />
          <line x1="100" y1="44" x2="126" y2="150" />
          <path d="M100 44 l-5 -6 l10 0 Z" />
          <circle cx="100" cy="44" r="3" />
          <path d="M82 110 A60 60 0 0 0 118 110" strokeDasharray="1.5 5" opacity="0.7" />
          {/* fountain-pen nib (center) */}
          <path d="M100 72 L110 104 L100 116 L90 104 Z" />
          <line x1="100" y1="88" x2="100" y2="110" />
          <circle cx="100" cy="92" r="2.2" />
          {/* paintbrush (diagonal) */}
          <line x1="40" y1="64" x2="70" y2="120" />
          <path d="M40 64 L34 60 L48 70 Z" />
          <path d="M67 114 q8 2 8 12 q-10 2 -14 -6 Z" />
          {/* gear */}
          <circle cx="156" cy="78" r="12" />
          <circle cx="156" cy="78" r="4" />
          <line x1="156" y1="62" x2="156" y2="68" />
          <line x1="156" y1="88" x2="156" y2="94" />
          <line x1="140" y1="78" x2="146" y2="78" />
          <line x1="166" y1="78" x2="172" y2="78" />
          <line x1="146" y1="68" x2="150" y2="72" />
          <line x1="162" y1="84" x2="166" y2="88" />
          {/* ruler */}
          <rect x="44" y="150" width="112" height="12" />
          <Hatch
            lines={[
              [56, 150, 56, 156], [68, 150, 68, 156], [80, 150, 80, 156],
              [92, 150, 92, 156], [104, 150, 104, 156], [116, 150, 116, 156],
              [128, 150, 128, 156], [140, 150, 140, 156],
            ]}
          />
        </Svg>
      );

    case "recognition":
      return (
        <Svg>
          {/* radiating rays */}
          <g opacity="0.4">
            <line x1="100" y1="40" x2="100" y2="28" />
            <line x1="70" y1="48" x2="62" y2="38" />
            <line x1="130" y1="48" x2="138" y2="38" />
            <line x1="52" y1="74" x2="40" y2="68" />
            <line x1="148" y1="74" x2="160" y2="68" />
          </g>
          {/* medal star */}
          <path d="M100 52 L105.3 66.7 L120.9 67.2 L108.6 76.8 L112.9 91.8 L100 83 L87.1 91.8 L91.4 76.8 L79.1 67.2 L94.7 66.7 Z" />
          <circle cx="100" cy="72" r="20" opacity="0.45" />
          {/* ribbon */}
          <path d="M86 90 L80 124 L93 116 L100 128 L107 116 L120 124 L114 90" />
          {/* laurel wreath */}
          <path d="M74 150 C50 130 50 100 70 78" />
          <path d="M126 150 C150 130 150 100 130 78" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <path d={`M${66 - i * 2} ${92 + i * 16} q-9 -2 -13 -10`} opacity="0.75" />
              <path d={`M${134 + i * 2} ${92 + i * 16} q9 -2 13 -10`} opacity="0.75" />
            </g>
          ))}
          <path d="M86 150 L100 160 L114 150" />
        </Svg>
      );

    default: // thankyou
      return (
        <Svg>
          {/* departing birds toward the sun */}
          <path d="M44 50 q7 -7 14 0" />
          <path d="M60 58 q6 -6 12 0" opacity="0.8" />
          <path d="M74 50 q5 -5 10 0" opacity="0.6" />
          {/* setting sun */}
          <circle cx="118" cy="92" r="22" />
          <line x1="118" y1="62" x2="118" y2="54" opacity="0.6" />
          <line x1="146" y1="92" x2="156" y2="92" opacity="0.6" />
          <line x1="90" y1="92" x2="80" y2="92" opacity="0.6" />
          {/* horizon / water */}
          <line x1="14" y1="120" x2="186" y2="120" />
          {/* reflection */}
          <Hatch
            lines={[
              [104, 128, 132, 128], [110, 136, 126, 136], [112, 144, 124, 144],
              [40, 130, 70, 130], [46, 140, 66, 140],
            ]}
          />
          {/* sailboat */}
          <path d="M58 120 L58 86 L86 116 Z" />
          <path d="M58 116 L40 116 L46 128 L84 128 L88 116 Z" />
          <line x1="58" y1="86" x2="58" y2="84" />
        </Svg>
      );
  }
}
