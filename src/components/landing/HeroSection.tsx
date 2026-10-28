import React from 'react';
import { Button } from '../ui/Button';
import { Camera, Sparkles, Shield, ArrowDown, Heart } from 'lucide-react';

export interface HeroSectionProps {
  onStartBooth: () => void;
  onExploreStyles: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartBooth,
  onExploreStyles,
}) => {
  return (
    <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-[#E88B88]/15 via-amber-400/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Subtle Vintage Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2B2824] border border-neutral-700/80 text-xs text-cream-200 mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#E88B88]" />
          <span className="font-medium tracking-wide">Vintage Photobooth in Your Browser</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>

        {/* Distinctive Logo & Wordmark */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-[#E88B88] text-neutral-950 flex items-center justify-center shadow-lg shadow-[#e88b88]/20 rotate-[-4deg]">
            <Camera className="w-6 h-6 stroke-[2.2]" /> 
          </div>
          <span className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-cream-50">
            Snap<span className="text-[#E88B88]">Strip</span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-cream-50 max-w-4xl leading-[1.1] mb-6">
          Your moments. <br />
          <span className="italic font-normal text-cream-200">Your strip.</span>
        </h1>

        {/* Supporting Text */}
        <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto font-sans font-normal leading-relaxed mb-10">
          Turn little moments into something worth keeping. Take photos with your camera, arrange them into vintage customizable strips, and download high-res memories ready to print and cherish.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <Button
            variant="primary"
            size="lg"
            icon={<Camera className="w-5 h-5" />}
            onClick={onStartBooth}
            className="w-full sm:w-auto text-neutral-950 text-base px-8 py-4 shadow-xl shadow-[#E88B88]/25 hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start Photobooth
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={<Sparkles className="w-4 h-4 text-[#E88B88]" />}
            onClick={onExploreStyles}
            className="w-full sm:w-auto text-neutral-200 hover:text-white px-7 py-4"
          >
            Explore Styles
          </Button>
        </div>

        {/* Hero Visual Preview: Realistic Angled Printed Photo Strips Stack */}
        <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center pt-4 pb-8">
          {/* Background strip 1 (Left tilted, B&W vintage) */}
          <div className="hidden sm:block absolute -left-4 md:left-8 top-6 w-44 md:w-52 bg-white text-black p-3.5 rounded-sm shadow-2xl rotate-[-8deg] border border-neutral-300 pointer-events-none transition-transform hover:rotate-[-6deg] hover:z-20">
            <div className="space-y-2">
              <div className="w-full aspect-[4/3] bg-neutral-900 rounded-sm overflow-hidden filter grayscale contrast-125">
                <div className="w-full h-full bg-gradient-to-tr from-neutral-800 to-neutral-700 flex items-center justify-center text-xs font-mono text-neutral-400">
                  SNAP #1
                </div>
              </div>
              <div className="w-full aspect-[4/3] bg-neutral-900 rounded-sm overflow-hidden filter grayscale contrast-125">
                <div className="w-full h-full bg-gradient-to-tr from-neutral-800 to-neutral-700 flex items-center justify-center text-xs font-mono text-neutral-400">
                  SNAP #2
                </div>
              </div>
              <div className="w-full aspect-[4/3] bg-neutral-900 rounded-sm overflow-hidden filter grayscale contrast-125">
                <div className="w-full h-full bg-gradient-to-tr from-neutral-800 to-neutral-700 flex items-center justify-center text-xs font-mono text-neutral-400">
                  SNAP #3
                </div>
              </div>
            </div>
            <div className="pt-3 text-center font-typewriter text-[11px] text-neutral-800 font-bold">
              ANALOG BOOTH • 1978
            </div>
          </div>

          {/* Background strip 2 (Right tilted, Blush Pink Romance) */}
          <div className="hidden sm:block absolute -right-4 md:right-8 top-4 w-44 md:w-52 bg-[#FFF0F3] text-[#590D22] p-3.5 rounded-sm shadow-2xl rotate-[9deg] border border-[#FFCCD5] pointer-events-none transition-transform hover:rotate-[7deg] hover:z-20">
            <div className="space-y-2">
              <div className="w-full aspect-[4/3] bg-rose-200 rounded-sm overflow-hidden">
                <div className="w-full h-full bg-gradient-to-tr from-rose-300 to-pink-200 flex items-center justify-center text-xs font-mono text-rose-800">
                  LOVE ✨
                </div>
              </div>
              <div className="w-full aspect-[4/3] bg-rose-200 rounded-sm overflow-hidden">
                <div className="w-full h-full bg-gradient-to-tr from-rose-300 to-pink-200 flex items-center justify-center text-xs font-mono text-rose-800">
                  SWEET 💖
                </div>
              </div>
              <div className="w-full aspect-[4/3] bg-rose-200 rounded-sm overflow-hidden">
                <div className="w-full h-full bg-gradient-to-tr from-rose-300 to-pink-200 flex items-center justify-center text-xs font-mono text-rose-800">
                  SMILE 🌸
                </div>
              </div>
            </div>
            <div className="pt-3 text-center font-handwriting text-sm text-[#590D22] font-bold">
              Best Friends Forever ♡
            </div>
          </div>

          {/* Main Hero Center Strip: Vintage Cream Classic */}
          <div className="relative z-10 w-64 sm:w-72 md:w-80 bg-[#F9F5EC] text-[#3D342B] p-4 sm:p-5 rounded-md shadow-2xl border-2 border-[#8A7156]/30 rotate-[0deg] transition-transform hover:scale-105 duration-300">
            {/* Film Grain Texture simulation */}
            <div className="space-y-3">
              <div className="relative w-full aspect-[4/3] bg-amber-100 rounded overflow-hidden shadow-inner border border-amber-900/10">
                <div className="w-full h-full bg-gradient-to-tr from-amber-300 via-rose-300 to-amber-200 flex items-center justify-center">
                  <span className="font-serif italic text-base sm:text-lg text-neutral-800 font-bold drop-shadow-sm">
                    laughter ✌️
                  </span>
                </div>
              </div>
              <div className="relative w-full aspect-[4/3] bg-amber-100 rounded overflow-hidden shadow-inner border border-amber-900/10">
                <div className="w-full h-full bg-gradient-to-tr from-rose-300 via-amber-200 to-orange-200 flex items-center justify-center">
                  <span className="font-serif italic text-base sm:text-lg text-neutral-800 font-bold drop-shadow-sm">
                    memories 📸
                  </span>
                </div>
              </div>
              <div className="relative w-full aspect-[4/3] bg-amber-100 rounded overflow-hidden shadow-inner border border-amber-900/10">
                <div className="w-full h-full bg-gradient-to-tr from-indigo-300 via-rose-200 to-amber-100 flex items-center justify-center">
                  <span className="font-serif italic text-base sm:text-lg text-neutral-800 font-bold drop-shadow-sm">
                    good times ✨
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Caption Area */}
            <div className="pt-4 pb-1 text-center font-serif">
              <p className="text-base sm:text-lg font-bold tracking-wider uppercase text-neutral-800">
                SnapStrip Moments
              </p>
              <p className="text-[11px] font-mono text-neutral-500 mt-1">
                ’26 10 28 • BOOTH NO. 01
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="inline-flex items-center gap-2 text-xs text-neutral-400 mt-6">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Local browser processing only. No photos are ever uploaded or stored remotely.</span>
        </div>
      </div>
    </section>
  );
};

