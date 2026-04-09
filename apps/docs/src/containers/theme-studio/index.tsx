import React, { useEffect, useMemo, useState } from 'react';
import type { ThemeDocument } from '@tiny-design/react';
import { validateThemeDocument } from '@tiny-design/tokens/validate-theme';
import {
  Button,
  ConfigProvider,
  Modal,
  Paragraph,
  Segmented,
  Select,
  Text,
  Textarea,
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
import { syncThemeStudioFonts } from './font-loader';
import './theme-studio.scss';

const ThemeStudioPage = (): React.ReactElement => {
  const { resolvedTheme } = useTheme();
  const [draft, setDraft] = useState<ThemeEditorDraft>(loadInitialDraft);
  const [importVisible, setImportVisible] = useState(false);
  const [codeVisible, setCodeVisible] = useState(false);
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

  useEffect(() => {
    syncThemeStudioFonts([draft.fields.fontSans, draft.fields.fontMono]);
  }, [draft.fields.fontMono, draft.fields.fontSans]);

  const updateField = (key: FieldKey, value: string) => {
    setDraft((current) => {
      const nextFields = {
        ...current.fields,
        [key]: value,
      };

      // Treat global radius as the baseline shape control for the whole studio.
      if (key === 'radius') {
        nextFields.buttonRadius = value;
        nextFields.inputRadius = value;
        nextFields.cardRadius = value;
      }

      return {
        ...current,
        fields: nextFields,
      };
    });
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
      const validation = validateThemeDocument(parsed);
      if (!validation.valid) {
        setImportError(validation.errors.join('\n'));
        return;
      }

      setDraft(buildDraftFromThemeDocument(validation.normalizedDocument as ThemeDocument));
      setImportVisible(false);
      setImportError(null);
      setStatus(validation.warnings.length > 0 ? 'Imported theme document with validation warnings' : 'Imported theme document');
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
            <Text className="theme-studio__eyebrow">Theme Editor</Text>
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

            {renderPreview(draft.activeTemplate, draft.fields, draft.activeSection)}
          </main>
        </div>

        <Modal
          visible={importVisible}
          className="theme-studio__modal theme-studio__modal_import"
          header="Import Theme Document"
          width={760}
          bodyStyle={{ maxHeight: 'min(70vh, 720px)', overflow: 'auto' }}
          cancelText="Cancel"
          confirmText="Apply Theme"
          onConfirm={handleImport}
          onClose={() => {
            setImportVisible(false);
            setImportError(null);
          }}
        >
          <div className="theme-studio__modal-copy">
            <Paragraph>
              Paste a Tiny theme document JSON export to replace the current global theme.
            </Paragraph>
            <Text type="secondary">Preset selection and all editor controls will sync to the imported values.</Text>
          </div>
          <Textarea
            rows={16}
            className="theme-studio__import-textarea"
            value={importText}
            onChange={(next) => setImportText(next)}
          />
          {importError ? <Paragraph className="theme-studio__error">{importError}</Paragraph> : null}
        </Modal>

        <Modal
          visible={codeVisible}
          className="theme-studio__modal theme-studio__modal_code"
          header="Theme Output"
          width={980}
          bodyStyle={{ maxHeight: 'min(74vh, 760px)', overflow: 'auto' }}
          cancelText="Close"
          confirmText={draft.activeCodeView === 'json' ? 'Copy JSON' : draft.activeCodeView === 'css' ? 'Copy CSS' : 'Done'}
          confirmButtonProps={draft.activeCodeView === 'tokens' ? { style: { display: 'none' } } : undefined}
          onConfirm={draft.activeCodeView === 'json'
            ? () => handleCopy(themeJson, 'Theme JSON')
            : draft.activeCodeView === 'css'
              ? () => handleCopy(cssVars, 'CSS variables')
              : undefined}
          onClose={() => setCodeVisible(false)}
        >
          <div className="theme-studio__code-head">
            <div>
              <Text strong>Output</Text>
              <Text type="secondary">{activePreset.name} · {status}</Text>
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
