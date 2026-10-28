import { CapturedPhoto, CustomizationSettings } from '../types/photobooth';
import { renderPhotoboothStrip, RenderOptions } from './imageRenderer';

export type ExportFormat = 'png' | 'jpeg';

export interface ExportFileResult {
  blob: Blob;
  dataUrl: string;
  filename: string;
}

export class ExportService {
  /**
   * Generates a high-res exported file
   */
  public static async generateExportImage(
    photos: CapturedPhoto[],
    settings: CustomizationSettings,
    format: ExportFormat = 'png',
    options: RenderOptions = {}
  ): Promise<ExportFileResult> {
    const canvas = await renderPhotoboothStrip(photos, settings, options);
    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const quality = format === 'jpeg' ? 0.95 : 1.0;

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create image blob'));
            return;
          }
          const dataUrl = canvas.toDataURL(mimeType, quality);
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
          const filename = `snapstrip-${settings.layoutId}-${timestamp}.${format}`;

          resolve({ blob, dataUrl, filename });
        },
        mimeType,
        quality
      );
    });
  }

  /**
   * Triggers download in browser
   */
  public static downloadFile(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  /**
   * Shares image via Web Share API or falls back to download
   */
  public static async shareImage(
    blob: Blob,
    filename: string,
    title = 'My SnapStrip Photobooth Strip'
  ): Promise<'shared' | 'downloaded' | 'failed'> {
    if (
      typeof navigator !== 'undefined' &&
      navigator.canShare &&
      navigator.share
    ) {
      const file = new File([blob], filename, { type: blob.type });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title,
            text: 'Check out my photobooth strip from SnapStrip!',
            files: [file],
          });
          return 'shared';
        } catch (err: unknown) {
          if ((err as Error)?.name === 'AbortError') {
            return 'failed';
          }
        }
      }
    }

    // Fallback: download
    this.downloadFile(blob, filename);
    return 'downloaded';
  }

  /**
   * Copies PNG image to system clipboard
   */
  public static async copyToClipboard(blob: Blob): Promise<boolean> {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        const item = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([item]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Launches printer dialog for the strip
   */
  public static printStrip(canvas: HTMLCanvasElement) {
    const dataUrl = canvas.toDataURL('image/png');
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print SnapStrip</title>
          <style>
            @page {
              size: auto;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: #ffffff;
            }
            img {
              max-width: 90vw;
              max-height: 90vh;
              object-fit: contain;
              box-shadow: none;
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" onload="window.focus(); window.print(); window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
