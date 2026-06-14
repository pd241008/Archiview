'use client';

import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { Palette } from '@/lib/palettes';

// Initialize mermaid with default base
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
});

export const Mermaid = ({ chart, palette }: { chart: string; palette?: Palette }) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    
    // Apply dynamic theme if palette is provided
    if (palette) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'loose',
        themeVariables: {
          background: 'transparent',
          primaryColor: 'rgba(2, 6, 23, 0.8)',
          primaryTextColor: '#f8fafc',
          primaryBorderColor: palette.primaryHex,
          lineColor: palette.secondaryHex,
          secondaryColor: `rgba(${palette.secondaryRgb}, 0.2)`,
          tertiaryColor: `rgba(${palette.primaryRgb}, 0.1)`,
          clusterBkg: `rgba(${palette.primaryRgb}, 0.05)`,
          clusterBorder: palette.primaryHex,
          mainBkg: 'rgba(2, 6, 23, 0.8)',
          nodeBorder: palette.primaryHex,
          nodeTextColor: '#ffffff',
          edgeLabelBackground: '#020617',
        },
      });
    } else {
      mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' });
    }

    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;
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
  }, [chart, palette]);

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
