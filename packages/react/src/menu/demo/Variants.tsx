import React from 'react';
import { Flex, Menu, Radio, Tag } from '@tiny-design/react';
import type { MenuSize } from '@tiny-design/react';

const menuStyle: React.CSSProperties = {
  maxWidth: 280,
};

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
const variantOptions = ['outline', 'fill', 'ghost'] as const;
const selectionStyleOptions = ['mixed', 'border', 'background', 'indicator'] as const;
const sizeOptions = ['sm', 'md', 'lg'] as const;

type ThemeOption = (typeof themeOptions)[number];
type VariantOption = (typeof variantOptions)[number];
type SelectionStyleOption = (typeof selectionStyleOptions)[number];

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
    <Flex align="center" wrap gap="sm">
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
  const [variant, setVariant] = React.useState<VariantOption>('outline');
  const [selectionStyle, setSelectionStyle] = React.useState<SelectionStyleOption>('mixed');
  const [size, setSize] = React.useState<MenuSize>('md')

  return (
    <Flex vertical gap="lg">
      <Flex vertical gap="sm">
        <ControlRow label="theme" value={theme} options={themeOptions} onChange={setTheme} />
        <ControlRow label="variant" value={variant} options={variantOptions} onChange={setVariant} />
        <ControlRow
          label="selectionStyle"
          value={selectionStyle}
          options={selectionStyleOptions}
          onChange={setSelectionStyle}
        />
        <ControlRow label='size' value={size} options={sizeOptions} onChange={setSize} />
      </Flex>

      <div style={shellStyle}>
        <Menu
          mode="vertical"
          style={menuStyle}
          theme={theme === 'follow' ? undefined : theme}
          variant={variant}
          selectionStyle={selectionStyle}
          defaultSelectedKeys={['library-components']}
          defaultOpenKeys={['library-patterns']}
          size={size}>
          <Menu.Item index="library-overview">Overview</Menu.Item>
          <Menu.Item index="library-components" extra={<Tag variant="soft" color="info">72</Tag>}>
            Components
          </Menu.Item>
          <Menu.SubMenu index="library-patterns" title="Patterns">
            <Menu.Item index="patterns-dashboard">Dashboard Shell</Menu.Item>
            <Menu.Item index="patterns-forms">Step Form</Menu.Item>
            <Menu.Item index="patterns-settings">Settings</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item index="library-release" extra={<Tag variant="soft" color="warning">New</Tag>}>
            Release Notes
          </Menu.Item>
        </Menu>
      </div>
    </Flex>
  );
}
