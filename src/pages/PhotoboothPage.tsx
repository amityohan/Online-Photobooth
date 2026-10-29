import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  CapturedPhoto,
  CustomizationSettings,
  LayoutId,
  PhotoboothStep,
  ThemeId,
} from '../types/photobooth';
import { STRIP_LAYOUTS } from '../config/layouts';
import { STRIP_THEMES } from '../config/themes';
import { useCamera } from '../hooks/useCamera';
import { usePhotoCapture } from '../hooks/usePhotoCapture';
import { useHistory } from '../hooks/useHistory';
import { audioService } from '../services/audioService';
import { getSamplePhotoSet } from '../utils/samplePhotos';

import { CameraPreview } from '../components/camera/CameraPreview';
import { CameraControls } from '../components/camera/CameraControls';
import { PhotoSlotsBar } from '../components/camera/PhotoSlotsBar';
import { StripRenderer } from '../components/layouts/StripRenderer';
import { LayoutPicker } from '../components/layouts/LayoutPicker';
import { ThemePicker } from '../components/editor/ThemePicker';
import { CustomizationPanel } from '../components/editor/CustomizationPanel';
import { ExportDialog } from '../components/export/ExportDialog';
import { Button } from '../components/ui/Button';

import {
  Camera,
  LayoutGrid,
  Sliders,
  Download,
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  Sparkles,
  Home,
  Upload,
} from 'lucide-react';

export interface PhotoboothPageProps {
  initialThemeId?: ThemeId;
  initialLayoutId?: LayoutId;
  onExitToHome: () => void;
}

export const PhotoboothPage: React.FC<PhotoboothPageProps> = ({
  initialThemeId = 'classic-bw',
  initialLayoutId = 'classic-strip',
  onExitToHome,
}) => {
  const [currentStep, setCurrentStep] = useState<PhotoboothStep>('layout');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(audioService.isSoundEnabled());

  // Initial Customization State driven by initial theme and layout
  const initialTheme = STRIP_THEMES[initialThemeId] || STRIP_THEMES['classic-bw'];
  const initialLayout = STRIP_LAYOUTS[initialLayoutId] || STRIP_LAYOUTS['classic-strip'];

  const initialSettings: CustomizationSettings = useMemo(
    () => ({
      layoutId: initialLayout.id,
      themeId: initialTheme.id,
      backgroundColor: initialTheme.backgroundColor,
      backgroundGradient: initialTheme.backgroundGradient || '',
      backgroundType: initialTheme.backgroundGradient ? 'gradient' : 'solid',
      texture: initialTheme.texture,
      borderColor: initialTheme.borderColor,
      borderThickness: 12,
      padding: initialLayout.defaultPadding,
      gap: initialLayout.defaultGap,
      photoRadius: 8,
      stripRadius: 12,
      caption: {
        text: 'GOOD TIMES',
        subtext: 'SnapStrip Booth #01',
        showDate: true,
        dateText: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).toUpperCase(),
        font: initialTheme.fontFamily,
        size: 'md',
        color: initialTheme.textColor,
        align: 'center',
        uppercase: true,
      },
      stickers: [
        {
          id: 'default-sparkle',
          emoji: '✨',
          label: 'Sparkle',
          x: 88,
          y: 92,
          size: 24,
          rotation: 12,
        },
      ],
      globalFilter: initialTheme.defaultFilter,
      globalAdjustments: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        sepia: 0,
      },
    }),
    [initialLayout, initialTheme]
  );

  // Undo/Redo Customization History
  const {
    state: settings,
    set: setSettings,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory<CustomizationSettings>(initialSettings);

  const activeLayout = STRIP_LAYOUTS[settings.layoutId] || STRIP_LAYOUTS['classic-strip'];

  // Camera Management
  const camera = useCamera();

  // Photo Capture Session
  const {
    photos,
    countdownDuration,
    setCountdownDuration,
    countdownValue,
    isCountingDown,
    isFlashing,
    retakeIndex,
    isAutoCapturing,
    startRetake,
    cancelRetake,
    retakeAll,
    cancelCapture,
    takeSinglePhoto,
    startCaptureSequence,
    updatePhotoAdjustments,
    setPhotoList,
  } = usePhotoCapture({
    requiredPhotos: activeLayout.photoCount,
    onSequenceCompleted: () => {
      // Once all photos are taken in sequence, automatically advance to editor after a gentle pause!
      setTimeout(() => {
        setCurrentStep('customize');
      }, 900);
    },
  });

  // Start or stop camera based on step
  useEffect(() => {
    if (currentStep === 'camera') {
      camera.startCamera();
    } else {
      camera.stopCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, camera.facingMode, camera.currentDeviceId]);

  // Toggle Sound Effects
  const handleToggleSound = () => {
    const next = !soundEnabled;
    audioService.setSoundEnabled(next);
    setSoundEnabled(next);
  };

  // Keyboard navigation & spacebar capture
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Don't intercept typing
      }

      if (e.code === 'Space' && currentStep === 'camera') {
        e.preventDefault();
        if (!isCountingDown && !isAutoCapturing) {
          takeSinglePhoto(camera.captureFrame);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [camera.captureFrame, currentStep, isAutoCapturing, isCountingDown, takeSinglePhoto]);

  // Load sample photos fallback
  const handleUseSamplePhotos = () => {
    const samples = getSamplePhotoSet(activeLayout.photoCount);
    setPhotoList(samples);
  };

  // User uploaded photos fallback
  const handleUploadPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files).slice(0, activeLayout.photoCount);
    const newPhotos: CapturedPhoto[] = [];

    let loadedCount = 0;
    fileList.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          newPhotos.push({
            id: `upload-${Date.now()}-${index}`,
            dataUrl,
            timestamp: Date.now(),
            adjustments: {
              filter: 'none',
              brightness: 100,
              contrast: 100,
              saturation: 100,
              sepia: 0,
            },
          });
        }
        loadedCount++;
        if (loadedCount === fileList.length) {
          setPhotoList(newPhotos);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Retake photo action: switch back to camera with target index
  const handleRetakeSlot = (index: number) => {
    startRetake(index);
    setCurrentStep('camera');
  };

  const stepsList: { id: PhotoboothStep; label: string; icon: React.ReactNode }[] = [
    { id: 'layout', label: '1. Layout & Theme', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'camera', label: '2. Take Photos', icon: <Camera className="w-4 h-4" /> },
    { id: 'customize', label: '3. Customize Studio', icon: <Sliders className="w-4 h-4" /> },
    { id: 'export', label: '4. Export & Print', icon: <Download className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-[#FBF9F5] flex flex-col light:bg-[#FAF7F2] light:text-[#2B2824]">
      {/* Top Header & Multi-Step Progress Tracker */}
      <header className="sticky top-0 z-30 bg-[#181614]/90 backdrop-blur-md border-b border-neutral-800/80 px-4 sm:px-6 py-3 light:bg-[#FAF7F2]/90 light:border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Exit / Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onExitToHome}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors flex items-center gap-1.5 text-xs light:text-[#5A544C] light:hover:text-[#1C1A17] light:hover:bg-[#F2ECE1] light:font-medium"
              title="Return to home"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E88B88] text-neutral-950 flex items-center justify-center font-bold text-xs light:text-neutral-900">
                <Camera className="w-4 h-4 stroke-[2.4]" />
              </div>
              <span className="text-lg font-serif font-black tracking-tight text-cream-50 hidden sm:inline light:text-[#1C1A17]">
                Snap<span className="text-[#E88B88]">Strip</span>
              </span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="flex items-center gap-1 sm:gap-2 bg-neutral-950/80 p-1 rounded-xl border border-neutral-800/80 light:bg-[#EFE9DF] light:border-[#DDD5C7]">
            {stepsList.map((s, idx) => {
              const isActive = currentStep === s.id;
              const isPast =
                (currentStep === 'camera' && s.id === 'layout') ||
                (currentStep === 'customize' && (s.id === 'layout' || s.id === 'camera')) ||
                (currentStep === 'export' && s.id !== 'export');

              return (
                <button
                  key={s.id}
                  onClick={() => {
                    if (s.id === 'export') {
                      setIsExportOpen(true);
                    } else {
                      setCurrentStep(s.id);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#E88B88] text-neutral-950 font-bold shadow-md light:text-neutral-900 light:shadow-sm'
                      : isPast
                      ? 'text-neutral-300 hover:bg-neutral-800 light:text-[#2B2824] light:hover:bg-[#E2DACD]'
                      : 'text-neutral-500 hover:text-neutral-300 light:text-[#8C8275] light:hover:text-[#2B2824]'
                  }`}
                >
                  <span className="shrink-0">{s.icon}</span>
                  <span className="hidden md:inline">{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Header CTA */}
          <div className="flex items-center gap-2">
            {currentStep === 'camera' && photos.length >= activeLayout.photoCount && (
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
                onClick={() => setCurrentStep('customize')}
              >
                Done Snapping
              </Button>
            )}

            {currentStep === 'customize' && (
              <Button
                variant="primary"
                size="sm"
                icon={<Download className="w-3.5 h-3.5" />}
                onClick={() => setIsExportOpen(true)}
              >
                Save & Print
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Step Workspaces */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 flex flex-col">
        {/* STEP 1: CHOOSE LAYOUT & THEME */}
        {currentStep === 'layout' && (
          <div className="flex-1 flex flex-col justify-between max-w-4xl mx-auto w-full py-4 animate-fade-in">
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-xs font-mono text-[#E88B88] tracking-widest uppercase light:font-semibold">
                  Step 1 of 4
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-cream-50 mt-1 light:text-[#1C1A17]">
                  Choose Your Photobooth Format
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-md mx-auto light:text-[#5A544C]">
                  Pick your strip arrangement. You can always switch layouts later while keeping your photos.
                </p>
              </div>

              {/* Layout Picker Grid */}
              <div>
                <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-3 light:text-[#4A4237]">
                  1. Select Layout Arrangement
                </h3>
                <LayoutPicker
                  selectedLayoutId={settings.layoutId}
                  onSelectLayout={(id) => setSettings((prev) => ({ ...prev, layoutId: id }))}
                  photoCountAvailable={photos.length}
                />
              </div>

              {/* Theme Picker Grid */}
              <div className="pt-4 border-t border-neutral-800 light:border-[#E8E2D8]">
                <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-3 light:text-[#4A4237]">
                  2. Choose Starting Theme
                </h3>
                <ThemePicker
                  selectedThemeId={settings.themeId}
                  onSelectTheme={(themeId) => {
                    const theme = STRIP_THEMES[themeId];
                    if (theme) {
                      setSettings((prev) => ({
                        ...prev,
                        themeId,
                        backgroundColor: theme.backgroundColor,
                        borderColor: theme.borderColor,
                        texture: theme.texture,
                        globalFilter: theme.defaultFilter,
                        caption: {
                          ...prev.caption,
                          font: theme.fontFamily,
                          color: theme.textColor,
                        },
                      }));
                    }
                  }}
                />
              </div>
            </div>

            {/* Bottom Nav Bar */}
            <div className="flex items-center justify-between pt-8 border-t border-neutral-800 mt-8 light:border-[#E8E2D8]">
              <Button variant="ghost" onClick={onExitToHome} icon={<ArrowLeft className="w-4 h-4" />}>
                Cancel
              </Button>

              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={() => setCurrentStep('camera')}
              >
                Continue to Camera ({activeLayout.photoCount} {activeLayout.photoCount === 1 ? 'Photo' : 'Photos'})
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: CAMERA EXPERIENCE */}
        {currentStep === 'camera' && (
          <div className="flex-1 flex flex-col justify-between max-w-4xl mx-auto w-full py-2 animate-fade-in gap-4">
            {/* Camera Session Progress Indicator */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#181614] p-3 rounded-2xl border border-neutral-800 light:bg-white light:p-3.5 light:border-[#E8E2D8] light:shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#2B2824] flex items-center justify-center text-[#E88B88] light:w-9 light:h-9 light:bg-[#F9F5EC] light:border light:border-[#DDD5C7]">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-cream-100 font-serif light:text-[#1C1A17]">
                    {activeLayout.name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 light:text-[#7A7062]">
                    {photos.length} of {activeLayout.photoCount} photos captured
                    {retakeIndex !== null ? ` • Retaking #${retakeIndex + 1}` : ''}
                  </p>
                </div>
              </div>

              {/* Photo slots visual strip bar */}
              <PhotoSlotsBar
                requiredCount={activeLayout.photoCount}
                photos={photos}
                retakeIndex={retakeIndex}
                onRetake={handleRetakeSlot}
              />
            </div>

            {/* Live Camera Viewport */}
            <CameraPreview
              videoRef={camera.videoRef}
              isStreaming={camera.isStreaming}
              isLoading={camera.isLoading}
              error={camera.error}
              permissionDenied={camera.permissionDenied}
              isMirrored={camera.isMirrored}
              countdownValue={countdownValue}
              isFlashing={isFlashing}
              onRetry={camera.startCamera}
              onUseSamplePhotos={handleUseSamplePhotos}
              onUploadPhoto={handleUploadPhotos}
            />

            {/* Tactile Camera Controls */}
            <CameraControls
              devices={camera.devices}
              currentDeviceId={camera.currentDeviceId}
              facingMode={camera.facingMode}
              onSelectDevice={camera.selectDevice}
              onSwitchFacing={camera.switchFacingMode}
              isMirrored={camera.isMirrored}
              onToggleMirror={camera.toggleMirror}
              countdownDuration={countdownDuration}
              onSelectCountdown={setCountdownDuration}
              isCountingDown={isCountingDown}
              isAutoCapturing={isAutoCapturing}
              onSingleSnap={() => takeSinglePhoto(camera.captureFrame)}
              onStartSequence={() => startCaptureSequence(camera.captureFrame)}
              onCancelCapture={cancelCapture}
              onRetakeAll={retakeAll}
              onUseSamplePhotos={handleUseSamplePhotos}
              onUploadPhotos={handleUploadPhotos}
              isReadyToCapture={camera.isStreaming || photos.length < activeLayout.photoCount}
              capturedCount={photos.length}
              requiredCount={activeLayout.photoCount}
              retakeIndex={retakeIndex}
              isSoundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
            />

            {/* Bottom Nav Bar */}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="ghost"
                size="sm"
                icon={<ArrowLeft className="w-3.5 h-3.5" />}
                onClick={() => setCurrentStep('layout')}
              >
                Back to Layouts
              </Button>

              {photos.length > 0 && (
                <Button
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  onClick={() => setCurrentStep('customize')}
                >
                  Proceed to Studio ({photos.length}/{activeLayout.photoCount})
                </Button>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: CUSTOMIZATION STUDIO */}
        {currentStep === 'customize' && (
          <div className="flex-1 flex flex-col lg:flex-row gap-6 animate-fade-in items-start h-full">
            {/* Left: Strip Live Preview Container (Sticky on desktop) */}
            <div className="w-full lg:w-[460px] xl:w-[500px] flex flex-col items-center justify-center bg-neutral-950/60 p-4 sm:p-6 rounded-2xl border border-neutral-800/80 shadow-2xl lg:sticky lg:top-20 light:bg-white light:border-[#E8E2D8] light:shadow-md">
              <div className="w-full flex items-center justify-between text-xs text-neutral-400 mb-3 px-1 light:text-[#5A544C]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-cream-200 light:text-[#1C1A17] light:font-semibold">
                  Live Strip Preview
                </span>
                <span className="text-[11px] text-neutral-500 light:text-[#7A7062]">
                  Tap slot to retake photo
                </span>
              </div>

              {/* The Live Strip Renderer */}
              <div className="w-full flex items-center justify-center py-2 max-h-[72vh] overflow-y-auto">
                <StripRenderer
                  id="print-strip-target"
                  photos={photos}
                  settings={settings}
                  isInteractive={true}
                  onRetakePhoto={handleRetakeSlot}
                  className="max-h-[68vh] w-auto transition-transform duration-300"
                />
              </div>

              {/* Strip stats & switch camera shortcut */}
              <div className="w-full flex items-center justify-between pt-3 mt-2 border-t border-neutral-800 text-[11px] text-neutral-400 light:border-[#E8E2D8] light:text-[#5A544C]">
                <span>{activeLayout.name} • {photos.length} Photos</span>
                <button
                  type="button"
                  onClick={() => setCurrentStep('camera')}
                  className="text-[#E88B88] hover:underline flex items-center gap-1 light:font-medium"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Open Camera</span>
                </button>
              </div>
            </div>

            {/* Right: Customization Controls Panel */}
            <div className="flex-1 w-full min-h-[500px]">
              <CustomizationPanel
                settings={settings}
                onUpdateSettings={setSettings}
                canUndo={canUndo}
                canRedo={canRedo}
                onUndo={undo}
                onRedo={redo}
                photoCountAvailable={photos.length}
                photos={photos}
              />
            </div>
          </div>
        )}
      </main>

      {/* High-Resolution Export & Print Modal Dialog */}
      <ExportDialog
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        photos={photos}
        settings={settings}
      />
    </div>
  );
};
