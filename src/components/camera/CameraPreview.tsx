import React from 'react';
import { CountdownOverlay } from './CountdownOverlay';
import { Button } from '../ui/Button';
import { AlertCircle, Camera, RefreshCw, Upload, Image as ImageIcon } from 'lucide-react';

export interface CameraPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isStreaming: boolean;
  isLoading: boolean;
  error: string | null;
  permissionDenied: boolean;
  isMirrored: boolean;
  countdownValue: number;
  isFlashing: boolean;
  onRetry: () => void;
  onUseSamplePhotos: () => void;
  onUploadPhoto?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CameraPreview: React.FC<CameraPreviewProps> = ({
  videoRef,
  isStreaming,
  isLoading,
  error,
  permissionDenied,
  isMirrored,
  countdownValue,
  isFlashing,
  onRetry,
  onUseSamplePhotos,
  onUploadPhoto,
}) => {
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[580px] bg-neutral-900 rounded-2xl overflow-hidden border border-[#DDD5C7] shadow-lg flex items-center justify-center">
      {/* Live Video Stream */}
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        className={`w-full h-full object-cover transition-transform ${
          isMirrored ? 'scale-x-[-1]' : ''
        } ${isStreaming ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Countdown and Flash animations */}
      <CountdownOverlay value={countdownValue} isFlashing={isFlashing} />

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 gap-3">
          <div className="w-10 h-10 border-3 border-[#E88B88] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-neutral-200 font-medium">Starting camera...</p>
        </div>
      )}

      {/* Error or Permission Denied State */}
      {error && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#FFFDF9]/95 z-20">
          <div className="w-14 h-14 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4 border border-rose-500/20">
            <AlertCircle className="w-7 h-7" />
          </div>

          <h3 className="text-lg font-serif font-bold text-neutral-900 mb-2">
            {permissionDenied ? 'Camera Permission Required' : 'Camera Unavailable'}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mb-6 leading-relaxed">
            {error}
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant="primary"
              size="sm"
              icon={<RefreshCw className="w-3.5 h-3.5" />}
              onClick={onRetry}
            >
              Try Again
            </Button>

            <Button
              variant="secondary"
              size="sm"
              icon={<ImageIcon className="w-3.5 h-3.5 text-[#E88B88]" />}
              onClick={onUseSamplePhotos}
            >
              Use Sample Photos
            </Button>

            {onUploadPhoto && (
              <label className="cursor-pointer inline-flex items-center justify-center font-medium transition-all text-xs px-3 py-1.5 rounded-lg gap-1.5 bg-white hover:bg-[#F5EFE6] text-[#2B2824] border border-[#DDD5C7] shadow-sm">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onUploadPhoto}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      )}

      {/* Not streaming and no error (initial cold state) */}
      {!isStreaming && !isLoading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#F9F5EC]">
          <Camera className="w-12 h-12 text-neutral-400 mb-3" />
          <p className="text-sm text-neutral-600 mb-4">Camera preview is ready</p>
          <Button variant="primary" onClick={onRetry}>
            Enable Camera
          </Button>
        </div>
      )}

      {/* Camera Live Indicator Badge */}
      {isStreaming && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-white font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE</span>
        </div>
      )}
    </div>
  );
};

