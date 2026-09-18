import React, { useState } from 'react';
import { useStore } from '../store';

export default function Login() {
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && pass) login(email, pass);
  };

  return (
    <div className="fade-in max-w-[400px] mx-auto mt-16 px-4">
      <div className="glass p-8 text-center">
        <div className="text-3xl mb-4">⚡</div>
        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-[var(--muted)] text-sm mb-8">Sign in to your workspace</p>
        <form onSubmit={handleSubmit} className="text-left flex flex-col gap-4">
          <div>
            <label className="block text-xs text-[var(--muted)] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-black border border-[var(--border)] text-white p-3 rounded-lg outline-none font-[inherit] text-sm focus:border-[var(--accent)]"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--muted)] mb-2">Password</label>
            <input
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              className="w-full bg-black border border-[var(--border)] text-white p-3 rounded-lg outline-none font-[inherit] text-sm focus:border-[var(--accent)]"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="mt-4 w-full h-12 rounded-lg font-semibold text-sm cursor-pointer border-none bg-[var(--accent)] text-black">
            Sign In
          </button>
        </form>
        <p className="mt-6 text-[0.7rem] text-[#555]">Email confirmation disabled for instant access.</p>
      </div>
    </div>
  );
}
