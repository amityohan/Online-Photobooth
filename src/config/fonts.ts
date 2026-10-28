import { FontFamily } from '../types/photobooth';

export interface FontOption {
  id: FontFamily;
  name: string;
  className: string;
  cssFamily: string;
}

export const FONT_OPTIONS: FontOption[] = [
  {
    id: 'display',
    name: 'Vintage Display',
    className: 'font-display',
    cssFamily: '"Fraunces", Georgia, serif',
  },
  {
    id: 'serif',
    name: 'Classic Serif',
    className: 'font-serif',
    cssFamily: '"Playfair Display", Georgia, serif',
  },
  {
    id: 'typewriter',
    name: 'Retro Typewriter',
    className: 'font-typewriter',
    cssFamily: '"Courier Prime", "Courier New", monospace',
  },
  {
    id: 'handwriting',
    name: 'Scrapbook Script',
    className: 'font-handwriting',
    cssFamily: '"Caveat", cursive',
  },
  {
    id: 'sans',
    name: 'Modern Sans',
    className: 'font-sans',
    cssFamily: '"Plus Jakarta Sans", Inter, sans-serif',
  },
];

