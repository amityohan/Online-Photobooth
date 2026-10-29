import {
  CapturedPhoto,
  CustomizationSettings,
  PhotoAdjustments,
  PhotoFilter,
  StripLayoutConfig,
} from '../types/photobooth';
import { STRIP_LAYOUTS } from '../config/layouts';
import { FONT_OPTIONS } from '../config/fonts';

export interface RenderOptions {
  transparentBackground?: boolean;
  scale?: number; // 1 for normal high-res, 2 for ultra print
}

/**
 * Loads an image from a dataUrl/URL and returns HTMLImageElement
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

/**
 * Resolves effective adjustments for a photo combining individual adjustments (if set and not 'none')
 * with global settings filter and sliders.
 */
export function resolvePhotoAdjustments(
  photoAdjustments?: Partial<PhotoAdjustments>,
  globalFilter: PhotoFilter = 'none',
  globalAdjustments: {
    brightness: number;
    contrast: number;
    saturation: number;
    sepia: number;
  } = { brightness: 100, contrast: 100, saturation: 100, sepia: 0 }
): PhotoAdjustments {
  const filter = (photoAdjustments?.filter && photoAdjustments.filter !== 'none')
    ? photoAdjustments.filter
    : (globalFilter || 'none');

  return {
    filter,
    brightness: Math.round((photoAdjustments?.brightness ?? 100) * (globalAdjustments.brightness / 100)),
    contrast: Math.round((photoAdjustments?.contrast ?? 100) * (globalAdjustments.contrast / 100)),
    saturation: Math.round((photoAdjustments?.saturation ?? 100) * (globalAdjustments.saturation / 100)),
    sepia: Math.max(photoAdjustments?.sepia ?? 0, globalAdjustments.sepia),
  };
}

/**
 * Computes CSS filter string for canvas ctx.filter and HTML style.filter
 */
export function getFilterString(
  filter: PhotoFilter = 'none',
  adjustments?: Partial<PhotoAdjustments>
): string {
  const parts: string[] = [];

  // Brightness: default 100%
  if (adjustments?.brightness !== undefined && adjustments.brightness !== 100) {
    parts.push(`brightness(${adjustments.brightness}%)`);
  }
  // Contrast: default 100%
  if (adjustments?.contrast !== undefined && adjustments.contrast !== 100) {
    parts.push(`contrast(${adjustments.contrast}%)`);
  }
  // Saturation: default 100%
  if (adjustments?.saturation !== undefined && adjustments.saturation !== 100) {
    parts.push(`saturate(${adjustments.saturation}%)`);
  }
  // Sepia slider: default 0%
  if (adjustments?.sepia !== undefined && adjustments.sepia > 0) {
    parts.push(`sepia(${adjustments.sepia}%)`);
  }

  // Preset filter additions
  switch (filter) {
    case 'bw':
      parts.push('grayscale(100%)', 'contrast(120%)');
      break;
    case 'grayscale':
      parts.push('grayscale(100%)');
      break;
    case 'sepia':
      parts.push('sepia(75%)', 'contrast(105%)', 'brightness(95%)');
      break;
    case 'vintage':
      parts.push('sepia(40%)', 'contrast(115%)', 'saturate(110%)', 'brightness(98%)');
      break;
    case 'warm':
      parts.push('sepia(25%)', 'saturate(135%)', 'contrast(105%)', 'brightness(102%)');
      break;
    case 'cool':
      parts.push('contrast(108%)', 'brightness(102%)', 'saturate(92%)', 'sepia(10%)', 'hue-rotate(170deg)');
      break;
    case 'high-contrast':
      parts.push('contrast(150%)', 'saturate(110%)');
      break;
    case 'faded-film':
      parts.push('contrast(88%)', 'brightness(110%)', 'sepia(20%)', 'saturate(85%)');
      break;
    case 'matte':
      parts.push('contrast(88%)', 'brightness(106%)', 'saturate(88%)');
      break;
    case 'retro':
      parts.push('contrast(120%)', 'saturate(130%)', 'sepia(18%)', 'hue-rotate(-5deg)');
      break;
    case 'kodachrome':
      parts.push('contrast(125%)', 'saturate(130%)', 'sepia(20%)');
      break;
    case 'y2k':
      parts.push('contrast(135%)', 'saturate(150%)', 'hue-rotate(-15deg)');
      break;
    case 'soft':
      parts.push('brightness(108%)', 'contrast(92%)', 'saturate(85%)');
      break;
    case 'noir':
      parts.push('grayscale(100%)', 'contrast(160%)', 'brightness(88%)');
      break;
    case 'none':
    default:
      break;
  }

  return parts.length > 0 ? parts.join(' ') : 'none';
}

/**
 * Draws an image with object-fit: cover into a rounded rectangle
 */
function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  filterString: string
) {
  ctx.save();

  // Create rounded clip path
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, Math.max(0, radius));
  } else {
    ctx.rect(x, y, w, h);
  }
  ctx.clip();

  // Calculate object-fit: cover
  const imgRatio = img.width / img.height;
  const slotRatio = w / h;

  let renderW = w;
  let renderH = h;
  let offsetX = x;
  let offsetY = y;

  if (imgRatio > slotRatio) {
    renderW = h * imgRatio;
    offsetX = x - (renderW - w) / 2;
  } else {
    renderH = w / imgRatio;
    offsetY = y - (renderH - h) / 2;
  }

  // Apply filters
  ctx.filter = filterString;

  // Draw image
  ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

  ctx.restore();
}

/**
 * Draws film sprocket holes and markings for film contact sheet layout
 */
function drawFilmDetails(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  padding: number
) {
  ctx.save();
  ctx.fillStyle = '#11100E';
  ctx.fillRect(0, 0, width, height);

  // Sprockets on top and bottom borders
  const sprocketWidth = 18;
  const sprocketHeight = 28;
  const sprocketRadius = 4;
  const sprocketGap = 42;

  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 1;

  // Top sprockets
  const topY = 12;
  for (let sx = padding; sx < width - padding; sx += sprocketGap) {
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(sx, topY, sprocketWidth, sprocketHeight, sprocketRadius);
    } else {
      ctx.rect(sx, topY, sprocketWidth, sprocketHeight);
    }
    ctx.fill();
    ctx.stroke();
  }

  // Bottom sprockets
  const bottomY = height - 12 - sprocketHeight;
  for (let sx = padding; sx < width - padding; sx += sprocketGap) {
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(sx, bottomY, sprocketWidth, sprocketHeight, sprocketRadius);
    } else {
      ctx.rect(sx, bottomY, sprocketWidth, sprocketHeight);
    }
    ctx.fill();
    ctx.stroke();
  }

  // Film edge text
  ctx.fillStyle = '#E5A93C';
  ctx.font = 'bold 15px "Courier Prime", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('KODAK SAFETY FILM 400', padding + 20, topY + sprocketHeight + 20);
  ctx.textAlign = 'right';
  ctx.fillText('ISO 400 / 27°  •  EXP 36', width - padding - 20, topY + sprocketHeight + 20);

  ctx.restore();
}

/**
 * Generates texture patterns onto the canvas
 */
function drawTexture(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  texture: CustomizationSettings['texture']
) {
  if (texture === 'none') return;

  ctx.save();

  if (texture === 'film-grain' || texture === 'paper-grain') {
    // Generate organic noise pattern
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = 128;
    noiseCanvas.height = 128;
    const nctx = noiseCanvas.getContext('2d');
    if (nctx) {
      const imgData = nctx.createImageData(128, 128);
      const data = imgData.data;
      const opacity = texture === 'film-grain' ? 18 : 12;
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.floor(Math.random() * 255);
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = opacity;
      }
      nctx.putImageData(imgData, 0, 0);

      const pattern = ctx.createPattern(noiseCanvas, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
      }
    }
  } else if (texture === 'dots') {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    const spacing = 24;
    for (let x = 12; x < width; x += spacing) {
      for (let y = 12; y < height; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (texture === 'grid') {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    const step = 32;
    ctx.beginPath();
    for (let x = step; x < width; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = step; y < height; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Main renderer: Takes captured photos and settings, produces a high-res HTMLCanvasElement
 */
export async function renderPhotoboothStrip(
  photos: CapturedPhoto[],
  settings: CustomizationSettings,
  options: RenderOptions = {}
): Promise<HTMLCanvasElement> {
  const layout: StripLayoutConfig = STRIP_LAYOUTS[settings.layoutId] || STRIP_LAYOUTS['classic-strip'];
  const scale = options.scale || 1;

  const canvasWidth = layout.renderWidth * scale;
  const canvasHeight = layout.renderHeight * scale;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Scale drawing coordinates
  const pScale = scale;
  const borderThickness = settings.borderThickness * pScale;
  const padding = settings.padding * pScale;
  const gap = settings.gap * pScale;
  const photoRadius = settings.photoRadius * pScale;
  const stripRadius = settings.stripRadius * pScale;

  // 1. Background
  if (!options.transparentBackground) {
    if (layout.isFilmStyle) {
      drawFilmDetails(ctx, canvasWidth, canvasHeight, padding);
    } else {
      ctx.save();
      // Outer rounded strip clip if stripRadius > 0
      if (stripRadius > 0 && typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(0, 0, canvasWidth, canvasHeight, stripRadius);
        ctx.clip();
      }

      if (settings.backgroundType === 'gradient' && settings.backgroundGradient) {
        // Gradient background
        const grad = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
        grad.addColorStop(0, settings.backgroundColor || '#FEF3C7');
        grad.addColorStop(1, '#FFD166');
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = settings.backgroundColor;
      }
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Texture
      drawTexture(ctx, canvasWidth, canvasHeight, settings.texture);

      ctx.restore();
    }
  }

  // 2. Compute Photo Grid Slots
  // Extra space for film sprockets if film style
  const topOffset = layout.isFilmStyle ? 70 * pScale : 0;
  const bottomExtraOffset = layout.isFilmStyle ? 70 * pScale : 0;

  // Caption area height
  let captionHeight = 0;
  if (layout.hasCaptionArea && settings.caption.text.trim().length > 0) {
    captionHeight = (settings.caption.subtext || settings.caption.showDate ? 130 : 95) * pScale;
  } else if (layout.hasCaptionArea) {
    captionHeight = 60 * pScale; // Default breathing room at bottom
  }

  const usableWidth = canvasWidth - (padding * 2) - ((layout.cols - 1) * gap);
  const usableHeight = canvasHeight - (padding * 2) - topOffset - bottomExtraOffset - captionHeight - ((layout.rows - 1) * gap);

  const slotWidth = Math.floor(usableWidth / layout.cols);
  const slotHeight = Math.floor(usableHeight / layout.rows);

  // Pre-load all photo images
  const loadedImages: (HTMLImageElement | null)[] = await Promise.all(
    photos.slice(0, layout.photoCount).map(async (photo) => {
      try {
        if (!photo.dataUrl) return null;
        return await loadImage(photo.dataUrl);
      } catch {
        return null;
      }
    })
  );

  // 3. Render Photo Slots
  for (let row = 0; row < layout.rows; row++) {
    for (let col = 0; col < layout.cols; col++) {
      const slotIndex = row * layout.cols + col;
      if (slotIndex >= layout.photoCount) break;

      const slotX = padding + col * (slotWidth + gap);
      const slotY = padding + topOffset + row * (slotHeight + gap);

      const photo = photos[slotIndex];
      const img = loadedImages[slotIndex];

      if (img && photo) {
        // Compose adjustments
        const combinedAdjustments = resolvePhotoAdjustments(
          photo.adjustments,
          settings.globalFilter,
          settings.globalAdjustments
        );

        const filterString = getFilterString(combinedAdjustments.filter, combinedAdjustments);
        drawCoverImage(ctx, img, slotX, slotY, slotWidth, slotHeight, photoRadius, filterString);
      } else {
        // Empty slot placeholder
        ctx.save();
        ctx.fillStyle = layout.isFilmStyle ? '#1C1A17' : 'rgba(0, 0, 0, 0.06)';
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(slotX, slotY, slotWidth, slotHeight, photoRadius);
        } else {
          ctx.rect(slotX, slotY, slotWidth, slotHeight);
        }
        ctx.fill();

        // Slot number / icon
        ctx.fillStyle = layout.isFilmStyle ? '#666666' : 'rgba(0, 0, 0, 0.25)';
        ctx.font = `bold ${22 * pScale}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Slot ${slotIndex + 1}`, slotX + slotWidth / 2, slotY + slotHeight / 2);
        ctx.restore();
      }

      // Film frame numbering if film style
      if (layout.isFilmStyle) {
        ctx.save();
        ctx.fillStyle = '#E5A93C';
        ctx.font = `bold ${13 * pScale}px "Courier Prime", monospace`;
        ctx.textAlign = 'left';
        ctx.fillText(`▶ ${slotIndex + 1}A`, slotX + 4, slotY - 6 * pScale);
        ctx.restore();
      }
    }
  }

  // 4. Caption Area
  if (layout.hasCaptionArea && (settings.caption.text.trim().length > 0 || settings.caption.showDate)) {
    ctx.save();

    const selectedFont = FONT_OPTIONS.find((f) => f.id === settings.caption.font) || FONT_OPTIONS[0];
    const captionColor = settings.caption.color || settings.borderColor || '#181818';

    const captionY = canvasHeight - bottomExtraOffset - captionHeight + (captionHeight / 2) - 8 * pScale;
    let captionX = canvasWidth / 2;
    if (settings.caption.align === 'left') {
      captionX = padding + 12 * pScale;
    } else if (settings.caption.align === 'right') {
      captionX = canvasWidth - padding - 12 * pScale;
    }

    ctx.fillStyle = captionColor;
    ctx.textAlign = settings.caption.align;
    ctx.textBaseline = 'middle';

    // Primary Caption Font Size
    const sizeMultiplier = {
      sm: 18,
      md: 26,
      lg: 34,
      xl: 44,
    }[settings.caption.size || 'md'];

    const mainFontSize = sizeMultiplier * pScale;
    ctx.font = `bold ${mainFontSize}px ${selectedFont.cssFamily}`;

    let displayText = settings.caption.text;
    if (settings.caption.uppercase) {
      displayText = displayText.toUpperCase();
    }

    if (displayText) {
      ctx.fillText(displayText, captionX, captionY - (settings.caption.subtext || settings.caption.showDate ? 14 * pScale : 0));
    }

    // Subtext or Date
    const secondaryItems: string[] = [];
    if (settings.caption.subtext?.trim()) {
      secondaryItems.push(settings.caption.subtext.trim());
    }
    if (settings.caption.showDate && settings.caption.dateText?.trim()) {
      secondaryItems.push(settings.caption.dateText.trim());
    }

    if (secondaryItems.length > 0) {
      const subFontSize = Math.max(12 * pScale, Math.floor(mainFontSize * 0.55));
      ctx.font = `500 ${subFontSize}px "Courier Prime", monospace`;
      ctx.fillStyle = captionColor;
      ctx.globalAlpha = 0.85;

      const subTextStr = secondaryItems.join('  •  ');
      ctx.fillText(subTextStr, captionX, captionY + (displayText ? 22 * pScale : 0));
      ctx.globalAlpha = 1.0;
    }

    ctx.restore();
  }

  // 5. Outer Border
  if (borderThickness > 0 && !options.transparentBackground) {
    ctx.save();
    ctx.strokeStyle = settings.borderColor;
    ctx.lineWidth = borderThickness;

    const halfBorder = borderThickness / 2;
    ctx.beginPath();
    if (stripRadius > 0 && typeof ctx.roundRect === 'function') {
      ctx.roundRect(
        halfBorder,
        halfBorder,
        canvasWidth - borderThickness,
        canvasHeight - borderThickness,
        Math.max(0, stripRadius - halfBorder)
      );
    } else {
      ctx.strokeRect(
        halfBorder,
        halfBorder,
        canvasWidth - borderThickness,
        canvasHeight - borderThickness
      );
    }
    ctx.stroke();
    ctx.restore();
  }

  // 6. Decorative Stickers
  if (settings.stickers && settings.stickers.length > 0) {
    ctx.save();
    for (const sticker of settings.stickers) {
      const sx = (sticker.x / 100) * canvasWidth;
      const sy = (sticker.y / 100) * canvasHeight;
      const size = sticker.size * pScale;

      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate((sticker.rotation * Math.PI) / 180);

      ctx.font = `${size}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sticker.emoji, 0, 0);

      ctx.restore();
    }
    ctx.restore();
  }

  return canvas;
}

