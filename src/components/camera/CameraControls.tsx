import React from 'react';
import { CameraDevice } from '../../types/photobooth';
import { Button } from '../ui/Button';
import {
  Camera,
  FlipHorizontal,
  SwitchCamera,
  Clock,
  Play,
  RotateCcw,
  Sparkles,
  Upload,
  Volume2,
  VolumeX,
} from 'lucide-react';

export interface CameraControlsProps {
  devices: CameraDevice[];
  currentDeviceId: string | null;
  facingMode: 'user' | 'environment';
  onSelectDevice: (deviceId: string) => void;
  onSwitchFacing: () => void;
  isMirrored: boolean;
  onToggleMirror: () => void;
  countdownDuration: number;
  onSelectCountdown: (sec: number) => void;
  isCountingDown: boolean;
  isAutoCapturing: boolean;
  onSingleSnap: () => void;
  onStartSequence: () => void;
  onCancelCapture: () => void;
  onRetakeAll: () => void;
  onUseSamplePhotos: () => void;
  onUploadPhotos: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isReadyToCapture: boolean;
  capturedCount: number;
  requiredCount: number;
  retakeIndex: number | null;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export const CameraControls: React.FC<CameraControlsProps> = ({
  devices,
  currentDeviceId,
  facingMode,
  onSelectDevice,
  onSwitchFacing,
  isMirrored,
  onToggleMirror,
  countdownDuration,
  onSelectCountdown,
  isCountingDown,
  isAutoCapturing,
  onSingleSnap,
  onStartSequence,
  onCancelCapture,
  onRetakeAll,
  onUseSamplePhotos,
  onUploadPhotos,
  isReadyToCapture,
  capturedCount,
  requiredCount,
  retakeIndex,
  isSoundEnabled,
  onToggleSound,
}) => {
  const isSequenceFinished = capturedCount >= requiredCount && retakeIndex === null;

  return (
    <div className="w-full bg-[#181614] border border-neutral-800 rounded-2xl p-4 flex flex-col gap-4 shadow-xl light:bg-white light:border-[#E8E2D8] light:shadow-sm">
      {/* Top Row: Camera Options & Utilities */}
      <div className="flex items-center justify-between gap-2 flex-wrap text-xs text-neutral-300 light:text-[#5A544C]">
        {/* Countdown duration presets */}
        <div className="flex items-center gap-1 bg-[#121212] p-1 rounded-xl border border-neutral-800 light:bg-[#F4EFE6] light:border-[#DDD5C7]">
          <Clock className="w-3.5 h-3.5 text-neutral-400 ml-1.5 mr-0.5 light:text-[#8C8275]" />
          {[0, 3, 5, 10].map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => onSelectCountdown(sec)}
              className={`px-2 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                countdownDuration === sec
                  ? 'bg-[#E88B88] text-neutral-950 font-bold light:text-neutral-900'
                  : 'text-neutral-400 hover:text-white light:text-[#7A7062] light:hover:text-[#1C1A17]'
              }`}
            >
              {sec === 0 ? 'Off' : `${sec}s`}
            </button>
          ))}
        </div>

        {/* Camera Tools: Flip Front/Back, Mirror, Sound, Sample Photos */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onSwitchFacing}
            title={facingMode === 'user' ? 'Switch to rear camera' : 'Switch to front camera'}
            aria-label={facingMode === 'user' ? 'Switch to rear camera' : 'Switch to front camera'}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors light:bg-[#F9F5EC] light:border-[#DDD5C7] light:text-[#5A544C] light:hover:text-[#1C1A17] light:hover:bg-[#F2ECE1]"
          >
            <SwitchCamera className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToggleMirror}
            title={isMirrored ? 'Mirrored preview ON' : 'Mirrored preview OFF'}
            className={`p-2 rounded-xl border transition-colors ${
              isMirrored
                ? 'bg-[#2B2824] border-[#E88B88]/60 text-[#E88B88] light:bg-[#FDE8E6] light:border-[#E88B88]'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white light:bg-[#F9F5EC] light:border-[#DDD5C7] light:text-[#7A7062] light:hover:text-[#1C1A17]'
            }`}
          >
            <FlipHorizontal className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            title={isSoundEnabled ? 'Shutter audio ON' : 'Audio muted'}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors light:bg-[#F9F5EC] light:border-[#DDD5C7] light:text-[#5A544C] light:hover:text-[#1C1A17] light:hover:bg-[#F2ECE1]"
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-neutral-500 light:text-neutral-400" />}
          </button>

          <button
            type="button"
            onClick={onUseSamplePhotos}
            title="Load sample photo booth set"
            className="px-2.5 py-1.5 rounded-xl bg-[#2B2824] border border-neutral-700 text-xs text-cream-200 hover:text-white hover:border-[#E88B88] transition-colors flex items-center gap-1 light:bg-[#F9F5EC] light:border-[#DDD5C7] light:text-[#3D342B] light:hover:text-[#1C1A17] light:font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E88B88]" />
            <span className="hidden sm:inline">Sample Set</span>
          </button>

          <label className="relative inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-neutral-700 bg-[#2B2824] px-2.5 py-1.5 text-xs text-cream-200 transition-colors hover:border-[#E88B88] hover:text-white light:border-[#DDD5C7] light:bg-[#F9F5EC] light:text-[#3D342B] light:hover:text-[#1C1A17]">
            <Upload className="h-3.5 w-3.5 text-[#E88B88]" />
            <span className="hidden sm:inline">Upload Images</span>
            <input
              type="file"
              accept="image/*"
              multiple
              aria-label="Upload images"
              onChange={onUploadPhotos}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
        </div>
      </div>

      {/* Primary Action Row: Shutter & Capture modes */}
      <div className="flex items-center justify-between gap-4 py-1">
        {/* Restart / Retake all */}
        <div className="w-24">
          {capturedCount > 0 && (
            <button
              type="button"
              onClick={onRetakeAll}
              className="text-xs text-neutral-400 hover:text-rose-400 flex items-center gap-1 transition-colors light:text-[#7A7062] light:hover:text-rose-600"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake All</span>
            </button>
          )}
        </div>

        {/* Center: Big Shutter Button */}
        <div className="flex flex-col items-center">
          {isCountingDown || isAutoCapturing ? (
            <Button
              variant="danger"
              size="lg"
              onClick={onCancelCapture}
              className="rounded-full px-6 shadow-xl"
            >
              Cancel ({isAutoCapturing ? 'Auto' : 'Timer'})
            </Button>
          ) : (
            <div className="relative group">
              <button
                type="button"
                disabled={!isReadyToCapture}
                onClick={onSingleSnap}
                className="w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1.5 bg-[#1C1A17] border-4 border-[#E88B88] shadow-[0_0_25px_rgba(232,139,136,0.3)] hover:shadow-[0_0_35px_rgba(232,139,136,0.5)] active:scale-95 transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer light:bg-[#FAF7F2] light:shadow-[0_0_20px_rgba(232,139,136,0.35)] light:hover:shadow-[0_0_30px_rgba(232,139,136,0.55)]"
              >
                <div className="w-full h-full rounded-full bg-[#E88B88] hover:bg-[#d97774] flex items-center justify-center text-neutral-950 transition-colors light:text-neutral-900 light:shadow-inner">
                  <Camera className="w-8 h-8" />
                </div>
              </button>

              <span className="block text-center text-[11px] font-medium text-neutral-400 mt-2 light:text-[#7A7062]">
                {retakeIndex !== null
                  ? `Retake Slot #${retakeIndex + 1}`
                  : `Snap Photo (${capturedCount + 1}/${requiredCount})`}
              </span>
            </div>
          )}
        </div>

        {/* Continuous 4-Photo Sequence trigger */}
        <div className="w-24 text-right">
          {!isCountingDown && !isAutoCapturing && retakeIndex === null && (
            <button
              type="button"
              disabled={!isReadyToCapture}
              onClick={onStartSequence}
              className="text-xs text-[#E88B88] hover:text-[#f4a5a2] font-semibold flex items-center justify-end gap-1 transition-colors disabled:opacity-40 light:hover:text-[#d97774] light:font-bold"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Auto-Snap All</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
