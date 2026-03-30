import React, { useEffect } from 'react';
import { Divider } from '@tiny-design/react';
import { FONT_TOKENS, TokenDef } from '../constants/default-tokens';
import {
  ALL_BODY_FONTS,
  ALL_MONO_FONTS,
  FontDef,
  loadGoogleFont,
} from '../utils/font-loader';

interface FontControlsProps {
  seeds: Record<string, string>;
  onSeedChange: (key: string, value: string) => void;
  isOverridden: (key: string) => boolean;
  onResetToken: (key: string) => void;
}

const FontOption = ({
  font,
  isActive,
  onClick,
}: {
  font: FontDef;
  isActive: boolean;
  onClick: () => void;
}): React.ReactElement => {
  // Load the font when it becomes visible so preview text renders correctly
  useEffect(() => {
    loadGoogleFont(font);
  }, [font]);

  return (
    <button
      className={`theme-editor__font-option ${isActive ? 'theme-editor__font-option_active' : ''}`}
      onClick={onClick}
      title={font.label}
    >
      <span className="theme-editor__font-option-name">{font.label}</span>
      <span
        className="theme-editor__font-option-preview"
        style={{ fontFamily: font.value }}
      >
        The quick brown fox
      </span>
    </button>
  );
};

const FontGroup = ({
  title,
  fonts,
  currentValue,
  onSelect,
}: {
  title: string;
  fonts: FontDef[];
  currentValue: string;
  onSelect: (value: string) => void;
}): React.ReactElement => (
  <div className="theme-editor__font-group">
    <div className="theme-editor__font-group-title">{title}</div>
    <div className="theme-editor__font-list">
      {fonts.map((font) => (
        <FontOption
          key={font.label}
          font={font}
          isActive={currentValue === font.value}
          onClick={() => onSelect(font.value)}
        />
      ))}
    </div>
  </div>
);

const FontSelector = ({
  token,
  value,
  isOverridden,
  onChange,
  onReset,
}: {
  token: TokenDef;
  value: string;
  isOverridden: boolean;
  onChange: (value: string) => void;
  onReset: () => void;
}): React.ReactElement => {
  const isMono = token.key === 'font-family-monospace';
  const fonts = isMono ? ALL_MONO_FONTS : ALL_BODY_FONTS;

  // Group body fonts by category
  const groups = isMono
    ? [{ title: 'Monospace', fonts }]
    : [
        { title: 'Sans-serif', fonts: fonts.filter((f) => f.category === 'sans-serif') },
        { title: 'Serif', fonts: fonts.filter((f) => f.category === 'serif') },
        { title: 'Display', fonts: fonts.filter((f) => f.category === 'display') },
      ];

  return (
    <div className="theme-editor__field">
      <div className="theme-editor__field-header">
        <label className="theme-editor__field-label">{token.label}</label>
        {isOverridden && (
          <button className="theme-editor__field-reset" onClick={onReset} title="Reset to default">
            Reset
          </button>
        )}
      </div>
      {groups.map((group, i) => (
        <React.Fragment key={group.title}>
          {i > 0 && <Divider style={{ margin: '8px 0' }} />}
          <FontGroup
            title={group.title}
            fonts={group.fonts}
            currentValue={value}
            onSelect={onChange}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export const FontControls = ({
  seeds,
  onSeedChange,
  isOverridden,
  onResetToken,
}: FontControlsProps): React.ReactElement => {
  return (
    <div className="theme-editor__panel">
      {FONT_TOKENS.map((token) => (
        <FontSelector
          key={token.key}
          token={token}
          value={seeds[token.key] ?? token.defaultValue}
          isOverridden={isOverridden(token.key)}
          onChange={(value) => onSeedChange(token.key, value)}
          onReset={() => onResetToken(token.key)}
        />
      ))}
    </div>
  );
};
