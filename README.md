# SnapStrip — Customizable Online Photobooth

> **"Your moments. Your strip."**
> A nostalgic, fully functional photobooth web application that captures live camera photos, arranges them into authentic photobooth strips, provides deep creative customization, and exports high-resolution, print-ready 300 DPI images.

---

## Features

### 📸 1. Authentic Photobooth Camera Experience
- **Real Camera Stream**: Direct integration with the browser's `navigator.mediaDevices.getUserMedia()`.
- **Camera Selection**: Front / rear camera switching (for mobile phones and tablets) and multi-webcam selection.
- **Configurable Countdown**: Choose from No Countdown (0s), 3 seconds, 5 seconds, or 10 seconds with animated screen indicators.
- **Auto-Capture Sequence**: Takes all required photos consecutively with a 1.8s pose gap and synchronized shutter sound effects.
- **Per-Slot Retake**: Retake any individual photo slot without losing the rest of your session.
- **Synthesized Audio Effects**: Retro mechanical leaf shutter sound and musical chimes generated via the Web Audio API (zero external sound file dependencies).
- **Graceful Fallbacks**: If running on a desktop without a webcam or when camera permissions are denied, an instant **"Use Sample Photos"** library and local image upload option are provided so anyone can enjoy the full experience immediately.
- **100% Client-Side Privacy**: Camera streams and photos remain strictly inside the user's browser. Zero images are ever uploaded or stored remotely.

---

### 🎞️ 2. Multiple Photobooth Strip Layouts
SnapStrip includes 8 photobooth layout formats:
1. **Classic Vertical Strip** (`classic-strip`): Iconic 4-photo 1x4 vertical photobooth strip with vintage proportions.
2. **Four-Photo Grid** (`four-grid`): 2x2 square composition ideal for Instagram, lockscreens, and keepsakes.
3. **Three-Photo Strip** (`three-strip`): Triple portrait vertical strip with generous caption space.
4. **Six-Photo Vertical Strip** (`six-strip`): Elongated classic booth strip capturing maximum expressions.
5. **Two-Photo Strip** (`two-strip`): Minimalist duo strip, subtle and intimate.
6. **Horizontal Strip** (`horizontal-strip`): 4-photo landscape film reel banner.
7. **Film Contact Sheet** (`film-contact`): 35mm darkroom contact sheet with sprocket holes, frame numbers, and "KODAK 400TX" edge markings.
8. **Four-Photo Collage** (`four-collage`): Artistic 2x2 collage with playful polaroid framing.

---

### 🎨 3. Strip Customization Studio
- **12 Aesthetic Themes**:
  - Classic Black & White
  - Vintage Cream
  - Blush Pink
  - Retro Film (35mm Kodachrome)
  - Y2K Dream
  - Minimal White
  - Lavender Dream
  - Cozy Scrapbook
  - Midnight Black
  - Celebration Confetti
  - Valentine's Romance
  - Summer Memories
- **Background & Textures**: Solid colors, custom hex picker, gradients, and authentic paper grain, film grain, vintage dots, and retro grid textures.
- **Borders & Spacing**: Sliders for outer border thickness, frame padding, photo gap spacing, photo corner radius, and strip outer radius.
- **Captions & Date Stamps**:
  - 5 expressive font families: *Vintage Display (Fraunces)*, *Classic Serif (Playfair Display)*, *Retro Typewriter (Courier Prime)*, *Scrapbook Script (Caveat)*, and *Modern Sans (Plus Jakarta Sans)*.
  - Text alignment, uppercase toggle, subtext line, custom text color, and automated retro date stamp.
- **Vintage Photo Filters**:
  - Original, B&W Classic, Sepia 70s, Vintage Tone, 35mm Film (Kodachrome), Y2K Cyber, Soft Glow, Moody Noir.
  - Fine-tuning sliders for Brightness, Contrast, Saturation, and Sepia.
- **Stickers & Doodles**: Placeable retro stickers, emojis (✨, ⭐, 🪩, 💖, 🎀, 🍒, 🎞️, 🎂, 🌸) with size and rotation adjustments.
- **Full Undo / Redo**: 20-step undo/redo stack and one-click reset to theme defaults.

---

### 🖨️ 4. High-Resolution Exporting, Printing & Sharing
- **HTML5 2D Canvas Engine**: Pristine, studio-grade rasterization (up to 2688px tall / 1800px wide) at 300 DPI print quality.
- **Lossless PNG Export**: Full color fidelity and crisp typography.
- **Compact JPEG Export**: High-quality 95% JPEG output.
- **Transparent Background PNG**: Optional background removal for design collages.
- **Print View**: One-click printing that strips away navigation and editor UI, printing only the photobooth strip with true-to-life aspect ratios.
- **Web Share API**: Native device sheet sharing (AirDrop, Messages, WhatsApp) with instant download fallback.
- **Clipboard Copy**: Direct PNG copying to clipboard for quick pasting.

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

### Installation & Launch
```bash
# 1. Clone the repository
git clone <repo-url>
cd Online-Photobooth

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
# Compile TypeScript and bundle with Vite
npm run build

# Preview production build locally
npm run preview
```

---

## 🔒 Privacy & Permissions
- **HTTPS Required in Production**: Web browsers require HTTPS to access `navigator.mediaDevices.getUserMedia()`, except on `localhost`.
- **Local Browser Sandboxing**: Photos are held in memory during the session and rendered onto a local `<canvas>`. No photos, camera telemetry, or analytics ever leave your device.
