"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Target } from "@/types";
import { TARGET_LABELS, PLAN_LIMITS } from "@/types";
type Platform = Target;
const PLATFORM_LABELS = TARGET_LABELS;

type Tone = "professional" | "casual" | "witty" | "inspirational";

const TONE_OPTIONS: { value: Tone; label: string }[] = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "witty", label: "Witty" },
  { value: "inspirational", label: "Inspirational" },
];

const ALL_PLATFORMS: Platform[] = PLAN_LIMITS.pro.targets;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function SettingsPage() {
  const [brandVoice, setBrandVoice] = useState("");
  const [defaultTone, setDefaultTone] = useState<Tone>("professional");
  const [defaultPlatforms, setDefaultPlatforms] = useState<Platform[]>(
    PLAN_LIMITS.free.targets.slice(0, 2)
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<"free" | "pro">("free");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then((d) => {
        if (d.name) setName(d.name);
        if (d.email) setEmail(d.email);
        if (d.plan) setPlan(d.plan);
        if (d.settings?.brandVoice) setBrandVoice(d.settings.brandVoice);
        if (d.settings?.defaultTone) setDefaultTone(d.settings.defaultTone as Tone);
        if (d.settings?.defaultTargets?.length) setDefaultPlatforms(d.settings.defaultTargets);
      })
      .finally(() => setLoading(false));
  }, []);

  function togglePlatform(p: Platform) {
    setDefaultPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, brandVoice, defaultTone, defaultTargets: defaultPlatforms }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="h-8 w-32 rounded-lg bg-[#1a1a1a] animate-pulse" />
        <div className="h-48 rounded-xl bg-[#111] animate-pulse" />
        <div className="h-32 rounded-xl bg-[#111] animate-pulse" />
      </div>
    );
  }

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-3xl mx-auto space-y-8"
    >
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-text-muted mt-1">Manage your preferences and account</p>
      </motion.div>

      {/* Brand Voice */}
      <motion.div variants={fadeUp} className="rounded-xl border border-[#2a2a2a] bg-[#111] p-6">
        <h2 className="text-base font-semibold text-text-primary mb-1">Brand Voice</h2>
        <p className="text-sm text-text-muted mb-4">
          Define your brand's voice and the AI will match it in every action
        </p>
        <textarea
          value={brandVoice}
          onChange={(e) => setBrandVoice(e.target.value)}
          placeholder="Describe your brand's tone, personality, and communication style..."
          className="w-full h-32 bg-surface rounded-lg border border-[#2a2a2a] p-4 text-sm text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-white/20 transition-colors"
        />
      </motion.div>

      {/* Default Tone */}
      <motion.div variants={fadeUp} className="rounded-xl border border-[#2a2a2a] bg-[#111] p-6">
        <h2 className="text-base font-semibold text-text-primary mb-1">Default Tone</h2>
        <p className="text-sm text-text-muted mb-4">Pre-selected when you run a new action</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TONE_OPTIONS.map((t) => (
            <button
              key={t.value}
              onClick={() => setDefaultTone(t.value)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                defaultTone === t.value
                  ? "bg-white/[0.08] text-white border border-white/20"
                  : "bg-[#1a1a1a] text-text-secondary border border-[#2a2a2a] hover:bg-[#222]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Default Targets */}
      <motion.div variants={fadeUp} className="rounded-xl border border-[#2a2a2a] bg-[#111] p-6">
        <h2 className="text-base font-semibold text-text-primary mb-1">Default Targets</h2>
        <p className="text-sm text-text-muted mb-4">Pre-selected for new actions</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ALL_PLATFORMS.map((p) => {
            const selected = defaultPlatforms.includes(p);
            return (
              <button
                key={p}
                onClick={() => togglePlatform(p)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  selected
                    ? "bg-white/[0.08] text-white border border-white/20"
                    : "bg-[#1a1a1a] text-text-secondary border border-[#2a2a2a] hover:bg-[#222]"
                }`}
              >
                {selected && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {PLATFORM_LABELS[p]}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Account */}
      <motion.div variants={fadeUp} className="rounded-xl border border-[#2a2a2a] bg-[#111] p-6">
        <h2 className="text-base font-semibold text-text-primary mb-4">Account</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-text-muted mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface rounded-lg border border-[#2a2a2a] px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-surface rounded-lg border border-[#2a2a2a] px-3 py-2.5 text-sm text-text-primary opacity-40 cursor-not-allowed"
            />
          </div>
        </div>
      </motion.div>

      {/* Subscription */}
      <motion.div variants={fadeUp} className="rounded-xl border border-[#2a2a2a] bg-[#111] p-6">
        <h2 className="text-base font-semibold text-text-primary mb-4">Subscription</h2>
        <div className="flex items-center justify-between p-4 rounded-lg bg-[#161616] border border-[#262626]">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-text-primary capitalize">{plan} Plan</p>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted bg-[#222] px-1.5 py-0.5 rounded">
                Current
              </span>
            </div>
            <p className="text-xs text-text-muted mt-1">
              {plan === "free" ? "5 credits/month, 3 targets" : "100 credits/month, 6 targets, priority"}
            </p>
          </div>
          {plan === "free" && (
            <button
              onClick={() => fetch("/api/stripe/checkout", { method: "POST" }).then(r => r.json()).then(d => d.url && (window.location.href = d.url))}
              className="px-4 py-2 rounded-lg bg-white text-[#080808] text-sm font-semibold hover:bg-neutral-200 transition-all"
            >
              Upgrade to Pro
            </button>
          )}
        </div>
        {plan === "free" && (
          <div className="mt-4 p-4 rounded-lg border border-[#2a2a2a] bg-[#161616]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Pro Plan</p>
                <p className="text-xs text-text-muted mt-0.5">
                  100 credits/month, all 6 targets, priority generation
                </p>
              </div>
              <p className="text-lg font-bold text-text-primary">
                $19<span className="text-xs text-text-muted font-normal">/mo</span>
              </p>
            </div>
          </div>
        )}
        {plan === "pro" && (
          <button
            onClick={() => fetch("/api/stripe/portal", { method: "POST" }).then(r => r.json()).then(d => d.url && (window.location.href = d.url))}
            className="mt-4 text-xs text-text-muted hover:text-neutral-300 transition-colors"
          >
            Manage subscription
          </button>
        )}
      </motion.div>

      {error && <p className="text-sm text-red-400 px-1">{error}</p>}

      {/* Save */}
      <motion.div variants={fadeUp} className="flex justify-end pb-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-white text-[#080808] font-semibold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saved ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Saved
            </>
          ) : saving ? "Saving..." : "Save Changes"}
        </button>
      </motion.div>
    </motion.div>
  );
}
