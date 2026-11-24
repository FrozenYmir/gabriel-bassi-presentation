"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Locale, TIMELINE } from "@/lib/content";

export function ScrollTimeline({ heading, locale }: { heading: string; locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 65%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="mx-auto max-w-5xl px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className="text-2xl font-bold text-white sm:text-4xl"
      >
        {heading}
      </motion.h2>

      <div className="relative mt-12 pl-8">
        <div className="absolute top-0 bottom-0 left-2.5 w-px bg-white/10" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute top-0 left-2.5 w-0.5 origin-top bg-gradient-to-b from-sky-400 to-indigo-400"
        />

        <div className="space-y-10">
          {TIMELINE.map((item, idx) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative rounded-2xl border border-white/10 bg-slate-900/50 p-6"
            >
              <span className="absolute -left-[29px] top-7 h-3.5 w-3.5 rounded-full border-2 border-sky-400 bg-slate-950" />
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                {item.period} • {item.institution}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-white">{item.title[locale]}</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{item.detail[locale]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
