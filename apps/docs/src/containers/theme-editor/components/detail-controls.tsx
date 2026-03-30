import React from 'react';
import { Divider } from '@tiny-design/react';
import { DETAIL_TOKENS, SHADOW_TOKENS, SPACING_TOKENS } from '../constants/default-tokens';
import { TokenField } from './token-field';

interface DetailControlsProps {
  seeds: Record<string, string>;
  onSeedChange: (key: string, value: string) => void;
  isOverridden: (key: string) => boolean;
  onResetToken: (key: string) => void;
}

export const DetailControls = ({
  seeds,
  onSeedChange,
  isOverridden,
  onResetToken,
}: DetailControlsProps): React.ReactElement => {
  return (
    <div className="theme-editor__panel">
      {DETAIL_TOKENS.map((token) => (
        <TokenField
          key={token.key}
          token={token}
          value={seeds[token.key] ?? token.defaultValue}
          isOverridden={isOverridden(token.key)}
          onChange={(value) => onSeedChange(token.key, value)}
          onReset={() => onResetToken(token.key)}
        />
      ))}

      <Divider style={{ margin: '12px 0' }} />
      <div className="theme-editor__section-label">Spacing</div>
      {SPACING_TOKENS.map((token) => (
        <TokenField
          key={token.key}
          token={token}
          value={seeds[token.key] ?? token.defaultValue}
          isOverridden={isOverridden(token.key)}
          onChange={(value) => onSeedChange(token.key, value)}
          onReset={() => onResetToken(token.key)}
        />
      ))}

      <Divider style={{ margin: '12px 0' }} />
      <div className="theme-editor__section-label">Shadows</div>
      {SHADOW_TOKENS.map((token) => (
        <TokenField
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
