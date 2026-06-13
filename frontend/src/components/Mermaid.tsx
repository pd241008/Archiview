'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
});

export const Mermaid = ({ chart }: { chart: string }) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const renderChart = async () => {
      try {
        // Generate a unique ID for the mermaid chart
        const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;
        // Mermaid render throws if there's a syntax error
        const { svg: generatedSvg } = await mermaid.render(id, chart);
        if (isMounted) {
          setSvg(generatedSvg);
          setError(false);
        }
      } catch (e) {
        if (isMounted) {
          setError(true);
        }
      }
    };

    if (chart) {
      renderChart();
    }

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="p-4 border border-red-200 text-red-600 bg-red-50 rounded text-sm my-4 font-mono">
        Syntax error in Mermaid diagram
      </div>
    );
  }

  if (!svg) {
    return <div className="animate-pulse bg-gray-100 h-32 rounded my-4"></div>;
  }

  // To auto-scale mermaid so it fits the PDF, we inject max-width and height auto
  // Mermaid sometimes sets fixed widths which breaks html2pdf scaling
  const scaledSvg = svg.replace(/<svg\b([^>]*)>/, (match, attrs) => {
    return `<svg ${attrs} style="max-width: 100%; height: auto; display: block; margin: 0 auto;" width="100%">`;
  });

  return (
    <div 
      className="mermaid-wrapper my-6 flex justify-center break-inside-avoid"
      dangerouslySetInnerHTML={{ __html: scaledSvg }}
    />
  );
};
