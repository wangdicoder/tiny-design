import React from 'react';
import { PRESETS, ThemePreset, getPresetSeeds } from '../constants/presets';

interface PresetSelectorProps {
  activePresetId?: string;
  isDark: boolean;
  onSelect: (presetSeeds: Record<string, string>, presetId: string) => void;
}

const PresetCard = ({
  preset,
  isActive,
  onClick,
}: {
  preset: ThemePreset;
  isActive: boolean;
  onClick: () => void;
}): React.ReactElement => (
  <button
    className={`theme-editor__preset-card ${isActive ? 'theme-editor__preset-card_active' : ''}`}
    onClick={onClick}
    title={preset.name}
  >
    <div className="theme-editor__preset-swatches">
      {preset.swatches.map((color, i) => (
        <span
          key={i}
          className="theme-editor__preset-swatch"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
    <span className="theme-editor__preset-name">{preset.name}</span>
  </button>
);

export const PresetSelector = ({
  activePresetId,
  isDark,
  onSelect,
}: PresetSelectorProps): React.ReactElement => {
  return (
    <div className="theme-editor__panel">
      <div className="theme-editor__preset-grid">
        {PRESETS.map((preset) => (
          <PresetCard
            key={preset.id}
            preset={preset}
            isActive={preset.id === activePresetId}
            onClick={() => onSelect(getPresetSeeds(preset, isDark), preset.id)}
          />
        ))}
      </div>
    </div>
  );
};
