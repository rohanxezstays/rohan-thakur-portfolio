import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * Dark-luxury design system.
 * Colors, fonts and keyframes used across the whole site live here so
 * components can stay declarative (e.g. `text-accent-blue`, `bg-bg-secondary`).
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#050505",
          secondary: "#0D0D0D",
        },
        accent: {
          blue: "#00D4FF",
          purple: "#8B5CF6",
          gold: "#FFD700",
        },
        ink: "#F5F5F5",
        // Editorial "warm bone" hero palette
        bone: {
          DEFAULT: "#ECE4D6",
          deep: "#E4DACA",
        },
        espresso: "#2A241D",
        olive: "#6B6B45",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      backgroundImage: {
        "grad-primary":
          "linear-gradient(135deg, #00D4FF 0%, #8B5CF6 50%, #FFD700 100%)",
        "grad-cool": "linear-gradient(135deg, #00D4FF 0%, #8B5CF6 100%)",
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(0,212,255,0.45)",
        "glow-purple": "0 0 40px -8px rgba(139,92,246,0.5)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": {
            opacity: "1",
            transform: "translate(-50%, -40%) scale(1)",
          },
        },
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
        "marquee-x": "marquee-x 26s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
