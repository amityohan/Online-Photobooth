import React, { useState, useEffect } from 'react';
import { CapturedPhoto, CustomizationSettings } from '../../types/photobooth';
import { ExportService } from '../../services/exportService';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import confetti from 'canvas-confetti';
import {
  Download,
  Printer,
  Share2,
  Copy,
  Check,
  Sparkles,
  Layers,
  FileCheck,
} from 'lucide-react';

export interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  photos: CapturedPhoto[];
  settings: CustomizationSettings;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  isOpen,
  onClose,
  photos,
  settings,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [transparentBg, setTransparentBg] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Trigger celebration confetti on modal open
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E88B88', '#F9F5EC', '#D4AF37', '#FF758F'],
        });
      } catch {
        // Ignore
      }

      // Pre-render preview
      ExportService.generateExportImage(photos, settings, 'png', {
        transparentBackground: transparentBg,
      })
        .then((res) => {
          setPreviewUrl(res.dataUrl);
        })
        .catch(() => {});
    } else {
      setCopied(false);
      setShared(false);
      setDownloaded(false);
    }
  }, [isOpen, photos, settings, transparentBg]);

  const handleDownload = async (format: 'png' | 'jpeg') => {
    setIsGenerating(true);
    try {
      const res = await ExportService.generateExportImage(photos, settings, format, {
        transparentBackground: transparentBg && format === 'png',
      });
      ExportService.downloadFile(res.blob, res.filename);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch {
      alert('Failed to generate export file. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = async () => {
    setIsGenerating(true);
    try {
      const res = await ExportService.generateExportImage(photos, settings, 'png', {
        transparentBackground: false,
      });
      // Convert to image element and print
      const img = new Image();
      img.onload = () => {
        const printCanvas = document.createElement('canvas');
        printCanvas.width = img.width;
        printCanvas.height = img.height;
        const ctx = printCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          ExportService.printStrip(printCanvas);
        }
      };
      img.src = res.dataUrl;
    } catch {
      alert('Failed to prepare strip for printing.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    setIsGenerating(true);
    try {
      const res = await ExportService.generateExportImage(photos, settings, 'png', {
        transparentBackground: transparentBg,
      });
      const result = await ExportService.shareImage(res.blob, res.filename);
      if (result === 'shared') {
        setShared(true);
        setTimeout(() => setShared(false), 3000);
      }
    } catch {
      // Ignore
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyClipboard = async () => {
    setIsGenerating(true);
    try {
      const res = await ExportService.generateExportImage(photos, settings, 'png', {
        transparentBackground: transparentBg,
      });
      const success = await ExportService.copyToClipboard(res.blob);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } else {
        alert('Clipboard copy not supported by your browser. Use Download instead.');
      }
    } catch {
      alert('Unable to copy image to clipboard.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Save & Print Your SnapStrip"
      description="High-resolution, 300 DPI printable photobooth strip rendered locally in your browser."
      maxWidth="2xl"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Strip Image Preview Column */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#F7F4EE] p-4 rounded-xl border border-[#E8E2D8] min-h-[300px]">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Final photobooth strip preview"
              className="max-h-[380px] w-auto object-contain shadow-xl rounded"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-neutral-500">
              <Sparkles className="w-8 h-8 animate-spin text-[#E88B88]" />
              <span className="text-xs">Rendering strip...</span>
            </div>
          )}
          <span className="text-[10px] text-[#7A7062] font-mono mt-3">
            Ultra-High Resolution • Studio Print Ready
          </span>
        </div>

        {/* Options & Action Buttons Column */}
        <div className="flex-1 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            {/* Transparent background toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F9F5EC] border border-[#DDD5C7] text-xs">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#E88B88]" />
                <span className="text-[#2B2824] font-semibold">Transparent Background</span>
              </div>
              <input
                type="checkbox"
                checked={transparentBg}
                onChange={(e) => setTransparentBg(e.target.checked)}
                className="w-4 h-4 accent-[#E88B88] rounded cursor-pointer"
              />
            </div>

            {/* Print Friendly Note */}
            <div className="p-3 rounded-xl bg-[#F4EFE6] border border-[#DDD5C7] text-[#5A544C] text-xs leading-relaxed flex items-start gap-2.5">
              <FileCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Suitable for photo paper, scrapbook keepsakes, or social media. No compression artifacts or watermarks.
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2 border-t border-[#E8E2D8]">
            {/* Download PNG */}
            <Button
              variant="primary"
              size="md"
              className="w-full justify-center text-neutral-900"
              icon={downloaded ? <Check className="w-4 h-4 stroke-[3]" /> : <Download className="w-4 h-4" />}
              isLoading={isGenerating}
              onClick={() => handleDownload('png')}
            >
              {downloaded ? 'Downloaded!' : 'Download PNG (Crisp & Lossless)'}
            </Button>

            {/* Download JPEG */}
            <Button
              variant="secondary"
              size="md"
              className="w-full justify-center"
              icon={<Download className="w-4 h-4" />}
              isLoading={isGenerating}
              onClick={() => handleDownload('jpeg')}
            >
              Download JPEG (Compact Print)
            </Button>

            {/* Print & Share Row */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="md"
                icon={<Printer className="w-4 h-4 text-amber-600" />}
                isLoading={isGenerating}
                onClick={handlePrint}
              >
                Print Strip
              </Button>

              <Button
                variant="outline"
                size="md"
                icon={copied ? <Check className="w-4 h-4 stroke-[3] text-emerald-600" /> : <Copy className="w-4 h-4" />}
                isLoading={isGenerating}
                onClick={handleCopyClipboard}
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </Button>
            </div>

            {/* Web Share */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center text-[#5A544C] hover:text-[#1C1A17]"
              icon={shared ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              onClick={handleShare}
            >
              {shared ? 'Shared successfully!' : 'Share via Device Sheet'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

