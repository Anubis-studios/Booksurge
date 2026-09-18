import React, { useRef } from 'react';
import { useStore, Book } from '../store';

export default function Library() {
  const { state, addBook, toast, nav } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const exportBook = (id: number) => {
    const b = state.books.find(x => x.id === id);
    if (!b) return;
    const a = document.createElement('a');
    a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(b));
    a.download = `${b.title.replace(/\s+/g, '_')}.json`;
    a.click();
    toast('Exported', 'success');
  };

  const importFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        addBook({ ...data, id: Date.now() });
        toast('Imported', 'success');
      } catch (err) {
        toast('Invalid file', 'error');
      }
    };
    r.readAsText(f);
  };

  const readBook = (id: number) => {
    const b = state.books.find(x => x.id === id);
    if (!b) return;
    nav('reader');
  };

  return (
    <div className="fade-in max-w-[1000px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">My Library</h1>
        <div className="flex gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-[var(--border)] bg-[rgba(255,255,255,0.05)] text-white"
          >
            Import JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            onChange={importFile}
            className="hidden"
          />
        </div>
      </div>

      {state.books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.books.map(b => (
            <div key={b.id} className="glass p-6 flex flex-col gap-4">
              <div>
                <h3 className="text-white font-semibold">{b.title}</h3>
                <p className="text-xs text-[var(--muted)]">{b.chapters.length} Chapters</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  {new Date(b.created).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => exportBook(b.id)}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer border border-[var(--border)] bg-[rgba(255,255,255,0.05)] text-white"
                >
                  Export
                </button>
                <button
                  onClick={() => readBook(b.id)}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer border-none bg-[var(--accent)] text-black"
                >
                  Read
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-[var(--muted)]">
          <div className="text-4xl mb-4">📚</div>
          <p className="mb-4">No projects yet.</p>
          <button
            onClick={() => nav('forge')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm cursor-pointer border-none bg-[var(--accent)] text-black"
          >
            Create Your First Book
          </button>
        </div>
      )}
    </div>
  );
}
