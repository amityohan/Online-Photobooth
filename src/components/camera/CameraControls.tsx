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
  Volume2,
  VolumeX,
} from 'lucide-react';

export interface CameraControlsProps {
  devices: CameraDevice[];
  currentDeviceId: string | null;
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
  isReadyToCapture,
  capturedCount,
  requiredCount,
  retakeIndex,
  isSoundEnabled,
  onToggleSound,
}) => {
  const isSequenceFinished = capturedCount >= requiredCount && retakeIndex === null;

  return (
    <div className="w-full bg-white border border-[#E8E2D8] rounded-2xl p-4 flex flex-col gap-4 shadow-sm">
      {/* Top Row: Camera Options & Utilities */}
      <div className="flex items-center justify-between gap-2 flex-wrap text-xs text-[#5A544C]">
        {/* Countdown duration presets */}
        <div className="flex items-center gap-1 bg-[#F4EFE6] p-1 rounded-xl border border-[#DDD5C7]">
          <Clock className="w-3.5 h-3.5 text-[#8C8275] ml-1.5 mr-0.5" />
          {[0, 3, 5, 10].map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => onSelectCountdown(sec)}
              className={`px-2 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                countdownDuration === sec
                  ? 'bg-[#E88B88] text-neutral-900 font-bold'
                  : 'text-[#7A7062] hover:text-[#1C1A17]'
              }`}
            >
              {sec === 0 ? 'Off' : `${sec}s`}
            </button>
          ))}
        </div>

        {/* Camera Tools: Flip Front/Back, Mirror, Sound, Sample Photos */}
        <div className="flex items-center gap-1.5">
          {devices.length > 1 && (
            <button
              type="button"
              onClick={onSwitchFacing}
              title="Switch camera"
              className="p-2 rounded-xl bg-[#F9F5EC] border border-[#DDD5C7] text-[#5A544C] hover:text-[#1C1A17] hover:bg-[#F2ECE1] transition-colors"
            >
              <SwitchCamera className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onToggleMirror}
            title={isMirrored ? 'Mirrored preview ON' : 'Mirrored preview OFF'}
            className={`p-2 rounded-xl border transition-colors ${
              isMirrored
                ? 'bg-[#FDE8E6] border-[#E88B88] text-[#E88B88]'
                : 'bg-[#F9F5EC] border-[#DDD5C7] text-[#7A7062] hover:text-[#1C1A17]'
            }`}
          >
            <FlipHorizontal className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            title={isSoundEnabled ? 'Shutter audio ON' : 'Audio muted'}
            className="p-2 rounded-xl bg-[#F9F5EC] border border-[#DDD5C7] text-[#5A544C] hover:text-[#1C1A17] hover:bg-[#F2ECE1] transition-colors"
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-neutral-400" />}
          </button>

          <button
            type="button"
            onClick={onUseSamplePhotos}
            title="Load sample photo booth set"
            className="px-2.5 py-1.5 rounded-xl bg-[#F9F5EC] border border-[#DDD5C7] text-xs text-[#3D342B] hover:text-[#1C1A17] hover:border-[#E88B88] transition-colors flex items-center gap-1 font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E88B88]" />
            <span className="hidden sm:inline">Sample Set</span>
          </button>
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
              className="text-xs text-[#7A7062] hover:text-rose-600 flex items-center gap-1 transition-colors"
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
                className="w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1.5 bg-[#FAF7F2] border-4 border-[#E88B88] shadow-[0_0_20px_rgba(232,139,136,0.35)] hover:shadow-[0_0_30px_rgba(232,139,136,0.55)] active:scale-95 transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <div className="w-full h-full rounded-full bg-[#E88B88] hover:bg-[#d97774] flex items-center justify-center text-neutral-900 transition-colors shadow-inner">
                  <Camera className="w-8 h-8" />
                </div>
              </button>

              <span className="block text-center text-[11px] font-medium text-[#7A7062] mt-2">
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
              className="text-xs text-[#E88B88] hover:text-[#d97774] font-bold flex items-center justify-end gap-1 transition-colors disabled:opacity-40"
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

