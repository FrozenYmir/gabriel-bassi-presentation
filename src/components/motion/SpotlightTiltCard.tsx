"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

export function SpotlightTiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    mouseX.set(px);
    mouseY.set(py);

    const normX = (px / rect.width - 0.5) * 2;
    const normY = (py / rect.height - 0.5) * 2;
    rotateX.set(-normY * 6);
    rotateY.set(normX * 6);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(56, 189, 248, 0.16), transparent 75%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-md transition-colors hover:border-sky-400/40"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ background: spotlight, opacity: hovered ? 1 : 0 }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
