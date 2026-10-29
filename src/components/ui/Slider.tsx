import React from 'react';

export interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  onReset?: () => void;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
  onReset,
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <label className="font-medium text-neutral-800">{label}</label>
        <div className="flex items-center gap-2">
          <span className="font-mono text-neutral-500">
            {value}
            {unit}
          </span>
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="text-[10px] text-neutral-400 hover:text-neutral-700 underline"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-[#E2DACD] rounded-lg appearance-none cursor-pointer accent-[#E88B88] focus:outline-none"
      />
    </div>
  );
};

