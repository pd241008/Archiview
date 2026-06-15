'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Mermaid } from './Mermaid';
import { Download, FileText, FileCode, FileDown, Palette as PaletteIcon } from 'lucide-react';
import { PALETTES, Palette, getRandomPalette } from '@/lib/palettes';

const DEFAULT_MARKDOWN = `# Welcome to the Editor
Try out this interactive markdown editor!

## Features
- **Live Preview:** See changes as you type.
- **GFM Support:** Tables, strikethroughs, and task lists.
- **Mermaid Diagrams:**

\`\`\`mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
\`\`\`

| Feature | Support |
|---------|---------|
| Markdown | Yes |
| HTML Export | Yes |
| PDF Export | Yes |
`;

const extractText = (node: any): string => {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractText).join('');
  }
  return '';
};

const getStableColor = (node: any): string => {
  const text = extractText(node);
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = ['primary', 'secondary', 'tertiary'];
  return colors[Math.abs(hash) % colors.length] || 'primary';
};


export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState<string>('# Welcome to the Editor\n\nType some markdown on the left to see it previewed on the right.\n\n```mermaid\ngraph TD;\n    A-->B;\n    A-->C;\n    B-->D;\n    C-->D;\n```');
  const previewRef = useRef<HTMLDivElement>(null);
  const [activePalette, setActivePalette] = useState<Palette>(PALETTES[0]);

  // Download raw markdown
  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const getCleanHtml = () => {
    if (!previewRef.current) return '';
    const content = previewRef.current.innerHTML;
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Document</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body { 
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; 
            line-height: 1.8; 
            color: #f8fafc; 
            max-width: 900px; 
            margin: 0 auto; 
            padding: 4rem 2rem; 
            background: #020617; 
            font-size: 1.05rem;
          }
          h1, h2, h3, h4, h5, h6 { color: #ffffff; font-weight: 700; letter-spacing: -0.025em; }
          :root {
            --theme-primary: ${activePalette.primaryHex};
            --theme-primary-rgb: ${activePalette.primaryRgb};
            --theme-secondary: ${activePalette.secondaryHex};
            --theme-secondary-rgb: ${activePalette.secondaryRgb};
            --theme-tertiary: ${activePalette.tertiaryHex};
            --theme-tertiary-rgb: ${activePalette.tertiaryRgb};
          }
          h1 { 
            font-size: 2.5em; text-align: center; letter-spacing: 0.1em; 
            margin-top: 1em; margin-bottom: 0.2em; 
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(var(--theme-primary-rgb), 0.5);
          }
          h2 { 
            font-size: 1.25em; color: var(--h2-hex, var(--theme-primary)); 
            background: linear-gradient(90deg, rgba(var(--h2-rgb, var(--theme-primary-rgb)), 0.2) 0%, rgba(var(--h2-rgb, var(--theme-primary-rgb)), 0.05) 50%, transparent 100%);
            border-left: 4px solid var(--h2-hex, var(--theme-primary)); padding: 0.6em 1em; margin-top: 2.5em; margin-bottom: 1em; 
            border-radius: 0 4px 4px 0; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center;
            text-shadow: 0 0 8px rgba(var(--h2-rgb, var(--theme-primary-rgb)), 0.6);
            box-shadow: inset 20px 0 30px -15px rgba(var(--h2-rgb, var(--theme-primary-rgb)), 0.2);
          }
          h2::before { content: "■"; margin-right: 12px; color: var(--h2-hex, var(--theme-primary)); font-size: 0.8em; text-shadow: 0 0 12px var(--h2-hex, var(--theme-primary)); }
          h3 { font-size: 1.15em; color: var(--h3-hex, var(--theme-secondary)); margin-top: 1.5em; text-shadow: 0 0 8px rgba(var(--h3-rgb, var(--theme-secondary-rgb)), 0.6); }
          p { margin-bottom: 1.25em; }
          a { color: ${activePalette.primaryHex}; text-decoration: none; font-weight: 500; text-shadow: 0 0 5px rgba(${activePalette.primaryRgb},0.4); }
          strong { color: #ffffff; font-weight: 700; text-shadow: 0 0 2px rgba(255,255,255,0.4); }
          blockquote { 
            border-left: 4px solid ${activePalette.secondaryHex}; 
            background: linear-gradient(90deg, rgba(${activePalette.secondaryRgb}, 0.15) 0%, transparent 100%); 
            color: #e2e8f0; 
            padding: 1em 1.5em; margin: 1.5em 0; border-radius: 0 0.5rem 0.5rem 0; font-style: italic; 
            box-shadow: inset 10px 0 20px -10px rgba(${activePalette.secondaryRgb}, 0.2);
          }
          ul, ol { padding-left: 1.5em; margin-bottom: 1.25em; }
          li { margin-bottom: 0.5em; }
          li::marker { color: ${activePalette.primaryHex}; text-shadow: 0 0 5px ${activePalette.primaryHex}; }
          table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 1.5em; background: rgba(2, 6, 23, 0.8); border: 1px solid ${activePalette.primaryHex}; border-radius: 6px; box-shadow: 0 0 15px rgba(${activePalette.primaryRgb}, 0.1); overflow: hidden; display: table; }
          th, td { border: 1px solid rgba(${activePalette.primaryRgb}, 0.15); padding: 0.85em 1em; text-align: left; font-size: 0.9em; }
          th { background: rgba(${activePalette.primaryRgb}, 0.15); font-weight: 700; color: ${activePalette.primaryHex}; text-transform: uppercase; border-bottom: 2px solid ${activePalette.primaryHex}; text-shadow: 0 0 8px rgba(${activePalette.primaryRgb}, 0.5); }
          tr:nth-child(even) td { background: rgba(${activePalette.primaryRgb}, 0.02); }
          code { background: rgba(${activePalette.primaryRgb}, 0.1); color: ${activePalette.primaryHex}; padding: 0.2em 0.4em; border-radius: 0.25rem; font-size: 0.85em; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; border: 1px solid rgba(${activePalette.primaryRgb}, 0.3); text-shadow: 0 0 5px rgba(${activePalette.primaryRgb}, 0.3); }
          pre { background: #020617; padding: 1.25em; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1.5em; border: 1px solid rgba(${activePalette.primaryRgb}, 0.3); box-shadow: 0 0 20px rgba(${activePalette.primaryRgb}, 0.1); }
          pre code { background: transparent; color: #f8fafc; padding: 0; font-size: 0.9em; border: none; text-shadow: none; }
          hr { border: 0; height: 2px; background: linear-gradient(90deg, transparent, ${activePalette.secondaryHex}, ${activePalette.primaryHex}, transparent); margin: 3em 0; box-shadow: 0 0 15px rgba(${activePalette.primaryRgb}, 0.6); }
          svg { max-width: 100%; display: block; margin: 0 auto; filter: drop-shadow(0 0 10px rgba(${activePalette.primaryRgb}, 0.2)); }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `;
  };

  // Download styled HTML
  const downloadHTML = () => {
    const htmlString = getCleanHtml();
    if (!htmlString) return;

    const blob = new Blob([htmlString], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  // Download PDF using native browser print
  const downloadPDF = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 text-slate-100 print:h-auto print:block print:overflow-visible">
      {/* Inject Dynamic Theme Variables */}
      <style>{`
        :root {
          --theme-primary: ${activePalette.primaryHex};
          --theme-primary-rgb: ${activePalette.primaryRgb};
          --theme-secondary: ${activePalette.secondaryHex};
          --theme-secondary-rgb: ${activePalette.secondaryRgb};
          --theme-tertiary: ${activePalette.tertiaryHex};
          --theme-tertiary-rgb: ${activePalette.tertiaryRgb};
        }
      `}</style>

      {/* Header / Toolbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-xl z-20 print:hidden relative">
        <div className="flex items-center gap-4">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#020617] font-bold shadow-lg transition-colors duration-500"
            style={{ 
              background: `linear-gradient(135deg, ${activePalette.primaryHex}, ${activePalette.secondaryHex})`,
              boxShadow: `0 4px 20px rgba(${activePalette.primaryRgb}, 0.3)`
            }}
          >
            A
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white">Archiview</h1>
            <div className="flex items-center gap-2">
              <p className="text-xs text-slate-400 font-medium">Export Theme:</p>
              <span className="text-xs font-bold transition-colors" style={{ color: activePalette.primaryHex }}>
                {activePalette.name}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Palette Picker */}
          <div className="flex items-center gap-2 bg-slate-950/50 p-1.5 rounded-full border border-slate-800">
            {PALETTES.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePalette(p)}
                className={`w-6 h-6 rounded-full transition-all duration-300 border-2 ${activePalette.id === p.id ? 'scale-110' : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'}`}
                style={{ 
                  background: `linear-gradient(135deg, ${p.primaryHex}, ${p.secondaryHex})`,
                  borderColor: activePalette.id === p.id ? '#ffffff' : 'transparent',
                  boxShadow: activePalette.id === p.id ? `0 0 10px rgba(${p.primaryRgb}, 0.6)` : 'none'
                }}
                title={p.name}
              />
            ))}
            <div className="w-px h-4 bg-slate-700 mx-1"></div>
            <button
              onClick={() => setActivePalette(getRandomPalette(activePalette.id))}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              title="Randomize Theme"
            >
              <PaletteIcon size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={downloadMarkdown}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-200 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-200"
            >
              <FileCode size={16} />
              <span className="hidden sm:inline">Markdown</span>
            </button>
            <button 
              onClick={downloadHTML}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-200 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-200"
            >
              <Download size={16} />
              <span className="hidden sm:inline">HTML</span>
            </button>
            <button 
              onClick={downloadPDF}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#020617] rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
              style={{
                background: activePalette.primaryHex,
                boxShadow: `0 4px 15px rgba(${activePalette.primaryRgb}, 0.4)`
              }}
            >
              <FileDown size={16} />
              <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Editor Area */}
      <main className="flex flex-1 overflow-hidden print:block print:overflow-visible relative">
        {/* Editor Pane */}
        <div className="w-1/2 flex flex-col border-r border-slate-800 bg-slate-950 print:hidden relative z-0 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
          <div className="flex items-center px-4 py-2 bg-slate-900/50 border-b border-slate-800/80 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Source Code
          </div>
          <textarea
            className="flex-1 w-full p-8 bg-transparent border-none resize-none focus:outline-none focus:ring-0 font-mono text-[15px] leading-relaxed text-slate-300 placeholder-slate-700 custom-scrollbar selection:bg-indigo-500/30"
            spellCheck={false}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Start typing markdown..."
          />
        </div>

        {/* Preview Pane */}
        <div className="w-1/2 overflow-y-auto bg-slate-950/50 print:w-full print:block print:overflow-visible shadow-inner relative">
          <div className="sticky top-0 z-10 flex items-center px-4 py-2 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 text-[11px] font-bold text-slate-400 uppercase tracking-widest print:hidden">
            Live Preview
          </div>
          <div className="p-8 pb-32">
            <div 
              className="max-w-[850px] mx-auto bg-[#020617] p-12 sm:p-16 rounded-2xl shadow-xl border border-slate-800/60 markdown-preview print:max-w-none print:p-0 print:m-0 print:border-none print:shadow-none print:rounded-none print:bg-transparent transition-all duration-300"
              ref={previewRef}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code(props) {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || '');
                    
                    if (match && match[1] === 'mermaid') {
                      return <Mermaid chart={String(children).replace(/\n$/, '')} palette={activePalette} />;
                    }

                    return match ? (
                      <pre>
                        <code className={className} {...rest}>
                          {children}
                        </code>
                      </pre>
                    ) : (
                      <code {...rest}>
                        {children}
                      </code>
                    );
                  },
                  h2: ({node, children, ...props}) => {
                    const color = getStableColor(node);
                    return (
                      <h2 
                        style={{
                          '--h2-hex': `var(--theme-${color})`,
                          '--h2-rgb': `var(--theme-${color}-rgb)`
                        } as React.CSSProperties}
                        {...props}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({node, children, ...props}) => {
                    const color = getStableColor(node);
                    return (
                      <h3 
                        style={{
                          '--h3-hex': `var(--theme-${color})`,
                          '--h3-rgb': `var(--theme-${color}-rgb)`
                        } as React.CSSProperties}
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                  a: ({node, ...props}) => <a target="_blank" rel="noopener noreferrer" {...props} />,
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
