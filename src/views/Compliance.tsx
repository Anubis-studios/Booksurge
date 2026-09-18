import React from 'react';

export default function Compliance() {
  return (
    <div className="fade-in max-w-[1200px] mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">KDP Compliance Engine</h1>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        {/* Specs panel */}
        <div className="glass p-6 h-fit">
          <h3 className="text-white font-semibold mb-4">Print Specs</h3>
          <div className="mb-4">
            <div className="text-xs text-[var(--muted)]">TRIM SIZE</div>
            <div className="text-white font-mono">6.00 x 9.00 in</div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-[var(--bleed)]">BLEED (+0.125")</div>
            <div className="text-white font-mono">6.25 x 9.25 in</div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-[var(--safe)]">SAFE ZONE (-0.5")</div>
            <div className="text-white font-mono">5.00 x 8.00 in</div>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--border)]">
            <h4 className="text-sm text-[var(--muted)] font-semibold mb-3">Guidelines</h4>
            <ul className="text-xs text-[var(--muted)] space-y-2">
              <li>• All text must be within safe zone</li>
              <li>• Backgrounds must extend to bleed edge</li>
              <li>• Minimum 300 DPI for images</li>
              <li>• PDF/X-1a format recommended</li>
              <li>• Spine width: 0.0025" per page</li>
            </ul>
          </div>
        </div>

        {/* Visual preview */}
        <div className="bg-[#27272a] rounded-xl p-8 overflow-auto flex justify-center items-center min-h-[500px]">
          <div className="relative bg-white shadow-2xl" style={{ width: '240px', height: '360px' }}>
            {/* Bleed zone */}
            <div className="absolute inset-0 border-2 border-dashed border-[var(--bleed)] pointer-events-none" />
            {/* Safe zone */}
            <div className="absolute border border-dashed border-[var(--safe)] pointer-events-none" style={{ top: 20, left: 20, right: 20, bottom: 20 }} />
            
            {/* Content */}
            <div className="p-8 text-[#333] font-serif text-xs">
              <h2 className="mb-3 text-base font-bold text-black">Sample Content</h2>
              <p className="mb-2">This text is safely within the margins. It will not be cut off by the printer.</p>
              <p className="mb-2 text-[#666]">The bleed area (red dashed) extends beyond the trim line. Background colors and images should fill this area.</p>
              <p className="text-[#666]">The safe zone (blue dashed) ensures critical content stays away from edges.</p>
            </div>

            {/* Labels */}
            <div className="absolute top-1 left-1 text-[8px] text-[var(--bleed)] font-mono">BLEED</div>
            <div className="absolute top-5 left-5 text-[8px] text-[var(--safe)] font-mono">SAFE</div>
          </div>
        </div>
      </div>

      {/* Additional info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <div className="glass p-5">
          <div className="text-lg mb-2">📐</div>
          <h4 className="text-white font-semibold mb-1">Interior Margins</h4>
          <p className="text-xs text-[var(--muted)]">Top: 0.75" | Bottom: 0.75" | Outside: 0.5" | Inside (gutter): 0.75"–1.0"</p>
        </div>
        <div className="glass p-5">
          <div className="text-lg mb-2">📖</div>
          <h4 className="text-white font-semibold mb-1">Page Count</h4>
          <p className="text-xs text-[var(--muted)]">Minimum 24 pages for paperback. Must be divisible by 2 (even number of pages).</p>
        </div>
        <div className="glass p-5">
          <div className="text-lg mb-2">🎨</div>
          <h4 className="text-white font-semibold mb-1">Cover Template</h4>
          <p className="text-xs text-[var(--muted)]">Use KDP Cover Calculator for exact spine width based on page count and paper type.</p>
        </div>
      </div>
    </div>
  );
}
