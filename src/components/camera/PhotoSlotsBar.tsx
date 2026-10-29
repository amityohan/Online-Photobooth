import React from 'react';
import { CapturedPhoto } from '../../types/photobooth';
import { RefreshCw, Check } from 'lucide-react';

export interface PhotoSlotsBarProps {
  requiredCount: number;
  photos: CapturedPhoto[];
  retakeIndex: number | null;
  onRetake: (index: number) => void;
  onSlotClick?: (index: number) => void;
}

export const PhotoSlotsBar: React.FC<PhotoSlotsBarProps> = ({
  requiredCount,
  photos,
  retakeIndex,
  onRetake,
  onSlotClick,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1 px-1">
      {Array.from({ length: requiredCount }).map((_, index) => {
        const photo = photos[index];
        const isRetakingThis = retakeIndex === index;
        const isNextSlot = photos.length === index && retakeIndex === null;

        return (
          <div
            key={index}
            onClick={() => onSlotClick?.(index)}
            className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 overflow-hidden shrink-0 flex items-center justify-center transition-all bg-[#F9F5EC] ${
              isRetakingThis
                ? 'border-[#E88B88] ring-2 ring-[#E88B88]/40 scale-105'
                : isNextSlot
                ? 'border-amber-500 animate-pulse-subtle'
                : photo
                ? 'border-[#C4B59D]'
                : 'border-[#DDD5C7]'
            }`}
          >
            {photo ? (
              <>
                <img
                  src={photo.dataUrl}
                  alt={`Slot ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Retake icon button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRetake(index);
                  }}
                  title={`Retake photo ${index + 1}`}
                  className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-black/60 hover:bg-[#E88B88] text-white hover:text-black flex items-center justify-center transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>

                <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              </>
            ) : (
              <span className="text-xs font-mono text-[#8C8275]">
                #{index + 1}
              </span>
            )}

            {isRetakingThis && (
              <div className="absolute inset-0 bg-[#E88B88]/20 flex items-center justify-center">
                <span className="text-[9px] font-bold bg-[#E88B88] text-black px-1 rounded">
                  Retaking
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

