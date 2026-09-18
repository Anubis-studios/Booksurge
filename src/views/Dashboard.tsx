import React from 'react';
import { useStore } from '../store';

export default function Dashboard() {
  const { state, nav } = useStore();
  const d = state;

  return (
    <div className="fade-in max-w-[1000px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-[var(--muted)] mt-1">Welcome back, {d.user.name}.</p>
        </div>
        <button
          onClick={() => nav('forge')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none bg-[var(--volt)] text-black"
        >
          New Project
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="glass p-6 border-l-4 border-l-[var(--accent)]">
          <div className="text-xs text-[var(--muted)] font-bold uppercase">AI Credits</div>
          <div className="text-3xl font-bold text-white mt-2">{d.user.credits}</div>
        </div>
        <div className="glass p-6 border-l-4 border-l-[var(--volt)]">
          <div className="text-xs text-[var(--muted)] font-bold uppercase">Projects</div>
          <div className="text-3xl font-bold text-white mt-2">{d.books.length}</div>
        </div>
        <div className="glass p-6 border-l-4 border-l-[var(--mint)]">
          <div className="text-xs text-[var(--muted)] font-bold uppercase">Status</div>
          <div className="text-3xl font-bold text-white mt-2">Active</div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass p-6">
          <h3 className="text-white font-semibold mb-2">🚀 Quick Start</h3>
          <p className="text-sm text-[var(--muted)] mb-4">Generate a complete book manuscript with AI-powered narrative engine.</p>
          <button onClick={() => nav('forge')} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer border-none bg-[var(--accent)] text-black">
            Open Forge
          </button>
        </div>
        <div className="glass p-6">
          <h3 className="text-white font-semibold mb-2">📐 Design Covers</h3>
          <p className="text-sm text-[var(--muted)] mb-4">Use the Design Studio to create KDP-compliant book covers with bleed guides.</p>
          <button onClick={() => nav('studio')} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer border border-[var(--border)] bg-[rgba(255,255,255,0.05)] text-white">
            Open Studio
          </button>
        </div>
      </div>
    </div>
  );
}
