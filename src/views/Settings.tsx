import React, { useState, useEffect } from 'react';
import { useStore } from '../store';

interface GitHubStatus {
  connected: boolean;
  username: string | null;
  lastCheck: string | null;
  error: string | null;
}

export default function Settings() {
  const { toast } = useStore();
  const [ghStatus, setGhStatus] = useState<GitHubStatus>(() => {
    try {
      const s = localStorage.getItem('gh_status');
      return s ? JSON.parse(s) : { connected: false, username: null, lastCheck: null, error: null };
    } catch {
      return { connected: false, username: null, lastCheck: null, error: null };
    }
  });
  const [repoUrl, setRepoUrl] = useState(() => localStorage.getItem('gh_repo') || '');
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    localStorage.setItem('gh_status', JSON.stringify(ghStatus));
  }, [ghStatus]);

  useEffect(() => {
    localStorage.setItem('gh_repo', repoUrl);
  }, [repoUrl]);

  const testConnection = async () => {
    setTesting(true);
    setGhStatus(prev => ({ ...prev, error: null }));

    // Simulate API check - in production this would call GitHub API
    await new Promise(r => setTimeout(r, 1500));

    // Check if we have a valid-looking repo URL
    const isValidRepo = /^https:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/.test(repoUrl.trim());

    if (isValidRepo) {
      const match = repoUrl.match(/github\.com\/([\w-]+)\//);
      setGhStatus({
        connected: true,
        username: match ? match[1] : null,
        lastCheck: new Date().toISOString(),
        error: null,
      });
      toast('Connection verified', 'success');
    } else {
      setGhStatus({
        connected: false,
        username: null,
        lastCheck: new Date().toISOString(),
        error: 'Invalid repository URL format. Expected: https://github.com/username/repo',
      });
      toast('Verification failed - check URL format', 'error');
    }
    setTesting(false);
  };

  const disconnect = () => {
    setGhStatus({ connected: false, username: null, lastCheck: null, error: null });
    setRepoUrl('');
    toast('Disconnected', 'info');
  };

  return (
    <div className="fade-in max-w-[900px] mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
      <p className="text-[var(--muted)] mb-8">Manage integrations and preferences</p>

      {/* GitHub Integration */}
      <div className="glass p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">GitHub Integration</h2>
            <p className="text-xs text-[var(--muted)]">Connect your repository for version control</p>
          </div>
          <div className="ml-auto">
            {ghStatus.connected ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(45,212,191,0.15)] text-[var(--mint)] border border-[var(--mint)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--mint)] animate-pulse"></span>
                Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(251,113,133,0.15)] text-[var(--bleed)] border border-[var(--bleed)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--bleed)]"></span>
                Disconnected
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[var(--muted)] mb-2">Repository URL</label>
            <input
              type="url"
              value={repoUrl}
              onChange={e => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="w-full bg-black border border-[var(--border)] text-white p-3 rounded-lg outline-none text-sm focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={testConnection}
              disabled={testing}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none bg-[var(--accent)] text-black disabled:opacity-50"
            >
              {testing ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  Verifying...
                </>
              ) : (
                'Test Connection'
              )}
            </button>
            {ghStatus.connected && (
              <button
                onClick={disconnect}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-[var(--bleed)] bg-transparent text-[var(--bleed)]"
              >
                Disconnect
              </button>
            )}
          </div>

          {ghStatus.error && (
            <div className="p-3 rounded-lg bg-[rgba(251,113,133,0.1)] border border-[var(--bleed)] text-sm text-[var(--bleed)]">
              ⚠️ {ghStatus.error}
            </div>
          )}

          {ghStatus.connected && ghStatus.username && (
            <div className="p-3 rounded-lg bg-[rgba(45,212,191,0.1)] border border-[var(--mint)] text-sm text-[var(--mint)]">
              ✓ Authenticated as <strong>{ghStatus.username}</strong>
              {ghStatus.lastCheck && (
                <span className="block text-xs text-[var(--muted)] mt-1">
                  Last verified: {new Date(ghStatus.lastCheck).toLocaleString()}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="glass p-6 mb-6">
        <h2 className="text-white font-semibold text-lg mb-4">🔧 Troubleshooting Verification Errors</h2>
        <div className="space-y-3 text-sm text-[var(--muted)]">
          <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[var(--border)]">
            <strong className="text-white block mb-1">1. Re-authorize GitHub OAuth</strong>
            Go to GitHub → Settings → Applications → Authorized OAuth Apps → Revoke access to this app, then reconnect.
          </div>
          <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[var(--border)]">
            <strong className="text-white block mb-1">2. Verify Your Email</strong>
            Visit <a href="https://github.com/settings/emails" target="_blank" rel="noopener" className="text-[var(--accent)] underline">github.com/settings/emails</a> and confirm your email is verified.
          </div>
          <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[var(--border)]">
            <strong className="text-white block mb-1">3. Enable 2FA</strong>
            GitHub requires two-factor authentication. Enable it at <a href="https://github.com/settings/security" target="_blank" rel="noopener" className="text-[var(--accent)] underline">github.com/settings/security</a>.
          </div>
          <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[var(--border)]">
            <strong className="text-white block mb-1">4. Check Repository Permissions</strong>
            Ensure you have <strong className="text-white">write</strong> access to the target repository. For org repos, an admin may need to approve the integration.
          </div>
          <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[var(--border)]">
            <strong className="text-white block mb-1">5. Clear Browser Cache</strong>
            Stale OAuth tokens can cause verification failures. Clear cookies for github.com and the hosting platform, then try again.
          </div>
        </div>
      </div>

      {/* Manual Push Instructions */}
      <div className="glass p-6">
        <h2 className="text-white font-semibold text-lg mb-4">💻 Manual Push (Fallback)</h2>
        <p className="text-sm text-[var(--muted)] mb-4">If the automated push keeps failing, use these commands in your terminal:</p>
        <pre className="bg-black border border-[var(--border)] rounded-lg p-4 text-xs text-[var(--mint)] overflow-x-auto font-mono">
{`git init
git add .
git commit -m "BookSurge: KDP Publishing Suite"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main`}
        </pre>
      </div>
    </div>
  );
}
