import React, { useState, useRef, useCallback, useEffect } from 'react';

interface CanvasElement {
  id: number;
  type: 'text' | 'shape';
  x: number;
  y: number;
  text: string;
  w: number;
  h: number;
  bg: string;
  col: string;
  fontSize?: number;
}

export default function Studio() {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const addElement = (type: 'text' | 'shape') => {
    const id = Date.now();
    const newEl: CanvasElement = {
      id,
      type,
      x: 50 + Math.random() * 100,
      y: 50 + Math.random() * 100,
      text: type === 'text' ? 'Double click to edit' : '',
      w: type === 'shape' ? 100 : 150,
      h: type === 'shape' ? 100 : 40,
      bg: type === 'shape' ? 'var(--accent)' : 'transparent',
      col: type === 'text' ? '#000' : 'transparent',
      fontSize: 16,
    };
    setElements(prev => [...prev, newEl]);
    setSelected(id);
  };

  const updateElement = (id: number, updates: Partial<CanvasElement>) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const deleteElement = (id: number) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelected(null);
  };

  const handleMouseDown = (e: React.MouseEvent, el: CanvasElement) => {
    e.stopPropagation();
    setSelected(el.id);
    setDragging(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({ x: e.clientX - rect.left - el.x, y: e.clientY - rect.top - el.y });
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging || selected === null) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, e.clientX - rect.left - dragOffset.x);
    const y = Math.max(0, e.clientY - rect.top - dragOffset.y);
    setElements(prev => prev.map(el => el.id === selected ? { ...el, x, y } : el));
  }, [dragging, selected, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleDoubleClick = (el: CanvasElement) => {
    if (el.type === 'text') {
      const t = prompt('Edit text:', el.text);
      if (t !== null) updateElement(el.id, { text: t });
    }
  };

  const selectedEl = elements.find(el => el.id === selected);

  return (
    <div className="fade-in h-full flex flex-col max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Design Studio</h1>
        <div className="flex gap-2">
          <button onClick={() => addElement('text')} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-[var(--border)] bg-[rgba(255,255,255,0.05)] text-white">
            Add Text
          </button>
          <button onClick={() => addElement('shape')} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-[var(--border)] bg-[rgba(255,255,255,0.05)] text-white">
            Add Shape
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Properties panel */}
        <div className="glass w-[250px] p-4 overflow-y-auto shrink-0 hidden md:block">
          <h3 className="text-sm text-[var(--muted)] mb-4">Properties</h3>
          {selectedEl ? (
            <div className="text-sm text-[var(--muted)] space-y-4">
              <div>
                <label className="block mb-2">X</label>
                <input
                  type="number"
                  value={Math.round(selectedEl.x)}
                  onChange={e => updateElement(selectedEl.id, { x: parseInt(e.target.value) || 0 })}
                  className="w-full bg-black border border-[var(--border)] text-white p-2 rounded-lg outline-none text-sm focus:border-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block mb-2">Y</label>
                <input
                  type="number"
                  value={Math.round(selectedEl.y)}
                  onChange={e => updateElement(selectedEl.id, { y: parseInt(e.target.value) || 0 })}
                  className="w-full bg-black border border-[var(--border)] text-white p-2 rounded-lg outline-none text-sm focus:border-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block mb-2">Width</label>
                <input
                  type="number"
                  value={selectedEl.w}
                  onChange={e => updateElement(selectedEl.id, { w: parseInt(e.target.value) || 20 })}
                  className="w-full bg-black border border-[var(--border)] text-white p-2 rounded-lg outline-none text-sm focus:border-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block mb-2">Height</label>
                <input
                  type="number"
                  value={selectedEl.h}
                  onChange={e => updateElement(selectedEl.id, { h: parseInt(e.target.value) || 20 })}
                  className="w-full bg-black border border-[var(--border)] text-white p-2 rounded-lg outline-none text-sm focus:border-[var(--accent)]"
                />
              </div>
              {selectedEl.type === 'shape' && (
                <div>
                  <label className="block mb-2">Background</label>
                  <input
                    type="color"
                    value={selectedEl.bg.startsWith('var') ? '#facc15' : selectedEl.bg}
                    onChange={e => updateElement(selectedEl.id, { bg: e.target.value })}
                    className="w-full h-10 rounded-lg cursor-pointer border border-[var(--border)]"
                  />
                </div>
              )}
              {selectedEl.type === 'text' && (
                <div>
                  <label className="block mb-2">Text</label>
                  <input
                    type="text"
                    value={selectedEl.text}
                    onChange={e => updateElement(selectedEl.id, { text: e.target.value })}
                    className="w-full bg-black border border-[var(--border)] text-white p-2 rounded-lg outline-none text-sm focus:border-[var(--accent)]"
                  />
                </div>
              )}
              <button
                onClick={() => deleteElement(selectedEl.id)}
                className="w-full py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-[var(--bleed)] bg-transparent text-[var(--bleed)] hover:bg-[rgba(251,113,133,0.1)]"
              >
                Delete
              </button>
            </div>
          ) : (
            <p className="text-sm text-[var(--muted)]">Select an element to edit.</p>
          )}
        </div>

        {/* Canvas area */}
        <div className="flex-1 bg-[#27272a] rounded-xl overflow-auto flex justify-center items-center p-8">
          <div
            ref={canvasRef}
            id="design-canvas"
            className="relative bg-white overflow-hidden cursor-crosshair"
            style={{ width: '600px', height: '900px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
            onClick={() => setSelected(null)}
          >
            {/* Safe zone guide */}
            <div className="absolute pointer-events-none opacity-50 border border-dashed border-[var(--safe)]" style={{ top: 50, left: 50, right: 50, bottom: 50, zIndex: 0 }} />

            {/* Canvas elements */}
            {elements.map(el => (
              <div
                key={el.id}
                className={`canvas-el ${selected === el.id ? 'selected' : ''}`}
                style={{
                  left: el.x,
                  top: el.y,
                  width: el.w,
                  height: el.h,
                  background: el.bg,
                  color: el.col,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: el.fontSize || 16,
                  fontWeight: 'bold',
                }}
                onMouseDown={e => handleMouseDown(e, el)}
                onDoubleClick={() => handleDoubleClick(el)}
              >
                {el.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
