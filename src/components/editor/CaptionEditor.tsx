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
        <div className="flex items-center justify-between text-xs text-neutral-300 mb-1 light:text-[#2B2824]">
          <label className="font-medium text-neutral-200 light:font-semibold light:text-[#2B2824]">Main Caption</label>
          <span className={`text-[10px] font-mono ${currentLen >= charLimit ? 'text-rose-400' : 'text-neutral-500'} light:font-bold'`}>
            {currentLen}/{charLimit}
          </span>
        </div>
        <input
          type="text"
          maxLength={charLimit}
          value={caption.text}
          onChange={(e) => onChange({ text: e.target.value })}
          placeholder="e.g. GOOD TIMES, BEST FRIENDS..."
          className="w-full px-3 py-2 bg-[#181614] border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#E88B88] focus:ring-1 focus:ring-[#E88B88] light:bg-white light:border-[#DDD5C7] light:text-[#2B2824] light:placeholder:text-[#A89F91] light:shadow-sm"
        />

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {['BEST FRIENDS', 'GOOD TIMES', "MEMORIES '26", 'SMILE! 😊', 'SWEET LIFE'].map((phrase) => (
            <button
              key={phrase}
              type="button"
              onClick={() => onChange({ text: phrase })}
              className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors light:bg-[#F4EFE6] light:text-[#5A544C] light:hover:text-[#1C1A17] light:hover:bg-[#EAE2D5] light:border light:border-[#DDD5C7]"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>

      {/* Subtext / Booth Label */}
      <div>
        <label className="block text-xs font-medium text-neutral-300 mb-1 light:font-semibold light:text-[#2B2824]">
          Subtext / Location (Optional)
        </label>
        <input
          type="text"
          maxLength={40}
          value={caption.subtext}
          onChange={(e) => onChange({ subtext: e.target.value })}
          placeholder="e.g. SnapStrip Booth #04 • Tokyo"
          className="w-full px-3 py-1.5 bg-[#181614] border border-neutral-700 rounded-xl text-neutral-300 text-xs focus:outline-none focus:border-[#E88B88] light:bg-white light:border-[#DDD5C7] light:text-[#2B2824] light:placeholder:text-[#A89F91] light:shadow-sm"
        />
      </div>

      {/* Date Stamp Toggle */}
      <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between light:border-[#E8E2D8]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-neutral-400 light:text-[#7A7062]" />
          <span className="text-xs font-medium text-neutral-200 light:font-semibold light:text-[#2B2824]">Include Date Stamp</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={setTodayDate}
            className="text-[10px] text-[#E88B88] hover:underline light:font-bold"
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
          className="w-full px-3 py-1.5 bg-[#181614] border border-neutral-700 rounded-lg text-neutral-300 text-xs font-mono light:bg-white light:border-[#DDD5C7] light:text-[#2B2824] light:shadow-sm"
        />
      )}

      {/* Font Selection */}
      <div className="pt-2 border-t border-neutral-800/80 light:border-[#E8E2D8]">
        <label className="block text-xs font-medium text-neutral-300 mb-2 light:font-semibold light:text-[#2B2824]">Typography</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {FONT_OPTIONS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange({ font: f.id as FontFamily })}
              className={`p-2 rounded-lg border text-left text-xs transition-all ${
                caption.font === f.id
                  ? 'bg-[#2B2824] border-[#E88B88] text-white light:bg-[#FFF6F5] light:text-[#1C1A17] light:font-semibold light:shadow-sm'
                  : 'bg-[#181614] border-neutral-800 text-neutral-400 hover:border-neutral-700 light:bg-white light:border-[#E8E2D8] light:text-[#4A4237] light:hover:border-[#D5C4A1]'
              } ${f.className}`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Alignment, Uppercase, and Size */}
      <div className="pt-2 border-t border-neutral-800/80 grid grid-cols-2 gap-3 light:border-[#E8E2D8]">
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1 light:font-semibold light:text-[#2B2824]">Alignment</label>
          <div className="flex bg-[#181614] p-1 rounded-xl border border-neutral-800 gap-1 light:bg-[#F4EFE6] light:border-[#DDD5C7]">
            <button
              type="button"
              onClick={() => onChange({ align: 'left' })}
              className={`flex-1 py-1 rounded flex items-center justify-center ${
                caption.align === 'left' ? 'bg-[#2B2824] text-white light:bg-white light:text-[#1C1A17] light:shadow-sm' : 'text-neutral-500 hover:text-white light:text-[#7A7062] light:hover:text-[#1C1A17]'
              }`}
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange({ align: 'center' })}
              className={`flex-1 py-1 rounded flex items-center justify-center ${
                caption.align === 'center' ? 'bg-[#2B2824] text-white light:bg-white light:text-[#1C1A17] light:shadow-sm' : 'text-neutral-500 hover:text-white light:text-[#7A7062] light:hover:text-[#1C1A17]'
              }`}
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange({ align: 'right' })}
              className={`flex-1 py-1 rounded flex items-center justify-center ${
                caption.align === 'right' ? 'bg-[#2B2824] text-white light:bg-white light:text-[#1C1A17] light:shadow-sm' : 'text-neutral-500 hover:text-white light:text-[#7A7062] light:hover:text-[#1C1A17]'
              }`}
            >
              <AlignRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1 light:font-semibold light:text-[#2B2824]">Case Style</label>
          <div className="flex bg-[#181614] p-1 rounded-xl border border-neutral-800 gap-1 text-xs font-medium light:bg-[#F4EFE6] light:border-[#DDD5C7]">
            <button
              type="button"
              onClick={() => onChange({ uppercase: true })}
              className={`flex-1 py-1 rounded ${
                caption.uppercase ? 'bg-[#2B2824] text-white light:bg-white light:text-[#1C1A17] light:shadow-sm light:font-bold' : 'text-neutral-500 hover:text-white light:text-[#7A7062] light:hover:text-[#1C1A17]'
              }`}
            >
              UPPER
            </button>
            <button
              type="button"
              onClick={() => onChange({ uppercase: false })}
              className={`flex-1 py-1 rounded ${
                !caption.uppercase ? 'bg-[#2B2824] text-white light:bg-white light:text-[#1C1A17] light:shadow-sm light:font-bold' : 'text-neutral-500 hover:text-white light:text-[#7A7062] light:hover:text-[#1C1A17]'
              }`}
            >
              Normal
            </button>
          </div>
        </div>
      </div>

      {/* Font Color */}
      <div className="pt-2 border-t border-neutral-800/80 light:border-[#E8E2D8]">
        <label className="block text-xs font-medium text-neutral-300 mb-1.5 light:font-semibold light:text-[#2B2824]">Caption Color</label>
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_CAPTION_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onChange({ color: c })}
              className={`w-6 h-6 rounded-full border border-black/40 transition-transform ${
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

