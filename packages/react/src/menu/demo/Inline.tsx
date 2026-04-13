import React from 'react';
import { Menu, Tag } from '@tiny-design/react';

export default function InlineDemo() {
  return (
    <Menu
      mode="inline"
      style={{ maxWidth: 280 }}
      defaultSelectedKeys={['studio-theme-tokens']}
      defaultOpenKeys={['studio-theme']}
      variant="outline"
      selectionStyle="mixed">
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
  );
}
