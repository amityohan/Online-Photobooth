import React from 'react';
import { Button } from '../ui/Button';
import { Camera, Sliders, Download, Sparkles, ArrowRight } from 'lucide-react';

export interface HowItWorksProps {
  onStartBooth: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartBooth }) => {
  const steps = [
    {
      number: '01',
      title: 'Take Your Photos',
      description:
        'Hop into the live booth using your webcam or phone camera. Choose a 3s, 5s, or 10s countdown, strike a pose, and snap consecutive frames with authentic shutter sounds.',
      icon: <Camera className="w-6 h-6 text-[#E88B88]" />,
    },
    {
      number: '02',
      title: 'Customize Your Strip',
      description:
        'Select from 8 retro layouts and 12 aesthetic themes. Fine-tune border thickness, paper textures, captions, fonts, vintage 35mm filters, and cute stickers.',
      icon: <Sliders className="w-6 h-6 text-[#E88B88]" />,
    },
    {
      number: '03',
      title: 'Download & Print',
      description:
        'Export crisp, 300 DPI high-resolution PNG or JPEG files ready for instant photo printing, scrapbooking, locker displays, or direct device sharing.',
      icon: <Download className="w-6 h-6 text-[#E88B88]" />,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800/80">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono text-[#E88B88] tracking-widest uppercase mb-2 block">
          Simple 3-Step Flow
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50 tracking-tight mb-4">
          How SnapStrip Works
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          No sign-ups, no cloud uploads, no watermarks. A private creative photo booth running 100% directly in your browser.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative bg-[#181614] border border-neutral-800 rounded-2xl p-7 shadow-xl flex flex-col justify-between"
          >
            {/* Top row */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#2B2824] border border-neutral-700/80 flex items-center justify-center shadow-md">
                  {step.icon}
                </div>
                <span className="text-3xl font-serif font-black text-neutral-700">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-cream-100 mb-3">
                {step.title}
              </h3>

              <p className="text-neutral-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Final Call to Action Card */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#201D1A] via-[#2B2824] to-[#201D1A] border border-neutral-700/80 p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E88B88]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-xs text-cream-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E88B88]" />
            <span>Ready for your photo session?</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-cream-50 mb-4">
            Capture today. Keep it forever.
          </h3>

          <p className="text-neutral-300 text-sm sm:text-base mb-8 leading-relaxed">
            Grab a friend, pick your favorite aesthetic layout, and create something memorable in seconds.
          </p>

          <Button
            variant="primary"
            size="lg"
            icon={<Camera className="w-5 h-5" />}
            onClick={onStartBooth}
            className="text-neutral-950 font-bold px-10 py-4 shadow-xl shadow-[#E88B88]/20 hover:scale-105 transition-transform"
          >
            Launch Photobooth Now
          </Button>
        </div>
      </div>
    </section>
  );
};

