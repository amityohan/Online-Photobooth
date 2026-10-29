import React, { useEffect, useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { PhotoboothPage } from './pages/PhotoboothPage';
import { ThemeId, LayoutId } from './types/photobooth';
import { Moon, Sun } from 'lucide-react';

export function App() {
  const [inPhotobooth, setInPhotobooth] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeId>('classic-bw');
  const [selectedLayoutId, setSelectedLayoutId] = useState<LayoutId>('classic-strip');
  const [isLightTheme, setIsLightTheme] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('light', isLightTheme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      isLightTheme ? '#FAF7F2' : '#141414'
    );

    return () => {
      document.documentElement.classList.remove('light');
    };
  }, [isLightTheme]);

  const handleStartBooth = (themeId?: ThemeId, layoutId?: LayoutId) => {
    if (themeId) setSelectedThemeId(themeId);
    if (layoutId) setSelectedLayoutId(layoutId);
    setInPhotobooth(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitToHome = () => {
    setInPhotobooth(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <button
        type="button"
        className="theme-toggle"
        aria-label="Toggle light and dark themes"
        aria-pressed={!isLightTheme}
        onClick={() => setIsLightTheme((currentTheme) => !currentTheme)}
      >
        {isLightTheme ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
        <span>{isLightTheme ? 'Dark theme' : 'Light theme'}</span>
      </button>
      {inPhotobooth ? (
        <PhotoboothPage
          initialThemeId={selectedThemeId}
          initialLayoutId={selectedLayoutId}
          onExitToHome={handleExitToHome}
        />
      ) : (
        <LandingPage onStartBooth={handleStartBooth} />
      )}
    </>
  );
}

export default App;
