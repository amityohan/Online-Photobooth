import vintagejs from 'vintagejs';
import { PhotoFilter } from '../types/photobooth';

type Mutable<T> = {
  -readonly [P in keyof T]?: T[P];
};

export type VintageEffect = Mutable<NonNullable<Parameters<typeof vintagejs>[1]>>;

export interface FilterPresetDefinition {
  id: PhotoFilter;
  label: string;
  tagline: string;
  effect: VintageEffect;
}

/**
 * Curated collection of 8 highly distinct filters powered by vintagejs
 */
export const PHOTO_FILTERS: FilterPresetDefinition[] = [
  {
    id: 'none',
    label: 'Original',
    tagline: 'Natural unedited',
    effect: {},
  },
  {
    id: 'vintage',
    label: 'Vintage',
    tagline: 'Aged paper & soft vignette',
    effect: {
      sepia: true,
      vignette: 0.35,
      contrast: 0.15,
      screen: { r: 255, g: 235, b: 190, a: 0.15 },
    },
  },
  {
    id: 'warm',
    label: 'Warm Golden',
    tagline: 'Golden hour amber sunset',
    effect: {
      saturation: 1.35,
      contrast: 0.12,
      brightness: 0.05,
      screen: { r: 255, g: 190, b: 90, a: 0.2 },
    },
  },
  {
    id: 'cool',
    label: 'Cool Cyan',
    tagline: 'Chilled cyan daylight film',
    effect: {
      saturation: 0.85,
      contrast: 0.15,
      brightness: 0.02,
      screen: { r: 80, g: 195, b: 255, a: 0.2 },
    },
  },
  {
    id: 'grayscale',
    label: 'Grayscale',
    tagline: 'Classic neutral monochrome',
    effect: {
      gray: true,
      contrast: 0.12,
      brightness: 0.02,
    },
  },
  {
    id: 'blush-rose',
    label: 'Blush Rose',
    tagline: 'Romantic pastel pink glow',
    effect: {
      screen: { r: 255, g: 182, b: 193, a: 0.22 },
      brightness: 0.05,
      contrast: 0.08,
      saturation: 1.1,
    },
  },
  {
    id: 'kodachrome',
    label: 'Kodachrome',
    tagline: 'Vivid 35mm slide film',
    effect: {
      contrast: 0.28,
      saturation: 1.35,
      screen: { r: 245, g: 215, b: 170, a: 0.12 },
      vignette: 0.2,
    },
  },
  {
    id: 'faded-film',
    label: 'Faded Film',
    tagline: 'Matte pastel with lifted shadows',
    effect: {
      contrast: -0.22,
      lighten: 0.15,
      saturation: 0.8,
      screen: { r: 245, g: 235, b: 220, a: 0.15 },
    },
  },
];

// In-memory cache for processed images to prevent redundant processing
const filterCache = new Map<string, string>();

/**
 * Creates a unique cache key based on photo content, filter id, and fine-tuning sliders
 */
function getCacheKey(
  src: string,
  filterId: PhotoFilter,
  adjustments?: { brightness: number; contrast: number; saturation: number; sepia: number }
): string {
  // Use length + start/end characters to avoid hashing huge strings
  const hash = `${src.length}_${src.slice(0, 30)}_${src.slice(-30)}`;
  const b = adjustments?.brightness ?? 100;
  const c = adjustments?.contrast ?? 100;
  const s = adjustments?.saturation ?? 100;
  const sep = adjustments?.sepia ?? 0;
  return `${hash}::${filterId}::${b}_${c}_${s}_${sep}`;
}

/**
 * Applies a filter to an image dataUrl using vintagejs
 */
export async function applyVintageFilter(
  src: string,
  filterId: PhotoFilter,
  adjustments?: { brightness: number; contrast: number; saturation: number; sepia: number }
): Promise<string> {
  if (!src) return '';

  const hasAdjustments = adjustments && (
    adjustments.brightness !== 100 ||
    adjustments.contrast !== 100 ||
    adjustments.saturation !== 100 ||
    adjustments.sepia > 0
  );

  // Return original immediately if no filter and no adjustments
  if (filterId === 'none' && !hasAdjustments) {
    return src;
  }

  const key = getCacheKey(src, filterId, adjustments);
  const cached = filterCache.get(key);
  if (cached) {
    return cached;
  }

  const preset = PHOTO_FILTERS.find((p) => p.id === filterId) || PHOTO_FILTERS[0];
  const effect: VintageEffect = { ...preset.effect };

  // Blend fine-tuning adjustments into the vintagejs effect
  if (adjustments) {
    if (adjustments.brightness !== 100) {
      effect.brightness = (effect.brightness || 0) + (adjustments.brightness - 100) / 100;
    }
    if (adjustments.contrast !== 100) {
      effect.contrast = (effect.contrast || 0) + (adjustments.contrast - 100) / 100;
    }
    if (adjustments.saturation !== 100) {
      effect.saturation = (effect.saturation ?? 1) * (adjustments.saturation / 100);
    }
    if (adjustments.sepia > 0) {
      effect.sepia = true;
    }
  }

  try {
    const res = await vintagejs(src, effect);
    const resultUrl = res.getDataURL('image/jpeg', 0.92);
    filterCache.set(key, resultUrl);
    return resultUrl;
  } catch (err) {
    console.warn('vintagejs processing fallback to original:', err);
    return src;
  }
}

/**
 * Pre-computes filter previews for all 8 presets using vintagejs
 */
export async function generateFilterThumbnails(
  sourcePhotoUrl: string,
  adjustments?: { brightness: number; contrast: number; saturation: number; sepia: number }
): Promise<Record<PhotoFilter, string>> {
  const results = {} as Record<PhotoFilter, string>;

  if (!sourcePhotoUrl) {
    for (const p of PHOTO_FILTERS) {
      results[p.id] = '';
    }
    return results;
  }

  await Promise.all(
    PHOTO_FILTERS.map(async (p) => {
      try {
        const url = await applyVintageFilter(sourcePhotoUrl, p.id, adjustments);
        results[p.id] = url;
      } catch {
        results[p.id] = sourcePhotoUrl;
      }
    })
  );

  return results;
}
