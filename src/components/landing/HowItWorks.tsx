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
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8E2D8]">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono text-[#E88B88] tracking-widest uppercase mb-2 block font-semibold">
          Simple 3-Step Flow
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C1A17] tracking-tight mb-4">
          How SnapStrip Works
        </h2>
        <p className="text-[#5A544C] text-sm sm:text-base leading-relaxed">
          No sign-ups, no cloud uploads, no watermarks. A private creative photo booth running 100% directly in your browser.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative bg-white border border-[#E8E2D8] rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Top row */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#F9F5EC] border border-[#DDD5C7] flex items-center justify-center shadow-sm">
                  {step.icon}
                </div>
                <span className="text-3xl font-serif font-black text-[#D5C4A1]">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-[#1C1A17] mb-3">
                {step.title}
              </h3>

              <p className="text-[#5A544C] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Final Call to Action Card */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#FFFDF9] via-[#FAF6EE] to-[#FFFDF9] border border-[#E8E2D8] p-8 sm:p-12 text-center overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E88B88]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2ECE1] border border-[#DDD5C7] text-xs text-[#5A544C] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E88B88]" />
            <span>Ready for your photo session?</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1A17] mb-4">
            Capture today. Keep it forever.
          </h3>

          <p className="text-[#5A544C] text-sm sm:text-base mb-8 leading-relaxed">
            Grab a friend, pick your favorite aesthetic layout, and create something memorable in seconds.
          </p>

          <Button
            variant="primary"
            size="lg"
            icon={<Camera className="w-5 h-5" />}
            onClick={onStartBooth}
            className="text-neutral-900 font-bold px-10 py-4 shadow-xl shadow-[#E88B88]/20 hover:scale-105 transition-transform"
          >
            Launch Photobooth Now
          </Button>
        </div>
      </div>
    </section>
  );
};

