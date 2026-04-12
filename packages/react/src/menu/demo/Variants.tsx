import React from 'react';
import { Menu, Tag } from '@tiny-design/react';

const menuStyle: React.CSSProperties = {
  minWidth: 240,
};

export default function VariantsDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <Menu
        mode="vertical"
        style={menuStyle}
        defaultSelectedKeys={['outline-components']}
        variant="outline"
        selectionStyle="mixed">
        <Menu.Item index="outline-foundation">Foundation</Menu.Item>
        <Menu.Item index="outline-components" extra={<Tag variant="soft" color="info">72</Tag>}>
          Components
        </Menu.Item>
        <Menu.Item index="outline-patterns">Patterns</Menu.Item>
      </Menu>

      <Menu
        mode="vertical"
        style={menuStyle}
        defaultSelectedKeys={['fill-dashboard']}
        variant="fill"
        selectionStyle="background">
        <Menu.Item index="fill-dashboard">Dashboard</Menu.Item>
        <Menu.Item index="fill-orders">Orders</Menu.Item>
        <Menu.Item index="fill-alerts" extra={<Tag variant="soft" color="warning">Hot</Tag>}>
          Alerts
        </Menu.Item>
      </Menu>

      <Menu
        mode="vertical"
        style={menuStyle}
        defaultSelectedKeys={['ghost-preview']}
        variant="ghost"
        selectionStyle="indicator"
        size="sm"
        density="compact">
        <Menu.Item index="ghost-overview">Overview</Menu.Item>
        <Menu.Item index="ghost-preview">Preview</Menu.Item>
        <Menu.Item index="ghost-export">Export</Menu.Item>
      </Menu>
    </div>
  );
}
