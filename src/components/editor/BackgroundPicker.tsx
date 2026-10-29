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
      <div className="flex bg-[#F4EFE6] p-1 rounded-xl border border-[#DDD5C7] gap-1 text-xs">
        <button
          type="button"
          onClick={() => onChange({ backgroundType: 'solid' })}
          className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
            backgroundType === 'solid' ? 'bg-white text-[#1C1A17] font-semibold shadow-sm' : 'text-[#7A7062] hover:text-[#1C1A17]'
          }`}
        >
          Solid Color
        </button>
        <button
          type="button"
          onClick={() => onChange({ backgroundType: 'gradient' })}
          className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
            backgroundType === 'gradient' ? 'bg-white text-[#1C1A17] font-semibold shadow-sm' : 'text-[#7A7062] hover:text-[#1C1A17]'
          }`}
        >
          Gradients
        </button>
      </div>

      {backgroundType === 'solid' ? (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#2B2824]">Preset Colors</label>
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
                      ? 'bg-[#FFF6F5] border-[#E88B88] ring-1 ring-[#E88B88] shadow-sm'
                      : 'bg-white border-[#E8E2D8] hover:border-[#D5C4A1] shadow-sm'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-xs"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[11px] text-[#3D342B] font-medium truncate">{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* Custom color input */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#E8E2D8]">
            <span className="text-xs text-[#5A544C]">Custom Hex:</span>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-[#DDD5C7]"
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              className="w-24 px-2 py-1 bg-white border border-[#DDD5C7] rounded-lg text-xs font-mono text-[#1C1A17] shadow-sm"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#2B2824]">Preset Gradients</label>
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
                      ? 'bg-[#FFF6F5] border-[#E88B88] ring-1 ring-[#E88B88] shadow-sm'
                      : 'bg-white border-[#E8E2D8] hover:border-[#D5C4A1] shadow-sm'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-lg border border-black/10 shrink-0 shadow-xs"
                    style={{ background: g.css }}
                  />
                  <span className="text-xs text-[#3D342B] font-medium truncate">{g.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Texture Selection */}
      <div className="pt-2 border-t border-[#E8E2D8]">
        <label className="block text-xs font-semibold text-[#2B2824] mb-2">Paper & Film Texture</label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
          {TEXTURE_OPTIONS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ texture: t.id })}
              className={`py-1.5 px-2 rounded-lg border text-center text-xs transition-all ${
                texture === t.id
                  ? 'bg-[#FFF6F5] border-[#E88B88] text-[#1C1A17] font-semibold shadow-sm'
                  : 'bg-white border-[#E8E2D8] text-[#5A544C] hover:border-[#D5C4A1]'
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

