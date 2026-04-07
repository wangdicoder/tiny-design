import React from 'react';
import { Collapse, Select, Typography } from '@tiny-design/react';
import { COLOR_GROUPS, CORE_COLOR_GROUP_TITLES, FONT_OPTIONS, MONO_OPTIONS } from './editor-config';
import { ColorField, SliderField, TextField } from './editor-fields';
import type { FieldKey, ThemeEditorDraft, ThemeEditorSection, ThemeEditorColorGroup } from './types';

function renderColorGroups(
  groups: ThemeEditorColorGroup[],
  draft: ThemeEditorDraft,
  updateField: (key: FieldKey, value: string) => void,
): React.ReactElement[] {
  return groups.map((group) => (
    <div key={group.title} className="theme-studio__group-card">
      <div className="theme-studio__group-header">
        <Typography.Text strong>{group.title}</Typography.Text>
      </div>
      <div className="theme-studio__group-fields">
        {group.fields.map((field) => (
          <ColorField
            key={field.key}
            label={field.label}
            value={draft.fields[field.key]}
            onChange={(next) => updateField(field.key, next)}
          />
        ))}
      </div>
    </div>
  ));
}

export function ThemeStudioSidebarContent({
  section,
  draft,
  updateField,
}: {
  section: ThemeEditorSection;
  draft: ThemeEditorDraft;
  updateField: (key: FieldKey, value: string) => void;
}): React.ReactElement | null {
  const { Panel } = Collapse;
  const coreColorGroups = COLOR_GROUPS.filter((group) => CORE_COLOR_GROUP_TITLES.has(group.title));
  const advancedColorGroups = COLOR_GROUPS.filter((group) => !CORE_COLOR_GROUP_TITLES.has(group.title));

  if (section === 'colors') {
    return (
      <div className="theme-studio__panel-stack">
        <div className="theme-studio__group-section">
          <div className="theme-studio__section-header">
            <Typography.Text strong>Core Colors</Typography.Text>
            <Typography.Text type="secondary">
              Start with brand, surfaces, feedback, and focus.
            </Typography.Text>
          </div>
          {renderColorGroups(coreColorGroups, draft, updateField)}
        </div>
        {advancedColorGroups.length > 0 ? (
          <div className="theme-studio__group-section">
            <Collapse
              bordered={false}
              className="theme-studio__advanced-collapse"
              defaultActiveKey={[]}
            >
              <Panel
                itemKey="advanced-colors"
                header={(
                  <div className="theme-studio__section-header theme-studio__section-header_inline">
                    <Typography.Text strong>Advanced Tokens</Typography.Text>
                    <Typography.Text type="secondary">
                      Card, popover, sidebar, chart.
                    </Typography.Text>
                  </div>
                )}
              >
                {renderColorGroups(advancedColorGroups, draft, updateField)}
              </Panel>
            </Collapse>
          </div>
        ) : null}
      </div>
    );
  }

  if (section === 'typography') {
    return (
      <div className="theme-studio__panel-stack">
        <div className="theme-studio__group-card theme-studio__group-card_toolbar">
          <div className="theme-studio__group-toolbar theme-studio__group-toolbar_start">
            <div>
              <Typography.Text strong>Typography System</Typography.Text>
              <Typography.Text type="secondary">Font, scale, rhythm.</Typography.Text>
            </div>
          </div>
          <div className="theme-studio__summary-grid theme-studio__summary-grid_compact">
            <div className="theme-studio__summary-card">
              <span>Sans</span>
              <strong>{draft.fields.fontSans.split(',')[0].replaceAll('"', '')}</strong>
            </div>
            <div className="theme-studio__summary-card">
              <span>Mono</span>
              <strong>{draft.fields.fontMono.split(',')[0].replaceAll('"', '')}</strong>
            </div>
            <div className="theme-studio__summary-card">
              <span>Scale</span>
              <strong>{draft.fields.fontSizeBase}</strong>
            </div>
          </div>
        </div>

        <div className="theme-studio__group-card">
          <Typography.Text strong>Font Family</Typography.Text>
          <div className="theme-studio__type-preview-card">
            <strong style={{ fontFamily: draft.fields.fontSans }}>The quick brown fox jumps over the lazy dog.</strong>
            <code style={{ fontFamily: draft.fields.fontMono }}>const theme = &#123; mode: &quot;{draft.mode}&quot; &#125;</code>
          </div>
          <label className="theme-studio__field">
            <span className="theme-studio__field-label">Sans Preset</span>
            <Select value={draft.fields.fontSans} onChange={(value) => updateField('fontSans', String(value))}>
              {FONT_OPTIONS.map((font) => (
                <Select.Option key={font} value={font}>
                  {font.split(',')[0].replaceAll('"', '')}
                </Select.Option>
              ))}
            </Select>
          </label>
          <TextField label="Custom Sans Stack" value={draft.fields.fontSans} onChange={(next) => updateField('fontSans', next)} />
          <label className="theme-studio__field">
            <span className="theme-studio__field-label">Mono Preset</span>
            <Select value={draft.fields.fontMono} onChange={(value) => updateField('fontMono', String(value))}>
              {MONO_OPTIONS.map((font) => (
                <Select.Option key={font} value={font}>
                  {font.split(',')[0].replaceAll('"', '')}
                </Select.Option>
              ))}
            </Select>
          </label>
          <TextField label="Custom Mono Stack" value={draft.fields.fontMono} onChange={(next) => updateField('fontMono', next)} />
        </div>

        <div className="theme-studio__group-card">
          <Typography.Text strong>Type Scale</Typography.Text>
          <SliderField label="Base Font Size" value={draft.fields.fontSizeBase} onChange={(next) => updateField('fontSizeBase', next)} config={{ min: 12, max: 20, step: 1, unit: 'px' }} />
          <SliderField label="Line Height" value={draft.fields.lineHeightBase} onChange={(next) => updateField('lineHeightBase', next)} config={{ min: 1.1, max: 2, step: 0.05 }} />
          <SliderField label="H1 Size" value={draft.fields.h1Size} onChange={(next) => updateField('h1Size', next)} config={{ min: 28, max: 64, step: 1, unit: 'px' }} />
          <SliderField label="H2 Size" value={draft.fields.h2Size} onChange={(next) => updateField('h2Size', next)} config={{ min: 22, max: 48, step: 1, unit: 'px' }} />
        </div>

        <div className="theme-studio__group-card">
          <Typography.Text strong>Fine Tuning</Typography.Text>
          <SliderField label="Letter Spacing" value={draft.fields.letterSpacing} onChange={(next) => updateField('letterSpacing', next)} config={{ min: -0.08, max: 0.08, step: 0.01, unit: 'em' }} />
          <div className="theme-studio__type-preview-lines">
            <span style={{ fontSize: draft.fields.h1Size, letterSpacing: draft.fields.letterSpacing }}>Heading Preview</span>
            <span style={{ fontSize: draft.fields.fontSizeBase, lineHeight: draft.fields.lineHeightBase }}>Body copy reflects base scale and rhythm.</span>
          </div>
        </div>
      </div>
    );
  }

  if (section === 'other') {
    return (
      <div className="theme-studio__panel-stack">
        <div className="theme-studio__group-card theme-studio__group-card_toolbar">
          <div className="theme-studio__group-toolbar theme-studio__group-toolbar_start">
            <div>
              <Typography.Text strong>Surface & Shape</Typography.Text>
              <Typography.Text type="secondary">Corners, density, elevation.</Typography.Text>
            </div>
          </div>
          <div className="theme-studio__summary-grid theme-studio__summary-grid_compact">
            <div className="theme-studio__summary-card">
              <span>Radius</span>
              <strong>{draft.fields.radius}</strong>
            </div>
            <div className="theme-studio__summary-card">
              <span>Input</span>
              <strong>{draft.fields.inputHeight}</strong>
            </div>
            <div className="theme-studio__summary-card">
              <span>Padding</span>
              <strong>{draft.fields.cardPadding}</strong>
            </div>
          </div>
        </div>

        <div className="theme-studio__group-card">
          <Typography.Text strong>Shape</Typography.Text>
          <SliderField label="Global Radius" value={draft.fields.radius} onChange={(next) => updateField('radius', next)} config={{ min: 0, max: 32, step: 1, unit: 'px' }} />
          <SliderField label="Button Radius" value={draft.fields.buttonRadius} onChange={(next) => updateField('buttonRadius', next)} config={{ min: 0, max: 999, step: 1, unit: 'px' }} />
          <SliderField label="Input Radius" value={draft.fields.inputRadius} onChange={(next) => updateField('inputRadius', next)} config={{ min: 0, max: 32, step: 1, unit: 'px' }} />
          <SliderField label="Card Radius" value={draft.fields.cardRadius} onChange={(next) => updateField('cardRadius', next)} config={{ min: 0, max: 40, step: 1, unit: 'px' }} />
        </div>

        <div className="theme-studio__group-card">
          <Typography.Text strong>Density</Typography.Text>
          <SliderField label="Button Padding X" value={draft.fields.buttonPaddingX} onChange={(next) => updateField('buttonPaddingX', next)} config={{ min: 8, max: 32, step: 1, unit: 'px' }} />
          <SliderField label="Input Height" value={draft.fields.inputHeight} onChange={(next) => updateField('inputHeight', next)} config={{ min: 32, max: 56, step: 1, unit: 'px' }} />
          <SliderField label="Card Padding" value={draft.fields.cardPadding} onChange={(next) => updateField('cardPadding', next)} config={{ min: 12, max: 40, step: 1, unit: 'px' }} />
        </div>

        <div className="theme-studio__group-card">
          <Typography.Text strong>Elevation & Focus</Typography.Text>
          <div className="theme-studio__surface-preview-card">
            <div className="theme-studio__surface-proxy">Card Surface</div>
            <div className="theme-studio__focus-proxy">Focus Ring</div>
          </div>
          <TextField label="Card Shadow" value={draft.fields.shadowCard} multiline onChange={(next) => updateField('shadowCard', next)} />
          <TextField label="Focus Shadow" value={draft.fields.shadowFocus} multiline onChange={(next) => updateField('shadowFocus', next)} />
        </div>
      </div>
    );
  }

  return null;
}
