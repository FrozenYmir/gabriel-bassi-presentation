"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Globe } from "lucide-react";
import { Locale, PROJECTS, SITE_CONFIG, Track, UI_COPY } from "@/lib/content";
import { KineticHero } from "./motion/KineticHero";
import { SpotlightTiltCard } from "./motion/SpotlightTiltCard";
import { ScrollTimeline } from "./motion/ScrollTimeline";
import { ContactSection } from "./ContactSection";

export function PresentationClient() {
  const [locale, setLocale] = useState<Locale>("en");
  const [track, setTrack] = useState<Track>("all");
  const copy = UI_COPY[locale];

  const filteredProjects =
    track === "all" ? PROJECTS : PROJECTS.filter((item) => item.track === track);

  const tabs: { id: Track; label: string }[] = [
    { id: "all", label: copy.filterAll },
    { id: "finance", label: copy.filterFinance },
    { id: "tech", label: copy.filterTech },
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-4 left-0 right-0 z-40 mx-auto max-w-5xl px-6">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-slate-950/75 px-5 py-3 backdrop-blur-xl">
          <a href="#" className="text-sm font-bold tracking-wide text-white">
            {SITE_CONFIG.alias}
            <span className="text-sky-400">.</span>
          </a>

          <button
            type="button"
            onClick={() => setLocale((prev) => (prev === "en" ? "fr" : "en"))}
            aria-label="Toggle language"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-sky-400/50 cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-sky-400" />
            <span>{locale === "en" ? "FR" : "EN"}</span>
          </button>
        </nav>
      </header>

      <main>
        <KineticHero
          badge={copy.badge}
          headline={copy.headline}
          subheadline={copy.subheadline}
          ctaPrimary={copy.ctaPrimary}
          ctaSecondary={copy.ctaSecondary}
        />

        <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-2xl font-bold text-white sm:text-4xl">{copy.projectsHeading}</h2>

            <div className="inline-flex rounded-full border border-white/10 bg-slate-900/80 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setTrack(tab.id)}
                  className="relative rounded-full px-4 py-1.5 text-xs font-medium text-slate-200 transition cursor-pointer"
                >
                  {track === tab.id && (
                    <motion.span
                      layoutId="activeTrackPill"
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      className="absolute inset-0 rounded-full bg-sky-400/20 border border-sky-400/40"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="mt-10 grid gap-6 md:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35 }}
                >
                  <SpotlightTiltCard>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-sky-400">{project.tag}</span>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={project.title}
                          className="text-slate-400 hover:text-white"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      {project.summary[locale]}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </SpotlightTiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <ScrollTimeline heading={copy.timelineHeading} locale={locale} />

        <ContactSection
          heading={copy.contactHeading}
          sub={copy.contactSub}
          namePlaceholder={copy.namePlaceholder}
          emailPlaceholder={copy.emailPlaceholder}
          messagePlaceholder={copy.messagePlaceholder}
          sendButton={copy.sendButton}
          sentSuccess={copy.sentSuccess}
        />
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {SITE_CONFIG.name} — {SITE_CONFIG.location}
      </footer>
    </div>
  );
}
