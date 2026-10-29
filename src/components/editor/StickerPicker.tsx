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
        <div className="flex items-center justify-between text-xs text-neutral-300 mb-2 light:text-[#2B2824]">
          <span className="font-medium text-neutral-200 light:font-semibold light:text-[#2B2824]">
            Active Stickers ({stickers.length})
          </span>
          {stickers.length > 0 && (
            <button
              type="button"
              onClick={onClearStickers}
              className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 light:text-rose-500 light:hover:text-rose-600 light:font-semibold"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {stickers.length === 0 ? (
          <p className="text-xs text-neutral-500 bg-[#181614] p-3 rounded-xl border border-neutral-800 text-center light:text-[#7A7062] light:bg-[#FAF7F2] light:border-[#DDD5C7]">
            No stickers added yet. Tap below to decorate your photobooth strip!
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {stickers.map((s) => (
              <div
                key={s.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#2B2824] border border-neutral-700 rounded-full text-xs text-white light:bg-[#F4EFE6] light:border-[#DDD5C7] light:text-[#1C1A17] light:shadow-xs"
              >
                <span>{s.emoji}</span>
                <span className="text-[10px] text-neutral-400 light:text-[#7A7062]">{s.label}</span>
                <button
                  type="button"
                  onClick={() => onRemoveSticker(s.id)}
                  className="w-3.5 h-3.5 rounded-full hover:bg-neutral-600 flex items-center justify-center text-neutral-400 hover:text-white light:hover:bg-[#DDD5C7] light:text-[#7A7062] light:hover:text-[#1C1A17]"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preset Stickers Palette */}
      <div className="pt-2 border-t border-neutral-800/80 light:border-[#E8E2D8]">
        <label className="block text-xs font-medium text-neutral-300 mb-2 light:font-semibold light:text-[#2B2824]">
          Click to Add Sticker
        </label>
        <div className="grid grid-cols-6 gap-2">
          {STICKER_PRESETS.map((p, idx) => (
            <button
              key={`${p.emoji}-${idx}`}
              type="button"
              onClick={() => onAddSticker(p.emoji, p.label)}
              title={p.label}
              className="h-10 rounded-xl bg-[#181614] border border-neutral-800 hover:border-neutral-700 hover:bg-[#2B2824] hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-xl light:bg-white light:border-[#E8E2D8] light:hover:border-[#D5C4A1] light:hover:bg-[#FAF7F2] light:shadow-xs"
            >
              {p.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

