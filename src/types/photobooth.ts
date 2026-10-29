export type LayoutId =
  | 'classic-strip'
  | 'four-grid'
  | 'three-strip'
  | 'six-strip'
  | 'two-strip'
  | 'horizontal-strip'
  | 'film-contact'
  | 'four-collage';

export type ThemeId =
  | 'classic-bw'
  | 'vintage-cream'
  | 'blush-pink'
  | 'retro-film'
  | 'y2k-cyber'
  | 'minimal-white'
  | 'lavender-dream'
  | 'scrapbook'
  | 'midnight-black'
  | 'birthday-party'
  | 'valentines-day'
  | 'summer-memories';

export type FontFamily = 'display' | 'serif' | 'typewriter' | 'handwriting' | 'sans';

export type TextureType = 'none' | 'film-grain' | 'paper-grain' | 'grid' | 'dots';

export type PhotoFilter =
  | 'none'
  | 'bw'
  | 'grayscale'
  | 'sepia'
  | 'vintage'
  | 'warm'
  | 'cool'
  | 'high-contrast'
  | 'faded-film'
  | 'matte'
  | 'retro'
  | 'kodachrome'
  | 'y2k'
  | 'soft'
  | 'noir';

export interface PhotoAdjustments {
  filter: PhotoFilter;
  brightness: number; // 80 - 140
  contrast: number;   // 80 - 140
  saturation: number; // 0 - 200
  sepia: number;      // 0 - 100
}

export interface CapturedPhoto {
  id: string;
  dataUrl: string;
  timestamp: number;
  adjustments: PhotoAdjustments;
}

export interface StripLayoutConfig {
  id: LayoutId;
  name: string;
  description: string;
  photoCount: number;
  cols: number;
  rows: number;
  aspectRatio: string;
  renderWidth: number;  // High-res canvas width
  renderHeight: number; // High-res canvas height
  defaultPadding: number;
  defaultGap: number;
  hasCaptionArea: boolean;
  badge?: string;
  isFilmStyle?: boolean;
}

export interface StripThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  backgroundColor: string;
  backgroundGradient?: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: FontFamily;
  defaultFilter: PhotoFilter;
  texture: TextureType;
  previewBg: string;
}

export interface StickerItem {
  id: string;
  emoji: string;
  label: string;
  x: number; // Percentage 0 - 100
  y: number; // Percentage 0 - 100
  size: number; // Size in px
  rotation: number; // -45 to 45 deg
}

export interface StripCaptionSettings {
  text: string;
  subtext: string;
  showDate: boolean;
  dateText: string;
  font: FontFamily;
  size: 'sm' | 'md' | 'lg' | 'xl';
  color: string;
  align: 'left' | 'center' | 'right';
  uppercase: boolean;
}

export interface CustomizationSettings {
  layoutId: LayoutId;
  themeId: ThemeId;
  backgroundColor: string;
  backgroundGradient: string;
  backgroundType: 'solid' | 'gradient' | 'texture';
  texture: TextureType;
  borderColor: string;
  borderThickness: number; // 0 to 32
  padding: number;         // 8 to 48
  gap: number;             // 0 to 32
  photoRadius: number;     // 0 to 24
  stripRadius: number;     // 0 to 24
  caption: StripCaptionSettings;
  stickers: StickerItem[];
  globalFilter: PhotoFilter;
  globalAdjustments: {
    brightness: number;
    contrast: number;
    saturation: number;
    sepia: number;
  };
}

export type PhotoboothStep = 'layout' | 'camera' | 'customize' | 'export';

export interface CameraDevice {
  deviceId: string;
  label: string;
  facing: 'user' | 'environment' | 'unknown';
}

