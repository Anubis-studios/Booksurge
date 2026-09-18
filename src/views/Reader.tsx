import React from 'react';
import { useStore } from '../store';

export default function Reader() {
  const { state, nav } = useStore();
  const book = state.books[0]; // Read the most recent book

  if (!book) {
    return (
      <div className="fade-in max-w-[800px] mx-auto text-center py-16">
        <p className="text-[var(--muted)] mb-4">No book to read.</p>
        <button onClick={() => nav('library')} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-[var(--border)] bg-[rgba(255,255,255,0.05)] text-white">
          Back to Library
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in max-w-[800px] mx-auto">
      <button
        onClick={() => nav('library')}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-[var(--border)] bg-[rgba(255,255,255,0.05)] text-white mb-8"
      >
        ← Back to Library
      </button>
      <div className="glass p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl text-white mb-8 font-serif">{book.title}</h1>
        <div className="prose-content">
          <p className="text-center text-[var(--muted)] italic mb-8">— A BookSurge Generated Manuscript —</p>
          {book.chapters.map((ch, i) => (
            <div key={i} className="mb-8">
              <h2>{ch.title}</h2>
              <p>
                {i === 0
                  ? "The first thing I heard was the beep. It wasn't a sound from the outside world; it was inside my skull, a rhythmic, digital pulse that synced with the throbbing behind my eyes. Beep. Beep. Beep."
                  : `The memory of the previous chapter haunted me as I continued forward. The air here was different—thinner, colder, carrying the weight of something ancient and unknowable.`}
              </p>
              <p>
                I checked my implant. The numbers flickered in my peripheral vision, a constant reminder that I was no longer entirely human. The transformation had begun the moment I woke on that beach, and with each passing day, the line between flesh and machine grew thinner.
              </p>
              <p>
                The world around me was both beautiful and terrifying. Colossal creatures roamed the landscape—remnants of a time when the earth belonged to giants. I was a speck in comparison, a fragile thing clinging to survival in a world that wanted me dead.
              </p>
              <p>
                But I had something they didn't: the ability to learn, to adapt, to grow. Every death taught me something. Every failure carved new pathways in my mind. I was becoming something more—not just a survivor, but a master of this impossible world.
              </p>
            </div>
          ))}
          <div className="text-center mt-12 pt-8 border-t border-[var(--border)]">
            <p className="text-[var(--muted)] italic">— End of Manuscript —</p>
          </div>
        </div>
      </div>
    </div>
  );
}
