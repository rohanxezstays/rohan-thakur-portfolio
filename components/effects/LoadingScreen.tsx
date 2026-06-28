"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cinematic boot screen. Counts 0 → 100 then curtains away.
 * Renders once on first mount, then unmounts entirely.
 */
export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 1600;
    let raf: number;

    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / DURATION) * 100);
      setProgress(Math.floor(p));
      if (p < 100) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-bg"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-sm uppercase tracking-[0.5em] text-white/40"
          >
            Rohan Thakur
          </motion.span>

          <div className="mt-6 h-px w-64 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-grad-primary"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="mt-4 font-display text-6xl font-bold text-gradient tabular-nums">
            {progress}
          </span>
          <span className="mt-2 text-xs tracking-widest text-white/30">
            LOADING EXPERIENCE
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
