import React from 'react';

export interface CountdownOverlayProps {
  value: number;
  isFlashing: boolean;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({
  value,
  isFlashing,
}) => {
  return (
    <>
      {/* Full screen shutter flash effect */}
      {isFlashing && (
        <div className="absolute inset-0 z-40 bg-white pointer-events-none animate-flash" />
      )}

      {/* Countdown numbers */}
      {value > 0 && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/35 backdrop-blur-[2px] pointer-events-none">
          <div
            key={value}
            className="w-32 h-32 rounded-full border-4 border-white/80 bg-black/60 flex items-center justify-center text-white font-serif font-black text-7xl shadow-2xl animate-fade-in scale-110"
          >
            {value}
          </div>
        </div>
      )}
    </>
  );
};
