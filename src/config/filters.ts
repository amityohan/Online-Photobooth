import { PhotoFilter } from '../types/photobooth';

export interface FilterPresetItem {
  id: PhotoFilter;
  label: string;
  tagline: string;
}

export const FILTER_PRESETS: FilterPresetItem[] = [
  { id: 'none', label: 'Original', tagline: 'Natural unedited' },
  { id: 'vintage', label: 'Vintage', tagline: 'Warm aged photo paper' },
  { id: 'warm', label: 'Warm', tagline: 'Golden sunset glow' },
  { id: 'cool', label: 'Cool', tagline: 'Crisp cyan-blue analog' },
  { id: 'grayscale', label: 'Grayscale', tagline: 'Pure neutral monochrome' },
  { id: 'sepia', label: 'Sepia', tagline: 'Warm antique bronze tone' },
  { id: 'faded-film', label: 'Faded Film', tagline: 'Soft lifted matte shadows' },
  { id: 'matte', label: 'Matte', tagline: 'Low-contrast velvety finish' },
  { id: 'retro', label: 'Retro', tagline: 'Punchy 35mm film stock' },
  { id: 'noir', label: 'Noir', tagline: 'High-contrast cinematic' },
  { id: 'bw', label: 'B&W Classic', tagline: 'Analog silver halide' },
  { id: 'kodachrome', label: '35mm Film', tagline: 'Warm vivid emulsion' },
  { id: 'soft', label: 'Soft Glow', tagline: 'Dreamy diffused focus' },
  { id: 'y2k', label: 'Y2K Cyber', tagline: 'Vibrant punchy tones' },
  { id: 'high-contrast', label: 'High Contrast', tagline: 'Vivid dynamic pop' },
];
