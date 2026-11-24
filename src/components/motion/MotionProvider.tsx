"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig, motion, useScroll, useSpring } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-gradient-to-r from-sky-400 via-indigo-400 to-cyan-300"
      />
      {children}
    </MotionConfig>
  );
}
