import { useState, useRef, useCallback } from 'react';
import { CapturedPhoto, PhotoAdjustments, PhotoFilter } from '../types/photobooth';
import { audioService } from '../services/audioService';

export interface UsePhotoCaptureOptions {
  requiredPhotos: number;
  onPhotoSnapped?: (photo: CapturedPhoto, index: number) => void;
  onSequenceCompleted?: () => void;
}

export function usePhotoCapture({
  requiredPhotos,
  onPhotoSnapped,
  onSequenceCompleted,
}: UsePhotoCaptureOptions) {
  const [photos, setPhotos] = useState<CapturedPhoto[]>([]);
  const [countdownDuration, setCountdownDuration] = useState<number>(3); // 0, 3, 5, 10
  const [countdownValue, setCountdownValue] = useState<number>(0);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [retakeIndex, setRetakeIndex] = useState<number | null>(null);
  const [isAutoCapturing, setIsAutoCapturing] = useState<boolean>(false);

  const countdownTimerRef = useRef<number | null>(null);
  const sequenceActiveRef = useRef<boolean>(false);

  // Clear timers
  const clearTimers = useCallback(() => {
    if (countdownTimerRef.current !== null) {
      window.clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
  }, []);

  // Flash animation trigger
  const triggerFlash = useCallback(() => {
    setIsFlashing(true);
    audioService.playShutterSound();
    setTimeout(() => {
      setIsFlashing(false);
    }, 450);
  }, []);

  // Update photo adjustments
  const updatePhotoAdjustments = useCallback(
    (index: number, adjustments: Partial<PhotoAdjustments>) => {
      setPhotos((prev) => {
        const next = [...prev];
        if (next[index]) {
          next[index] = {
            ...next[index],
            adjustments: {
              ...next[index].adjustments,
              ...adjustments,
            },
          };
        }
        return next;
      });
    },
    []
  );

  // Apply filter to all photos or specific photo
  const setPhotoFilter = useCallback((index: number, filter: PhotoFilter) => {
    updatePhotoAdjustments(index, { filter });
  }, [updatePhotoAdjustments]);

  // Retake individual photo
  const startRetake = useCallback((index: number) => {
    setRetakeIndex(index);
  }, []);

  // Cancel retake
  const cancelRetake = useCallback(() => {
    setRetakeIndex(null);
  }, []);

  // Retake all / restart session
  const retakeAll = useCallback(() => {
    clearTimers();
    sequenceActiveRef.current = false;
    setIsAutoCapturing(false);
    setIsCountingDown(false);
    setCountdownValue(0);
    setRetakeIndex(null);
    setPhotos([]);
  }, [clearTimers]);

  // Cancel any running countdown / capture sequence
  const cancelCapture = useCallback(() => {
    clearTimers();
    sequenceActiveRef.current = false;
    setIsAutoCapturing(false);
    setIsCountingDown(false);
    setCountdownValue(0);
  }, [clearTimers]);

  // Execute snapshot
  const executeSnap = useCallback(
    (
      getFrame: () => string | null,
      targetIndex: number,
      isAuto: boolean
    ) => {
      const dataUrl = getFrame();
      if (!dataUrl) {
        setIsCountingDown(false);
        setIsAutoCapturing(false);
        sequenceActiveRef.current = false;
        return;
      }

      triggerFlash();

      const newPhoto: CapturedPhoto = {
        id: `photo-${Date.now()}-${targetIndex}`,
        dataUrl,
        timestamp: Date.now(),
        adjustments: {
          filter: 'none',
          brightness: 100,
          contrast: 100,
          saturation: 100,
          sepia: 0,
        },
      };

      setPhotos((prev) => {
        const next = [...prev];
        if (retakeIndex !== null) {
          next[retakeIndex] = newPhoto;
        } else {
          next[targetIndex] = newPhoto;
        }
        return next;
      });

      onPhotoSnapped?.(newPhoto, targetIndex);
      setRetakeIndex(null);
      setIsCountingDown(false);

      const nextIndex = targetIndex + 1;

      // If auto capturing and more photos needed
      if (isAuto && sequenceActiveRef.current && nextIndex < requiredPhotos) {
        // Pause 1.8 seconds before next countdown starts so user can pose
        setTimeout(() => {
          if (sequenceActiveRef.current) {
            runCountdown(getFrame, nextIndex, true);
          }
        }, 1800);
      } else if (isAuto && nextIndex >= requiredPhotos) {
        sequenceActiveRef.current = false;
        setIsAutoCapturing(false);
        audioService.playCelebration();
        onSequenceCompleted?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [triggerFlash, retakeIndex, requiredPhotos, onPhotoSnapped, onSequenceCompleted]
  );

  // Run a countdown and then snap
  const runCountdown = useCallback(
    (
      getFrame: () => string | null,
      targetIndex: number,
      isAuto: boolean
    ) => {
      clearTimers();

      if (countdownDuration === 0) {
        executeSnap(getFrame, targetIndex, isAuto);
        return;
      }

      let current = countdownDuration;
      setCountdownValue(current);
      setIsCountingDown(true);
      audioService.playBeep(880, 0.08);

      countdownTimerRef.current = window.setInterval(() => {
        current -= 1;
        if (current > 0) {
          setCountdownValue(current);
          if (current === 1) {
            audioService.playFinalBeep();
          } else {
            audioService.playBeep(880, 0.08);
          }
        } else {
          clearTimers();
          setCountdownValue(0);
          executeSnap(getFrame, targetIndex, isAuto);
        }
      }, 1000);
    },
    [clearTimers, countdownDuration, executeSnap]
  );

  // Single manual capture
  const takeSinglePhoto = useCallback(
    (getFrame: () => string | null) => {
      sequenceActiveRef.current = false;
      setIsAutoCapturing(false);
      const targetIndex = retakeIndex !== null ? retakeIndex : photos.length;
      runCountdown(getFrame, targetIndex, false);
    },
    [photos.length, retakeIndex, runCountdown]
  );

  // Start continuous photobooth sequence (e.g. 4 photos in a row)
  const startCaptureSequence = useCallback(
    (getFrame: () => string | null) => {
      sequenceActiveRef.current = true;
      setIsAutoCapturing(true);
      const startIdx = photos.length >= requiredPhotos ? 0 : photos.length;
      if (photos.length >= requiredPhotos) {
        setPhotos([]);
      }
      runCountdown(getFrame, startIdx, true);
    },
    [photos.length, requiredPhotos, runCountdown]
  );

  // Load photos (for sample photos or file uploads)
  const setPhotoList = useCallback((newPhotos: CapturedPhoto[]) => {
    setPhotos(newPhotos);
  }, []);

  return {
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
    setPhotoFilter,
    setPhotoList,
  };
}

