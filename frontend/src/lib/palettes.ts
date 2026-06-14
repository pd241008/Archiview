export interface Palette {
  id: string;
  name: string;
  primaryHex: string;
  secondaryHex: string;
  primaryRgb: string;
  secondaryRgb: string;
}

export const PALETTES: Palette[] = [
  { 
    id: 'zenith', 
    name: 'Project Zenith', 
    primaryHex: '#00ffff', 
    secondaryHex: '#d946ef', 
    primaryRgb: '0, 255, 255', 
    secondaryRgb: '217, 70, 239' 
  },
  { 
    id: 'cyber', 
    name: 'Cyberpunk', 
    primaryHex: '#facc15', 
    secondaryHex: '#06b6d4', 
    primaryRgb: '250, 204, 21', 
    secondaryRgb: '6, 182, 212' 
  },
  { 
    id: 'matrix', 
    name: 'Matrix', 
    primaryHex: '#4ade80', 
    secondaryHex: '#22c55e', 
    primaryRgb: '74, 222, 128', 
    secondaryRgb: '34, 197, 94' 
  },
  { 
    id: 'synthwave', 
    name: 'Synthwave', 
    primaryHex: '#f43f5e', 
    secondaryHex: '#8b5cf6', 
    primaryRgb: '244, 63, 94', 
    secondaryRgb: '139, 92, 246' 
  },
  { 
    id: 'sunset', 
    name: 'Mars Sunset', 
    primaryHex: '#f97316', 
    secondaryHex: '#ef4444', 
    primaryRgb: '249, 115, 22', 
    secondaryRgb: '239, 68, 68' 
  },
];

export const getRandomPalette = (currentId?: string): Palette => {
  const available = currentId ? PALETTES.filter(p => p.id !== currentId) : PALETTES;
  return available[Math.floor(Math.random() * available.length)];
};
