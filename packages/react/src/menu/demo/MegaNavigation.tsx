import React from 'react';
import { Menu, Tag } from '@tiny-design/react';
import './mega-navigation.scss';

type FeatureItem = {
  key: string;
  title: string;
  description: string;
  badge?: string;
};

const componentItems: FeatureItem[] = [
  {
    key: 'alert-dialog',
    title: 'Alert Dialog',
    description: 'A focused modal for urgent decisions that require a clear response.',
  },
  {
    key: 'hover-card',
    title: 'Hover Card',
    description: 'Preview linked content, people, or metadata without leaving the page.',
  },
  {
    key: 'progress',
    title: 'Progress',
    description: 'Show task, upload, or workflow completion with clear visual feedback.',
    badge: 'Updated',
  },
  {
    key: 'scroll-area',
    title: 'Scroll Area',
    description: 'Create more intentional scrolling regions for dense panels and inspectors.',
  },
  {
    key: 'tabs',
    title: 'Tabs',
    description: 'Split complex views into clear parallel sections for dashboards and settings.',
  },
  {
    key: 'tooltip',
    title: 'Tooltip',
    description: 'Add lightweight explanations and hints without interrupting the main flow.',
  },
];

const resourceItems: FeatureItem[] = [
  {
    key: 'guides',
    title: 'Design Guides',
    description: 'Patterns for information architecture, interaction semantics, and theme strategy.',
  },
  {
    key: 'templates',
    title: 'Page Templates',
    description: 'Ready-made shells for authentication, product consoles, and marketing surfaces.',
    badge: 'New',
  },
  {
    key: 'tokens',
    title: 'Token System',
    description: 'A shared language for color, radius, elevation, spacing, and typography.',
  },
  {
    key: 'cli',
    title: 'CLI & MCP',
    description: 'Scaffolding, theme export, and AI workflow integration for faster delivery.',
  },
];

function FeatureCard({ item }: { item: FeatureItem }) {
  return (
    <div className="menu-mega-nav__card">
      <div className="menu-mega-nav__card-heading">
        <span className="menu-mega-nav__card-title">{item.title}</span>
        {item.badge ? (
          <Tag variant="soft" color="info">
            {item.badge}
          </Tag>
        ) : null}
      </div>
      <p className="menu-mega-nav__card-description">{item.description}</p>
    </div>
  );
}

export default function MegaNavigationDemo() {
  return (
    <div className="menu-mega-nav">
      <Menu
        defaultSelectedKeys={['components']}
        overlayClassName="menu-mega-nav__popup"
        className="menu-mega-nav__bar">
        <Menu.SubMenu
          index="getting-started"
          title="Getting started"
          extra={<span className="menu-mega-nav__nav-pill">New</span>}>
          <Menu.Item index="getting-started-install">Installation</Menu.Item>
          <Menu.Item index="getting-started-theme">Theme Setup</Menu.Item>
          <Menu.Item index="getting-started-layout">Layout Principles</Menu.Item>
          <Menu.Item index="getting-started-figma">Design Assets</Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          index="components"
          title="Components"
          extra={<Tag variant="soft" color="info">28</Tag>}>
          {componentItems.map((item) => (
            <Menu.Item key={item.key} index={`components-${item.key}`}>
              <FeatureCard item={item} />
            </Menu.Item>
          ))}
        </Menu.SubMenu>

        <Menu.SubMenu index="docs" title="Docs">
          {resourceItems.map((item) => (
            <Menu.Item key={item.key} index={`docs-${item.key}`}>
              <FeatureCard item={item} />
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}
