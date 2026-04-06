import React from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  ConfigProvider,
  Flex,
  Input,
  Progress,
  Segmented,
  Select,
  Switch,
  Table,
  Tabs,
  Tag,
  Typography,
} from '@tiny-design/react';
import type { ThemeDocument } from '@tiny-design/react';
import type { StudioPreviewMode, StudioTemplateView } from '../state/use-studio-state';

const dashboardColumns = [
  { title: 'Surface', dataIndex: 'surface', key: 'surface' },
  { title: 'Visitors', dataIndex: 'visitors', key: 'visitors' },
  { title: 'Conversion', dataIndex: 'conversion', key: 'conversion' },
];

const dashboardRows = [
  { key: '1', surface: 'Theme Hub', visitors: '18,420', conversion: '6.2%' },
  { key: '2', surface: 'Studio Export', visitors: '8,214', conversion: '12.1%' },
  { key: '3', surface: 'Component Docs', visitors: '22,904', conversion: '4.4%' },
];

const billingColumns = [
  { title: 'Plan', dataIndex: 'plan', key: 'plan' },
  { title: 'Teams', dataIndex: 'teams', key: 'teams' },
  { title: 'MRR', dataIndex: 'mrr', key: 'mrr' },
];

const billingRows = [
  { key: '1', plan: 'Starter', teams: '42', mrr: '$2,480' },
  { key: '2', plan: 'Scale', teams: '18', mrr: '$6,340' },
  { key: '3', plan: 'Enterprise', teams: '4', mrr: '$11,800' },
];

function FoundationPreview(): React.ReactElement {
  return (
    <div className="theme-studio__preview-stack">
      <div className="theme-studio__foundation-hero">
        <div>
          <Typography.Text className="theme-studio__eyebrow">Theme Language</Typography.Text>
          <Typography.Heading level={2}>Feel the system change before touching a single page.</Typography.Heading>
          <Typography.Paragraph>
            These panels make it obvious when your brand hue, typography, radius, or focus treatment starts to shift
            the emotional tone of the whole design system.
          </Typography.Paragraph>
        </div>
        <div className="theme-studio__hero-actions">
          <Button btnType="primary">Use as Base Theme</Button>
          <Button btnType="outline">Compare Against Default</Button>
        </div>
      </div>

      <div className="theme-studio__foundation-grid">
        {[
          ['Primary', 'var(--ty-color-primary)'],
          ['Primary Bg', 'var(--ty-color-primary-bg)'],
          ['Info', 'var(--ty-color-info)'],
          ['Success', 'var(--ty-color-success)'],
          ['Surface', 'var(--ty-color-bg-container)'],
          ['Fill', 'var(--ty-color-fill)'],
          ['Border', 'var(--ty-color-border)'],
          ['Text', 'var(--ty-color-text)'],
        ].map(([label, background]) => (
          <div key={label} className="theme-studio__swatch">
            <div className="theme-studio__swatch-chip" style={{ background }} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="theme-studio__foundation-panels">
        <Card title="Editorial Surface">
          <Card.Content>
            <div className="theme-studio__editorial-surface">
              <Typography.Text className="theme-studio__eyebrow">Typography System</Typography.Text>
              <Typography.Heading level={2}>Sharper token control, stronger visual language.</Typography.Heading>
              <Typography.Paragraph>
                Tune font stacks, surface contrast, and density while watching the system rebalance in real time.
              </Typography.Paragraph>
              <div className="theme-studio__type-ramp">
                <Typography.Text strong>Heading 32</Typography.Text>
                <Typography.Text>Body 16</Typography.Text>
                <Typography.Text type="secondary">Caption 12</Typography.Text>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card title="Token Health">
          <Card.Content>
            <div className="theme-studio__token-stat-grid">
              <div className="theme-studio__token-stat">
                <span>Radius</span>
                <strong>var(--ty-border-radius)</strong>
                <Typography.Text type="secondary">Global curvature and softness.</Typography.Text>
              </div>
              <div className="theme-studio__token-stat">
                <span>Focus</span>
                <strong>var(--ty-shadow-focus)</strong>
                <Typography.Text type="secondary">How active controls announce themselves.</Typography.Text>
              </div>
              <div className="theme-studio__token-stat">
                <span>Card Shadow</span>
                <strong>var(--ty-shadow-card)</strong>
                <Typography.Text type="secondary">Sets the depth of the whole layout stack.</Typography.Text>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

function ComponentsPreview(): React.ReactElement {
  return (
    <div className="theme-studio__preview-stack">
      <div className="theme-studio__app-shell">
        <div className="theme-studio__app-nav">
          <div className="theme-studio__app-brand">
            <Avatar>TD</Avatar>
            <div>
              <Typography.Text strong>Theme Studio</Typography.Text>
              <Typography.Text type="secondary">Preview Workspace</Typography.Text>
            </div>
          </div>
          <div className="theme-studio__app-menu">
            {['Overview', 'Components', 'Tokens', 'Publish'].map((item, index) => (
              <button key={item} className={`theme-studio__app-menu-item${index === 0 ? ' theme-studio__app-menu-item_active' : ''}`}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="theme-studio__app-main">
          <div className="theme-studio__app-hero">
            <div>
              <Typography.Text className="theme-studio__eyebrow">Live Component Surface</Typography.Text>
              <Typography.Heading level={3}>A small product page built from your current tokens.</Typography.Heading>
              <Typography.Paragraph>
                This is the most useful place to judge whether your choices still feel coherent across headings, forms,
                status messaging, cards, and action buttons.
              </Typography.Paragraph>
            </div>
            <Flex gap="sm">
              <Button btnType="primary">Publish Theme</Button>
              <Button btnType="outline">Save Draft</Button>
            </Flex>
          </div>

          <div className="theme-studio__preview-card-grid">
            <div className="theme-studio__preview-card">
              <Badge count={12}>
                <Avatar>DS</Avatar>
              </Badge>
              <Typography.Text strong>Design System</Typography.Text>
              <Typography.Paragraph>Control semantic tokens, shape, elevation, and preview templates.</Typography.Paragraph>
            </div>
            <div className="theme-studio__preview-card">
              <Typography.Text strong>Theme Health</Typography.Text>
              <Progress.Bar percent={82} />
              <Typography.Paragraph>Contrast, spacing, and component coverage trend positive.</Typography.Paragraph>
            </div>
            <div className="theme-studio__preview-card theme-studio__preview-card_primary">
              <Typography.Text strong>Ship It</Typography.Text>
              <Typography.Paragraph>Ready for hub publishing, remix flows, and dark mode review.</Typography.Paragraph>
              <Button btnType="primary">Launch Review</Button>
            </div>
          </div>

          <div className="theme-studio__component-grid">
            <Card title="Controls">
              <Card.Content>
                <Flex gap="sm" wrap="wrap">
                  <Button btnType="primary">Primary</Button>
                  <Button>Default</Button>
                  <Button btnType="outline">Outline</Button>
                  <Button btnType="ghost">Ghost</Button>
                  <Button disabled>Disabled</Button>
                </Flex>
                <div className="theme-studio__component-stack">
                  <Input placeholder="Search token or component" />
                  <Select defaultValue="studio">
                    <Select.Option value="studio">Theme Studio</Select.Option>
                    <Select.Option value="hub">Community Hub</Select.Option>
                  </Select>
                  <Flex justify="space-between" align="center">
                    <Typography.Text>Live preview</Typography.Text>
                    <Switch checked />
                  </Flex>
                </div>
              </Card.Content>
            </Card>

            <Card title="Feedback">
              <Card.Content>
                <Flex direction="column" gap="sm">
                  <Alert type="success" title="Theme published successfully" />
                  <Alert type="info" title="JSON document ready for export" />
                  <Alert type="warning" title="One token override needs review" />
                </Flex>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardTemplate(): React.ReactElement {
  return (
    <div className="theme-studio__template-view">
      <div className="theme-studio__dashboard-shell">
        <aside className="theme-studio__dashboard-sidebar">
          <div className="theme-studio__dashboard-brand">
            <Avatar>TH</Avatar>
            <div>
              <Typography.Text strong>Theme Hub</Typography.Text>
              <Typography.Text type="secondary">Analytics</Typography.Text>
            </div>
          </div>
          <div className="theme-studio__dashboard-links">
            {['Overview', 'Themes', 'Forks', 'Validation', 'Publishing'].map((item, index) => (
              <button key={item} className={`theme-studio__dashboard-link${index === 0 ? ' theme-studio__dashboard-link_active' : ''}`}>
                {item}
              </button>
            ))}
          </div>
        </aside>

        <div className="theme-studio__dashboard-main">
          <div className="theme-studio__template-hero">
            <div>
              <Typography.Text className="theme-studio__eyebrow">Dashboard</Typography.Text>
              <Typography.Heading level={3}>Operational overview</Typography.Heading>
              <Typography.Paragraph>
                Check whether surfaces, data density, and hierarchy still feel balanced under heavy UI load.
              </Typography.Paragraph>
            </div>
            <Flex gap="sm">
              <Button btnType="primary">Export Theme</Button>
              <Button btnType="outline">View Diff</Button>
            </Flex>
          </div>

          <div className="theme-studio__metric-grid">
            <div className="theme-studio__metric-card"><span>Adoption</span><strong>74%</strong></div>
            <div className="theme-studio__metric-card"><span>Forks</span><strong>128</strong></div>
            <div className="theme-studio__metric-card"><span>Saved</span><strong>32</strong></div>
          </div>

          <div className="theme-studio__dashboard-content">
            <Card title="Performance Channels">
              <Card.Content>
                <Table columns={dashboardColumns} dataSource={dashboardRows} pagination={false} bordered />
              </Card.Content>
            </Card>
            <Card title="Review Queue">
              <Card.Content>
                <div className="theme-studio__queue-stack">
                  <div className="theme-studio__queue-item">
                    <Typography.Text strong>Contrast pass</Typography.Text>
                    <Tag color="success">Healthy</Tag>
                  </div>
                  <div className="theme-studio__queue-item">
                    <Typography.Text strong>Alias cleanup</Typography.Text>
                    <Tag color="warning">2 pending</Tag>
                  </div>
                  <div className="theme-studio__queue-item">
                    <Typography.Text strong>Dark mode review</Typography.Text>
                    <Tag color="info">In progress</Tag>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommerceTemplate(): React.ReactElement {
  return (
    <div className="theme-studio__template-view">
      <div className="theme-studio__commerce-banner">
        <div>
          <Typography.Text className="theme-studio__eyebrow">Pricing</Typography.Text>
          <Typography.Heading level={3}>Plans that feel premium in any brand color.</Typography.Heading>
          <Typography.Paragraph>
            Stress test primary, border, and muted surfaces with CTA-heavy marketing layouts.
          </Typography.Paragraph>
        </div>
        <Button btnType="primary">Start trial</Button>
      </div>

      <div className="theme-studio__pricing-grid">
        <div className="theme-studio__pricing-card">
          <Typography.Text strong>Starter</Typography.Text>
          <Typography.Heading level={4}>$29</Typography.Heading>
          <Typography.Paragraph>Good for documentation and small team surfaces.</Typography.Paragraph>
          <Button>Choose Starter</Button>
        </div>
        <div className="theme-studio__pricing-card theme-studio__pricing-card_featured">
          <Tag color="success">Popular</Tag>
          <Typography.Text strong>Scale</Typography.Text>
          <Typography.Heading level={4}>$79</Typography.Heading>
          <Typography.Paragraph>Built for teams shipping community themes and branded systems.</Typography.Paragraph>
          <Button btnType="primary">Choose Scale</Button>
        </div>
        <div className="theme-studio__pricing-card">
          <Typography.Text strong>Enterprise</Typography.Text>
          <Typography.Heading level={4}>Custom</Typography.Heading>
          <Typography.Paragraph>Govern schema migrations, brand matrices, and private theme hubs.</Typography.Paragraph>
          <Button btnType="outline">Talk to us</Button>
        </div>
      </div>

      <div className="theme-studio__settings-shell">
        <Card title="Plan Performance">
          <Card.Content>
            <Table columns={billingColumns} dataSource={billingRows} pagination={false} bordered />
          </Card.Content>
        </Card>
        <Card title="Feature Story">
          <Card.Content>
            <Typography.Paragraph>
              Better themes do not just recolor buttons. They reshape hierarchy, density, confidence, and the perceived
              polish of your whole product surface.
            </Typography.Paragraph>
            <Progress.Bar percent={88} />
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

function SettingsTemplate(): React.ReactElement {
  return (
    <div className="theme-studio__template-view">
      <div className="theme-studio__settings-page">
        <div className="theme-studio__template-hero">
          <div>
            <Typography.Text className="theme-studio__eyebrow">Settings</Typography.Text>
            <Typography.Heading level={3}>A realistic configuration screen.</Typography.Heading>
            <Typography.Paragraph>
              This view reveals whether your inputs, cards, tables, muted text, and switches still feel like one system.
            </Typography.Paragraph>
          </div>
          <Button btnType="primary">Save changes</Button>
        </div>

        <div className="theme-studio__settings-shell">
          <Card title="Workspace Settings">
            <Card.Content>
              <div className="theme-studio__component-stack">
                <Input placeholder="Workspace name" defaultValue="Tiny Design" />
                <Input placeholder="Primary domain" defaultValue="tiny.design" />
                <Select defaultValue="global">
                  <Select.Option value="global">Global theme</Select.Option>
                  <Select.Option value="docs">Docs only</Select.Option>
                  <Select.Option value="hub">Hub only</Select.Option>
                </Select>
                <Flex justify="space-between" align="center">
                  <Typography.Text>Auto-publish previews</Typography.Text>
                  <Switch checked />
                </Flex>
              </div>
            </Card.Content>
          </Card>

          <Card title="Release Steps">
            <Card.Content>
              <Tabs defaultActiveKey="1">
                <Tabs.Panel tab="Validate" tabKey="1">Contrast and schema validation should pass before publishing.</Tabs.Panel>
                <Tabs.Panel tab="Preview" tabKey="2">Review templates side-by-side across light and dark.</Tabs.Panel>
                <Tabs.Panel tab="Ship" tabKey="3">Publish to Theme Hub and open a remixable detail page.</Tabs.Panel>
              </Tabs>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TemplatesPreview({
  templateView,
  onChangeTemplateView,
}: {
  templateView: StudioTemplateView;
  onChangeTemplateView: (mode: StudioTemplateView) => void;
}): React.ReactElement {
  return (
    <div className="theme-studio__preview-stack">
      <div className="theme-studio__template-toolbar">
        <Segmented
          options={[
            { label: 'Dashboard', value: 'dashboard' },
            { label: 'Pricing', value: 'commerce' },
            { label: 'Settings', value: 'settings' },
          ]}
          value={templateView}
          onChange={(value) => {
            if (value === 'dashboard' || value === 'commerce' || value === 'settings') {
              onChangeTemplateView(value);
            }
          }}
        />
      </div>
      {templateView === 'dashboard' ? <DashboardTemplate /> : null}
      {templateView === 'commerce' ? <CommerceTemplate /> : null}
      {templateView === 'settings' ? <SettingsTemplate /> : null}
    </div>
  );
}

interface StudioPreviewProps {
  themeDocument: ThemeDocument;
  previewMode: StudioPreviewMode;
  onChangePreviewMode: (mode: StudioPreviewMode) => void;
  templateView: StudioTemplateView;
  onChangeTemplateView: (mode: StudioTemplateView) => void;
}

export const StudioPreview = ({
  themeDocument,
  previewMode,
  onChangePreviewMode,
  templateView,
  onChangeTemplateView,
}: StudioPreviewProps): React.ReactElement => {
  return (
    <div className="theme-studio__preview-shell">
      <div className="theme-studio__preview-toolbar">
        {(['foundation', 'components', 'templates'] as StudioPreviewMode[]).map((mode) => (
          <Button
            key={mode}
            btnType={previewMode === mode ? 'primary' : 'default'}
            onClick={() => onChangePreviewMode(mode)}
          >
            {mode}
          </Button>
        ))}
      </div>
      <ConfigProvider theme={themeDocument}>
        <div className="theme-studio__preview-scope">
          {previewMode === 'foundation' ? <FoundationPreview /> : null}
          {previewMode === 'components' ? <ComponentsPreview /> : null}
          {previewMode === 'templates' ? (
            <TemplatesPreview templateView={templateView} onChangeTemplateView={onChangeTemplateView} />
          ) : null}
        </div>
      </ConfigProvider>
    </div>
  );
};
