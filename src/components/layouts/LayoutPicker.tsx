import React from 'react';
import { LayoutId } from '../../types/photobooth';
import { LAYOUT_LIST } from '../../config/layouts';
import { Check } from 'lucide-react';

export interface LayoutPickerProps {
  selectedLayoutId: LayoutId;
  onSelectLayout: (id: LayoutId) => void;
  photoCountAvailable?: number;
}

export const LayoutPicker: React.FC<LayoutPickerProps> = ({
  selectedLayoutId,
  onSelectLayout,
  photoCountAvailable = 0,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {LAYOUT_LIST.map((layout) => {
        const isSelected = layout.id === selectedLayoutId;
        const needsMorePhotos = photoCountAvailable > 0 && photoCountAvailable < layout.photoCount;

        return (
          <button
            key={layout.id}
            type="button"
            onClick={() => onSelectLayout(layout.id)}
            className={`group relative p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              isSelected
                ? 'bg-[#FFF6F5] border-[#E88B88] ring-2 ring-[#E88B88]/30 shadow-sm'
                : 'bg-white border-[#E8E2D8] hover:border-[#D5C4A1] hover:bg-[#FAF7F2] shadow-sm'
            }`}
          >
            {/* Top row: Name & Badge */}
            <div className="flex items-start justify-between gap-1 w-full mb-2">
              <div className="min-w-0">
                <span className="block text-xs font-semibold text-[#1C1A17] truncate">
                  {layout.name}
                </span>
                <span className="block text-[10px] text-[#7A7062] mt-0.5">
                  {layout.photoCount} {layout.photoCount === 1 ? 'photo' : 'photos'} • {layout.cols}x{layout.rows}
                </span>
              </div>
              {isSelected ? (
                <div className="w-5 h-5 rounded-full bg-[#E88B88] text-neutral-900 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              ) : layout.badge ? (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#F2ECE1] text-[#5A544C] font-mono shrink-0">
                  {layout.badge}
                </span>
              ) : null}
            </div>

            {/* Layout Miniature Silhouette */}
            <div className="w-full h-20 bg-[#F7F4EE] rounded-lg p-2 flex items-center justify-center overflow-hidden border border-[#E8E2D8] my-1">
              <div
                className="grid gap-1 border border-[#DDD5C7] bg-white/70 p-1 rounded transition-transform group-hover:scale-105"
                style={{
                  gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
                  gridTemplateRows: `repeat(${layout.rows}, 1fr)`,
                  width: layout.cols > layout.rows ? '80%' : layout.rows >= 4 ? '35%' : '50%',
                  height: layout.cols > layout.rows ? '45%' : '85%',
                }}
              >
                {Array.from({ length: layout.photoCount }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-[2px] transition-colors ${
                      isSelected ? 'bg-[#E88B88]' : 'bg-[#DDD5C7]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {needsMorePhotos && (
              <span className="mt-1 text-[9px] text-amber-600 font-semibold">
                Needs +{layout.photoCount - photoCountAvailable} more
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

