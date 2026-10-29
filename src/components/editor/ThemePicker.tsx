import React from 'react';
import { ThemeId } from '../../types/photobooth';
import { THEME_LIST } from '../../config/themes';
import { Check } from 'lucide-react';

export interface ThemePickerProps {
  selectedThemeId: ThemeId;
  onSelectTheme: (id: ThemeId) => void;
}

export const ThemePicker: React.FC<ThemePickerProps> = ({
  selectedThemeId,
  onSelectTheme,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {THEME_LIST.map((theme) => {
        const isSelected = theme.id === selectedThemeId;

        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => onSelectTheme(theme.id)}
            className={`group relative p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between overflow-hidden ${
              isSelected
                ? 'bg-[#2B2824] border-[#E88B88] ring-2 ring-[#E88B88]/30 shadow-lg light:bg-[#FFF6F5] light:shadow-sm'
                : 'bg-[#181614] border-neutral-800 hover:border-neutral-700 hover:bg-[#201D1A] light:bg-white light:border-[#E8E2D8] light:hover:border-[#D5C4A1] light:hover:bg-[#FAF7F2] light:shadow-sm'
            }`}
          >
            {/* Visual Color Bar Preview */}
            <div
              className={`w-full h-8 rounded-lg mb-2 border flex items-center justify-between px-2 ${theme.previewBg}`}
              style={{
                backgroundColor: theme.backgroundColor,
                borderColor: theme.borderColor,
              }}
            >
              <div className="flex gap-1">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: theme.borderColor }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: theme.accentColor }}
                />
              </div>

              {isSelected && (
                <div className="w-4 h-4 rounded-full bg-[#E88B88] text-neutral-950 flex items-center justify-center light:text-neutral-900">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </div>

            <div>
              <span className="block text-xs font-semibold text-neutral-200 group-hover:text-white truncate light:text-[#1C1A17] light:group-hover:text-inherit">
                {theme.name}
              </span>
              <span className="block text-[10px] text-neutral-400 mt-0.5 line-clamp-1 light:text-[#7A7062]">
                {theme.description}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

