"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Output {
  platform: string;
  body: string;
}

interface HistoryItem {
  id: string;
  createdAt: string;
  body: string;
  type: string;
  outputs: Output[];
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    fetch("/api/history?take=50")
      .then((r) => r.json())
      .then((d) => setItems(d.contents ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">History</h1>
          <p className="text-text-muted mt-1">
            {loading ? "Loading..." : `${items.length} action${items.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="rounded-xl border border-[#2a2a2a] bg-[#111] overflow-hidden"
      >
        <div className="hidden sm:grid grid-cols-[1fr_120px_160px_80px] gap-4 px-5 py-3 border-b border-white/[0.06] text-xs text-text-muted uppercase tracking-wider font-medium">
          <span>Input</span>
          <span>Date</span>
          <span>Targets</span>
          <span className="text-right">Action</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-text-muted text-sm">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-text-muted text-sm">
            No actions yet. <a href="/dashboard/new" className="text-emerald-400 hover:text-emerald-300">Run your first action →</a>
          </div>
        ) : (
          items.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-[1fr_120px_160px_80px] gap-2 sm:gap-4 items-center px-5 py-4 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors"
            >
              <p className="text-sm text-text-primary truncate">
                {item.body.slice(0, 80)}{item.body.length > 80 ? "..." : ""}
              </p>
              <p className="text-xs text-text-muted">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <div className="flex flex-wrap gap-1">
                {item.outputs.map((o) => (
                  <span key={o.platform} className="text-xs px-2 py-0.5 rounded-md bg-white/[0.05] text-text-muted">
                    {o.platform}
                  </span>
                ))}
              </div>
              <div className="text-right">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  View
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/70 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl sm:max-h-[80vh] z-50 rounded-2xl border border-white/[0.06] bg-surface-secondary overflow-y-auto"
            >
              <div className="sticky top-0 flex items-center justify-between p-5 border-b border-white/[0.06] bg-surface-secondary">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">Action Details</h2>
                  <p className="text-xs text-text-muted mt-0.5">
                    {new Date(selectedItem.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5 text-text-muted">
                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-5 space-y-5">
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-2 font-medium">Original Input</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{selectedItem.body}</p>
                </div>

                {selectedItem.outputs.map((o) => (
                  <div key={o.platform}>
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-2 font-medium">{o.platform}</p>
                    <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-4">
                      <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">{o.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
