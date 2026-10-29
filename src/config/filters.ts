import { PhotoFilter } from '../types/photobooth';

export interface FilterPresetItem {
  id: PhotoFilter;
  label: string;
  tagline: string;
}

/**
 * Exactly 8 curated, visually distinct photobooth filters powered by vintagejs
 */
export const FILTER_PRESETS: FilterPresetItem[] = [
  { id: 'none', label: 'Original', tagline: 'Natural unedited' },
  { id: 'vintage', label: 'Vintage', tagline: 'Warm aged print & vignette' },
  { id: 'warm', label: 'Warm Golden', tagline: 'Sunset amber glow' },
  { id: 'cool', label: 'Cool Cyan', tagline: 'Chilled cyan daylight film' },
  { id: 'grayscale', label: 'Grayscale', tagline: 'Classic neutral monochrome' },
  { id: 'cloud-nine', label: 'Cloud Nine', tagline: 'Angelic soft white glow & lifted light' },
  { id: 'kodachrome', label: 'Kodachrome', tagline: 'Vivid 35mm slide film' },
  { id: 'faded-film', label: 'Faded Film', tagline: 'Matte pastel with lifted shadows' },
];
