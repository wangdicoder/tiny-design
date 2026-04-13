import React from 'react';
import { Menu, Tag } from '@tiny-design/react';

export default function HorizontalDemo() {
  return (
    <Menu defaultSelectedKeys={['projects']} variant="outline" selectionStyle="mixed">
      <Menu.Item index="overview">Overview</Menu.Item>
      <Menu.Item index="projects" extra={<Tag variant="soft" color="info">12</Tag>}>
        Projects
      </Menu.Item>
      <Menu.Item index="insights">Insights</Menu.Item>
      <Menu.SubMenu index="resources" title="Resources" extra={<Tag variant="outlined">New</Tag>}>
        <Menu.Item index="resources-docs">Docs</Menu.Item>
        <Menu.Item index="resources-guides">Guides</Menu.Item>
        <Menu.Item index="resources-api">API Reference</Menu.Item>
        <Menu.SubMenu index="resources-community" title="Community">
          <Menu.Item index="resources-community-showcase">Showcase</Menu.Item>
          <Menu.Item index="resources-community-discord">Discord</Menu.Item>
          <Menu.Item index="resources-community-roadmap">Roadmap</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.SubMenu index="settings" title="Settings">
        <Menu.ItemGroup title="Group 1">
          <Menu.Item index="settings-profile">Profile</Menu.Item>
          <Menu.Item index="settings-billing">Billing</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Group 2">
          <Menu.Item index="settings-notifications">Notifications</Menu.Item>
          <Menu.Item index="settings-security" disabled>Security</Menu.Item>
          <Menu.Item index="settings-team">Team</Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
    </Menu>
  );
}
