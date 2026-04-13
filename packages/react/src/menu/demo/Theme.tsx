import React from 'react';
import { Menu, Tag } from '@tiny-design/react';

const shellStyle: React.CSSProperties = {
  padding: 20,
  borderRadius: 16,
  background: 'linear-gradient(180deg, var(--ty-color-bg-spotlight), var(--ty-color-bg-container))',
};

export default function ThemeDemo() {
  return (
    <div style={shellStyle}>
      <Menu
        mode="vertical"
        theme="dark"
        style={{ maxWidth: 280 }}
        defaultSelectedKeys={['studio-overview']}
        variant="outline"
        selectionStyle="mixed">
        <Menu.Item index="studio-overview">Studio Overview</Menu.Item>
        <Menu.Item index="studio-assets" extra={<Tag variant="soft" color="warning">8</Tag>}>
          Assets
        </Menu.Item>
        <Menu.SubMenu index="studio-theme" title="Theme Studio">
          <Menu.Item index="studio-theme-tokens">Tokens</Menu.Item>
          <Menu.Item index="studio-theme-presets">Presets</Menu.Item>
          <Menu.Item index="studio-theme-preview">Live Preview</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item index="studio-release">Release Notes</Menu.Item>
      </Menu>
    </div>
  );
}
