import React, { useEffect, useMemo, useState } from 'react';
import type { ThemeDocument } from '@tiny-design/react';
import {
  Button,
  ConfigProvider,
  Modal,
  Segmented,
  Select,
  Textarea,
  Typography,
  useTheme,
} from '@tiny-design/react';
import {
  applyPresetToDraft,
  buildDraftFromThemeDocument,
  buildThemeDocumentFromDraft,
  CODE_VIEW_OPTIONS,
  type FieldKey,
  type ThemeCodeView,
  type ThemeEditorDraft,
  type ThemeEditorSection,
  type ThemeMode,
  type ThemePreviewTemplate,
  TEMPLATE_OPTIONS,
  THEME_EDITOR_PRESETS,
  THEME_SECTION_LABELS,
} from './presets';
import { buildPreviewVars, DRAFT_KEY, loadInitialDraft, PRESET_ID_KEY } from './editor-draft';
import { SIDEBAR_SYNC_MAP } from './editor-config';
import { renderPreview } from './preview-components';
import { ThemeStudioSidebarContent } from './sidebar-content';
import {
  compareThemeAgainstBase,
  generateThemeCssVariables,
  generateThemeDocumentJSON,
} from '../../utils/theme-document';
import {
  applyThemeDocumentToDOM,
  saveThemeDocument,
} from '../../utils/theme-persistence';
import './theme-studio.scss';

const ThemeStudioPage = (): React.ReactElement => {
  const { resolvedTheme } = useTheme();
  const [draft, setDraft] = useState<ThemeEditorDraft>(loadInitialDraft);
  const [importVisible, setImportVisible] = useState(false);
  const [codeVisible, setCodeVisible] = useState(false);
  const [sidebarSync, setSidebarSync] = useState(true);
  const [colorQuery, setColorQuery] = useState('');
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Editing local draft');
  const globalMode: ThemeMode = resolvedTheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [draft]);

  const themeDocument = useMemo(() => buildThemeDocumentFromDraft(draft), [draft]);
  const themeJson = useMemo(() => generateThemeDocumentJSON(themeDocument), [themeDocument]);
  const cssVars = useMemo(() => generateThemeCssVariables(themeDocument), [themeDocument]);
  const changedTokens = useMemo(() => compareThemeAgainstBase(themeDocument), [themeDocument]);
  const activePreset = useMemo(
    () => THEME_EDITOR_PRESETS.find((preset) => preset.id === draft.presetId) ?? THEME_EDITOR_PRESETS[0],
    [draft.presetId],
  );
  useEffect(() => {
    setDraft((current) => (
      current.mode === globalMode
        ? current
        : applyPresetToDraft(current.presetId, current, globalMode)
    ));
  }, [globalMode]);

  useEffect(() => {
    saveThemeDocument(themeDocument);
    applyThemeDocumentToDOM(themeDocument, { respectThemeMode: true });
    localStorage.setItem(PRESET_ID_KEY, draft.presetId);
    setStatus('Applied globally');
  }, [draft.presetId, themeDocument]);

  const updateField = (key: FieldKey, value: string) => {
    setDraft((current) => ({
      ...current,
      fields: {
        ...current.fields,
        [key]: value,
        ...(sidebarSync && SIDEBAR_SYNC_MAP[key] ? { [SIDEBAR_SYNC_MAP[key] as FieldKey]: value } : {}),
      },
    }));
  };

  const resetToPreset = () => {
    setDraft((current) => applyPresetToDraft(current.presetId, current));
    setStatus('Reset to preset defaults');
  };

  const handlePresetChange = (presetId: string) => {
    setDraft((current) => applyPresetToDraft(presetId, current));
    setStatus(`Applied ${THEME_EDITOR_PRESETS.find((preset) => preset.id === presetId)?.name ?? 'preset'}`);
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText) as ThemeDocument;
      setDraft(buildDraftFromThemeDocument(parsed));
      setImportVisible(false);
      setImportError(null);
      setStatus('Imported theme document');
    } catch {
      setImportError('Invalid theme document JSON');
    }
  };

  const handleCopy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    setStatus(`${label} copied`);
  };

  return (
    <ConfigProvider theme={themeDocument}>
      <div
        className={`theme-studio theme-studio_${draft.mode}`}
        style={buildPreviewVars(draft.fields)}
      >
        <div className="theme-studio__topbar">
          <div className="theme-studio__topbar-copy">
            <Typography.Text className="theme-studio__eyebrow">Theme Editor</Typography.Text>
            <div className="theme-studio__topbar-meta">
              <span>{activePreset.name}</span>
              <span>{THEME_EDITOR_PRESETS.length} presets</span>
            </div>
          </div>

          <div className="theme-studio__topbar-actions">
            <Select
              className="theme-studio__select"
              value={draft.presetId}
              onChange={(value) => handlePresetChange(value)}
            >
              {THEME_EDITOR_PRESETS.map((preset) => (
                <Select.Option key={preset.id} value={preset.id}>{preset.name}</Select.Option>
              ))}
            </Select>
            <div className="theme-studio__topbar-utility">
              <Button size="sm" btnType="ghost" onClick={resetToPreset}>Reset</Button>
              <Button size="sm" btnType="ghost" onClick={() => { setImportText(themeJson); setImportVisible(true); }}>Import</Button>
            </div>
            <Button size="sm" btnType="outline" onClick={() => setCodeVisible(true)}>Code</Button>
          </div>
        </div>

        <div className="theme-studio__workspace">
          <aside className="theme-studio__sidebar">
            <div className="theme-studio__sidebar-head">
              <Segmented
                block
                options={Object.entries(THEME_SECTION_LABELS).map(([value, label]) => ({ label, value }))}
                value={draft.activeSection}
                onChange={(value) => setDraft((current) => ({ ...current, activeSection: value as ThemeEditorSection }))}
              />
            </div>
            <ThemeStudioSidebarContent
              section={draft.activeSection}
              draft={draft}
              sidebarSync={sidebarSync}
              colorQuery={colorQuery}
              setSidebarSync={setSidebarSync}
              setColorQuery={setColorQuery}
              updateField={updateField}
            />
          </aside>

          <main className="theme-studio__preview-shell">
            <div className="theme-studio__preview-toolbar">
              <div className="theme-studio__template-tabs">
                {TEMPLATE_OPTIONS.map((item) => (
                  <button
                    key={item.value}
                    className={`theme-studio__template-tab${draft.activeTemplate === item.value ? ' theme-studio__template-tab_active' : ''}`}
                    onClick={() => setDraft((current) => ({ ...current, activeTemplate: item.value as ThemePreviewTemplate }))}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={`theme-studio__preview theme-studio__preview_${draft.mode}`}>
              {renderPreview(draft.activeTemplate, draft.fields, draft.activeSection)}
            </div>
          </main>
        </div>

        <Modal
          visible={importVisible}
          className="theme-studio__modal theme-studio__modal_import"
          header="Import Theme Document"
          width={760}
          bodyStyle={{ maxHeight: 'min(70vh, 720px)', overflow: 'auto' }}
          onClose={() => {
            setImportVisible(false);
            setImportError(null);
          }}
          footer={(
            <div className="theme-studio__modal-actions">
              <Button onClick={() => setImportVisible(false)}>Cancel</Button>
              <Button btnType="primary" onClick={handleImport}>Apply Theme</Button>
            </div>
          )}
        >
          <div className="theme-studio__modal-copy">
            <Typography.Paragraph>
              Paste a Tiny theme document JSON export to replace the current global theme.
            </Typography.Paragraph>
            <Typography.Text type="secondary">Preset selection and all editor controls will sync to the imported values.</Typography.Text>
          </div>
          <Textarea
            rows={16}
            className="theme-studio__import-textarea"
            value={importText}
            onChange={(next) => setImportText(next)}
          />
          {importError ? <Typography.Paragraph className="theme-studio__error">{importError}</Typography.Paragraph> : null}
        </Modal>

        <Modal
          visible={codeVisible}
          className="theme-studio__modal theme-studio__modal_code"
          header="Theme Output"
          width={980}
          bodyStyle={{ maxHeight: 'min(74vh, 760px)', overflow: 'auto' }}
          onClose={() => setCodeVisible(false)}
          footer={(
            <div className="theme-studio__modal-actions">
              <Button onClick={() => setCodeVisible(false)}>Close</Button>
              {draft.activeCodeView === 'json' ? <Button btnType="primary" onClick={() => handleCopy(themeJson, 'Theme JSON')}>Copy JSON</Button> : null}
              {draft.activeCodeView === 'css' ? <Button btnType="primary" onClick={() => handleCopy(cssVars, 'CSS variables')}>Copy CSS</Button> : null}
            </div>
          )}
        >
          <div className="theme-studio__code-head">
            <div>
              <Typography.Text strong>Output</Typography.Text>
              <Typography.Text type="secondary">{activePreset.name} · {status}</Typography.Text>
            </div>
            <Segmented
              options={CODE_VIEW_OPTIONS}
              value={draft.activeCodeView}
              onChange={(value) => setDraft((current) => ({ ...current, activeCodeView: value as ThemeCodeView }))}
            />
          </div>
          {draft.activeCodeView === 'json' ? <pre className="theme-studio__code-block">{themeJson}</pre> : null}
          {draft.activeCodeView === 'css' ? <pre className="theme-studio__code-block">{cssVars}</pre> : null}
          {draft.activeCodeView === 'tokens' ? (
            <div className="theme-studio__tokens-list theme-studio__tokens-list_modal">
              {changedTokens.map((token) => (
                <div key={token.key} className="theme-studio__token-row">
                  <div>
                    <strong>{token.key}</strong>
                    <small>{token.cssVar}</small>
                  </div>
                  <div>
                    <code>{token.value}</code>
                    <small>Base: {token.baseValue || 'n/a'}</small>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default ThemeStudioPage;
