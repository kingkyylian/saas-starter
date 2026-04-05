"use client";

import Sidebar from "@/components/Sidebar";
import CreditBadge from "@/components/CreditBadge";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />

      {/* Top bar */}
      <header className="lg:pl-64 fixed top-0 right-0 left-0 z-30 h-16 border-b border-white/[0.06] bg-surface/80 backdrop-blur-xl">
        <div className="flex items-center justify-end h-full px-6 gap-4">
          <div className="lg:hidden" />
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <CreditBadge used={3} limit={5} compact />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-text-primary">John Doe</p>
                <p className="text-xs text-text-muted">Free Plan</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-sm font-bold text-white">
                J
              </div>
              <button className="p-2 rounded-lg hover:bg-white/[0.04] transition-colors" title="Logout">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-text-muted">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="lg:pl-64 pt-16">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
