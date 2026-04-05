"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CreditBadge from "@/components/CreditBadge";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface Props {
  userName: string;
  plan: string;
  creditsUsed: number;
  creditsLimit: number;
  creditsRemaining: number;
  totalActions: number;
  history: { id: string; date: string; inputPreview: string; targets: string[] }[];
}

export default function DashboardClient({
  userName,
  plan,
  creditsUsed,
  creditsLimit,
  creditsRemaining,
  totalActions,
  history,
}: Props) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-muted mt-1">Welcome back, {userName}</p>
        </div>
        <Link
          href="/dashboard/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#080808] font-semibold text-sm hover:bg-neutral-200 transition-all"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          New Action
        </Link>
      </motion.div>

      {/* Upgrade banner — only on free plan */}
      {plan === "free" && creditsRemaining <= 2 && (
        <motion.div
          variants={fadeUp}
          className="rounded-xl border border-[#2a2a2a] bg-[#141414] p-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#222] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-neutral-300">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                You have {creditsRemaining} credit{creditsRemaining !== 1 ? "s" : ""} remaining this month
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                Upgrade to Pro for 100 credits/month and all targets
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/settings"
            className="shrink-0 px-4 py-2 rounded-lg bg-white text-[#080808] text-sm font-medium hover:bg-neutral-200 transition-colors"
          >
            Upgrade
          </Link>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-5">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-3">Credits Remaining</p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-text-primary">{creditsRemaining}</span>
            <CreditBadge used={creditsUsed} limit={creditsLimit} compact />
          </div>
          <p className="text-xs text-text-muted mt-2">of {creditsLimit} monthly credits</p>
        </div>

        <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-5">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-3">Actions This Month</p>
          <span className="text-3xl font-bold text-text-primary">{totalActions}</span>
          <p className="text-xs text-text-muted mt-2">total actions run</p>
        </div>

        <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-5">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-3">Current Plan</p>
          <span className="text-3xl font-bold text-text-primary capitalize">{plan}</span>
          <p className="text-xs text-text-muted mt-2">
            {plan === "free" ? "Upgrade for more credits" : "All features unlocked"}
          </p>
        </div>
      </motion.div>

      {/* Recent actions */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Recent Actions</h2>
          <Link href="/dashboard/history" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
            View all
          </Link>
        </div>

        {history.length === 0 ? (
          <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-12 text-center">
            <p className="text-text-muted text-sm">No actions yet.</p>
            <Link href="/dashboard/new" className="mt-3 inline-block text-sm text-neutral-400 hover:text-white transition-colors">
              Run your first action →
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-[#2a2a2a] bg-[#111] overflow-hidden">
            {history.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors ${
                  i !== history.length - 1 ? "border-b border-white/[0.04]" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary truncate pr-4">{item.inputPreview}</p>
                  <p className="text-xs text-text-muted mt-1">{item.date}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs text-text-muted">{item.targets.join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
