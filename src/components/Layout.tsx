import React from 'react';
import { useStore } from '../store';

// Icons as inline SVGs
export const Icons = {
  home: <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M216,216H160V160a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H40V115.37L128,38.69l88,76.68Z"/></svg>,
  brain: <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M200,104a32,32,0,0,0-24-31,32,32,0,0,0-48-25,32,32,0,0,0-48,25,32,32,0,0,0-24,31,32,32,0,0,0,8,62.87V200a8,8,0,0,0,8,8h40a8,8,0,0,0,8-8V168h16v32a8,8,0,0,0,8,8h40a8,8,0,0,0,8-8V166.87A32,32,0,0,0,200,104Z"/></svg>,
  paint: <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M232,120H176V64a8,8,0,0,0-8-8H136a8,8,0,0,0-8,8v56H72a8,8,0,0,0-8,8v32a8,8,0,0,0,8,8h56v56a8,8,0,0,0,8,8h32a8,8,0,0,0,8-8V168h56a8,8,0,0,0,8-8V128A8,8,0,0,0,232,120Z"/></svg>,
  check: <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/></svg>,
  books: <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M208,32H160V24a8,8,0,0,0-16,0v8H96V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Z"/></svg>,
};

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Icons.home },
  { id: 'forge', label: 'AI Book Forge', icon: Icons.brain, color: 'var(--volt)' },
  { id: 'studio', label: 'Design Studio', icon: Icons.paint },
  { id: 'compliance', label: 'KDP Compliance', icon: Icons.check },
  { id: 'library', label: 'My Library', icon: Icons.books },
];

export function Header() {
  const { state, nav, logout } = useStore();
  const u = state.user;

  return (
    <header className="h-14 shrink-0 bg-[rgba(9,9,11,0.95)] border-b border-[var(--border)] flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-[var(--accent)] rounded-md flex items-center justify-center text-black font-bold text-sm">⚡</div>
        <span className="font-bold text-lg text-white">Book<span className="text-[var(--accent)]">Surge</span></span>
      </div>
      <div className="flex gap-3 items-center">
        <div className="text-xs text-[var(--muted)] flex items-center gap-2">
          {u.loggedIn ? (
            <>
              <span>{u.name}</span>
              <button onClick={logout} className="bg-transparent border-none text-[var(--muted)] cursor-pointer hover:text-white">Logout</button>
            </>
          ) : (
            <button onClick={() => nav('login')} className="inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-semibold cursor-pointer border border-[var(--border)] bg-[rgba(255,255,255,0.05)] text-white">Login</button>
          )}
        </div>
        <div className="text-[0.7rem] text-[var(--muted)] border border-[var(--border)] px-1.5 py-0.5 rounded">v6.0</div>
      </div>
    </header>
  );
}

export function Sidebar() {
  const { state, nav } = useStore();
  const view = state.currentView;

  return (
    <aside className="hidden md:flex w-[260px] bg-[var(--bg)] border-r border-[var(--border)] flex-col shrink-0 z-40">
      <div className="p-4 flex flex-col gap-1">
        {NAV_ITEMS.map(n => (
          <button
            key={n.id}
            onClick={() => nav(n.id)}
            className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium cursor-pointer w-full border-none bg-transparent text-left transition-colors ${
              view === n.id
                ? 'bg-[rgba(250,204,21,0.1)] text-[var(--accent)] border-l-2 border-[var(--accent)]'
                : 'text-[var(--muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white'
            }`}
            style={view !== n.id && n.color ? { color: n.color } : {}}
          >
            {n.icon} {n.label}
          </button>
        ))}
      </div>
    </aside>
  );
}

export function MobileNav() {
  const { state, nav } = useStore();
  const view = state.currentView;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[rgba(9,9,11,0.95)] border-t border-[var(--border)] flex justify-around items-center pb-[env(safe-area-inset-bottom)] z-50 md:hidden">
      {NAV_ITEMS.map(n => (
        <button
          key={n.id}
          onClick={() => nav(n.id)}
          className={`flex flex-col items-center gap-1 bg-transparent border-none text-[10px] cursor-pointer flex-1 ${
            view === n.id ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
          }`}
        >
          {n.icon}
          <span>{n.label.split(' ')[0]}</span>
        </button>
      ))}
    </nav>
  );
}

export function Toasts() {
  const { toasts } = useStore();

  return (
    <div className="fixed top-[70px] right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => {
        const col = t.type === 'error' ? 'var(--bleed)' : t.type === 'success' ? 'var(--mint)' : 'var(--accent)';
        return (
          <div
            key={t.id}
            className="fade-in bg-[#18181b] border text-white py-3 px-4 rounded-lg text-sm shadow-lg flex items-center gap-2 pointer-events-auto"
            style={{ borderColor: col }}
          >
            <span style={{ color: col }}>●</span> {t.message}
          </div>
        );
      })}
    </div>
  );
}
