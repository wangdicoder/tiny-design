import React, { useState } from 'react';
import type { ThemeDocument } from '@tiny-design/react';
import { Button, Card, Input, Modal, Tag, Textarea, Typography } from '@tiny-design/react';
import { TokenEditorPanel } from './components/token-editor-panel';
import { StudioInspector } from './components/studio-inspector';
import { StudioPreview } from './components/studio-preview';
import { useStudioState } from './state/use-studio-state';
import { generateThemeDocumentJSON } from '../../utils/theme-document';
import './theme-studio.scss';

function downloadThemeDocument(json: string): void {
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'tiny-theme.document.json';
  anchor.click();
  URL.revokeObjectURL(url);
}

const ThemeStudioPage = (): React.ReactElement => {
  const [importVisible, setImportVisible] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const {
    themeDocument,
    replaceThemeDocument,
    setThemeMode,
    updateMeta,
    resolvedVars,
    activeGroup,
    setActiveGroup,
    previewMode,
    setPreviewMode,
    templateView,
    setTemplateView,
    search,
    setSearch,
    showChangedOnly,
    setShowChangedOnly,
    filteredTokens,
    groupCounts,
    changedCount,
    selectedToken,
    setSelectedTokenKey,
    updateToken,
    resetToken,
    resetAll,
    activePresetId,
    applyPreset,
    getTokenValue,
  } = useStudioState();

  const json = generateThemeDocumentJSON(themeDocument);

  const handleImport = () => {
    try {
      const nextTheme = JSON.parse(importText) as ThemeDocument;
      replaceThemeDocument(nextTheme);
      setImportVisible(false);
      setImportError(null);
    } catch {
      setImportError('Invalid theme document JSON');
    }
  };

  return (
    <div className="theme-studio">
      <div className="theme-studio__topbar">
        <div>
          <Input
            value={themeDocument.meta?.name ?? 'Untitled Theme'}
            onChange={(event) => updateMeta({ name: event.target.value })}
            className="theme-studio__name-input"
          />
          <Typography.Paragraph>
            A new docs-native studio built on top of the v2 token registry and theme document flow.
          </Typography.Paragraph>
        </div>
        <div className="theme-studio__topbar-actions">
          <div className="theme-studio__mode-switch">
            {(['light', 'dark', 'system'] as const).map((mode) => (
              <Button
                key={mode}
                btnType={themeDocument.mode === mode ? 'primary' : 'default'}
                onClick={() => setThemeMode(mode)}
              >
                {mode}
              </Button>
            ))}
          </div>
          <Tag color="info">{themeDocument.extends ?? 'tiny-light'}</Tag>
          <Button onClick={() => { setImportText(json); setImportVisible(true); }}>Import JSON</Button>
          <Button onClick={() => navigator.clipboard.writeText(json)}>Copy JSON</Button>
          <Button onClick={() => downloadThemeDocument(json)}>Download</Button>
          <Button onClick={resetAll}>Reset All</Button>
        </div>
      </div>

      <div className="theme-studio__summary-grid">
        <Card>
          <Card.Content>
            <div className="theme-studio__summary-label">Changed Tokens</div>
            <div className="theme-studio__summary-value">{changedCount}</div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <div className="theme-studio__summary-label">Active Group</div>
            <div className="theme-studio__summary-value">{activeGroup}</div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <div className="theme-studio__summary-label">Preview Mode</div>
            <div className="theme-studio__summary-value">{previewMode}</div>
          </Card.Content>
        </Card>
      </div>

      <div className="theme-studio__layout">
        <TokenEditorPanel
          activeGroup={activeGroup}
          onGroupChange={setActiveGroup}
          groupCounts={groupCounts}
          search={search}
          onSearchChange={setSearch}
          showChangedOnly={showChangedOnly}
          onShowChangedOnlyChange={setShowChangedOnly}
          filteredTokens={filteredTokens}
          selectedTokenKey={selectedToken?.key}
          onSelectToken={setSelectedTokenKey}
          activePresetId={activePresetId}
          onApplyPreset={applyPreset}
        />

        <StudioPreview
          themeDocument={themeDocument}
          previewMode={previewMode}
          onChangePreviewMode={setPreviewMode}
          templateView={templateView}
          onChangeTemplateView={setTemplateView}
        />

        <StudioInspector
          token={selectedToken}
          currentValue={selectedToken ? getTokenValue(selectedToken.key, selectedToken.cssVar, selectedToken.defaultValue) : undefined}
          onChangeValue={selectedToken ? (value) => updateToken(selectedToken.key, value) : undefined}
          onReset={selectedToken ? () => resetToken(selectedToken.key) : undefined}
        />
      </div>

      <Modal
        visible={importVisible}
        header="Import Theme Document"
        width={720}
        onClose={() => {
          setImportVisible(false);
          setImportError(null);
        }}
        footer={(
          <div className="theme-studio__import-actions">
            <Button onClick={() => setImportVisible(false)}>Cancel</Button>
            <Button btnType="primary" onClick={handleImport}>Apply Theme</Button>
          </div>
        )}
      >
        <Textarea
          rows={14}
          value={importText}
          onChange={(event) => setImportText(event.target.value)}
          placeholder="Paste a v2 theme document JSON here"
        />
        {importError ? <Typography.Paragraph className="theme-studio__import-error">{importError}</Typography.Paragraph> : null}
      </Modal>
    </div>
  );
};

export default ThemeStudioPage;
