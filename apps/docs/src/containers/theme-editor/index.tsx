import React, { useState, useCallback } from 'react';
import { Button, Tabs } from '@tiny-design/react';
import { useThemeState } from './hooks/use-theme-state';
import { ColorControls } from './components/color-controls';
import { TypographyControls } from './components/typography-controls';
import { DetailControls } from './components/detail-controls';
import { PresetSelector } from './components/preset-selector';
import { PreviewPanel } from './components/preview-panel';
import { ExportDialog } from './components/export-dialog';
import './theme-editor.scss';

const ThemeEditor = (): React.ReactElement => {
  const { seeds, applied, setSeed, applyPreset, reset, isOverridden, resetToken } =
    useThemeState();
  const [exportVisible, setExportVisible] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string | undefined>();

  const handlePresetSelect = useCallback(
    (presetSeeds: Record<string, string>, presetId: string) => {
      applyPreset(presetSeeds);
      setActivePresetId(presetId);
    },
    [applyPreset]
  );

  const handleSeedChange = useCallback(
    (key: string, value: string) => {
      setSeed(key, value);
      setActivePresetId(undefined);
    },
    [setSeed]
  );

  const handleReset = useCallback(() => {
    reset();
    setActivePresetId('default');
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
