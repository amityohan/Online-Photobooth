import { PhotoFilter } from '../types/photobooth';

export interface FilterPresetItem {
  id: PhotoFilter;
  label: string;
  tagline: string;
}

export const FILTER_PRESETS: FilterPresetItem[] = [
  { id: 'none', label: 'Original', tagline: 'Natural unedited' },
  { id: 'bw', label: 'B&W Classic', tagline: 'Monochrome contrast' },
  { id: 'grayscale', label: 'Grayscale', tagline: 'Neutral grayscale' },
  { id: 'sepia', label: 'Sepia 70s', tagline: 'Warm antique bronze' },
  { id: 'vintage', label: 'Vintage Tone', tagline: 'Aged paper warmth' },
  { id: 'warm', label: 'Warm', tagline: 'Golden sunset glow' },
  { id: 'cool', label: 'Cool', tagline: 'Crisp cyan-blue analog' },
  { id: 'high-contrast', label: 'High Contrast', tagline: 'Punchy vivid pop' },
  { id: 'faded-film', label: 'Faded Film', tagline: 'Matte lifted shadows' },
  { id: 'kodachrome', label: '35mm Film', tagline: 'Analog color film' },
  { id: 'y2k', label: 'Y2K Cyber', tagline: 'Vibrant punchy tones' },
  { id: 'soft', label: 'Soft Glow', tagline: 'Dreamy soft focus' },
  { id: 'noir', label: 'Moody Noir', tagline: 'Deep shadows & grit' },
];
