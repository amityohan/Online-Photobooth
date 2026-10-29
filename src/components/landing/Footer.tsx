import React from 'react';
import { Camera, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E8E2D8] bg-[#F4EFE6] py-12 px-4 sm:px-6 lg:px-8 text-[#5A544C] text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E88B88] text-neutral-900 flex items-center justify-center font-bold">
            <Camera className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-base font-serif font-black text-[#1C1A17]">
              Snap<span className="text-[#E88B88]">Strip</span>
            </span>
            <span className="block text-[11px] text-[#7A7062]">
              Customizable Online Photobooth
            </span>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center gap-2 text-[#5A544C] bg-white/90 px-3.5 py-1.5 rounded-full border border-[#DDD5C7] shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Zero cloud uploads. Photos process entirely inside your browser.</span>
        </div>

        {/* Copyright */}
        <div className="flex items-center gap-1 text-[#7A7062]">
          <span>Crafted with vintage love</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>• © {new Date().getFullYear()} SnapStrip</span>
        </div>
      </div>
    </footer>
  );
};

