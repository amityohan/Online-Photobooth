import { useState, useEffect, useRef, useCallback } from 'react';
import { CameraDevice } from '../types/photobooth';

export interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  devices: CameraDevice[];
  currentDeviceId: string | null;
  facingMode: 'user' | 'environment';
  isStreaming: boolean;
  isLoading: boolean;
  error: string | null;
  permissionDenied: boolean;
  isMirrored: boolean;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  switchFacingMode: () => void;
  selectDevice: (deviceId: string) => void;
  toggleMirror: () => void;
  captureFrame: () => string | null;
}

export function useCamera(): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [devices, setDevices] = useState<CameraDevice[]>([]);
  const [currentDeviceId, setCurrentDeviceId] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isMirrored, setIsMirrored] = useState(true);

  // Stop active camera stream tracks
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, [stream]);

  // Enumerate connected cameras
  const refreshDevices = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
    try {
      const devList = await navigator.mediaDevices.enumerateDevices();
      const videoDevs = devList
        .filter((d) => d.kind === 'videoinput')
        .map((d, i) => {
          const label = d.label || `Camera ${i + 1}`;
          const isFront = /front|user|facetime|selfie/i.test(label);
          const isBack = /back|rear|environment/i.test(label);
          return {
            deviceId: d.deviceId,
            label,
            facing: isFront ? ('user' as const) : isBack ? ('environment' as const) : ('unknown' as const),
          };
        });
      setDevices(videoDevs);
    } catch {
      // Ignore enumeration errors
    }
  }, []);

  // Initialize or re-initialize camera stream
  const startCamera = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Camera access is not supported by this browser. You can still upload or use sample photos.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPermissionDenied(false);

    // Stop existing stream first
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }

    const constraints: MediaStreamConstraints = {
      audio: false,
      video: currentDeviceId
        ? {
            deviceId: { exact: currentDeviceId },
            width: { ideal: 1920, max: 2560 },
            height: { ideal: 1080, max: 1440 },
          }
        : {
            facingMode: facingMode === 'environment'
              ? { exact: 'environment' }
              : { ideal: 'user' },
            width: { ideal: 1920, max: 2560 },
            height: { ideal: 1080, max: 1440 },
          },
    };

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
          setIsStreaming(true);
          setIsLoading(false);
        };
      } else {
        setIsStreaming(true);
        setIsLoading(false);
      }

      await refreshDevices();
    } catch (err: unknown) {
      setIsLoading(false);
      setIsStreaming(false);
      const e = err as { name?: string; message?: string };
      if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
        setPermissionDenied(true);
        setError('Camera permission was denied. Please allow camera permissions in your browser address bar to snap photos.');
      } else if (e.name === 'NotFoundError' || e.name === 'DevicesNotFoundError') {
        setError('No camera device detected on this device. You can test the photobooth using our photo library.');
      } else if (e.name === 'NotReadableError' || e.name === 'TrackStartError') {
        setError('Your camera is currently in use by another application. Please close other video apps and retry.');
      } else {
        setError(e.message || 'Unable to connect to camera. Please check your permissions and device.');
      }
    }
  }, [currentDeviceId, facingMode, refreshDevices, stream]);

  // Switch between front and rear cameras
  const switchFacingMode = useCallback(() => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    setCurrentDeviceId(null); // Clear specific device to let facingMode drive
    setIsMirrored(nextMode === 'user');
  }, [facingMode]);

  // Select a specific device ID
  const selectDevice = useCallback((deviceId: string) => {
    setCurrentDeviceId(deviceId);
  }, []);

  const toggleMirror = useCallback(() => {
    setIsMirrored((prev) => !prev);
  }, []);

  // Capture a crisp still frame from the live video stream
  const captureFrame = useCallback((): string | null => {
    const video = videoRef.current;
    if (!video || !isStreaming || video.videoWidth === 0) return null;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.save();
    if (isMirrored) {
      // Flip horizontally so the captured photo matches the mirrored preview
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    return canvas.toDataURL('image/jpeg', 0.95);
  }, [isStreaming, isMirrored]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return {
    videoRef,
    stream,
    devices,
    currentDeviceId,
    facingMode,
    isStreaming,
    isLoading,
    error,
    permissionDenied,
    isMirrored,
    startCamera,
    stopCamera,
    switchFacingMode,
    selectDevice,
    toggleMirror,
    captureFrame,
  };
}
