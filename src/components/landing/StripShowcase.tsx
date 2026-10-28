import React from 'react';
import { ThemeId, LayoutId } from '../../types/photobooth';
import { STRIP_THEMES } from '../../config/themes';
import { Button } from '../ui/Button';
import { Sparkles, ArrowRight } from 'lucide-react';

export interface StripShowcaseProps {
  onSelectStyle: (themeId: ThemeId, layoutId: LayoutId) => void;
}

interface ShowcaseItem {
  id: ThemeId;
  layoutId: LayoutId;
  name: string;
  tag: string;
  badgeColor: string;
  caption: string;
  subtext: string;
  bgStyle: string;
  textColor: string;
  borderColor: string;
  fontClass: string;
  photos: { gradient: string; label: string }[];
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'classic-bw',
    layoutId: 'classic-strip',
    name: 'Classic B&W Booth',
    tag: 'Timeless',
    badgeColor: 'bg-neutral-800 text-neutral-200',
    caption: 'MONOCHROME MOOD',
    subtext: 'ANALOG BOOTH #01',
    bgStyle: '#FFFFFF',
    textColor: '#181818',
    borderColor: '#181818',
    fontClass: 'font-serif',
    photos: [
      { gradient: 'from-neutral-900 via-neutral-700 to-neutral-800', label: '1970' },
      { gradient: 'from-neutral-800 via-neutral-600 to-neutral-900', label: 'FILM' },
      { gradient: 'from-neutral-900 via-neutral-800 to-neutral-700', label: 'ANALOG' },
    ],
  },
  {
    id: 'blush-pink',
    layoutId: 'three-strip',
    name: 'Soft Pink Vintage',
    tag: 'Romantic',
    badgeColor: 'bg-rose-900/60 text-rose-300',
    caption: 'Forever & Always',
    subtext: 'OCT 28, 2026',
    bgStyle: '#FFF0F3',
    textColor: '#590D22',
    borderColor: '#FFCCD5',
    fontClass: 'font-handwriting text-lg',
    photos: [
      { gradient: 'from-rose-400 via-pink-300 to-rose-200', label: 'LOVE 💖' },
      { gradient: 'from-pink-300 via-rose-200 to-pink-100', label: 'SMILE 🎀' },
      { gradient: 'from-rose-300 via-pink-400 to-rose-200', label: 'CHERISH ✨' },
    ],
  },
  {
    id: 'retro-film',
    layoutId: 'classic-strip',
    name: '35mm Retro Film',
    tag: 'Kodachrome',
    badgeColor: 'bg-amber-950/70 text-amber-300',
    caption: 'KODACHROME 400',
    subtext: 'EXP 36 • ISO 400',
    bgStyle: '#1E1B18',
    textColor: '#FAEDCD',
    borderColor: '#D4A373',
    fontClass: 'font-typewriter',
    photos: [
      { gradient: 'from-amber-700 via-orange-800 to-neutral-900', label: 'FRAME 01' },
      { gradient: 'from-orange-700 via-amber-800 to-yellow-950', label: 'FRAME 02' },
      { gradient: 'from-yellow-800 via-amber-700 to-neutral-900', label: 'FRAME 03' },
    ],
  },
  {
    id: 'y2k-cyber',
    layoutId: 'four-grid',
    name: 'Y2K Cyber Nostalgia',
    tag: '2000s Pop',
    badgeColor: 'bg-fuchsia-950/80 text-fuchsia-300',
    caption: 'BABY ANGEL 🪩',
    subtext: '★ CYBER 2000 ★',
    bgStyle: '#0F0E17',
    textColor: '#00F0FF',
    borderColor: '#FF007F',
    fontClass: 'font-sans font-black',
    photos: [
      { gradient: 'from-fuchsia-600 via-indigo-600 to-cyan-500', label: 'Y2K' },
      { gradient: 'from-pink-500 via-purple-600 to-cyan-400', label: 'GLOW' },
      { gradient: 'from-cyan-500 via-fuchsia-500 to-indigo-600', label: 'VIBES' },
      { gradient: 'from-indigo-600 via-pink-600 to-cyan-500', label: 'STAR' },
    ],
  },
  {
    id: 'scrapbook',
    layoutId: 'four-collage',
    name: 'Cozy Scrapbook',
    tag: 'Craft Paper',
    badgeColor: 'bg-amber-900/40 text-amber-200',
    caption: 'little everyday moments',
    subtext: 'handcrafted with love',
    bgStyle: '#EFE7DA',
    textColor: '#3D342B',
    borderColor: '#C4B59D',
    fontClass: 'font-handwriting text-lg',
    photos: [
      { gradient: 'from-amber-200 via-orange-100 to-yellow-200', label: '☕ morning' },
      { gradient: 'from-orange-200 via-amber-200 to-rose-200', label: '🌸 blossoms' },
      { gradient: 'from-yellow-100 via-amber-200 to-orange-200', label: '✨ laughing' },
      { gradient: 'from-rose-100 via-amber-100 to-yellow-100', label: '🧸 peace' },
    ],
  },
  {
    id: 'minimal-white',
    layoutId: 'two-strip',
    name: 'Minimal Gallery White',
    tag: 'Contemporary',
    badgeColor: 'bg-neutral-800 text-neutral-300',
    caption: 'ESSENCE',
    subtext: 'SNAPSTRIP STUDIO',
    bgStyle: '#FFFFFF',
    textColor: '#111827',
    borderColor: '#E5E7EB',
    fontClass: 'font-sans tracking-widest font-semibold',
    photos: [
      { gradient: 'from-neutral-200 via-neutral-100 to-neutral-300', label: 'PORTRAIT I' },
      { gradient: 'from-neutral-300 via-neutral-200 to-neutral-100', label: 'PORTRAIT II' },
    ],
  },
  {
    id: 'birthday-party',
    layoutId: 'classic-strip',
    name: 'Celebration Birthday',
    tag: 'Festive',
    badgeColor: 'bg-yellow-950/80 text-yellow-300',
    caption: 'HAPPY BIRTHDAY! 🎂',
    subtext: 'BEST CELEBRATION EVER',
    bgStyle: '#FEF3C7',
    textColor: '#92400E',
    borderColor: '#F59E0B',
    fontClass: 'font-display font-bold',
    photos: [
      { gradient: 'from-amber-300 via-rose-300 to-yellow-200', label: 'WISH 🎉' },
      { gradient: 'from-rose-300 via-amber-300 to-orange-200', label: 'CHEERS 🥂' },
      { gradient: 'from-yellow-300 via-rose-200 to-amber-200', label: 'DANCE 💃' },
    ],
  },
  {
    id: 'summer-memories',
    layoutId: 'horizontal-strip',
    name: 'Summer Golden Hour',
    tag: 'Panoramic',
    badgeColor: 'bg-orange-950/80 text-orange-300',
    caption: 'GOLDEN HOUR DREAMS',
    subtext: 'BEACH SUNSET • 2026',
    bgStyle: '#FFFBEB',
    textColor: '#7C2D12',
    borderColor: '#F97316',
    fontClass: 'font-sans font-bold',
    photos: [
      { gradient: 'from-amber-400 to-orange-500', label: 'SUN ☀️' },
      { gradient: 'from-orange-400 to-rose-400', label: 'SAND 🏖️' },
      { gradient: 'from-rose-400 to-amber-400', label: 'WAVE 🌊' },
      { gradient: 'from-amber-300 to-orange-400', label: 'DUSK 🌅' },
    ],
  },
];

export const StripShowcase: React.FC<StripShowcaseProps> = ({ onSelectStyle }) => {
  return (
    <section id="styles-showcase" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2ECE1] border border-[#DDD5C7] text-xs text-[#5A544C] mb-4 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#E88B88]" />
          <span>VINTAGE & MODERN COLLECTIONS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C1A17] tracking-tight mb-4">
          Explore Strip Styles
        </h2>

        <p className="text-[#5A544C] text-sm sm:text-base leading-relaxed">
          Each design is crafted with authentic photographic proportions, paper textures, and typography. Choose any style to jump straight into your booth session.
        </p>
      </div>

      {/* Grid of Photobooth Strips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {SHOWCASE_ITEMS.map((item) => (
          <div
            key={item.name}
            className="group flex flex-col justify-between bg-white border border-[#E8E2D8] hover:border-[#D5C4A1] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            {/* Header info */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                {item.tag}
              </span>
              <span className="text-xs font-serif text-[#2B2824] font-semibold">
                {item.name}
              </span>
            </div>

            {/* Realistic Printable Strip Silhouette */}
            <div className="flex items-center justify-center p-3 bg-[#F7F4EE] rounded-xl mb-5 overflow-hidden border border-[#EAE2D5]">
              <div
                className="w-full max-w-[210px] p-3 rounded shadow-xl transition-transform duration-300 group-hover:scale-[1.03]"
                style={{
                  backgroundColor: item.bgStyle,
                  borderColor: item.borderColor,
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  color: item.textColor,
                }}
              >
                {/* Photo grid */}
                <div
                  className={`grid gap-2 ${
                    item.photos.length === 4
                      ? 'grid-cols-2'
                      : item.photos.length === 2
                      ? 'grid-cols-1'
                      : 'grid-cols-1'
                  }`}
                >
                  {item.photos.map((p, idx) => (
                    <div
                      key={idx}
                      className={`w-full aspect-[4/3] rounded-sm bg-gradient-to-tr ${p.gradient} flex items-center justify-center text-[10px] font-mono font-bold shadow-inner border border-black/10`}
                    >
                      <span className="drop-shadow-sm text-black/80">{p.label}</span>
                    </div>
                  ))}
                </div>

                {/* Strip caption */}
                <div className={`pt-3 pb-1 text-center ${item.fontClass}`}>
                  <p className="text-xs font-bold leading-tight">{item.caption}</p>
                  <p className="text-[9px] opacity-75 font-mono mt-0.5">{item.subtext}</p>
                </div>
              </div>
            </div>

            {/* Action button */}
            <Button
              variant="secondary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />}
              iconPosition="right"
              onClick={() => onSelectStyle(item.id, item.layoutId)}
              className="w-full justify-center group-hover:bg-[#FAF7F2] group-hover:border-[#E88B88]"
            >
              Use This Style
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

