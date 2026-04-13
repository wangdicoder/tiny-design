import React from 'react';
import { Menu, Tag } from '@tiny-design/react';

export default function VerticalDemo() {
  return (
    <Menu
      mode="vertical"
      style={{ maxWidth: 280 }}
      defaultSelectedKeys={['workspace-overview']}>
      <Menu.Item index="workspace-overview">Overview</Menu.Item>
      <Menu.Item index="workspace-orders" extra={<Tag variant="soft" color="warning">5</Tag>}>
        Orders
      </Menu.Item>
      <Menu.Item index="workspace-traffic">Traffic</Menu.Item>
      <Menu.SubMenu index="workspace-customers" title="Customers">
        <Menu.Item index="workspace-customers-list">Customer List</Menu.Item>
        <Menu.Item index="workspace-customers-segments">Segments</Menu.Item>
        <Menu.Item index="workspace-customers-feedback">Feedback</Menu.Item>
        <Menu.SubMenu index="workspace-customers-lifecycle" title="Lifecycle">
          <Menu.Item index="workspace-customers-lifecycle-new">New Users</Menu.Item>
          <Menu.Item index="workspace-customers-lifecycle-retention">Retention</Menu.Item>
          <Menu.Item index="workspace-customers-lifecycle-churn">Churn</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.SubMenu index="workspace-settings" title="Workspace Settings">
        <Menu.ItemGroup title="Workspace">
          <Menu.Item index="workspace-settings-general">General</Menu.Item>
          <Menu.Item index="workspace-settings-brand">Brand</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Admin">
          <Menu.Item index="workspace-settings-members">Members</Menu.Item>
          <Menu.Item index="workspace-settings-security" disabled>Security</Menu.Item>
          <Menu.Item index="workspace-settings-api">API Keys</Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
    </Menu>
  );
}
