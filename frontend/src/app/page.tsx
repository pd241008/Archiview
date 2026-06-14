import Link from 'next/link';
import { ArrowRight, Sparkles, FileCode, Printer, Palette } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-hidden relative selection:bg-cyan-500/30">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-fuchsia-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent rotate-[-15deg]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent rotate-[15deg]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-xl flex items-center justify-center text-[#020617] font-bold shadow-[0_0_20px_rgba(0,255,255,0.4)]">
            A
          </div>
          <span className="text-xl font-bold tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">ARCHIVIEW</span>
        </div>
        <Link 
          href="/editor"
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          Open Editor
        </Link>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-semibold tracking-widest text-cyan-400 uppercase border rounded-full border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
          <Sparkles size={14} /> The Celestial Eye Release
        </div>
        
        <h1 className="max-w-4xl mb-6 text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          Documents That <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-500 drop-shadow-[0_0_20px_rgba(217,70,239,0.5)]">
            Demand Attention
          </span>
        </h1>
        
        <p className="max-w-2xl mb-12 text-lg text-slate-400 sm:text-xl">
          A premium markdown editor that transforms plain text into stunning, vibrant, print-ready reports with one click.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link 
            href="/editor"
            className="flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-[#020617] bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all shadow-[0_0_30px_rgba(0,255,255,0.5)] hover:shadow-[0_0_40px_rgba(0,255,255,0.7)] hover:scale-105"
          >
            Start Writing <ArrowRight size={18} />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid max-w-5xl grid-cols-1 gap-8 mt-32 sm:grid-cols-3 text-left">
          <div className="p-8 border rounded-2xl border-white/5 bg-white/5 backdrop-blur-sm hover:border-cyan-500/50 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 mb-6 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-shadow">
              <FileCode size={24} />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Live Markdown</h3>
            <p className="text-slate-400 text-sm leading-relaxed">A clean, distraction-free editing environment with real-time rendering of GitHub Flavored Markdown and Mermaid diagrams.</p>
          </div>

          <div className="p-8 border rounded-2xl border-white/5 bg-white/5 backdrop-blur-sm hover:border-fuchsia-500/50 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 mb-6 rounded-xl bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 group-hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-shadow">
              <Palette size={24} />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Dynamic Palettes</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Bored of plain text? Randomize between carefully curated cyberpunk and neon color palettes to make your exports pop.</p>
          </div>

          <div className="p-8 border rounded-2xl border-white/5 bg-white/5 backdrop-blur-sm hover:border-purple-500/50 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 mb-6 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-shadow">
              <Printer size={24} />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Stunning Exports</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Export directly to HTML or PDF with incredibly vibrant layouts, dark modes, and glowing typography automatically applied.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
