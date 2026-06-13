'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Mermaid } from './Mermaid';
import { Download, FileText, FileCode, FileDown } from 'lucide-react';

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

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState<string>('# Welcome to the Editor\n\nType some markdown on the left to see it previewed on the right.\n\n```mermaid\ngraph TD;\n    A-->B;\n    A-->C;\n    B-->D;\n    C-->D;\n```');
  const previewRef = useRef<HTMLDivElement>(null);

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
            color: #cbd5e1; 
            max-width: 900px; 
            margin: 0 auto; 
            padding: 4rem 2rem; 
            background: #0a0f1c; 
            font-size: 1.05rem;
          }
          h1, h2, h3, h4, h5, h6 { color: #ffffff; font-weight: 700; letter-spacing: -0.025em; }
          h1 { 
            font-size: 2.5em; text-align: center; letter-spacing: 0.1em; 
            margin-top: 1em; margin-bottom: 0.2em; text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          h2 { 
            font-size: 1.25em; color: #00f0ff; 
            background: linear-gradient(90deg, rgba(30, 58, 138, 0.6) 0%, rgba(30, 58, 138, 0.1) 100%);
            border-left: 4px solid #00f0ff; padding: 0.5em 1em; margin-top: 2.5em; margin-bottom: 1em; 
            border-radius: 0 4px 4px 0; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center;
          }
          h2::before { content: "■"; margin-right: 12px; color: #00f0ff; font-size: 0.8em; text-shadow: 0 0 10px #00f0ff; }
          h3 { font-size: 1.15em; color: #b026ff; margin-top: 1.5em; }
          p { margin-bottom: 1.25em; }
          a { color: #00f0ff; text-decoration: none; font-weight: 500; }
          strong { color: #ffffff; font-weight: 600; }
          blockquote { 
            border-left: 4px solid #b026ff; background: rgba(176, 38, 255, 0.1); color: #e2e8f0; 
            padding: 1em 1.5em; margin: 1.5em 0; border-radius: 0 0.5rem 0.5rem 0; font-style: italic; 
          }
          ul, ol { padding-left: 1.5em; margin-bottom: 1.25em; }
          li { margin-bottom: 0.5em; }
          li::marker { color: #00f0ff; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 1.5em; background: rgba(15, 23, 42, 0.6); border: 1px solid #00f0ff; border-radius: 4px; overflow: hidden; display: table; }
          th, td { border: 1px solid rgba(0, 240, 255, 0.2); padding: 0.85em 1em; text-align: left; font-size: 0.9em; }
          th { background: rgba(0, 240, 255, 0.1); font-weight: 600; color: #00f0ff; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.8em; border-bottom: 2px solid #00f0ff; }
          tr:nth-child(even) td { background: rgba(0, 240, 255, 0.02); }
          code { background: rgba(0, 240, 255, 0.15); color: #00f0ff; padding: 0.2em 0.4em; border-radius: 0.25rem; font-size: 0.85em; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; border: 1px solid rgba(0, 240, 255, 0.3); }
          pre { background: #050810; padding: 1.25em; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1.5em; border: 1px solid rgba(0, 240, 255, 0.2); box-shadow: 0 4px 20px -2px rgba(0, 240, 255, 0.1); }
          pre code { background: transparent; color: #e2e8f0; padding: 0; font-size: 0.9em; border: none; }
          hr { border: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(176, 38, 255, 0.8), rgba(0, 240, 255, 0.8), transparent); margin: 3em 0; box-shadow: 0 0 10px rgba(0, 240, 255, 0.4); }
          svg { max-width: 100%; display: block; margin: 0 auto; }
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
      {/* Header / Toolbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-xl z-20 print:hidden relative">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
            A
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white">Archiview</h1>
            <p className="text-xs text-slate-400 font-medium">Premium Markdown Experience</p>
          </div>
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
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/20 transition-all duration-200"
          >
            <FileDown size={16} />
            <span className="hidden sm:inline">PDF</span>
          </button>
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
        <div className="w-1/2 overflow-y-auto bg-slate-100/50 print:w-full print:block print:overflow-visible shadow-inner relative">
          <div className="sticky top-0 z-10 flex items-center px-4 py-2 bg-slate-100/80 backdrop-blur-md border-b border-slate-200/60 text-[11px] font-bold text-slate-400 uppercase tracking-widest print:hidden">
            Live Preview
          </div>
          <div className="p-8 pb-32">
            <div 
              className="max-w-[850px] mx-auto bg-white p-12 sm:p-16 rounded-2xl shadow-xl border border-slate-200/60 markdown-preview print:max-w-none print:p-0 print:m-0 print:border-none print:shadow-none print:rounded-none print:bg-transparent transition-all duration-300"
              ref={previewRef}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code(props) {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || '');
                    
                    if (match && match[1] === 'mermaid') {
                      return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                    }

                    return match ? (
                      <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono">
                        <code className={className} {...rest}>
                          {children}
                        </code>
                      </pre>
                    ) : (
                      <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600" {...rest}>
                        {children}
                      </code>
                    );
                  },
                  table: ({node, ...props}) => <div className="overflow-x-auto my-6"><table className="w-full text-left border-collapse" {...props} /></div>,
                  th: ({node, ...props}) => <th className="border-b-2 border-slate-200 px-4 py-2 font-semibold text-slate-800" {...props} />,
                  td: ({node, ...props}) => <td className="border-b border-slate-200 px-4 py-2" {...props} />,
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 border-b pb-2" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
                  p: ({node, ...props}) => <p className="my-4 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside my-4 space-y-1" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside my-4 space-y-1" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-slate-300 pl-4 py-1 my-4 text-slate-600 italic bg-slate-50 rounded-r" {...props} />,
                  a: ({node, ...props}) => <a className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
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
