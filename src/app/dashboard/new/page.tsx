"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlatformCard from "@/components/PlatformCard";
import type { ActionType, Target } from "@/types";
import { TARGET_LABELS, ACTION_TYPE_LABELS, PLAN_LIMITS } from "@/types";

type Tone = "professional" | "casual" | "witty" | "inspirational";

const TONE_OPTIONS: { value: Tone; label: string; desc: string }[] = [
  { value: "professional", label: "Professional", desc: "Formal & authoritative" },
  { value: "casual", label: "Casual", desc: "Friendly & conversational" },
  { value: "witty", label: "Witty", desc: "Clever & humorous" },
  { value: "inspirational", label: "Inspirational", desc: "Motivating & uplifting" },
];

const ALL_TARGETS = PLAN_LIMITS.pro.targets;
const FREE_TARGETS = new Set(PLAN_LIMITS.free.targets);

export default function NewTransformPage() {
  const [content, setContent] = useState("");
  const [actionType, setActionType] = useState<ActionType>("default");
  const [tone, setTone] = useState<Tone>("professional");
  const [selectedTargets, setSelectedTargets] = useState<Target[]>(["output_a", "output_b"]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<Target, string> | null>(null);
  const [favorites, setFavorites] = useState<Set<Target>>(new Set());
  const [error, setError] = useState<string | null>(null);

  function toggleTarget(t: Target) {
    setSelectedTargets((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }

  async function handleTransform() {
    if (!content.trim() || selectedTargets.length === 0) return;
    setLoading(true);
    setResults(null);
    setError(null);
    try {
      const res = await fetch("/api/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, actionType, targets: selectedTargets, tone }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }
      const data = await res.json();
      const map: Record<string, string> = {};
      for (const output of data.outputs ?? []) {
        map[output.target] = output.body;
      }
      setResults(map as Record<Target, string>);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite(t: Target) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">New Action</h1>
        <p className="text-text-muted mt-1">
          Paste your content and choose outputs to generate
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left panel — Input */}
        <div className="space-y-5">
          <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-5">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Your Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your content here..."
              className="w-full h-48 bg-surface rounded-lg border border-white/[0.06] p-4 text-sm text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-white/20 transition-colors"
            />
            <p className="text-xs text-text-muted mt-2 text-right">
              {content.length} / 5,000 characters
            </p>
          </div>

          <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-5">
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Action Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(ACTION_TYPE_LABELS) as ActionType[]).map((ct) => (
                <button
                  key={ct}
                  onClick={() => setActionType(ct)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    actionType === ct
                      ? "bg-white/[0.08] text-white border border-white/20"
                      : "bg-white/[0.03] text-text-secondary border border-white/[0.06] hover:bg-white/[0.06]"
                  }`}
                >
                  {ACTION_TYPE_LABELS[ct]}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-5">
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Tone
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TONE_OPTIONS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={`px-3 py-2.5 rounded-lg text-left transition-all ${
                    tone === t.value
                      ? "bg-white/[0.08] border border-white/20"
                      : "bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]"
                  }`}
                >
                  <p className={`text-sm font-medium ${tone === t.value ? "text-white" : "text-text-secondary"}`}>
                    {t.label}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel — Targets */}
        <div className="space-y-5">
          <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-5">
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Output Targets
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALL_TARGETS.map((t) => {
                const selected = selectedTargets.includes(t);
                const isPro = !FREE_TARGETS.has(t);
                return (
                  <button
                    key={t}
                    onClick={() => toggleTarget(t)}
                    className={`relative flex items-center gap-3 p-4 rounded-xl transition-all ${
                      selected
                        ? "bg-white/[0.08] border border-white/15"
                        : "bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className={`text-sm font-medium ${selected ? "text-white" : "text-text-secondary"}`}>
                      {TARGET_LABELS[t]}
                    </span>
                    {isPro && (
                      <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider text-amber-400/80 bg-amber-400/10 px-1.5 py-0.5 rounded">
                        Pro
                      </span>
                    )}
                    {selected && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white ml-auto">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 px-1">{error}</p>
          )}

          <button
            onClick={handleTransform}
            disabled={loading || !content.trim() || selectedTargets.length === 0}
            className="w-full py-4 rounded-xl bg-gradient-to-r bg-white text-[#080808] font-bold text-base hover:bg-neutral-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
                Run Action
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading skeleton */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {selectedTargets.map((t) => (
              <div
                key={t}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded animate-shimmer" />
                  <div className="h-4 w-24 rounded animate-shimmer" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded animate-shimmer" />
                  <div className="h-3 w-5/6 rounded animate-shimmer" />
                  <div className="h-3 w-4/6 rounded animate-shimmer" />
                  <div className="h-3 w-full rounded animate-shimmer" />
                  <div className="h-3 w-3/5 rounded animate-shimmer" />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {results && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-text-primary">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedTargets.map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <PlatformCard
                    platform={t}
                    label={TARGET_LABELS[t]}
                    content={results[t] ?? ""}
                    onCopy={() => {}}
                    onEdit={() => {}}
                    onFavorite={() => toggleFavorite(t)}
                    isFavorite={favorites.has(t)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
