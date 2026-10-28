import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { StripShowcase } from '../components/landing/StripShowcase';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Footer } from '../components/landing/Footer';
import { Button } from '../components/ui/Button';
import { Camera, Sparkles } from 'lucide-react';
import { ThemeId, LayoutId } from '../types/photobooth';

export interface LandingPageProps {
  onStartBooth: (themeId?: ThemeId, layoutId?: LayoutId) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartBooth }) => {
  const handleExploreStyles = () => {
    const el = document.getElementById('styles-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectStyle = (themeId: ThemeId, layoutId: LayoutId) => {
    onStartBooth(themeId, layoutId);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#FBF9F5] flex flex-col selection:bg-[#E88B88] selection:text-neutral-950">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-[#141414]/85 backdrop-blur-md border-b border-neutral-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-xl bg-[#E88B88] text-neutral-950 flex items-center justify-center shadow-md">
              <Camera className="w-5 h-5 stroke-[2.3]" />
            </div>
            <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-cream-50">
              Snap<span className="text-[#E88B88]">Strip</span>
            </span>
          </div>

          {/* Navigation Links & Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleExploreStyles}
              className="text-xs sm:text-sm font-medium text-neutral-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors hidden sm:block"
            >
              Explore Styles
            </button>

            <Button
              variant="primary"
              size="sm"
              icon={<Camera className="w-4 h-4" />}
              onClick={() => onStartBooth()}
              className="font-bold text-neutral-950"
            >
              Start Photobooth
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection
          onStartBooth={() => onStartBooth()}
          onExploreStyles={handleExploreStyles}
        />

        <StripShowcase onSelectStyle={handleSelectStyle} />

        <HowItWorks onStartBooth={() => onStartBooth()} />
      </main>

      <Footer />
    </div>
  );
};
