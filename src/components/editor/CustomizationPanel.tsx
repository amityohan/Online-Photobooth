import React, { useState } from 'react';
import {
  CapturedPhoto,
  CustomizationSettings,
  LayoutId,
  PhotoFilter,
  StickerItem,
  ThemeId,
} from '../../types/photobooth';
import { STRIP_THEMES } from '../../config/themes';
import { ThemePicker } from './ThemePicker';
import { LayoutPicker } from '../layouts/LayoutPicker';
import { FilterControls } from './FilterControls';
import { CaptionEditor } from './CaptionEditor';
import { BackgroundPicker } from './BackgroundPicker';
import { BorderSpacingControls } from './BorderSpacingControls';
import { StickerPicker } from './StickerPicker';
import {
  Palette,
  LayoutGrid,
  Sparkles,
  Type,
  Sliders,
  Smile,
  Undo2,
  Redo2,
  RotateCcw,
} from 'lucide-react';

export interface CustomizationPanelProps {
  settings: CustomizationSettings;
  onUpdateSettings: (updater: (prev: CustomizationSettings) => CustomizationSettings) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  photoCountAvailable: number;
  photos?: CapturedPhoto[];
}

type EditorTab = 'theme' | 'layout' | 'filters' | 'caption' | 'frame' | 'stickers';

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  settings,
  onUpdateSettings,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  photoCountAvailable,
  photos = [],
}) => {
  const [activeTab, setActiveTab] = useState<EditorTab>('theme');
  const previewPhoto = photos.find((p) => Boolean(p && p.dataUrl)) || null;

  // Handle Theme Selection: applies coherent theme defaults
  const handleSelectTheme = (themeId: ThemeId) => {
    const theme = STRIP_THEMES[themeId];
    if (!theme) return;

    onUpdateSettings((prev) => ({
      ...prev,
      themeId,
      backgroundColor: theme.backgroundColor,
      backgroundGradient: theme.backgroundGradient || '',
      backgroundType: theme.backgroundGradient ? 'gradient' : 'solid',
      borderColor: theme.borderColor,
      texture: theme.texture,
      globalFilter: theme.defaultFilter,
      caption: {
        ...prev.caption,
        font: theme.fontFamily,
        color: theme.textColor,
      },
    }));
  };

  // Handle Layout Selection
  const handleSelectLayout = (layoutId: LayoutId) => {
    onUpdateSettings((prev) => ({
      ...prev,
      layoutId,
    }));
  };

  // Add Sticker
  const handleAddSticker = (emoji: string, label: string) => {
    // Generate a pleasant random coordinate away from center
    const positions = [
      { x: 12, y: 10, rot: -12 },
      { x: 88, y: 12, rot: 15 },
      { x: 14, y: 88, rot: 8 },
      { x: 86, y: 88, rot: -10 },
      { x: 50, y: 92, rot: 4 },
      { x: 85, y: 48, rot: 18 },
      { x: 15, y: 52, rot: -16 },
    ];
    const pos = positions[settings.stickers.length % positions.length];

    const newSticker: StickerItem = {
      id: `sticker-${Date.now()}-${Math.random()}`,
      emoji,
      label,
      x: pos.x,
      y: pos.y,
      size: 28,
      rotation: pos.rot,
    };

    onUpdateSettings((prev) => ({
      ...prev,
      stickers: [...prev.stickers, newSticker],
    }));
  };

  const handleRemoveSticker = (id: string) => {
    onUpdateSettings((prev) => ({
      ...prev,
      stickers: prev.stickers.filter((s) => s.id !== id),
    }));
  };

  const handleClearStickers = () => {
    onUpdateSettings((prev) => ({
      ...prev,
      stickers: [],
    }));
  };

  // Reset to current theme defaults
  const handleResetCurrentTheme = () => {
    handleSelectTheme(settings.themeId);
  };

  const tabs: { id: EditorTab; label: string; icon: React.ReactNode }[] = [
    { id: 'theme', label: 'Theme', icon: <Palette className="w-4 h-4" /> },
    { id: 'layout', label: 'Layout', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'filters', label: 'Filters', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'caption', label: 'Caption', icon: <Type className="w-4 h-4" /> },
    { id: 'frame', label: 'Borders', icon: <Sliders className="w-4 h-4" /> },
    { id: 'stickers', label: 'Stickers', icon: <Smile className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-[#181614] border border-neutral-800 rounded-2xl flex flex-col shadow-xl overflow-hidden h-full light:bg-white light:border-[#E8E2D8] light:shadow-md">
      {/* Top Bar: Tabs & Undo/Redo */}
      <div className="border-b border-neutral-800/80 bg-[#141414] px-3 pt-3 flex flex-col gap-2 light:border-[#E8E2D8] light:bg-[#FAF7F2]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-cream-200 tracking-wider uppercase font-mono light:text-[#1C1A17]">
            Customization Studio
          </span>

          {/* Undo / Redo / Reset */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none transition-colors light:text-[#7A7062] light:hover:text-[#1C1A17] light:hover:bg-[#EFE7DA]"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none transition-colors light:text-[#7A7062] light:hover:text-[#1C1A17] light:hover:bg-[#EFE7DA]"
            >
              <Redo2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetCurrentTheme}
              title="Reset to Theme Defaults"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors ml-1 light:text-[#7A7062] light:hover:text-[#1C1A17] light:hover:bg-[#EFE7DA]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Buttons Horizontal Scroll */}
        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#2B2824] text-[#E88B88] shadow-sm border border-neutral-700/80 light:bg-white light:font-bold light:border-[#DDD5C7]'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 light:text-[#7A7062] light:hover:text-[#1C1A17] light:hover:bg-white/60'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels Body */}
      <div className="p-4 overflow-y-auto flex-1">
        {activeTab === 'theme' && (
          <ThemePicker
            selectedThemeId={settings.themeId}
            onSelectTheme={handleSelectTheme}
          />
        )}

        {activeTab === 'layout' && (
          <LayoutPicker
            selectedLayoutId={settings.layoutId}
            onSelectLayout={handleSelectLayout}
            photoCountAvailable={photoCountAvailable}
          />
        )}

        {activeTab === 'filters' && (
          <FilterControls
            currentFilter={settings.globalFilter}
            onFilterChange={(filter: PhotoFilter) =>
              onUpdateSettings((prev) => ({ ...prev, globalFilter: filter }))
            }
            adjustments={settings.globalAdjustments}
            onAdjustmentChange={(key, value) =>
              onUpdateSettings((prev) => ({
                ...prev,
                globalAdjustments: {
                  ...prev.globalAdjustments,
                  [key]: value,
                },
              }))
            }
            onResetAdjustments={() =>
              onUpdateSettings((prev) => ({
                ...prev,
                globalAdjustments: {
                  brightness: 100,
                  contrast: 100,
                  saturation: 100,
                  sepia: 0,
                },
              }))
            }
            previewPhoto={previewPhoto}
          />
        )}

        {activeTab === 'caption' && (
          <CaptionEditor
            caption={settings.caption}
            onChange={(updates) =>
              onUpdateSettings((prev) => ({
                ...prev,
                caption: { ...prev.caption, ...updates },
              }))
            }
            presetColor={settings.borderColor}
          />
        )}

        {activeTab === 'frame' && (
          <div className="space-y-6">
            <BorderSpacingControls
              borderColor={settings.borderColor}
              borderThickness={settings.borderThickness}
              padding={settings.padding}
              gap={settings.gap}
              photoRadius={settings.photoRadius}
              stripRadius={settings.stripRadius}
              onChange={(updates) =>
                onUpdateSettings((prev) => ({
                  ...prev,
                  ...updates,
                }))
              }
            />

            <div className="pt-4 border-t border-neutral-800 light:border-[#E8E2D8]">
              <h4 className="text-xs font-semibold text-neutral-300 mb-3 light:text-[#4A4237]">Strip Background</h4>
              <BackgroundPicker
                backgroundColor={settings.backgroundColor}
                backgroundGradient={settings.backgroundGradient}
                backgroundType={settings.backgroundType}
                texture={settings.texture}
                onChange={(updates) =>
                  onUpdateSettings((prev) => ({
                    ...prev,
                    ...updates,
                  }))
                }
              />
            </div>
          </div>
        )}

        {activeTab === 'stickers' && (
          <StickerPicker
            stickers={settings.stickers}
            onAddSticker={handleAddSticker}
            onRemoveSticker={handleRemoveSticker}
            onClearStickers={handleClearStickers}
          />
        )}
      </div>
    </div>
  );
};

