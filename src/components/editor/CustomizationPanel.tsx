import React, { useState } from 'react';
import {
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
}) => {
  const [activeTab, setActiveTab] = useState<EditorTab>('theme');

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
    <div className="bg-white border border-[#E8E2D8] rounded-2xl flex flex-col shadow-md overflow-hidden h-full">
      {/* Top Bar: Tabs & Undo/Redo */}
      <div className="border-b border-[#E8E2D8] bg-[#FAF7F2] px-3 pt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#1C1A17] tracking-wider uppercase font-mono">
            Customization Studio
          </span>

          {/* Undo / Redo / Reset */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo"
              className="p-1.5 rounded-lg text-[#7A7062] hover:text-[#1C1A17] hover:bg-[#EFE7DA] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo"
              className="p-1.5 rounded-lg text-[#7A7062] hover:text-[#1C1A17] hover:bg-[#EFE7DA] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <Redo2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetCurrentTheme}
              title="Reset to Theme Defaults"
              className="p-1.5 rounded-lg text-[#7A7062] hover:text-[#1C1A17] hover:bg-[#EFE7DA] transition-colors ml-1"
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
                    ? 'bg-white text-[#E88B88] font-bold shadow-sm border border-[#DDD5C7]'
                    : 'text-[#7A7062] hover:text-[#1C1A17] hover:bg-white/60'
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

            <div className="pt-4 border-t border-[#E8E2D8]">
              <h4 className="text-xs font-semibold text-[#4A4237] mb-3">Strip Background</h4>
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

