import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Button, Tabs } from '@tiny-design/react';
import { useThemeState } from './hooks/use-theme-state';
import { PRESETS, getPresetSeeds } from './constants/presets';
import { ColorControls } from './components/color-controls';
import { TypographyControls } from './components/typography-controls';
import { DetailControls } from './components/detail-controls';
import { PresetSelector } from './components/preset-selector';
import { PreviewPanel } from './components/preview-panel';
import { ExportDialog } from './components/export-dialog';
import { saveSeeds } from '../../utils/theme-persistence';
import './theme-editor.scss';

const PRESET_ID_KEY = 'ty-theme-preset-id';

function loadPresetId(): string | undefined {
  try {
    return localStorage.getItem(PRESET_ID_KEY) || undefined;
  } catch {
    return undefined;
  }
}

const ThemeEditor = (): React.ReactElement => {
  const { seeds, applied, isDark, setSeed, applyPreset, reset, isOverridden, resetToken } =
    useThemeState();
  const [exportVisible, setExportVisible] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string | undefined>(loadPresetId);
  const prevIsDarkRef = useRef(isDark);

  // When dark mode toggles, re-apply the active preset with mode-appropriate seeds
  useEffect(() => {
    if (prevIsDarkRef.current !== isDark && activePresetId) {
      const preset = PRESETS.find((p) => p.id === activePresetId);
      if (preset) {
        const modeSeeds = getPresetSeeds(preset, isDark);
        applyPreset(modeSeeds);
      }
    }
    prevIsDarkRef.current = isDark;
  }, [isDark, activePresetId, applyPreset]);

  const handlePresetSelect = useCallback(
    (presetSeeds: Record<string, string>, presetId: string) => {
      applyPreset(presetSeeds);
      setActivePresetId(presetId);
      try { localStorage.setItem(PRESET_ID_KEY, presetId); } catch { /* ignore */ }

      // Save both light and dark seeds so the global persistence module
      // can apply the correct seeds when dark mode toggles on other pages
      const preset = PRESETS.find((p) => p.id === presetId);
      if (preset) {
        const lightSeeds = getPresetSeeds(preset, false);
        const darkSeeds = getPresetSeeds(preset, true);
        saveSeeds(lightSeeds, darkSeeds);
      }
    },
    [applyPreset]
  );

  const handleSeedChange = useCallback(
    (key: string, value: string) => {
      setSeed(key, value);
      setActivePresetId(undefined);
      try { localStorage.removeItem(PRESET_ID_KEY); } catch { /* ignore */ }
    },
    [setSeed]
  );

  const handleReset = useCallback(() => {
    reset();
    setActivePresetId('default');
    try { localStorage.setItem(PRESET_ID_KEY, 'default'); } catch { /* ignore */ }
  }, [reset]);

  const controlProps = {
    seeds,
    onSeedChange: handleSeedChange,
    isOverridden,
    onResetToken: resetToken,
  };

  return (
    <div className="theme-editor">
      <div className="theme-editor__header">
        <h1 className="theme-editor__title">Theme Editor</h1>
        <div className="theme-editor__actions">
          <Button size="sm" onClick={handleReset}>
            Reset
          </Button>
          <Button size="sm" btnType="primary" onClick={() => setExportVisible(true)}>
            Export
          </Button>
        </div>
      </div>

      <div className="theme-editor__layout">
        <div className="theme-editor__sidebar">
          <Tabs defaultActiveKey="presets">
            <Tabs.Panel tab="Presets" tabKey="presets">
              <PresetSelector
                activePresetId={activePresetId}
                isDark={isDark}
                onSelect={handlePresetSelect}
              />
            </Tabs.Panel>
            <Tabs.Panel tab="Colors" tabKey="colors">
              <ColorControls {...controlProps} />
            </Tabs.Panel>
            <Tabs.Panel tab="Typography" tabKey="typography">
              <TypographyControls {...controlProps} />
            </Tabs.Panel>
            <Tabs.Panel tab="Details" tabKey="details">
              <DetailControls {...controlProps} />
            </Tabs.Panel>
          </Tabs>
        </div>

        <div className="theme-editor__main">
          <PreviewPanel />
        </div>
      </div>

      <ExportDialog
        visible={exportVisible}
        onClose={() => setExportVisible(false)}
        seeds={seeds}
        appliedTokens={applied}
      />
    </div>
  );
};

export default ThemeEditor;
