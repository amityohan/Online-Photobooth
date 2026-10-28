import React from 'react';
import { StripCaptionSettings, FontFamily } from '../../types/photobooth';
import { FONT_OPTIONS } from '../../config/fonts';
import { AlignLeft, AlignCenter, AlignRight, Calendar } from 'lucide-react';

export interface CaptionEditorProps {
  caption: StripCaptionSettings;
  onChange: (caption: Partial<StripCaptionSettings>) => void;
  presetColor: string;
}

const PRESET_CAPTION_COLORS = [
  '#181818',
  '#FFFFFF',
  '#8A7156',
  '#D4AF37',
  '#E88B88',
  '#A855F7',
  '#2563EB',
  '#059669',
  '#DC2626',
];

export const CaptionEditor: React.FC<CaptionEditorProps> = ({
  caption,
  onChange,
  presetColor,
}) => {
  const charLimit = 36;
  const currentLen = caption.text.length;

  const setTodayDate = () => {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).toUpperCase();
    onChange({ dateText: formatted, showDate: true });
  };

  return (
    <div className="space-y-4">
      {/* Primary Caption Text */}
      <div>
        <div className="flex items-center justify-between text-xs text-[#2B2824] mb-1">
          <label className="font-semibold text-[#2B2824]">Main Caption</label>
          <span className={`text-[10px] font-mono ${currentLen >= charLimit ? 'text-rose-500 font-bold' : 'text-[#7A7062]'}`}>
            {currentLen}/{charLimit}
          </span>
        </div>
        <input
          type="text"
          maxLength={charLimit}
          value={caption.text}
          onChange={(e) => onChange({ text: e.target.value })}
          placeholder="e.g. GOOD TIMES, BEST FRIENDS..."
          className="w-full px-3 py-2 bg-white border border-[#DDD5C7] rounded-xl text-[#2B2824] placeholder:text-[#A89F91] text-sm focus:outline-none focus:border-[#E88B88] focus:ring-1 focus:ring-[#E88B88] shadow-sm"
        />

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {['BEST FRIENDS', 'GOOD TIMES', "MEMORIES '26", 'SMILE! 😊', 'SWEET LIFE'].map((phrase) => (
            <button
              key={phrase}
              type="button"
              onClick={() => onChange({ text: phrase })}
              className="text-[10px] px-2 py-0.5 rounded-full bg-[#F4EFE6] text-[#5A544C] hover:text-[#1C1A17] hover:bg-[#EAE2D5] border border-[#DDD5C7] transition-colors"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>

      {/* Subtext / Booth Label */}
      <div>
        <label className="block text-xs font-semibold text-[#2B2824] mb-1">
          Subtext / Location (Optional)
        </label>
        <input
          type="text"
          maxLength={40}
          value={caption.subtext}
          onChange={(e) => onChange({ subtext: e.target.value })}
          placeholder="e.g. SnapStrip Booth #04 • Tokyo"
          className="w-full px-3 py-1.5 bg-white border border-[#DDD5C7] rounded-xl text-[#2B2824] placeholder:text-[#A89F91] text-xs focus:outline-none focus:border-[#E88B88] shadow-sm"
        />
      </div>

      {/* Date Stamp Toggle */}
      <div className="pt-2 border-t border-[#E8E2D8] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#7A7062]" />
          <span className="text-xs font-semibold text-[#2B2824]">Include Date Stamp</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={setTodayDate}
            className="text-[10px] text-[#E88B88] hover:underline font-bold"
          >
            Today
          </button>
          <input
            type="checkbox"
            checked={caption.showDate}
            onChange={(e) => onChange({ showDate: e.target.checked })}
            className="w-4 h-4 accent-[#E88B88] rounded cursor-pointer"
          />
        </div>
      </div>

      {caption.showDate && (
        <input
          type="text"
          value={caption.dateText}
          onChange={(e) => onChange({ dateText: e.target.value })}
          placeholder="e.g. OCT 28, 2026"
          className="w-full px-3 py-1.5 bg-white border border-[#DDD5C7] rounded-lg text-[#2B2824] text-xs font-mono shadow-sm"
        />
      )}

      {/* Font Selection */}
      <div className="pt-2 border-t border-[#E8E2D8]">
        <label className="block text-xs font-semibold text-[#2B2824] mb-2">Typography</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {FONT_OPTIONS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange({ font: f.id as FontFamily })}
              className={`p-2 rounded-lg border text-left text-xs transition-all ${
                caption.font === f.id
                  ? 'bg-[#FFF6F5] border-[#E88B88] text-[#1C1A17] font-semibold shadow-sm'
                  : 'bg-white border-[#E8E2D8] text-[#4A4237] hover:border-[#D5C4A1]'
              } ${f.className}`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Alignment, Uppercase, and Size */}
      <div className="pt-2 border-t border-[#E8E2D8] grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[#2B2824] mb-1">Alignment</label>
          <div className="flex bg-[#F4EFE6] p-1 rounded-xl border border-[#DDD5C7] gap-1">
            <button
              type="button"
              onClick={() => onChange({ align: 'left' })}
              className={`flex-1 py-1 rounded flex items-center justify-center ${
                caption.align === 'left' ? 'bg-white text-[#1C1A17] shadow-sm' : 'text-[#7A7062] hover:text-[#1C1A17]'
              }`}
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange({ align: 'center' })}
              className={`flex-1 py-1 rounded flex items-center justify-center ${
                caption.align === 'center' ? 'bg-white text-[#1C1A17] shadow-sm' : 'text-[#7A7062] hover:text-[#1C1A17]'
              }`}
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange({ align: 'right' })}
              className={`flex-1 py-1 rounded flex items-center justify-center ${
                caption.align === 'right' ? 'bg-white text-[#1C1A17] shadow-sm' : 'text-[#7A7062] hover:text-[#1C1A17]'
              }`}
            >
              <AlignRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#2B2824] mb-1">Case Style</label>
          <div className="flex bg-[#F4EFE6] p-1 rounded-xl border border-[#DDD5C7] gap-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => onChange({ uppercase: true })}
              className={`flex-1 py-1 rounded ${
                caption.uppercase ? 'bg-white text-[#1C1A17] shadow-sm font-bold' : 'text-[#7A7062] hover:text-[#1C1A17]'
              }`}
            >
              UPPER
            </button>
            <button
              type="button"
              onClick={() => onChange({ uppercase: false })}
              className={`flex-1 py-1 rounded ${
                !caption.uppercase ? 'bg-white text-[#1C1A17] shadow-sm font-bold' : 'text-[#7A7062] hover:text-[#1C1A17]'
              }`}
            >
              Normal
            </button>
          </div>
        </div>
      </div>

      {/* Font Color */}
      <div className="pt-2 border-t border-[#E8E2D8]">
        <label className="block text-xs font-semibold text-[#2B2824] mb-1.5">Caption Color</label>
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_CAPTION_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onChange({ color: c })}
              className={`w-6 h-6 rounded-full border border-black/20 transition-transform ${
                caption.color === c ? 'scale-125 ring-2 ring-[#E88B88]' : 'hover:scale-110'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
          <input
            type="color"
            value={caption.color || presetColor}
            onChange={(e) => onChange({ color: e.target.value })}
            className="w-7 h-7 rounded-full bg-transparent cursor-pointer"
            title="Custom color"
          />
        </div>
      </div>
    </div>
  );
};

