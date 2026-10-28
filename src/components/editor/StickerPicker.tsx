import React from 'react';
import { StickerItem } from '../../types/photobooth';
import { STICKER_PRESETS } from '../../config/stickers';
import { Trash2, Plus, Sparkles } from 'lucide-react';

export interface StickerPickerProps {
  stickers: StickerItem[];
  onAddSticker: (emoji: string, label: string) => void;
  onRemoveSticker: (id: string) => void;
  onClearStickers: () => void;
}

export const StickerPicker: React.FC<StickerPickerProps> = ({
  stickers,
  onAddSticker,
  onRemoveSticker,
  onClearStickers,
}) => {
  return (
    <div className="space-y-4">
      {/* Active stickers list */}
      <div>
        <div className="flex items-center justify-between text-xs text-[#2B2824] mb-2">
          <span className="font-semibold text-[#2B2824]">
            Active Stickers ({stickers.length})
          </span>
          {stickers.length > 0 && (
            <button
              type="button"
              onClick={onClearStickers}
              className="text-[11px] text-rose-500 hover:text-rose-600 flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {stickers.length === 0 ? (
          <p className="text-xs text-[#7A7062] bg-[#FAF7F2] p-3 rounded-xl border border-[#DDD5C7] text-center">
            No stickers added yet. Tap below to decorate your photobooth strip!
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {stickers.map((s) => (
              <div
                key={s.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F4EFE6] border border-[#DDD5C7] rounded-full text-xs text-[#1C1A17] shadow-xs"
              >
                <span>{s.emoji}</span>
                <span className="text-[10px] text-[#7A7062]">{s.label}</span>
                <button
                  type="button"
                  onClick={() => onRemoveSticker(s.id)}
                  className="w-3.5 h-3.5 rounded-full hover:bg-[#DDD5C7] flex items-center justify-center text-[#7A7062] hover:text-[#1C1A17]"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preset Stickers Palette */}
      <div className="pt-2 border-t border-[#E8E2D8]">
        <label className="block text-xs font-semibold text-[#2B2824] mb-2">
          Click to Add Sticker
        </label>
        <div className="grid grid-cols-6 gap-2">
          {STICKER_PRESETS.map((p, idx) => (
            <button
              key={`${p.emoji}-${idx}`}
              type="button"
              onClick={() => onAddSticker(p.emoji, p.label)}
              title={p.label}
              className="h-10 rounded-xl bg-white border border-[#E8E2D8] hover:border-[#D5C4A1] hover:bg-[#FAF7F2] hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-xl shadow-xs"
            >
              {p.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

