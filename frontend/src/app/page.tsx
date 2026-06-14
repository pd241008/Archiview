import Link from 'next/link';
import { ArrowRight, Sparkles, FileCode, Printer, Palette, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-indigo-500/30 font-sans relative overflow-x-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-[#050505] font-bold text-lg">A</span>
          </div>
          <span className="font-semibold tracking-tight text-white">Archiview</span>
        </div>
        <Link 
          href="/editor"
          className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Sign In
        </Link>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-24 pb-24 text-center mx-auto max-w-7xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-10 text-sm font-medium border rounded-full text-slate-300 bg-white/5 border-white/10 backdrop-blur-md">
          <Sparkles size={14} className="text-indigo-400" />
          <span>Introducing The Celestial Eye</span>
          <div className="w-px h-4 mx-1 bg-white/20"></div>
          <Link href="/editor" className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors group">
            Explore <ChevronRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Hero Typography */}
        <h1 className="max-w-4xl mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Write beautifully. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
            Publish effortlessly.
          </span>
        </h1>

        <p className="max-w-2xl mb-10 text-lg leading-relaxed text-slate-400 sm:text-xl">
          The markdown editor designed for teams that care about aesthetics. Transform plain text into stunning, print-ready reports with professional typography and vibrant themes.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link 
            href="/editor"
            className="flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-black bg-white rounded-full hover:bg-slate-200 transition-all focus:ring-4 focus:ring-white/20 shadow-lg shadow-white/10 hover:scale-105"
          >
            Start Writing <ArrowRight size={16} />
          </Link>
          <a 
            href="#features"
            className="flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-white transition-all bg-white/5 border border-white/10 rounded-full hover:bg-white/10"
          >
            Explore Features
          </a>
        </div>

        {/* Product Preview / Editor Mockup */}
        <div className="relative w-full max-w-5xl mt-24">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none"></div>
          <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden ring-1 ring-white/5">
            <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700/50"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700/50"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700/50"></div>
              </div>
              <div className="mx-auto px-6 py-1 rounded-md bg-white/5 text-xs text-slate-500 font-mono">
                editor.archiview.app
              </div>
            </div>
            <div className="p-8 sm:p-12 text-left border-l-[3px] border-indigo-500 bg-gradient-to-br from-white/[0.02] to-transparent min-h-[300px]">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6"># Architecture Overview</h2>
              <p className="text-slate-400 mb-8 font-mono text-sm sm:text-base leading-loose">
                <span className="text-indigo-400">import</span> {'{'} Engine {'}'} <span className="text-indigo-400">from</span> <span className="text-emerald-400">'@core'</span>;<br/>
                <br/>
                The system leverages a distributed microservices approach, ensuring high availability and fault tolerance across global nodes.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono text-indigo-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                live rendering active
              </div>
            </div>
          </div>
        </div>

        {/* Feature Bento Box */}
        <div id="features" className="grid w-full max-w-5xl grid-cols-1 gap-6 mt-32 md:grid-cols-3 text-left relative z-20">
          
          <div className="md:col-span-2 p-8 sm:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <FileCode size={160} className="text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 relative z-10">Real-time Markdown</h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md relative z-10">
              Type on the left, see the polished result on the right. Instantly. Complete support for GitHub Flavored Markdown and integrated Mermaid diagram rendering.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] relative overflow-hidden group hover:bg-white/[0.04] transition-colors">
            <Palette size={28} className="text-cyan-400 mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">Curated Palettes</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ditch the default look. Select from designer-crafted neon and pastel themes to give your documents a distinct personality.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] relative overflow-hidden group hover:bg-white/[0.04] transition-colors">
            <Printer size={28} className="text-emerald-400 mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">Flawless Exports</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Export to PDF or HTML with 100% fidelity. Your custom themes, glowing accents, and typography are baked perfectly into the final file.
            </p>
          </div>

          <div className="md:col-span-2 p-8 sm:p-10 rounded-3xl border border-white/10 bg-gradient-to-tr from-white/[0.04] to-transparent relative overflow-hidden group">
             <div className="absolute -bottom-10 -right-10 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <Sparkles size={160} className="text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 relative z-10">Designed for Aesthetics</h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md relative z-10">
              Every font weight, gradient, and line-height has been meticulously tuned. Stop sending boring white-page PDFs and start delivering reports that demand attention.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-12 mt-12 relative z-20 text-center">
        <p className="text-slate-500 text-sm">© 2026 Archiview. Crafted with precision.</p>
      </footer>
    </div>
  );
}
