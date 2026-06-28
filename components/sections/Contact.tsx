"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { socials } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // POST the submission to /api/contact, which persists it to the database.
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to send.");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const field =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-white/30 focus:border-accent-blue/60";

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-28 text-center">
      <SectionHeading
        center
        index="07"
        eyebrow="Contact"
        title={
          <>
            Let&apos;s Build Something{" "}
            <span className="text-gradient">Extraordinary.</span>
          </>
        }
      />

      <Reveal>
        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 grid gap-4 rounded-3xl glass p-8 text-left"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs text-white/50">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs text-white/50">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
                className={field}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-xs text-white/50">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about the opportunity…"
              className={`${field} resize-none`}
            />
          </div>

          <div className="mt-2 flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={status === "loading"}
              data-cursor
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-grad-primary px-8 py-3.5 text-sm font-semibold text-black shadow-glow transition-all duration-300 hover:shadow-glow-purple disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending…
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 size={16} /> Sent!
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>

            {/* status feedback */}
            {status === "success" && (
              <p className="text-sm text-accent-blue">
                Thanks — your message is saved. I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <div className="mt-2 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    data-cursor
                    className="grid h-12 w-12 place-items-center rounded-full glass transition-colors hover:bg-grad-primary hover:text-black"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
