import { CapturedPhoto } from '../types/photobooth';

/**
 * Creates high quality, aesthetic procedural photobooth portraits
 * with warm vintage colors, fun expressions, and film grain.
 */
export function generateSamplePhoto(index: number, label: string): CapturedPhoto {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1200;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return {
      id: `sample-${Date.now()}-${index}`,
      dataUrl: '',
      timestamp: Date.now(),
      adjustments: {
        filter: 'none',
        brightness: 100,
        contrast: 100,
        saturation: 100,
        sepia: 0,
      },
    };
  }

  // Background gradients
  const palettes = [
    { bg1: '#FCE7F3', bg2: '#F472B6', accent: '#EC4899', mood: 'Blush' },
    { bg1: '#FEF3C7', bg2: '#F59E0B', accent: '#D97706', mood: 'Golden' },
    { bg1: '#EDE9FE', bg2: '#8B5CF6', accent: '#7C3AED', mood: 'Lavender' },
    { bg1: '#E0F2FE', bg2: '#38BDF8', accent: '#0284C7', mood: 'Sky' },
    { bg1: '#DCFCE7', bg2: '#22C55E', accent: '#16A34A', mood: 'Mint' },
    { bg1: '#FFEDD5', bg2: '#FB923C', accent: '#EA580C', mood: 'Peach' },
  ];

  const p = palettes[index % palettes.length];

  // Background gradient
  const grad = ctx.createRadialGradient(600, 600, 100, 600, 600, 700);
  grad.addColorStop(0, p.bg1);
  grad.addColorStop(1, p.bg2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 1200);

  // Soft vignette
  const vig = ctx.createRadialGradient(600, 600, 400, 600, 600, 750);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,0.18)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, 1200, 1200);

  // Character Portrait Illustration
  ctx.save();
  ctx.translate(600, 600);

  // Body / shoulders
  ctx.fillStyle = '#2B2824';
  ctx.beginPath();
  ctx.ellipse(0, 480, 360, 260, 0, 0, Math.PI * 2);
  ctx.fill();

  // Neck
  ctx.fillStyle = '#FCD34D';
  ctx.fillRect(-70, 180, 140, 120);

  // Head
  ctx.fillStyle = '#FDE68A';
  ctx.beginPath();
  ctx.ellipse(0, 80, 200, 240, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hair styling based on index
  ctx.fillStyle = index % 2 === 0 ? '#451A03' : '#1C1917';
  if (index % 3 === 0) {
    // Wavy / curls
    ctx.beginPath();
    ctx.arc(0, 0, 230, Math.PI, 0);
    ctx.arc(-180, 80, 80, 0, Math.PI * 2);
    ctx.arc(180, 80, 80, 0, Math.PI * 2);
    ctx.fill();
  } else if (index % 3 === 1) {
    // Short stylish crop
    ctx.beginPath();
    ctx.ellipse(0, -20, 230, 160, 0, Math.PI, 0);
    ctx.fill();
  } else {
    // Ponytail & bangs
    ctx.beginPath();
    ctx.arc(0, -20, 220, Math.PI, 0);
    ctx.arc(180, -100, 90, 0, Math.PI * 2);
    ctx.fill();
  }

  // Cheeks / blush
  ctx.fillStyle = 'rgba(244, 63, 94, 0.35)';
  ctx.beginPath();
  ctx.arc(-100, 130, 38, 0, Math.PI * 2);
  ctx.arc(100, 130, 38, 0, Math.PI * 2);
  ctx.fill();

  // Eyes & expression based on index
  ctx.fillStyle = '#1C1917';
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';

  if (index % 4 === 0) {
    // Big happy eyes
    ctx.beginPath();
    ctx.arc(-70, 70, 18, 0, Math.PI * 2);
    ctx.arc(70, 70, 18, 0, Math.PI * 2);
    ctx.fill();
    // Big smile
    ctx.strokeStyle = '#1C1917';
    ctx.beginPath();
    ctx.arc(0, 120, 50, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
  } else if (index % 4 === 1) {
    // Wink!
    ctx.beginPath();
    ctx.arc(-70, 70, 18, 0, Math.PI * 2);
    ctx.fill();
    // Wink arch
    ctx.strokeStyle = '#1C1917';
    ctx.beginPath();
    ctx.arc(70, 80, 24, 1.1 * Math.PI, 1.9 * Math.PI);
    ctx.stroke();
    // Open joyful mouth
    ctx.fillStyle = '#E11D48';
    ctx.beginPath();
    ctx.arc(0, 130, 38, 0, Math.PI);
    ctx.fill();
  } else if (index % 4 === 2) {
    // Laughing eyes (curved arches)
    ctx.strokeStyle = '#1C1917';
    ctx.beginPath();
    ctx.arc(-70, 80, 24, 1.1 * Math.PI, 1.9 * Math.PI);
    ctx.arc(70, 80, 24, 1.1 * Math.PI, 1.9 * Math.PI);
    ctx.stroke();
    // Grin
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(0, 120, 60, 0, Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#1C1917';
    ctx.stroke();
  } else {
    // Cute sunglasses!
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.roundRect(-130, 45, 110, 65, 16);
    ctx.roundRect(20, 45, 110, 65, 16);
    ctx.fill();
    ctx.fillRect(-20, 70, 40, 12);
    // Cool smirk
    ctx.strokeStyle = '#1C1917';
    ctx.beginPath();
    ctx.arc(15, 130, 35, 0.1 * Math.PI, 0.7 * Math.PI);
    ctx.stroke();
  }

  // Pose accessory: peace sign or hand
  if (index % 2 === 1) {
    ctx.fillStyle = '#FDE68A';
    ctx.strokeStyle = '#1C1917';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(220, 180, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Peace fingers
    ctx.fillRect(190, 80, 24, 80);
    ctx.fillRect(225, 80, 24, 80);
    ctx.strokeRect(190, 80, 24, 80);
    ctx.strokeRect(225, 80, 24, 80);
  }

  ctx.restore();

  // Subtle film grain overlay
  const imgData = ctx.getImageData(0, 0, 1200, 1200);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const noise = (Math.random() - 0.5) * 18;
    d[i] = Math.min(255, Math.max(0, d[i] + noise));
    d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + noise));
    d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // Stamp label
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.font = 'bold 28px "Courier Prime", monospace';
  ctx.textAlign = 'right';
  ctx.fillText(label, 1160, 1160);

  return {
    id: `sample-photo-${index}-${Date.now()}`,
    dataUrl: canvas.toDataURL('image/jpeg', 0.95),
    timestamp: Date.now(),
    adjustments: {
      filter: 'none',
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };
}

export function getSamplePhotoSet(count: number): CapturedPhoto[] {
  const labels = ['SHOT 01', 'SHOT 02', 'SHOT 03', 'SHOT 04', 'SHOT 05', 'SHOT 06'];
  return Array.from({ length: count }, (_, i) => generateSamplePhoto(i, labels[i % labels.length]));
}
