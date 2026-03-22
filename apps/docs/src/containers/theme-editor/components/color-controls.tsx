import React from 'react';
import { COLOR_TOKENS } from '../constants/default-tokens';
import { TokenField } from './token-field';

interface ColorControlsProps {
  seeds: Record<string, string>;
  onSeedChange: (key: string, value: string) => void;
  isOverridden: (key: string) => boolean;
  onResetToken: (key: string) => void;
}

export const ColorControls = ({
  seeds,
  onSeedChange,
  isOverridden,
  onResetToken,
}: ColorControlsProps): React.ReactElement => {
  return (
    <div className="theme-editor__panel">
      {COLOR_TOKENS.map((token) => (
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
