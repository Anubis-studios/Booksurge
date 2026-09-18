import React, { useState, useRef } from 'react';
import { useStore } from '../store';

const STAGES = ['Concept', 'Bible', 'Outline', 'Drafting', 'Editing', 'QC', 'Metadata', 'Complete'];

export default function Forge() {
  const { addBook, toast, nav } = useStore();
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState(-1);
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [structureLog, setStructureLog] = useState('');
  const [manuscriptHtml, setManuscriptHtml] = useState('');
  const structureRef = useRef<HTMLDivElement>(null);
  const manuscriptRef = useRef<HTMLDivElement>(null);

  const [topic, setTopic] = useState('ARK Survival Ascended: The Island - Single Survivor Narrative');
  const [audience, setAudience] = useState('Fans of ARK, LitRPG readers');
  const [genre, setGenre] = useState('Sci-Fi Survival Narrative');
  const [tone, setTone] = useState('Gritty & Atmospheric');
  const [count, setCount] = useState(8);

  const appendStructure = (text: string) => {
    setStructureLog(prev => prev + text + '\n\n');
    setTimeout(() => { if (structureRef.current) structureRef.current.scrollTop = structureRef.current.scrollHeight; }, 50);
  };

  const appendManuscript = (html: string) => {
    setManuscriptHtml(prev => prev + html);
    setTimeout(() => { if (manuscriptRef.current) manuscriptRef.current.scrollTop = manuscriptRef.current.scrollHeight; }, 50);
  };

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const startForge = async () => {
    if (!topic) { toast('Topic required', 'error'); return; }
    setRunning(true);
    setStage(0);
    setPercent(0);
    setStructureLog('');
    setManuscriptHtml('');

    try {
      // Stage 0: Concept
      setStatusText('Generating Concept...');
      await sleep(800);
      const title = "Echoes of the Obelisk";
      appendStructure(`TITLE: ${title}\nPREMISE: A visceral account of waking up on the Island.`);
      setStage(1); setPercent(10);

      // Stage 1: Bible
      setStatusText('Building Story Bible...');
      await sleep(800);
      appendStructure(`BIBLE:\nProtagonist: The Survivor\nSetting: The Island (ARK)\nTone: Gritty, Atmospheric\nThemes: Survival, Identity, Transhumanism`);
      setStage(2); setPercent(20);

      // Stage 2: Outline
      setStatusText('Architecting Outline...');
      await sleep(800);
      const arc = ["The Beep", "Stone and Skin", "The First Night", "Taming the Beast", "The Metal Peak", "Tek Dreams", "The Boss", "Ascension"];
      appendStructure(`OUTLINE:\n${arc.slice(0, count).map((t, i) => `${i + 1}. ${t}`).join('\n')}`);
      setStage(3); setPercent(30);

      // Stage 3: Drafting
      setStatusText('Writing Manuscript...');
      let mem = '';
      for (let i = 0; i < count; i++) {
        setStatusText(`Writing Chapter ${i + 1} of ${count}...`);
        appendManuscript(`<div style="color:var(--muted);font-style:italic;margin:1rem 0;">Writing Chapter ${i + 1}...</div>`);
        await sleep(600);

        // Remove the "writing..." placeholder
        setManuscriptHtml(prev => prev.replace(`<div style="color:var(--muted);font-style:italic;margin:1rem 0;">Writing Chapter ${i + 1}...</div>`, ''));

        const txt = i === 0
          ? `<p>The first thing I heard was the beep. It wasn't a sound from the outside world; it was inside my skull, a rhythmic, digital pulse that synced with the throbbing behind my eyes. <em>Beep. Beep. Beep.</em></p><p>I gasped, sucking in air that tasted of salt and ozone. My eyes snapped open, blinded by a sun that felt too close, too hot. Sand. Coarse, white sand ground against my cheek. I pushed myself up, my arms trembling. I was naked. Completely, utterly naked, save for a strange piece of cloth wrapped around my waist and a metallic device clamped onto my forearm.</p><p>I looked at the implant. The screen flickered with green text: <strong>SURVIVOR PROFILE INITIALIZED</strong>.</p><p>"Where am I?" I croaked. My voice sounded foreign, unused. The only answer was the crash of waves against the shore and the distant, guttural roar of something that sounded like a dinosaur—but larger. Angrier.</p>`
          : `<p>The memory of ${mem || 'the struggle'} haunted me as I trudged through the redwoods. The air here was thinner, colder. My breath misted in front of me, a stark contrast to the humid hell of the beaches where I had begun this nightmare.</p><p>I checked my implant. <strong>LEVEL ${40 + i}</strong>. The numbers went up, but did I? Every time I died—and I had died so many times—I left a piece of myself behind on the cold stone floor of some cave.</p><p>A shadow passed overhead. I froze, pressing my back against the rough bark of a sequoia. The wind from the wings hit me a second later—a massive Argentavis, its talons the size of dinner plates, scanning the forest floor. If it saw me, I was dead. Again.</p>`;

        appendManuscript(`<h2>Chapter ${i + 1}: ${arc[i % arc.length]}</h2>${txt}`);
        mem = `Chapter ${i + 1} events`;
        setPercent(30 + Math.round(((i + 1) / count) * 50));
      }
      setStage(4);

      // Stage 4: Editing
      setStatusText('Editorial Pass...');
      await sleep(800);
      setStage(5); setPercent(85);

      // Stage 5: QC
      setStatusText('Quality Control...');
      await sleep(800);
      setStage(6); setPercent(90);

      // Stage 6: Metadata
      setStatusText('Metadata...');
      await sleep(800);
      setStage(7); setPercent(95);

      // Stage 7: Complete
      setStatusText('Finalizing...');
      const titleFinal = "Echoes of the Obelisk";
      addBook({
        id: Date.now(),
        title: titleFinal,
        chapters: Array.from({ length: count }, (_, i) => ({
          title: `Ch ${i + 1}: ${arc[i % arc.length]}`,
          content: ''
        })),
        created: new Date().toISOString()
      });
      setPercent(100);
      setStage(8);
      toast('Story Complete!', 'success');
      setTimeout(() => nav('library'), 2000);
    } catch (e: any) {
      toast('Error: ' + e.message, 'error');
    }
  };

  if (!running) {
    return (
      <div className="fade-in max-w-[1000px] mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">AI Narrative Forge</h1>
          <p className="text-[var(--muted)] mt-1">Crafting immersive stories. Focus on character, plot, and atmosphere.</p>
        </div>
        <div className="glass p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-[var(--muted)] mb-2">Story Premise</label>
              <input type="text" value={topic} onChange={e => setTopic(e.target.value)} className="w-full bg-black border border-[var(--border)] text-white p-3 rounded-lg outline-none text-sm focus:border-[var(--accent)]" />
            </div>
            <div>
              <label className="block text-sm text-[var(--muted)] mb-2">Target Audience</label>
              <input type="text" value={audience} onChange={e => setAudience(e.target.value)} className="w-full bg-black border border-[var(--border)] text-white p-3 rounded-lg outline-none text-sm focus:border-[var(--accent)]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm text-[var(--muted)] mb-2">Genre</label>
              <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full bg-black border border-[var(--border)] text-white p-3 rounded-lg outline-none text-sm focus:border-[var(--accent)]">
                <option>Sci-Fi Survival Narrative</option>
                <option>LitRPG Adventure</option>
                <option>Dark Fantasy</option>
                <option>Thriller / Suspense</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--muted)] mb-2">Tone</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-black border border-[var(--border)] text-white p-3 rounded-lg outline-none text-sm focus:border-[var(--accent)]">
                <option>Gritty & Atmospheric</option>
                <option>Dark & Horror</option>
                <option>Hopeful & Uplifting</option>
                <option>Mysterious & Enigmatic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--muted)] mb-2">Chapters</label>
              <input type="number" value={count} onChange={e => setCount(parseInt(e.target.value) || 5)} min={5} max={100} className="w-full bg-black border border-[var(--border)] text-white p-3 rounded-lg outline-none text-sm focus:border-[var(--accent)]" />
            </div>
          </div>
          <button onClick={startForge} className="w-full h-12 rounded-lg font-semibold text-base cursor-pointer border-none bg-[var(--volt)] text-black">
            Begin Storytelling Pipeline
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in max-w-[1000px] mx-auto flex flex-col gap-4 h-full">
      <div className="glass p-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl text-white font-bold">{statusText}</h2>
          <p className="text-sm text-[var(--volt)]">Stage {Math.min(stage + 1, STAGES.length)}: {STAGES[Math.min(stage, STAGES.length - 1)]}</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-[var(--muted)]">PROGRESS</div>
          <div className="text-xl font-bold text-white font-mono">{percent}%</div>
        </div>
      </div>

      <div className="glass p-4 grid grid-cols-4 sm:grid-cols-8 gap-2">
        {STAGES.map((s, i) => (
          <div
            key={i}
            className={`p-2 rounded-md text-center text-xs border transition-all ${
              i === stage
                ? 'bg-[rgba(250,204,21,0.1)] text-[var(--accent)] border-[var(--accent)]'
                : i < stage
                ? 'bg-[rgba(163,230,53,0.1)] text-[var(--volt)] border-[var(--volt)]'
                : 'bg-[#27272a] text-[#555] border-transparent'
            }`}
          >
            {s}{i < stage ? ' ✓' : ''}
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[300px]">
        <div className="glass p-6 overflow-y-auto">
          <h3 className="text-sm text-[var(--muted)] uppercase mb-4 border-b border-[var(--border)] pb-2">Story Bible & Structure</h3>
          <div ref={structureRef} className="text-sm text-[#d4d4d8] whitespace-pre-wrap">{structureLog || 'Waiting...'}</div>
        </div>
        <div className="glass p-6 overflow-y-auto bg-[#0f0f11]">
          <h3 className="text-sm text-[var(--muted)] uppercase mb-4 border-b border-[var(--border)] pb-2">Manuscript Stream</h3>
          <div ref={manuscriptRef} className="prose-content" dangerouslySetInnerHTML={{ __html: manuscriptHtml }} />
        </div>
      </div>
    </div>
  );
}
