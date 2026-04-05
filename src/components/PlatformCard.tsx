"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PlatformCardProps {
  platform: string;
  label: string;
  content: string;
  onCopy: () => void;
  onEdit: (newContent: string) => void;
  onFavorite: () => void;
  isFavorite: boolean;
}

export default function PlatformCard({
  label,
  content,
  onCopy,
  onEdit,
  onFavorite,
  isFavorite,
}: PlatformCardProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(content);
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSave() {
    onEdit(editValue);
    setEditing(false);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-text-muted">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </span>
          <h3 className="text-sm font-medium text-text-primary">{label}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onFavorite}
            className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
            title="Favorite"
          >
            <svg
              viewBox="0 0 24 24"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className={`w-4 h-4 ${isFavorite ? "text-amber-400" : "text-text-muted"}`}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
          <button
            onClick={() => {
              if (editing) handleSave();
              else setEditing(true);
            }}
            className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
            title={editing ? "Save" : "Edit"}
          >
            {editing ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-400">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-text-muted">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
            )}
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
            title="Copy"
          >
            {copied ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-400">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-text-muted">
                <rect width="14" height="14" x="8" y="8" rx="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {editing ? (
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="w-full bg-surface rounded-lg border border-white/[0.06] p-3 text-sm text-text-primary resize-none focus:outline-none focus:border-emerald-500/50 min-h-[120px]"
          autoFocus
        />
      ) : (
        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      )}
      {content && (
        <p className="mt-3 text-xs text-text-muted">
          {content.length} characters
        </p>
      )}
    </motion.div>
  );
}
