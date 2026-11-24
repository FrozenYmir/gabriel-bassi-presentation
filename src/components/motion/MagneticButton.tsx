"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * 0.28);
    y.set(offsetY * 0.28);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const styles =
    variant === "primary"
      ? "bg-sky-400 text-slate-950 font-semibold shadow-lg shadow-sky-400/25 hover:bg-sky-300"
      : "border border-white/15 bg-white/5 text-slate-100 hover:border-sky-400/50 hover:bg-white/10";

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm transition-colors cursor-pointer ${styles}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {content}
      </a>
    );
  }
  return <button type="button" onClick={onClick}>{content}</button>;
}
