import React from 'react';
import {
  CapturedPhoto,
  CustomizationSettings,
  PhotoAdjustments,
} from '../../types/photobooth';
import { STRIP_LAYOUTS } from '../../config/layouts';
import { FONT_OPTIONS } from '../../config/fonts';
import { getFilterString } from '../../services/imageRenderer';
import { Camera, RefreshCw } from 'lucide-react';

export interface StripRendererProps {
  photos: CapturedPhoto[];
  settings: CustomizationSettings;
  onRetakePhoto?: (index: number) => void;
  onSlotClick?: (index: number) => void;
  isInteractive?: boolean;
  className?: string;
  id?: string;
}

export const StripRenderer: React.FC<StripRendererProps> = ({
  photos,
  settings,
  onRetakePhoto,
  onSlotClick,
  isInteractive = false,
  className = '',
  id,
}) => {
  const layout = STRIP_LAYOUTS[settings.layoutId] || STRIP_LAYOUTS['classic-strip'];
  const font = FONT_OPTIONS.find((f) => f.id === settings.caption.font) || FONT_OPTIONS[0];

  // Texture class
  const textureClass = {
    'none': '',
    'film-grain': 'film-grain',
    'paper-grain': 'paper-grain',
    'dots': 'bg-[radial-gradient(#d4af3733_1px,transparent_1px)] [background-size:16px_16px]',
    'grid': 'bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] [background-size:20px_20px]',
  }[settings.texture || 'none'];

  // Font size class for caption
  const captionSizeClass = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
  }[settings.caption.size || 'md'];

  // Build photo slots array up to required layout photoCount
  const slots = Array.from({ length: layout.photoCount }, (_, idx) => {
    return photos[idx] || null;
  });

  // Calculate dynamic grid template
  const gridTemplateColumns = `repeat(${layout.cols}, minmax(0, 1fr))`;
  const gridTemplateRows = `repeat(${layout.rows}, minmax(0, 1fr))`;

  return (
    <div
      id={id}
      className={`relative select-none transition-all duration-300 shadow-2xl overflow-hidden flex flex-col justify-between ${textureClass} ${className}`}
      style={{
        backgroundColor: layout.isFilmStyle ? '#11100E' : settings.backgroundColor,
        background: layout.isFilmStyle
          ? '#11100E'
          : settings.backgroundType === 'gradient' && settings.backgroundGradient
          ? settings.backgroundGradient
          : settings.backgroundColor,
        borderColor: settings.borderThickness > 0 ? settings.borderColor : 'transparent',
        borderWidth: `${settings.borderThickness}px`,
        borderStyle: settings.borderThickness > 0 ? 'solid' : 'none',
        borderRadius: `${settings.stripRadius}px`,
        padding: `${settings.padding}px`,
        aspectRatio: layout.aspectRatio,
        maxWidth: '100%',
      }}
    >
      {/* 35mm Film Top Sprockets & Markings */}
      {layout.isFilmStyle && (
        <div className="w-full flex items-center justify-between pb-2 border-b border-neutral-800 text-[10px] text-amber-500 font-mono tracking-widest shrink-0">
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="inline-block w-3 h-4 rounded-sm bg-white border border-neutral-700" />
            ))}
          </div>
          <span className="font-bold">KODAK 400TX</span>
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="inline-block w-3 h-4 rounded-sm bg-white border border-neutral-700" />
            ))}
          </div>
        </div>
      )}

      {/* Grid of Photo Slots */}
      <div
        className="grid w-full h-full flex-1"
        style={{
          gridTemplateColumns,
          gridTemplateRows,
          gap: `${settings.gap}px`,
        }}
      >
        {slots.map((photo, index) => {
          const adjustments: PhotoAdjustments = {
            filter: photo?.adjustments?.filter || settings.globalFilter || 'none',
            brightness: ((photo?.adjustments?.brightness ?? 100) * (settings.globalAdjustments.brightness / 100)),
            contrast: ((photo?.adjustments?.contrast ?? 100) * (settings.globalAdjustments.contrast / 100)),
            saturation: ((photo?.adjustments?.saturation ?? 100) * (settings.globalAdjustments.saturation / 100)),
            sepia: Math.max(photo?.adjustments?.sepia ?? 0, settings.globalAdjustments.sepia),
          };

          const filterStyle = getFilterString(adjustments.filter, adjustments);

          return (
            <div
              key={photo ? photo.id : `empty-slot-${index}`}
              onClick={() => onSlotClick?.(index)}
              className={`group relative overflow-hidden flex items-center justify-center transition-all bg-neutral-900/40 ${
                isInteractive ? 'cursor-pointer hover:ring-2 hover:ring-[#E88B88]' : ''
              }`}
              style={{
                borderRadius: `${settings.photoRadius}px`,
              }}
            >
              {photo ? (
                <>
                  <img
                    src={photo.dataUrl}
                    alt={`Photobooth frame ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    style={{
                      filter: filterStyle,
                    }}
                  />

                  {/* Retake hover overlay button */}
                  {isInteractive && onRetakePhoto && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRetakePhoto(index);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-neutral-900/90 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg hover:bg-neutral-800"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#E88B88]" />
                        <span>Retake</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-3 text-neutral-400 gap-1.5 w-full h-full border border-dashed border-neutral-600/50 rounded-[inherit] light:text-neutral-500 light:border-black/20">
                  <Camera className="w-6 h-6 opacity-40 text-neutral-400 light:text-neutral-500" />
                  <span className="text-[11px] font-mono opacity-60 light:opacity-70">Slot {index + 1}</span>
                </div>
              )}

              {/* Film frame marking */}
              {layout.isFilmStyle && (
                <span className="absolute top-1 left-1.5 text-[9px] font-mono text-amber-400 font-bold drop-shadow">
                  ▶ {index + 1}A
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* 35mm Film Bottom Sprockets */}
      {layout.isFilmStyle && (
        <div className="w-full flex items-center justify-between pt-2 border-t border-neutral-800 text-[10px] text-amber-500 font-mono tracking-widest shrink-0">
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="inline-block w-3 h-4 rounded-sm bg-white border border-neutral-700" />
            ))}
          </div>
          <span className="font-bold">SNAPSTRIP SAFETY</span>
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="inline-block w-3 h-4 rounded-sm bg-white border border-neutral-700" />
            ))}
          </div>
        </div>
      )}

      {/* Caption Area */}
      {layout.hasCaptionArea && (settings.caption.text.trim().length > 0 || settings.caption.showDate) && (
        <div
          className={`pt-3 pb-1 shrink-0 ${font.className}`}
          style={{
            textAlign: settings.caption.align,
            color: settings.caption.color || settings.borderColor || '#181818',
          }}
        >
          {settings.caption.text && (
            <p
              className={`font-bold tracking-wide leading-tight ${captionSizeClass} ${
                settings.caption.uppercase ? 'uppercase' : ''
              }`}
            >
              {settings.caption.text}
            </p>
          )}

          {(settings.caption.subtext || settings.caption.showDate) && (
            <div className="text-[11px] sm:text-xs font-typewriter opacity-75 mt-1 flex items-center gap-2 justify-center">
              {settings.caption.subtext && <span>{settings.caption.subtext}</span>}
              {settings.caption.subtext && settings.caption.showDate && <span>•</span>}
              {settings.caption.showDate && <span>{settings.caption.dateText}</span>}
            </div>
          )}
        </div>
      )}

      {/* Stickers Overlay */}
      {settings.stickers && settings.stickers.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {settings.stickers.map((sticker) => (
            <div
              key={sticker.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 select-none drop-shadow-md"
              style={{
                left: `${sticker.x}%`,
                top: `${sticker.y}%`,
                fontSize: `${sticker.size}px`,
                transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
              }}
            >
              {sticker.emoji}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

