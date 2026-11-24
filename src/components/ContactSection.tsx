"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

interface ContactSectionProps {
  heading: string;
  sub: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  sendButton: string;
  sentSuccess: string;
}

export function ContactSection(props: ContactSectionProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Unable to send message.");
        return;
      }
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 sm:p-10 backdrop-blur-xl"
      >
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{props.heading}</h2>
        <p className="mt-2 text-sm text-slate-300">{props.sub}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              minLength={2}
              maxLength={100}
              name="name"
              placeholder={props.namePlaceholder}
              className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
            />
            <input
              required
              type="email"
              maxLength={140}
              name="email"
              placeholder={props.emailPlaceholder}
              className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
            />
          </div>

          <textarea
            required
            minLength={10}
            maxLength={2000}
            rows={4}
            name="message"
            placeholder={props.messagePlaceholder}
            className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:opacity-50 cursor-pointer"
          >
            <Send className="h-4 w-4" />
            <span>{status === "sending" ? "..." : props.sendButton}</span>
          </button>

          {status === "sent" && (
            <p className="flex items-center gap-2 text-sm text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>{props.sentSuccess}</span>
            </p>
          )}
          {status === "error" && (
            <p className="flex items-center gap-2 text-sm text-rose-400">
              <AlertCircle className="h-4 w-4" />
              <span>{errorMsg}</span>
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
