import React from 'react';
import { Slider } from '../ui/Slider';

export interface BorderSpacingControlsProps {
  borderColor: string;
  borderThickness: number;
  padding: number;
  gap: number;
  photoRadius: number;
  stripRadius: number;
  onChange: (updates: {
    borderColor?: string;
    borderThickness?: number;
    padding?: number;
    gap?: number;
    photoRadius?: number;
    stripRadius?: number;
  }) => void;
}

const PRESET_BORDER_COLORS = [
  '#181818',
  '#FFFFFF',
  '#8A7156',
  '#D4AF37',
  '#E88B88',
  '#CCD5AE',
  '#FFCCD5',
  '#D8B4FE',
];

export const BorderSpacingControls: React.FC<BorderSpacingControlsProps> = ({
  borderColor,
  borderThickness,
  padding,
  gap,
  photoRadius,
  stripRadius,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Border Color */}
      <div>
        <label className="block text-xs font-medium text-neutral-300 mb-1.5 light:font-semibold light:text-[#2B2824]">Border Color</label>
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_BORDER_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onChange({ borderColor: c })}
              className={`w-6 h-6 rounded-full border border-black/40 transition-transform ${
                borderColor.toLowerCase() === c.toLowerCase()
                  ? 'scale-125 ring-2 ring-[#E88B88]'
                  : 'hover:scale-110'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
          <input
            type="color"
            value={borderColor}
            onChange={(e) => onChange({ borderColor: e.target.value })}
            className="w-7 h-7 rounded-full bg-transparent cursor-pointer"
            title="Custom border color"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-neutral-800/80 space-y-3 light:border-[#E8E2D8]">
        <Slider
          label="Border Thickness"
          value={borderThickness}
          min={0}
          max={24}
          unit="px"
          onChange={(val) => onChange({ borderThickness: val })}
          onReset={() => onChange({ borderThickness: 0 })}
        />

        <Slider
          label="Outer Frame Margin (Padding)"
          value={padding}
          min={10}
          max={48}
          unit="px"
          onChange={(val) => onChange({ padding: val })}
          onReset={() => onChange({ padding: 24 })}
        />

        <Slider
          label="Spacing Between Photos (Gap)"
          value={gap}
          min={0}
          max={32}
          unit="px"
          onChange={(val) => onChange({ gap: val })}
          onReset={() => onChange({ gap: 16 })}
        />

        <Slider
          label="Photo Corner Radius"
          value={photoRadius}
          min={0}
          max={28}
          unit="px"
          onChange={(val) => onChange({ photoRadius: val })}
          onReset={() => onChange({ photoRadius: 0 })}
        />

        <Slider
          label="Strip Outer Corner Radius"
          value={stripRadius}
          min={0}
          max={24}
          unit="px"
          onChange={(val) => onChange({ stripRadius: val })}
          onReset={() => onChange({ stripRadius: 0 })}
        />
      </div>
    </div>
  );
};

