import React from 'react';
import { TextureType } from '../../types/photobooth';

export interface BackgroundPickerProps {
  backgroundColor: string;
  backgroundGradient: string;
  backgroundType: 'solid' | 'gradient' | 'texture';
  texture: TextureType;
  onChange: (updates: {
    backgroundColor?: string;
    backgroundGradient?: string;
    backgroundType?: 'solid' | 'gradient' | 'texture';
    texture?: TextureType;
  }) => void;
}

const PRESET_SOLID_COLORS = [
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Warm Cream', hex: '#F9F5EC' },
  { name: 'Aged Paper', hex: '#EFE7DA' },
  { name: 'Blush Rose', hex: '#FFF0F3' },
  { name: 'Soft Lavender', hex: '#F3E8FF' },
  { name: 'Matcha Sage', hex: '#E2E8F0' },
  { name: 'Golden Honey', hex: '#FEF3C7' },
  { name: 'Retro Charcoal', hex: '#1C1A17' },
  { name: 'Midnight Black', hex: '#121212' },
];

const PRESET_GRADIENTS = [
  { name: 'Sunset Glow', css: 'linear-gradient(135deg, #FEF3C7 0%, #FFEDD5 50%, #FCE7F3 100%)' },
  { name: 'Cotton Candy', css: 'linear-gradient(135deg, #FCE7F3 0%, #E0F2FE 100%)' },
  { name: 'Warm Film', css: 'linear-gradient(180deg, #F5EBE0 0%, #E3D5CA 100%)' },
  { name: 'Cyber Neon', css: 'linear-gradient(135deg, #1A0B2E 0%, #2E0854 50%, #4D0076 100%)' },
  { name: 'Lavender Dusk', css: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)' },
  { name: 'Noir Gold', css: 'linear-gradient(135deg, #141414 0%, #2A2521 100%)' },
];

const TEXTURE_OPTIONS: { id: TextureType; label: string }[] = [
  { id: 'none', label: 'Smooth' },
  { id: 'paper-grain', label: 'Paper Grain' },
  { id: 'film-grain', label: 'Film Grain' },
  { id: 'dots', label: 'Vintage Dots' },
  { id: 'grid', label: 'Retro Grid' },
];

export const BackgroundPicker: React.FC<BackgroundPickerProps> = ({
  backgroundColor,
  backgroundGradient,
  backgroundType,
  texture,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Background Type Tabs */}
      <div className="flex bg-[#181614] p-1 rounded-xl border border-neutral-800 gap-1 text-xs">
        <button
          type="button"
          onClick={() => onChange({ backgroundType: 'solid' })}
          className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
            backgroundType === 'solid' ? 'bg-[#2B2824] text-white' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Solid Color
        </button>
        <button
          type="button"
          onClick={() => onChange({ backgroundType: 'gradient' })}
          className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
            backgroundType === 'gradient' ? 'bg-[#2B2824] text-white' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Gradients
        </button>
      </div>

      {backgroundType === 'solid' ? (
        <div className="space-y-2">
          <label className="block text-xs font-medium text-neutral-300">Preset Colors</label>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_SOLID_COLORS.map((c) => {
              const isSelected = backgroundColor.toLowerCase() === c.hex.toLowerCase();
              return (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => onChange({ backgroundColor: c.hex })}
                  className={`p-2 rounded-xl border flex items-center gap-2 text-left transition-all ${
                    isSelected
                      ? 'bg-[#2B2824] border-[#E88B88] ring-1 ring-[#E88B88]'
                      : 'bg-[#181614] border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/30 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[11px] text-neutral-300 font-medium truncate">{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* Custom color input */}
          <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/80">
            <span className="text-xs text-neutral-400">Custom Hex:</span>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-neutral-700"
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              className="w-24 px-2 py-1 bg-[#181614] border border-neutral-700 rounded-lg text-xs font-mono text-white"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="block text-xs font-medium text-neutral-300">Preset Gradients</label>
          <div className="grid grid-cols-2 gap-2">
            {PRESET_GRADIENTS.map((g) => {
              const isSelected = backgroundGradient === g.css;
              return (
                <button
                  key={g.name}
                  type="button"
                  onClick={() => onChange({ backgroundGradient: g.css })}
                  className={`p-2 rounded-xl border flex items-center gap-2 text-left transition-all ${
                    isSelected
                      ? 'bg-[#2B2824] border-[#E88B88] ring-1 ring-[#E88B88]'
                      : 'bg-[#181614] border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-lg border border-white/20 shrink-0"
                    style={{ background: g.css }}
                  />
                  <span className="text-xs text-neutral-300 font-medium truncate">{g.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Texture Selection */}
      <div className="pt-2 border-t border-neutral-800/80">
        <label className="block text-xs font-medium text-neutral-300 mb-2">Paper & Film Texture</label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
          {TEXTURE_OPTIONS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ texture: t.id })}
              className={`py-1.5 px-2 rounded-lg border text-center text-xs transition-all ${
                texture === t.id
                  ? 'bg-[#2B2824] border-[#E88B88] text-white'
                  : 'bg-[#181614] border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

