import React, { useMemo } from 'react';
import { CapturedPhoto, PhotoFilter } from '../../types/photobooth';
import { FILTER_PRESETS, FilterPresetItem } from '../../config/filters';
import { Slider } from '../ui/Slider';
import { RotateCcw, Check, Camera, Sparkles } from 'lucide-react';
import { getFilterString, resolvePhotoAdjustments } from '../../services/imageRenderer';

export type { FilterPresetItem };
export { FILTER_PRESETS };

export interface FilterControlsProps {
  currentFilter: PhotoFilter;
  onFilterChange: (filter: PhotoFilter) => void;
  adjustments: {
    brightness: number;
    contrast: number;
    saturation: number;
    sepia: number;
  };
  onAdjustmentChange: (key: 'brightness' | 'contrast' | 'saturation' | 'sepia', value: number) => void;
  onResetAdjustments: () => void;
  previewPhoto?: CapturedPhoto | null;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  currentFilter,
  onFilterChange,
  adjustments,
  onAdjustmentChange,
  onResetAdjustments,
  previewPhoto,
}) => {
  const hasPhoto = Boolean(previewPhoto && previewPhoto.dataUrl);

  // Pre-calculate filter styles for all presets
  const filterStyles = useMemo(() => {
    const map: Record<PhotoFilter, string> = {} as Record<PhotoFilter, string>;
    for (const preset of FILTER_PRESETS) {
      const presetAdjustments = resolvePhotoAdjustments(undefined, preset.id, adjustments);
      map[preset.id] = getFilterString(preset.id, presetAdjustments);
    }
    return map;
  }, [adjustments]);

  return (
    <div className="space-y-5">
      {/* Visual Filter Gallery */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <label className="block text-xs font-semibold text-neutral-200 light:text-[#2B2824]">
              Preset Filters
            </label>
            <p className="text-[11px] text-neutral-400 light:text-[#7A7062]">
              {hasPhoto
                ? 'Previewing effects on your first captured shot'
                : 'Select a preset style for your photobooth strip'}
            </p>
          </div>
          {currentFilter !== 'none' && (
            <button
              type="button"
              onClick={() => onFilterChange('none')}
              className="text-[11px] text-[#E88B88] hover:underline font-medium"
            >
              Reset to Original
            </button>
          )}
        </div>

        {hasPhoto && previewPhoto ? (
          /* Live visual preview grid showing the user's actual photo */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {FILTER_PRESETS.map((p) => {
              const isSelected = currentFilter === p.id;
              const filterStyle = filterStyles[p.id] || 'none';

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onFilterChange(p.id)}
                  title={`${p.label} - ${p.tagline}`}
                  className={`group relative p-2 rounded-xl border text-left transition-all overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#2B2824] border-[#E88B88] text-white ring-2 ring-[#E88B88] shadow-md light:bg-[#FFF6F5] light:text-[#1C1A17] light:border-[#E88B88]'
                      : 'bg-[#181614] border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-[#201D1A] light:bg-white light:border-[#E8E2D8] light:text-[#4A4237] light:hover:border-[#D5C4A1] light:hover:bg-[#FAF7F2] shadow-sm'
                  }`}
                >
                  {/* Photo Thumbnail with Filter Applied */}
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-neutral-900 light:bg-neutral-100">
                    <img
                      src={previewPhoto.dataUrl}
                      alt={p.label}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      style={{ filter: filterStyle }}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />

                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#E88B88] text-neutral-900 flex items-center justify-center shadow-md animate-fade-in">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Preset Label & Tagline */}
                  <div className="pt-2 px-0.5">
                    <span className="block text-xs font-semibold truncate leading-tight">
                      {p.label}
                    </span>
                    <span className="block text-[10px] text-neutral-400 light:text-[#7A7062] truncate mt-0.5">
                      {p.tagline}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Empty State when no photos have been captured yet */
          <div className="space-y-3">
            <div className="p-6 rounded-2xl border border-dashed border-neutral-700/80 bg-neutral-900/40 text-center flex flex-col items-center justify-center gap-2.5 light:border-[#DDD5C7] light:bg-[#F9F5EC]">
              <div className="w-11 h-11 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center light:bg-white light:text-[#7A7062] light:shadow-sm">
                <Camera className="w-5 h-5 text-[#E88B88]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-neutral-200 light:text-[#2B2824]">
                  No Photos Captured Yet
                </h4>
                <p className="text-[11px] text-neutral-400 max-w-xs light:text-[#5A544C] mx-auto">
                  Take photos with your camera or upload images to preview every filter live on your actual shots.
                </p>
              </div>
            </div>

            {/* Selectable Preset Pills Fallback */}
            <div>
              <span className="block text-[11px] font-medium text-neutral-400 light:text-[#7A7062] mb-1.5">
                Pre-select a starting filter:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {FILTER_PRESETS.map((p) => {
                  const isSelected = currentFilter === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onFilterChange(p.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#2B2824] border-[#E88B88] text-[#E88B88] light:bg-[#FFF6F5] light:border-[#E88B88]'
                          : 'bg-[#181614] border-neutral-800 text-neutral-300 hover:border-neutral-700 light:bg-white light:border-[#E8E2D8] light:text-[#4A4237]'
                      }`}
                    >
                      <span className="truncate">{p.label}</span>
                      {isSelected && <Check className="w-3 h-3 text-[#E88B88] shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fine-Tuning Sliders */}
      <div className="pt-3 border-t border-neutral-800/80 space-y-3.5 light:border-[#E8E2D8]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-neutral-200 light:text-[#2B2824]">
              Fine Adjustments
            </span>
            <span className="block text-[10px] text-neutral-400 light:text-[#7A7062]">
              Customize brightness, contrast, and tones
            </span>
          </div>
          <button
            type="button"
            onClick={onResetAdjustments}
            className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 light:text-[#7A7062] light:hover:text-[#1C1A17] light:font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Sliders</span>
          </button>
        </div>

        <div className="space-y-3">
          <Slider
            label="Brightness"
            value={adjustments.brightness}
            min={70}
            max={130}
            step={2}
            unit="%"
            onChange={(val) => onAdjustmentChange('brightness', val)}
            onReset={() => onAdjustmentChange('brightness', 100)}
          />

          <Slider
            label="Contrast"
            value={adjustments.contrast}
            min={70}
            max={140}
            step={2}
            unit="%"
            onChange={(val) => onAdjustmentChange('contrast', val)}
            onReset={() => onAdjustmentChange('contrast', 100)}
          />

          <Slider
            label="Saturation"
            value={adjustments.saturation}
            min={0}
            max={180}
            step={5}
            unit="%"
            onChange={(val) => onAdjustmentChange('saturation', val)}
            onReset={() => onAdjustmentChange('saturation', 100)}
          />

          <Slider
            label="Sepia Tone"
            value={adjustments.sepia}
            min={0}
            max={100}
            step={5}
            unit="%"
            onChange={(val) => onAdjustmentChange('sepia', val)}
            onReset={() => onAdjustmentChange('sepia', 0)}
          />
        </div>
      </div>
    </div>
  );
};
