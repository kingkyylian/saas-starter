"use client";

import { motion } from "framer-motion";

interface CreditBadgeProps {
  used: number;
  limit: number;
  compact?: boolean;
}

export default function CreditBadge({ used, limit, compact }: CreditBadgeProps) {
  const remaining = limit - used;
  const pct = (used / limit) * 100;
  const radius = compact ? 14 : 18;
  const stroke = compact ? 3 : 4;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (pct / 100) * circumference;

  const color =
    pct > 90
      ? "text-red-400"
      : pct > 70
        ? "text-amber-400"
        : "text-emerald-400";

  const strokeColor =
    pct > 90
      ? "#f87171"
      : pct > 70
        ? "#fbbf24"
        : "#34d399";

  const size = compact ? 36 : 48;

  return (
    <div className="flex items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center font-mono font-bold ${color} ${compact ? "text-[10px]" : "text-xs"}`}
        >
          {remaining}
        </span>
      </div>
      {!compact && (
        <div className="text-xs">
          <p className="text-text-secondary">Credits</p>
          <p className="text-text-muted">
            {used}/{limit} used
          </p>
        </div>
      )}
    </div>
  );
}
