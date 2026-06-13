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
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem; background: #fff; }
          h1, h2, h3, h4, h5, h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; color: #000; }
          h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: .3em; }
          h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: .3em; }
          p, blockquote, ul, ol, dl, table, pre { margin-top: 0; margin-bottom: 16px; }
          ul, ol { padding-left: 2em; }
          table { display: block; width: 100%; overflow: auto; border-spacing: 0; border-collapse: collapse; }
          table th, table td { padding: 6px 13px; border: 1px solid #dfe2e5; }
          table tr:nth-child(2n) { background-color: #f6f8fa; }
          blockquote { padding: 0 1em; color: #6a737d; border-left: 0.25em solid #dfe2e5; }
          code { padding: 0.2em 0.4em; margin: 0; font-size: 85%; background-color: rgba(27,31,35,0.05); border-radius: 3px; font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace; }
          pre { padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; background-color: #f6f8fa; border-radius: 3px; }
          pre code { display: inline; max-width: auto; padding: 0; margin: 0; overflow: visible; line-height: inherit; word-wrap: normal; background-color: transparent; border: 0; }
          svg { max-width: 100%; }
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
