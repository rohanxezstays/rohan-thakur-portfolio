/**
 * Refined, painterly illustrations for each gallery canvas.
 * Soft gradient masses with fine ink detail (no heavy outlines) — composed
 * to feel hand-illustrated rather than icon-flat. Gradient ids are suffixed
 * per exhibit so the seven SVGs can co-exist in the DOM without collisions.
 */

const INK = "#3a3128";

function Art({ children, defs }: { children: React.ReactNode; defs: React.ReactNode }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <defs>{defs}</defs>
      <g strokeLinecap="round" strokeLinejoin="round">{children}</g>
    </svg>
  );
}

export default function FrameArt({ id }: { id: string }) {
  switch (id) {
    case "beginning":
      return (
        <Art
          defs={
            <>
              <linearGradient id="sky-b" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#cdbfd2" />
                <stop offset="0.55" stopColor="#edcaa4" />
                <stop offset="1" stopColor="#f7e6c6" />
              </linearGradient>
              <radialGradient id="sun-b" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#fff4cf" />
                <stop offset="1" stopColor="#e6a93f" />
              </radialGradient>
              <linearGradient id="hillA-b" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#b6c091" />
                <stop offset="1" stopColor="#93a06b" />
              </linearGradient>
              <linearGradient id="hillB-b" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#7f8e57" />
                <stop offset="1" stopColor="#5e6d41" />
              </linearGradient>
            </>
          }
        >
          <rect x="0" y="0" width="200" height="150" fill="url(#sky-b)" />
          <circle cx="100" cy="90" r="40" fill="#fbe7b4" opacity="0.55" />
          <circle cx="100" cy="90" r="22" fill="url(#sun-b)" />
          <g stroke="#e0a64a" strokeWidth="1.4" opacity="0.8">
            <line x1="100" y1="56" x2="100" y2="46" />
            <line x1="76" y1="66" x2="68" y2="58" />
            <line x1="124" y1="66" x2="132" y2="58" />
            <line x1="62" y1="90" x2="52" y2="90" />
            <line x1="138" y1="90" x2="148" y2="90" />
          </g>
          <path d="M0 138 C42 122 78 134 110 128 C150 120 176 132 200 126 L200 200 L0 200 Z" fill="url(#hillA-b)" />
          <path d="M0 158 C50 148 96 158 138 152 C168 148 188 156 200 152 L200 200 L0 200 Z" fill="url(#hillB-b)" />
          <path d="M0 138 C42 122 78 134 110 128 C150 120 176 132 200 126" fill="none" stroke="#5d6a3e" strokeWidth="0.8" opacity="0.4" />
          <path d="M101 200 C97 178 116 168 104 150 C97 139 107 133 102 124" fill="none" stroke="#7a6a44" strokeWidth="2.4" opacity="0.7" />
          <g stroke="#3c5226" strokeWidth="1.4" fill="none">
            <path d="M102 152 L102 134" />
            <path d="M102 142 C95 135 89 135 85 139" />
            <path d="M102 137 C109 130 115 130 119 134" />
          </g>
          <g stroke={INK} strokeWidth="1.2" fill="none" opacity="0.75">
            <path d="M40 44 q7 -7 14 0" />
            <path d="M55 52 q6 -6 12 0" />
          </g>
        </Art>
      );

    case "experience":
      return (
        <Art
          defs={
            <>
              <linearGradient id="sky-e" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#b9c8d0" />
                <stop offset="1" stopColor="#e4dcc8" />
              </linearGradient>
              <linearGradient id="rockA-e" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#9aa6ad" />
                <stop offset="1" stopColor="#74808a" />
              </linearGradient>
              <linearGradient id="rockB-e" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#828f96" />
                <stop offset="1" stopColor="#5c6970" />
              </linearGradient>
              <radialGradient id="sun-e" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#fde8b8" />
                <stop offset="1" stopColor="#e3bf52" />
              </radialGradient>
            </>
          }
        >
          <rect x="0" y="0" width="200" height="200" fill="url(#sky-e)" />
          <circle cx="150" cy="52" r="13" fill="url(#sun-e)" />
          <path d="M30 60 q12 -7 24 -1 q9 -6 18 2" fill="none" stroke="#cdd6da" strokeWidth="2.4" opacity="0.7" />
          <path d="M0 170 L46 96 L92 146 L150 70 L200 170 Z" fill="url(#rockA-e)" />
          <path d="M40 170 L100 84 L162 170 Z" fill="url(#rockB-e)" />
          <path d="M100 84 L90 108 L110 108 Z" fill="#f1efe8" />
          <path d="M150 70 L142 88 L160 88 Z" fill="#f1efe8" />
          <path d="M100 84 L96 100 L104 100 Z" fill="#c8ced2" opacity="0.7" />
          <path d="M0 156 C40 150 82 154 122 152 C162 150 190 154 200 152 L200 170 L0 170 Z" fill="#76854f" />
          <path d="M58 168 C84 154 74 142 98 130 C120 120 108 106 126 92" fill="none" stroke="#5a4a38" strokeWidth="1.4" strokeDasharray="2 4" />
          <line x1="100" y1="84" x2="100" y2="66" stroke={INK} strokeWidth="1.2" />
          <path d="M100 66 L116 71 L100 77 Z" fill="#a8442f" />
        </Art>
      );

    case "foundations":
      return (
        <Art
          defs={
            <>
              <linearGradient id="page-f" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f1e3bf" />
                <stop offset="1" stopColor="#dcc89a" />
              </linearGradient>
              <linearGradient id="cap-f" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3c3650" />
                <stop offset="1" stopColor="#262236" />
              </linearGradient>
              <radialGradient id="gear-f" cx="0.4" cy="0.4" r="0.7">
                <stop offset="0" stopColor="#e6c878" />
                <stop offset="1" stopColor="#a9863a" />
              </radialGradient>
            </>
          }
        >
          <rect x="0" y="0" width="200" height="200" fill="#efe7d4" />
          <path d="M70 42 L100 30 L130 42 L100 54 Z" fill="url(#cap-f)" />
          <path d="M82 48 L82 63 C82 72 118 72 118 63 L118 48 L100 56 Z" fill="#322c46" />
          <line x1="130" y1="42" x2="130" y2="60" stroke="#caa23a" strokeWidth="1.2" />
          <circle cx="130" cy="62" r="2.6" fill="#caa23a" />
          <path d="M38 104 C60 96 88 96 100 107 C112 96 140 96 162 104 L162 152 C140 144 112 144 100 154 C88 144 60 144 38 152 Z" fill="url(#page-f)" />
          <path d="M100 107 L100 154" fill="none" stroke="#b09056" strokeWidth="1" />
          <path d="M38 104 C60 96 88 96 100 107 L100 154 C88 144 60 144 38 152 Z" fill="#000" opacity="0.05" />
          <g stroke="#b29760" strokeWidth="0.9" opacity="0.85">
            <line x1="52" y1="114" x2="90" y2="110" />
            <line x1="52" y1="122" x2="90" y2="118" />
            <line x1="52" y1="130" x2="86" y2="126" />
            <line x1="110" y1="110" x2="148" y2="114" />
            <line x1="110" y1="118" x2="148" y2="122" />
            <line x1="114" y1="126" x2="148" y2="130" />
          </g>
          <circle cx="152" cy="160" r="11" fill="url(#gear-f)" />
          <circle cx="152" cy="160" r="3.6" fill="#f3ecd9" />
          <g stroke="#8a6d2e" strokeWidth="1.4">
            <line x1="152" y1="146" x2="152" y2="151" />
            <line x1="152" y1="169" x2="152" y2="174" />
            <line x1="138" y1="160" x2="143" y2="160" />
            <line x1="161" y1="160" x2="166" y2="160" />
          </g>
        </Art>
      );

    case "collection":
      return (
        <Art
          defs={
            <>
              <linearGradient id="c1-c" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#e7ecdb" />
                <stop offset="1" stopColor="#cfd9bd" />
              </linearGradient>
              <linearGradient id="c2-c" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#dfe7ec" />
                <stop offset="1" stopColor="#c2d0d8" />
              </linearGradient>
              <linearGradient id="canvas-c" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f5eedb" />
                <stop offset="1" stopColor="#e7dcc1" />
              </linearGradient>
            </>
          }
        >
          <rect x="0" y="0" width="200" height="200" fill="#efe8d6" />
          <line x1="14" y1="42" x2="186" y2="42" stroke={INK} strokeWidth="0.8" opacity="0.25" />
          <rect x="22" y="50" width="36" height="32" fill="url(#c1-c)" stroke="#2a241d" strokeWidth="2" />
          <circle cx="47" cy="60" r="4.5" fill="#e3a23a" />
          <path d="M26 76 L35 64 L42 70 L54 56" fill="none" stroke="#5e7a44" strokeWidth="1.6" />
          <rect x="150" y="48" width="34" height="36" fill="url(#c2-c)" stroke="#2a241d" strokeWidth="2" />
          <path d="M154 80 L163 64 L174 74" fill="none" stroke="#6f7c84" strokeWidth="1.6" />
          <circle cx="168" cy="58" r="3.2" fill="#a8442f" />
          <line x1="58" y1="156" x2="88" y2="46" stroke="#5e4630" strokeWidth="2.2" />
          <line x1="142" y1="156" x2="112" y2="46" stroke="#5e4630" strokeWidth="2.2" />
          <line x1="106" y1="124" x2="106" y2="168" stroke="#5e4630" strokeWidth="2" opacity="0.7" />
          <line x1="72" y1="106" x2="128" y2="106" stroke="#6b4f36" strokeWidth="2.2" />
          <rect x="72" y="54" width="56" height="50" fill="url(#canvas-c)" stroke="#2a241d" strokeWidth="2.5" />
          <circle cx="114" cy="68" r="5.5" fill="#e3a23a" />
          <path d="M78 98 L92 82 L102 92 L122 74" fill="none" stroke="#5e7a44" strokeWidth="1.8" />
          <path d="M150 152 q15 -7 24 4 q5 9 -6 13 q-19 6 -22 -6 q-1 -7 4 -11 Z" fill="#e7d6ac" stroke="#8a7448" strokeWidth="1" />
          <circle cx="159" cy="158" r="2" fill="#a8442f" />
          <circle cx="166" cy="156" r="2" fill="#3f6a8a" />
          <circle cx="167" cy="163" r="2" fill="#5e7a44" />
        </Art>
      );

    case "craftsmanship":
      return (
        <Art
          defs={
            <>
              <linearGradient id="nib-c" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e6c878" />
                <stop offset="1" stopColor="#a9863a" />
              </linearGradient>
              <radialGradient id="gear-c" cx="0.4" cy="0.4" r="0.7">
                <stop offset="0" stopColor="#e6c878" />
                <stop offset="1" stopColor="#a9863a" />
              </radialGradient>
            </>
          }
        >
          <rect x="0" y="0" width="200" height="200" fill="#efe7d4" />
          <line x1="100" y1="44" x2="72" y2="150" stroke="#7d8488" strokeWidth="2" />
          <line x1="100" y1="44" x2="128" y2="150" stroke="#6f767a" strokeWidth="2" />
          <circle cx="100" cy="44" r="3.4" fill="#9aa1a4" stroke="#5d6266" strokeWidth="1" />
          <path d="M100 70 L111 106 L100 118 L89 106 Z" fill="url(#nib-c)" stroke="#7a5f24" strokeWidth="1" />
          <line x1="100" y1="86" x2="100" y2="112" stroke="#5d4a1c" strokeWidth="1" />
          <circle cx="100" cy="90" r="2.2" fill="#3a3128" />
          <line x1="38" y1="62" x2="70" y2="120" stroke="#6b4f36" strokeWidth="2.4" />
          <path d="M38 62 L31 57 L48 68 Z" fill="#9aa1a4" />
          <path d="M66 114 q10 2 10 13 q-12 2 -16 -7 Z" fill="#a8442f" />
          <circle cx="158" cy="80" r="12" fill="url(#gear-c)" />
          <circle cx="158" cy="80" r="4" fill="#f3ecd9" />
          <g stroke="#8a6d2e" strokeWidth="1.6">
            <line x1="158" y1="64" x2="158" y2="70" />
            <line x1="158" y1="90" x2="158" y2="96" />
            <line x1="142" y1="80" x2="148" y2="80" />
            <line x1="168" y1="80" x2="174" y2="80" />
          </g>
          <rect x="42" y="150" width="116" height="13" rx="1.5" fill="#cda869" stroke="#8a6d3e" strokeWidth="1" />
          <g stroke="#7a5f30" strokeWidth="0.9">
            <line x1="56" y1="150" x2="56" y2="156" />
            <line x1="70" y1="150" x2="70" y2="156" />
            <line x1="84" y1="150" x2="84" y2="156" />
            <line x1="98" y1="150" x2="98" y2="156" />
            <line x1="112" y1="150" x2="112" y2="156" />
            <line x1="126" y1="150" x2="126" y2="156" />
            <line x1="140" y1="150" x2="140" y2="156" />
          </g>
        </Art>
      );

    case "recognition":
      return (
        <Art
          defs={
            <>
              <radialGradient id="medal-r" cx="0.4" cy="0.35" r="0.75">
                <stop offset="0" stopColor="#fbe6a8" />
                <stop offset="1" stopColor="#cf9a2e" />
              </radialGradient>
              <linearGradient id="ribbon-r" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#b04632" />
                <stop offset="1" stopColor="#8a3322" />
              </linearGradient>
            </>
          }
        >
          <rect x="0" y="0" width="200" height="200" fill="#efe7d4" />
          <g stroke="#e0a64a" strokeWidth="1.4" opacity="0.5">
            <line x1="100" y1="38" x2="100" y2="26" />
            <line x1="70" y1="46" x2="62" y2="36" />
            <line x1="130" y1="46" x2="138" y2="36" />
            <line x1="50" y1="74" x2="38" y2="68" />
            <line x1="150" y1="74" x2="162" y2="68" />
          </g>
          <path d="M86 92 L78 128 L93 119 L100 132 L107 119 L122 128 L114 92 Z" fill="url(#ribbon-r)" />
          <circle cx="100" cy="72" r="22" fill="url(#medal-r)" stroke="#a9821f" strokeWidth="1.5" />
          <path d="M100 56 L105 68.5 L118.5 69 L108 77.5 L111.5 90.5 L100 83 L88.5 90.5 L92 77.5 L81.5 69 L95 68.5 Z" fill="#d99f2c" />
          <g fill="#5e6e3c" stroke="#46532e" strokeWidth="0.8">
            <path d="M74 152 C50 132 50 100 70 78 C60 100 62 130 80 148 Z" />
            <path d="M126 152 C150 132 150 100 130 78 C140 100 138 130 120 148 Z" />
          </g>
          <path d="M86 152 L100 162 L114 152" fill="none" stroke="#8a3322" strokeWidth="2" />
        </Art>
      );

    default: // thankyou — sunset over water
      return (
        <Art
          defs={
            <>
              <linearGradient id="sky-t" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f3c49a" />
                <stop offset="0.6" stopColor="#e79a6e" />
                <stop offset="1" stopColor="#d98a6a" />
              </linearGradient>
              <radialGradient id="sun-t" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#ffd9a0" />
                <stop offset="1" stopColor="#e8763c" />
              </radialGradient>
              <linearGradient id="water-t" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#9fb9c6" />
                <stop offset="1" stopColor="#728e9d" />
              </linearGradient>
            </>
          }
        >
          <rect x="0" y="0" width="200" height="124" fill="url(#sky-t)" />
          <rect x="0" y="124" width="200" height="76" fill="url(#water-t)" />
          <circle cx="118" cy="98" r="28" fill="#f0b27a" opacity="0.5" />
          <circle cx="118" cy="98" r="20" fill="url(#sun-t)" />
          <g stroke={INK} strokeWidth="1.2" fill="none" opacity="0.75">
            <path d="M44 50 q7 -7 14 0" />
            <path d="M60 58 q6 -6 12 0" />
            <path d="M74 50 q5 -5 10 0" />
          </g>
          <g stroke="#dca06a" strokeWidth="1.8" opacity="0.6">
            <line x1="108" y1="132" x2="128" y2="132" />
            <line x1="112" y1="140" x2="124" y2="140" />
            <line x1="114" y1="148" x2="122" y2="148" />
          </g>
          <path d="M58 124 L58 84 L88 120 Z" fill="#efe6d4" stroke="#7a6a48" strokeWidth="1" />
          <path d="M56 124 L40 124 L46 134 L86 134 L90 124 Z" fill="#5e4630" />
          <line x1="58" y1="84" x2="58" y2="80" stroke={INK} strokeWidth="1" />
        </Art>
      );
  }
}
