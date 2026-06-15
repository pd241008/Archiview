export interface Palette {
  id: string;
  name: string;
  primaryHex: string;
  secondaryHex: string;
  tertiaryHex: string;
  primaryRgb: string;
  secondaryRgb: string;
  tertiaryRgb: string;
}

export const PALETTES: Palette[] = [
  { 
    id: 'celestial', 
    name: 'Celestial', 
    primaryHex: '#00ffff', 
    secondaryHex: '#d946ef', 
    tertiaryHex: '#fbbf24',
    primaryRgb: '0, 255, 255', 
    secondaryRgb: '217, 70, 239',
    tertiaryRgb: '251, 191, 36'
  },
  { 
    id: 'cyber', 
    name: 'Cyberpunk', 
    primaryHex: '#facc15', 
    secondaryHex: '#06b6d4', 
    tertiaryHex: '#f43f5e',
    primaryRgb: '250, 204, 21', 
    secondaryRgb: '6, 182, 212',
    tertiaryRgb: '244, 63, 94'
  },
  { 
    id: 'matrix', 
    name: 'Matrix', 
    primaryHex: '#4ade80', 
    secondaryHex: '#22c55e', 
    tertiaryHex: '#eab308',
    primaryRgb: '74, 222, 128', 
    secondaryRgb: '34, 197, 94',
    tertiaryRgb: '234, 179, 8'
  },
  { 
    id: 'synthwave', 
    name: 'Synthwave', 
    primaryHex: '#f43f5e', 
    secondaryHex: '#8b5cf6', 
    tertiaryHex: '#0ea5e9',
    primaryRgb: '244, 63, 94', 
    secondaryRgb: '139, 92, 246',
    tertiaryRgb: '14, 165, 233'
  },
  { 
    id: 'sunset', 
    name: 'Mars Sunset', 
    primaryHex: '#f97316', 
    secondaryHex: '#ef4444', 
    tertiaryHex: '#facc15',
    primaryRgb: '249, 115, 22', 
    secondaryRgb: '239, 68, 68',
    tertiaryRgb: '250, 204, 21'
  },
];

export const getRandomPalette = (currentId?: string): Palette => {
  const available = currentId ? PALETTES.filter(p => p.id !== currentId) : PALETTES;
  return available[Math.floor(Math.random() * available.length)];
};
