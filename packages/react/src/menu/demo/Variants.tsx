import React from 'react';
import { Flex, Menu, Radio, Tag } from '@tiny-design/react';
import type { MenuMode, MenuSize, MenuSelectionStyle, MenuVariant } from '@tiny-design/react';

const shellStyle: React.CSSProperties = {
  padding: 20,
  borderRadius: 16,
  background: 'linear-gradient(180deg, var(--ty-color-bg-spotlight), var(--ty-color-bg-container))',
};

const controlLabelStyle: React.CSSProperties = {
  minWidth: 110,
  color: 'var(--ty-color-text-secondary)',
  fontSize: 'var(--ty-font-size-sm)',
};

const themeOptions = ['follow', 'light', 'dark'] as const;
const modeOptions = ['horizontal', 'vertical', 'inline'] as const;
const variantOptions = ['outline', 'fill', 'ghost'] as const;
const selectionStyleOptions = ['mixed', 'border', 'background', 'indicator'] as const;
const sizeOptions = ['sm', 'md', 'lg'] as const;

type ThemeOption = (typeof themeOptions)[number];

function ControlRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <Flex align="center" wrap="wrap" gap="sm">
      <span style={controlLabelStyle}>{label}</span>
      <Radio.Group value={value} onChange={(next) => onChange(next as T)}>
        {options.map((option) => (
          <Radio key={option} value={option}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
    </Flex>
  );
}

export default function VariantsDemo() {
  const [theme, setTheme] = React.useState<ThemeOption>('follow');
  const [mode, setMode] = React.useState<MenuMode>('vertical');
  const [variant, setVariant] = React.useState<MenuVariant>('outline');
  const [selectionStyle, setSelectionStyle] = React.useState<MenuSelectionStyle>('mixed');
  const [size, setSize] = React.useState<MenuSize>('md');

  const menuStyle: React.CSSProperties =
    mode === 'horizontal' ? {} : { maxWidth: 280 };

  return (
    <Flex vertical gap="lg">
      <Flex vertical gap="sm">
        <ControlRow label="theme" value={theme} options={themeOptions} onChange={setTheme} />
        <ControlRow label="mode" value={mode} options={modeOptions} onChange={setMode} />
        <ControlRow label="variant" value={variant} options={variantOptions} onChange={setVariant} />
        <ControlRow
          label="selectionStyle"
          value={selectionStyle}
          options={selectionStyleOptions}
          onChange={setSelectionStyle}
        />
        <ControlRow label="size" value={size} options={sizeOptions} onChange={setSize} />
      </Flex>

      <div style={shellStyle}>
        <Menu
          mode={mode}
          style={menuStyle}
          theme={theme === 'follow' ? undefined : theme}
          variant={variant}
          selectionStyle={selectionStyle}
          defaultSelectedKeys={['studio-theme-tokens']}
          defaultOpenKeys={['studio-theme']}
          size={size}>
          <Menu.Item index="studio-overview">Overview</Menu.Item>
          <Menu.Item index="studio-library">Library</Menu.Item>
          <Menu.Item index="studio-updates" extra={<Tag variant="soft" color="info">Beta</Tag>}>
            Updates
          </Menu.Item>
          <Menu.SubMenu index="studio-theme" title="Theme Studio">
            <Menu.Item index="studio-theme-palette">Palette</Menu.Item>
            <Menu.Item index="studio-theme-tokens">Tokens</Menu.Item>
            <Menu.Item index="studio-theme-components">Components</Menu.Item>
            <Menu.SubMenu index="studio-theme-publish" title="Publish">
              <Menu.Item index="studio-theme-publish-preview">Preview</Menu.Item>
              <Menu.Item index="studio-theme-publish-share">Share</Menu.Item>
              <Menu.Item index="studio-theme-publish-export">Export</Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
          <Menu.SubMenu index="studio-account" title="Account">
            <Menu.ItemGroup title="Workspace">
              <Menu.Item index="studio-account-team">Team</Menu.Item>
              <Menu.Item index="studio-account-domains">Domains</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Billing">
              <Menu.Item index="studio-account-billing">Billing</Menu.Item>
              <Menu.Item index="studio-account-invoices" disabled>Invoices</Menu.Item>
              <Menu.Item index="studio-account-usage">Usage</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        </Menu>
      </div>
    </Flex>
  );
}
