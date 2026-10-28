import React from 'react';
import { PhotoFilter } from '../../types/photobooth';
import { Slider } from '../ui/Slider';
import { RotateCcw } from 'lucide-react';

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
}

const FILTER_PRESETS: { id: PhotoFilter; label: string; previewClass: string }[] = [
  { id: 'none', label: 'Original', previewClass: '' },
  { id: 'bw', label: 'B&W Classic', previewClass: 'grayscale contrast-125' },
  { id: 'sepia', label: 'Sepia 70s', previewClass: 'sepia contrast-105' },
  { id: 'vintage', label: 'Vintage Tone', previewClass: 'sepia-[0.35] contrast-110' },
  { id: 'kodachrome', label: '35mm Film', previewClass: 'saturate-125 contrast-120' },
  { id: 'y2k', label: 'Y2K Cyber', previewClass: 'saturate-150 contrast-125 hue-rotate-[-10deg]' },
  { id: 'soft', label: 'Soft Glow', previewClass: 'brightness-105 contrast-90' },
  { id: 'noir', label: 'Moody Noir', previewClass: 'grayscale contrast-150 brightness-90' },
];

export const FilterControls: React.FC<FilterControlsProps> = ({
  currentFilter,
  onFilterChange,
  adjustments,
  onAdjustmentChange,
  onResetAdjustments,
}) => {
  return (
    <div className="space-y-4">
      {/* Filter Presets Grid */}
      <div>
        <label className="block text-xs font-medium text-neutral-300 mb-2">Preset Filters</label>
        <div className="grid grid-cols-4 gap-2">
          {FILTER_PRESETS.map((p) => {
            const isSelected = currentFilter === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onFilterChange(p.id)}
                className={`p-2 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-[#2B2824] border-[#E88B88] text-white ring-1 ring-[#E88B88]'
                    : 'bg-[#181614] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <div
                  className={`w-full h-8 rounded-md mb-1.5 bg-gradient-to-tr from-amber-600 via-rose-500 to-indigo-600 ${p.previewClass}`}
                />
                <span className="block text-[10px] font-medium truncate">{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fine-Tuning Sliders */}
      <div className="pt-2 border-t border-neutral-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-300">Fine Adjustments</span>
          <button
            type="button"
            onClick={onResetAdjustments}
            className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Sliders</span>
          </button>
        </div>

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
  );
};
