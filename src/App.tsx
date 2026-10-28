import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { PhotoboothPage } from './pages/PhotoboothPage';
import { ThemeId, LayoutId } from './types/photobooth';

export function App() {
  const [inPhotobooth, setInPhotobooth] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeId>('classic-bw');
  const [selectedLayoutId, setSelectedLayoutId] = useState<LayoutId>('classic-strip');

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

  return inPhotobooth ? (
    <PhotoboothPage
      initialThemeId={selectedThemeId}
      initialLayoutId={selectedLayoutId}
      onExitToHome={handleExitToHome}
    />
  ) : (
    <LandingPage onStartBooth={handleStartBooth} />
  );
}

export default App;

