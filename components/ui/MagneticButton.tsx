"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-grad-primary text-black font-semibold shadow-glow hover:shadow-glow-purple",
  outline: "glass text-ink hover:border-accent-blue/60",
  ghost: "text-ink/80 hover:text-ink",
};

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  download?: boolean;
  type?: "button" | "submit";
}

/**
 * Button that physically leans toward the cursor (magnetic hover).
 * Renders as <a> when href is provided, otherwise <button>.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  download,
  type = "button",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm transition-shadow duration-300",
    variants[variant],
    className
  );

  const inner = <span className="relative z-10 flex items-center gap-2">{children}</span>;

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="inline-block"
      data-cursor
    >
      {href ? (
        <a href={href} download={download} className={classes} onClick={onClick}>
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={classes}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
