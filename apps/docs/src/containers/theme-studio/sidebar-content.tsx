import React from 'react';
import { Collapse, Flex, Select, Text } from '@tiny-design/react';
import { FONT_OPTIONS, MONO_OPTIONS, SEED_COLOR_GROUPS } from './editor-config';
import { ColorField, ShadowField, SliderField, TextField } from './editor-fields';
import type { FieldKey, ThemeEditorDraft, ThemeEditorSection, ThemeEditorSeedGroup } from './types';

const CONTROL_SHADOW_FALLBACK = {
  color: 'oklch(0 0 0)',
  opacity: 0.1,
  blur: 3,
  spread: 0,
  offsetX: 0,
  offsetY: 1,
};

const CARD_SHADOW_FALLBACK = {
  color: 'oklch(0 0 0)',
  opacity: 0.1,
  blur: 3,
  spread: 0,
  offsetX: 0,
  offsetY: 1,
};

const FOCUS_SHADOW_FALLBACK = {
  color: '#6e41bf',
  opacity: 0.24,
  blur: 0,
  spread: 3,
  offsetX: 0,
  offsetY: 0,
};

function renderColorGroups(
  groups: ThemeEditorSeedGroup[],
  draft: ThemeEditorDraft,
  updateField: (key: FieldKey, value: string) => void
): React.ReactElement[] {
  return groups.map((group) => (
    <div key={group.title} className="theme-studio__group-card">
      <Flex vertical gap={2} className="theme-studio__group-header theme-studio__copy-stack">
        <Text strong>{group.title}</Text>
        {group.description ? <Text type="secondary">{group.description}</Text> : null}
      </Flex>
      <Flex vertical gap={8} className="theme-studio__group-fields">
        {group.fields.map((field) => (
          <ColorField
            key={field.key}
            label={field.label}
            value={draft.fields[field.key]}
            onChange={(next) => updateField(field.key, next)}
          />
        ))}
      </Flex>
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
  const coreColorGroups = SEED_COLOR_GROUPS.filter((group) => group.tier !== 'advanced');
  const advancedColorGroups = SEED_COLOR_GROUPS.filter((group) => group.tier === 'advanced');

  if (section === 'colors') {
    return (
      <Flex vertical gap={8} className="theme-studio__panel-stack">
        <div className="theme-studio__group-card theme-studio__group-card_toolbar">
          <Flex className="theme-studio__group-toolbar theme-studio__group-toolbar_start">
            <Flex vertical gap={2} className="theme-studio__copy-stack">
              <Text strong>Primitive Color Seeds</Text>
              <Text type="secondary">
                Edit the brand seed layer directly. These values compile into semantic and component
                color tokens.
              </Text>
            </Flex>
          </Flex>
          <div className="theme-studio__summary-grid theme-studio__summary-grid_compact">
            <div className="theme-studio__summary-card">
              <span>Layer 1</span>
              <strong>Seeds</strong>
            </div>
            <div className="theme-studio__summary-card">
              <span>Layer 2</span>
              <strong>Semantic</strong>
            </div>
            <div className="theme-studio__summary-card">
              <span>Layer 3</span>
              <strong>Components</strong>
            </div>
          </div>
        </div>
        <Flex vertical gap={8} className="theme-studio__group-section">
          <Flex vertical gap={2} className="theme-studio__section-header">
            <Text strong>Core Seed Groups</Text>
            <Text type="secondary">
              Start with brand, surfaces, feedback, and interaction primitives.
            </Text>
          </Flex>
          {renderColorGroups(coreColorGroups, draft, updateField)}
        </Flex>
        {advancedColorGroups.length > 0 ? (
          <Flex vertical gap={8} className="theme-studio__group-section">
            <Collapse
              bordered={false}
              className="theme-studio__advanced-collapse"
              defaultValue={[]}
              items={[
                {
                  key: 'advanced-colors',
                  label: (
                    <Flex vertical gap={2} className="theme-studio__section-header">
                      <Text strong>Advanced Seed Groups</Text>
                      <Text type="secondary">Shell, charts, and specialized palettes.</Text>
                    </Flex>
                  ),
                  children: renderColorGroups(advancedColorGroups, draft, updateField),
                },
              ]}
            />
          </Flex>
        ) : null}
      </Flex>
    );
  }

  if (section === 'typography') {
    return (
      <Flex vertical gap={8} className="theme-studio__panel-stack">
        <div className="theme-studio__group-card theme-studio__group-card_toolbar">
          <Flex className="theme-studio__group-toolbar theme-studio__group-toolbar_start">
            <Flex vertical gap={2} className="theme-studio__copy-stack">
              <Text strong>Primitive Type Seeds</Text>
              <Text type="secondary">
                Font families, scale, and rhythm compile into semantic typography tokens.
              </Text>
            </Flex>
          </Flex>
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
          <Text strong>Font Family</Text>
          <div className="theme-studio__type-preview-card">
            <strong style={{ fontFamily: draft.fields.fontSans }}>
              The quick brown fox jumps over the lazy dog.
            </strong>
            <code style={{ fontFamily: draft.fields.fontMono }}>
              const theme = &#123; mode: &quot;{draft.mode}&quot; &#125;
            </code>
          </div>
          <label className="theme-studio__field">
            <span className="theme-studio__field-label">Sans Preset</span>
            <Select
              value={draft.fields.fontSans}
              onChange={(value) => updateField('fontSans', String(value))}>
              {FONT_OPTIONS.map((font) => (
                <Select.Option key={font} value={font}>
                  {font.split(',')[0].replaceAll('"', '')}
                </Select.Option>
              ))}
            </Select>
          </label>
          <TextField
            label="Custom Sans Stack"
            value={draft.fields.fontSans}
            onChange={(next) => updateField('fontSans', next)}
          />
          <label className="theme-studio__field">
            <span className="theme-studio__field-label">Mono Preset</span>
            <Select
              value={draft.fields.fontMono}
              onChange={(value) => updateField('fontMono', String(value))}>
              {MONO_OPTIONS.map((font) => (
                <Select.Option key={font} value={font}>
                  {font.split(',')[0].replaceAll('"', '')}
                </Select.Option>
              ))}
            </Select>
          </label>
          <TextField
            label="Custom Mono Stack"
            value={draft.fields.fontMono}
            onChange={(next) => updateField('fontMono', next)}
          />
        </div>

        <div className="theme-studio__group-card">
          <Text strong>Type Scale</Text>
          <SliderField
            label="Base Font Size"
            value={draft.fields.fontSizeBase}
            onChange={(next) => updateField('fontSizeBase', next)}
            config={{ min: 12, max: 20, step: 1, unit: 'px' }}
          />
          <SliderField
            label="Line Height"
            value={draft.fields.lineHeightBase}
            onChange={(next) => updateField('lineHeightBase', next)}
            config={{ min: 1.1, max: 2, step: 0.05 }}
          />
          <SliderField
            label="H1 Size"
            value={draft.fields.h1Size}
            onChange={(next) => updateField('h1Size', next)}
            config={{ min: 28, max: 64, step: 1, unit: 'px' }}
          />
          <SliderField
            label="H2 Size"
            value={draft.fields.h2Size}
            onChange={(next) => updateField('h2Size', next)}
            config={{ min: 22, max: 48, step: 1, unit: 'px' }}
          />
        </div>

        <div className="theme-studio__group-card">
          <Text strong>Fine Tuning</Text>
          <SliderField
            label="Letter Spacing"
            value={draft.fields.letterSpacing}
            onChange={(next) => updateField('letterSpacing', next)}
            config={{ min: -0.08, max: 0.08, step: 0.01, unit: 'em' }}
          />
          <div className="theme-studio__type-preview-lines">
            <span
              style={{ fontSize: draft.fields.h1Size, letterSpacing: draft.fields.letterSpacing }}>
              Heading Preview
            </span>
            <span
              style={{
                fontSize: draft.fields.fontSizeBase,
                lineHeight: draft.fields.lineHeightBase,
              }}>
              Body copy reflects base scale and rhythm.
            </span>
          </div>
        </div>
      </Flex>
    );
  }

  if (section === 'other') {
    return (
      <Flex vertical gap={8} className="theme-studio__panel-stack">
        <div className="theme-studio__group-card theme-studio__group-card_toolbar">
          <Flex className="theme-studio__group-toolbar theme-studio__group-toolbar_start">
            <Flex vertical gap={2} className="theme-studio__copy-stack">
              <Text strong>Primitive Scale & Effect Seeds</Text>
              <Text type="secondary">
                Shape, density, and elevation seeds compile into control and component tokens.
              </Text>
            </Flex>
          </Flex>
          <div className="theme-studio__summary-grid theme-studio__summary-grid_compact">
            <div className="theme-studio__summary-card">
              <span>Radius</span>
              <strong>{draft.fields.radius}</strong>
            </div>
            <div className="theme-studio__summary-card">
              <span>Fields</span>
              <strong>{`${draft.fields.fieldHeightSm} / ${draft.fields.fieldHeightMd} / ${draft.fields.fieldHeightLg}`}</strong>
            </div>
            <div className="theme-studio__summary-card">
              <span>Buttons</span>
              <strong>{`${draft.fields.buttonHeightSm} / ${draft.fields.buttonHeightMd} / ${draft.fields.buttonHeightLg}`}</strong>
            </div>
            <div className="theme-studio__summary-card">
              <span>Padding</span>
              <strong>{draft.fields.cardPadding}</strong>
            </div>
          </div>
        </div>

        <div className="theme-studio__group-card">
          <Text strong>Shape</Text>
          <SliderField
            label="Global Radius"
            value={draft.fields.radius}
            onChange={(next) => updateField('radius', next)}
            config={{ min: 0, max: 2, step: 0.0625, unit: 'rem' }}
          />
          <SliderField
            label="Button Radius"
            value={draft.fields.buttonRadius}
            onChange={(next) => updateField('buttonRadius', next)}
            config={{ min: 0, max: 4, step: 0.0625, unit: 'rem' }}
          />
          <SliderField
            label="Input Radius"
            value={draft.fields.inputRadius}
            onChange={(next) => updateField('inputRadius', next)}
            config={{ min: 0, max: 2, step: 0.0625, unit: 'rem' }}
          />
          <SliderField
            label="Card Radius"
            value={draft.fields.cardRadius}
            onChange={(next) => updateField('cardRadius', next)}
            config={{ min: 0, max: 2.5, step: 0.0625, unit: 'rem' }}
          />
        </div>

        <div className="theme-studio__group-card">
          <Flex vertical gap={2} className="theme-studio__section-header">
            <Text strong>Density</Text>
            <Text type="secondary">Tune spacing and heights for fields, buttons, and cards.</Text>
          </Flex>
          <Flex vertical gap={8} className="theme-studio__group-fields">
            <Text className="theme-studio__subgroup-title">Fields</Text>
            <SliderField
              label="Field Height / Medium"
              value={draft.fields.fieldHeightMd}
              onChange={(next) => updateField('fieldHeightMd', next)}
              config={{ min: 20, max: 56, step: 1, unit: 'px' }}
            />
            <SliderField
              label="Field Padding / Medium"
              value={draft.fields.fieldPaddingMd}
              onChange={(next) => updateField('fieldPaddingMd', next)}
              config={{ min: 0, max: 32, step: 1, unit: 'px' }}
            />
            <Collapse
              bordered={false}
              className="theme-studio__advanced-collapse"
              defaultValue={[]}
              items={[
                {
                  key: 'field-density-advanced',
                  label: (
                    <Flex vertical gap={2} className="theme-studio__section-header">
                      <Text strong>Advanced Sizes</Text>
                      <Text type="secondary">Small and large field density.</Text>
                    </Flex>
                  ),
                  children: (
                    <>
                      <SliderField
                        label="Field Height / Small"
                        value={draft.fields.fieldHeightSm}
                        onChange={(next) => updateField('fieldHeightSm', next)}
                        config={{ min: 20, max: 56, step: 1, unit: 'px' }}
                      />
                      <SliderField
                        label="Field Height / Large"
                        value={draft.fields.fieldHeightLg}
                        onChange={(next) => updateField('fieldHeightLg', next)}
                        config={{ min: 20, max: 56, step: 1, unit: 'px' }}
                      />
                      <SliderField
                        label="Field Padding / Small"
                        value={draft.fields.fieldPaddingSm}
                        onChange={(next) => updateField('fieldPaddingSm', next)}
                        config={{ min: 0, max: 32, step: 1, unit: 'px' }}
                      />
                      <SliderField
                        label="Field Padding / Large"
                        value={draft.fields.fieldPaddingLg}
                        onChange={(next) => updateField('fieldPaddingLg', next)}
                        config={{ min: 0, max: 32, step: 1, unit: 'px' }}
                      />
                    </>
                  ),
                },
              ]}
            />
          </Flex>

          <Flex vertical gap={8} className="theme-studio__group-fields">
            <Text className="theme-studio__subgroup-title">Buttons</Text>
            <SliderField
              label="Button Height / Medium"
              value={draft.fields.buttonHeightMd}
              onChange={(next) => updateField('buttonHeightMd', next)}
              config={{ min: 20, max: 56, step: 1, unit: 'px' }}
            />
            <SliderField
              label="Button Padding / Medium"
              value={draft.fields.buttonPaddingMd}
              onChange={(next) => updateField('buttonPaddingMd', next)}
              config={{ min: 0, max: 32, step: 1, unit: 'px' }}
            />
            <Collapse
              bordered={false}
              className="theme-studio__advanced-collapse"
              defaultValue={[]}
              items={[
                {
                  key: 'button-density-advanced',
                  label: (
                    <Flex vertical gap={2} className="theme-studio__section-header">
                      <Text strong>Advanced Sizes</Text>
                      <Text type="secondary">Small and large button density.</Text>
                    </Flex>
                  ),
                  children: (
                    <>
                      <SliderField
                        label="Button Height / Small"
                        value={draft.fields.buttonHeightSm}
                        onChange={(next) => updateField('buttonHeightSm', next)}
                        config={{ min: 20, max: 56, step: 1, unit: 'px' }}
                      />
                      <SliderField
                        label="Button Height / Large"
                        value={draft.fields.buttonHeightLg}
                        onChange={(next) => updateField('buttonHeightLg', next)}
                        config={{ min: 20, max: 56, step: 1, unit: 'px' }}
                      />
                      <SliderField
                        label="Button Padding / Small"
                        value={draft.fields.buttonPaddingSm}
                        onChange={(next) => updateField('buttonPaddingSm', next)}
                        config={{ min: 0, max: 32, step: 1, unit: 'px' }}
                      />
                      <SliderField
                        label="Button Padding / Large"
                        value={draft.fields.buttonPaddingLg}
                        onChange={(next) => updateField('buttonPaddingLg', next)}
                        config={{ min: 0, max: 32, step: 1, unit: 'px' }}
                      />
                    </>
                  ),
                },
              ]}
            />
          </Flex>

          <Flex vertical gap={8} className="theme-studio__group-fields">
            <Text className="theme-studio__subgroup-title">Cards</Text>
            <SliderField
              label="Card Padding"
              value={draft.fields.cardPadding}
              onChange={(next) => updateField('cardPadding', next)}
              config={{ min: 12, max: 40, step: 1, unit: 'px' }}
            />
          </Flex>
        </div>

        <div className="theme-studio__group-card">
          <Text strong>Elevation & Focus</Text>
          <div className="theme-studio__surface-preview-card">
            <div className="theme-studio__control-proxy">Control Surface</div>
            <div className="theme-studio__surface-proxy">Card Surface</div>
            <div className="theme-studio__focus-proxy">Focus Ring</div>
          </div>
          <ShadowField
            label="Control Shadow"
            value={draft.fields.shadowControl}
            fallback={CONTROL_SHADOW_FALLBACK}
            onChange={(next) => updateField('shadowControl', next)}
          />
          <ShadowField
            label="Card Shadow"
            value={draft.fields.shadowCard}
            fallback={CARD_SHADOW_FALLBACK}
            onChange={(next) => updateField('shadowCard', next)}
          />
          <ShadowField
            label="Focus Shadow"
            value={draft.fields.shadowFocus}
            fallback={FOCUS_SHADOW_FALLBACK}
            onChange={(next) => updateField('shadowFocus', next)}
          />
        </div>
      </Flex>
    );
  }

  return null;
}
