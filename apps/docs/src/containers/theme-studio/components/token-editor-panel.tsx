import React from 'react';
import { Checkbox, Input, Tag, Typography } from '@tiny-design/react';
import { PRESETS } from '../constants/presets';
import { RegistryToken, STUDIO_GROUPS, prettifyTokenLabel } from '../utils/studio-registry';

interface TokenEditorPanelProps {
  activeGroup: string;
  onGroupChange: (groupId: string) => void;
  groupCounts: Record<string, number>;
  search: string;
  onSearchChange: (value: string) => void;
  showChangedOnly: boolean;
  onShowChangedOnlyChange: (checked: boolean) => void;
  filteredTokens: RegistryToken[];
  selectedTokenKey?: string;
  onSelectToken: (key: string) => void;
  activePresetId: string;
  onApplyPreset: (presetId: string) => void;
}

export const TokenEditorPanel = ({
  activeGroup,
  onGroupChange,
  groupCounts,
  search,
  onSearchChange,
  showChangedOnly,
  onShowChangedOnlyChange,
  filteredTokens,
  selectedTokenKey,
  onSelectToken,
  activePresetId,
  onApplyPreset,
}: TokenEditorPanelProps): React.ReactElement => {
  return (
    <div className="theme-studio__sidebar">
      <div className="theme-studio__sidebar-top">
        <Typography.Text strong>Token Groups</Typography.Text>
        <Input
          value={search}
          placeholder="Search tokens"
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <Checkbox checked={showChangedOnly} onChange={(event) => onShowChangedOnlyChange(Boolean(event.target.checked))}>
          Changed only
        </Checkbox>
        <select
          className="theme-studio__native-select"
          value={activePresetId}
          onChange={(event) => onApplyPreset(event.target.value)}
        >
          {PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.name}
            </option>
          ))}
        </select>
      </div>

      <div className="theme-studio__group-list">
        {STUDIO_GROUPS.map((group) => (
          <button
            key={group.id}
            className={`theme-studio__group-button${group.id === activeGroup ? ' theme-studio__group-button_active' : ''}`}
            onClick={() => onGroupChange(group.id)}
          >
            <span>{group.title}</span>
            <Tag>{groupCounts[group.id] ?? 0}</Tag>
          </button>
        ))}
      </div>

      <div className="theme-studio__token-list">
        <div className="theme-studio__token-list-header">
          <Typography.Text strong>Tokens</Typography.Text>
          <Tag>{filteredTokens.length}</Tag>
        </div>
        {filteredTokens.map((token) => (
          <button
            key={token.key}
            className={`theme-studio__token-button${selectedTokenKey === token.key ? ' theme-studio__token-button_active' : ''}`}
            onClick={() => onSelectToken(token.key)}
          >
            <span>{prettifyTokenLabel(token.key)}</span>
            <span className="theme-studio__token-button-type">{token.type}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
