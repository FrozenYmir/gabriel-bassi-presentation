"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

interface KineticHeroProps {
  badge: string;
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export function KineticHero({
  badge,
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
}: KineticHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const words = headline.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[88vh] flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: orbY }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: orbY }}
        animate={{ scale: [1.05, 0.96, 1.05], rotate: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-40 -left-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl"
      />

      <motion.div style={{ y: textY, opacity }} className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-xs font-medium text-sky-300"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>{badge}</span>
        </motion.div>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.08]">
          {words.map((word, idx) => (
            <span key={`${word}-${idx}`} className="mr-[0.26em] inline-block overflow-hidden pb-1">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.65,
                  delay: 0.06 * idx,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42 }}
          className="mt-6 max-w-2xl text-base text-slate-300 sm:text-xl leading-relaxed"
        >
          {subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#projects" variant="primary">
            <span>{ctaPrimary}</span>
            <ArrowDownRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            <span>{ctaSecondary}</span>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
