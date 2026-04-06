import React from 'react';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Calendar,
  Checkbox,
  DatePicker,
  Flex,
  Input,
  Progress,
  Radio,
  Select,
  Segmented,
  Switch,
  Table,
  Tag,
  Textarea,
  Typography,
} from '@tiny-design/react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@tiny-design/charts';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { swatchTextStyle } from './editor-fields';
import type { ThemeEditorFields, ThemeEditorSection, ThemePreviewTemplate } from './types';

const exerciseData = [
  { day: 'Mon', minutes: 34 },
  { day: 'Tue', minutes: 52 },
  { day: 'Wed', minutes: 49 },
  { day: 'Thu', minutes: 63 },
  { day: 'Fri', minutes: 58 },
  { day: 'Sat', minutes: 71 },
  { day: 'Sun', minutes: 66 },
];

const exerciseChartConfig: ChartConfig = {
  minutes: {
    label: 'Minutes',
    color: 'var(--ty-chart-1)',
  },
};

const revenueData = [
  { month: 'Jan', revenue: 4200, target: 3800 },
  { month: 'Feb', revenue: 5100, target: 4300 },
  { month: 'Mar', revenue: 4800, target: 4500 },
  { month: 'Apr', revenue: 6200, target: 5200 },
  { month: 'May', revenue: 6900, target: 6100 },
  { month: 'Jun', revenue: 7600, target: 6600 },
];

const revenueChartConfig: ChartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--ty-chart-1)',
  },
  target: {
    label: 'Target',
    color: 'var(--ty-chart-2)',
  },
};

function MetricsStrip({
  items = [
    ['Total Revenue', '$15,231.89', '+20.1% from last month'],
    ['Subscriptions', '+2,350', '+180.1% from last month'],
    ['Active Goal', '350', 'Calories per day'],
  ],
}: {
  items?: Array<[string, string, string]>;
}): React.ReactElement {
  return (
    <div className="theme-studio__metrics">
      {items.map(([label, value, meta]) => (
        <div key={label} className="theme-studio__metric">
          <span>{label}</span>
          <strong>{value}</strong>
          <small>{meta}</small>
        </div>
      ))}
    </div>
  );
}

function LiveResponsePanel({ fields }: { fields: ThemeEditorFields }): React.ReactElement {
  const colorPairs = [
    ['Primary', fields.primary, fields.primaryForeground],
    ['Accent', fields.accent, fields.accentForeground],
    ['Success', fields.success, fields.successForeground],
    ['Info', fields.info, fields.infoForeground],
    ['Warning', fields.warning, fields.warningForeground],
    ['Danger', fields.danger, fields.dangerForeground],
    ['Card', fields.card, fields.cardForeground],
  ];

  return (
    <div className="theme-studio__response-panel">
      <div className="theme-studio__response-section">
        <span className="theme-studio__response-label">Live Colors</span>
        <div className="theme-studio__response-swatches">
          {colorPairs.map(([label, background, foreground]) => (
            <div key={label} className="theme-studio__response-swatch" style={swatchTextStyle(background, foreground)}>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="theme-studio__response-section">
        <span className="theme-studio__response-label">Charts</span>
        <div className="theme-studio__chart-strip">
          {[fields.chart1, fields.chart2, fields.chart3, fields.chart4, fields.chart5].map((color, index) => (
            <span key={`${color}-${index}`} className="theme-studio__chart-dot" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>

      <div className="theme-studio__response-section">
        <span className="theme-studio__response-label">Typography</span>
        <div className="theme-studio__type-inline">
          <strong>Ag</strong>
          <span>{fields.fontSans.split(',')[0].replaceAll('"', '')}</span>
          <code>{fields.fontSizeBase} / {fields.lineHeightBase}</code>
        </div>
      </div>

      <div className="theme-studio__response-section">
        <span className="theme-studio__response-label">Surface</span>
        <div className="theme-studio__surface-inline">
          <div className="theme-studio__surface-proxy">Card</div>
          <div className="theme-studio__focus-proxy">Focus</div>
        </div>
      </div>

      <div className="theme-studio__response-section">
        <span className="theme-studio__response-label">Sidebar</span>
        <div className="theme-studio__sidebar-preview">
          <div className="theme-studio__sidebar-preview-shell">
            <div className="theme-studio__sidebar-preview-item theme-studio__sidebar-preview-item_primary">Primary</div>
            <div className="theme-studio__sidebar-preview-item theme-studio__sidebar-preview-item_accent">Accent</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardsPreview(): React.ReactElement {
  return (
    <div className="theme-studio__preview-stack">
      <div className="theme-studio__preview-grid theme-studio__preview-grid_cards">
        <Card title="Total Revenue" className="theme-studio__card-metric">
          <Card.Content>
            <div className="theme-studio__metric theme-studio__metric_preview">
              <span>Total Revenue</span>
              <strong>$15,231.89</strong>
              <small>+20.1% from last month</small>
            </div>
          </Card.Content>
        </Card>

        <Card title="Subscriptions" className="theme-studio__card-metric">
          <Card.Content>
            <div className="theme-studio__metric theme-studio__metric_preview">
              <span>Subscriptions</span>
              <strong>+2,350</strong>
              <small>+180.1% from last month</small>
            </div>
          </Card.Content>
        </Card>

        <Card title="Upgrade your subscription" className="theme-studio__card-tall">
          <Card.Content>
            <Typography.Paragraph>
              You are currently on the free plan. Upgrade to the pro plan to get access to all features.
            </Typography.Paragraph>
            <div className="theme-studio__form-stack">
              <Input placeholder="Name" defaultValue="Evil Rabbit" />
              <Input placeholder="Email" defaultValue="m@example.com" />
              <Input placeholder="Card Number" defaultValue="1234 1234 1234 1234" />
              <Flex gap="sm">
                <Input placeholder="MM/YY" />
                <Input placeholder="CVC" />
              </Flex>
              <div>
                <Typography.Text strong>Plan</Typography.Text>
                <Typography.Paragraph>Select the plan that best fits your needs.</Typography.Paragraph>
                <Radio.Group defaultValue="starter">
                  <Flex vertical gap="sm">
                    <Radio value="starter">Starter Plan</Radio>
                    <Radio value="pro">Pro Plan</Radio>
                  </Flex>
                </Radio.Group>
              </div>
              <Textarea rows={2} placeholder="Enter notes" />
              <Checkbox defaultChecked>I agree to the terms and conditions</Checkbox>
              <Checkbox>Allow us to send you emails</Checkbox>
              <Flex gap="sm">
                <Button>Cancel</Button>
                <Button btnType="primary">Upgrade Plan</Button>
              </Flex>
            </div>
          </Card.Content>
        </Card>

        <Card title="Create an account" className="theme-studio__card-tall">
          <Card.Content>
            <Typography.Paragraph>Enter your email below to create your account.</Typography.Paragraph>
            <div className="theme-studio__mail-compose theme-studio__mail-compose_auth">
              <Button>GitHub</Button>
              <Button>Google</Button>
            </div>
            <Typography.Text type="secondary">OR CONTINUE WITH</Typography.Text>
            <div className="theme-studio__form-stack">
              <Input placeholder="m@example.com" />
              <Input placeholder="Password" type="password" />
              <Button btnType="primary">Create account</Button>
            </div>
          </Card.Content>
        </Card>

        <Card title="Team Members">
          <Card.Content>
            <Typography.Paragraph>Invite your team members to collaborate.</Typography.Paragraph>
            <div className="theme-studio__member-list">
              {[
                ['Sofia Davis', 'm@example.com', 'Owner'],
                ['Jackson Lee', 'p@example.com', 'Developer'],
                ['Isabella Nguyen', 'i@example.com', 'Billing'],
              ].map(([name, email, role]) => (
                <div key={name} className="theme-studio__member-row">
                  <Avatar>{name.charAt(0)}</Avatar>
                  <div className="theme-studio__member-copy">
                    <Typography.Text strong>{name}</Typography.Text>
                    <Typography.Text type="secondary">{email}</Typography.Text>
                  </div>
                  <Tag>{role}</Tag>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        <Card title="Cookie Settings">
          <Card.Content>
            <Typography.Paragraph>Manage your cookie settings here.</Typography.Paragraph>
            <div className="theme-studio__settings-list">
              <div className="theme-studio__settings-row">
                <div>
                  <Typography.Text strong>Strictly Necessary</Typography.Text>
                  <Typography.Text type="secondary">These cookies are essential in order to use the website and use its features.</Typography.Text>
                </div>
                <Switch />
              </div>
              <div className="theme-studio__settings-row">
                <div>
                  <Typography.Text strong>Functional Cookies</Typography.Text>
                  <Typography.Text type="secondary">These cookies allow the website to provide personalized functionality.</Typography.Text>
                </div>
                <Switch />
              </div>
              <Button btnType="primary">Save preferences</Button>
            </div>
          </Card.Content>
        </Card>

        <Card title="June 2025">
          <Card.Content>
            <Calendar value={new Date(2025, 5, 18)} fullscreen={false} />
          </Card.Content>
        </Card>

        <Card title="Move Goal">
          <Card.Content>
            <Typography.Paragraph>Set your daily activity goal.</Typography.Paragraph>
            <div className="theme-studio__goal-display">
              <span>350</span>
              <small>Calories/day</small>
            </div>
            <Flex gap="sm" justify="space-between">
              <Button>Decrease</Button>
              <Button btnType="primary">Increase</Button>
            </Flex>
            <div className="theme-studio__goal-footer">
              <Button btnType="primary" style={{ width: '100%' }}>Set Goal</Button>
            </div>
          </Card.Content>
        </Card>

        <Card title="Exercise Minutes">
          <Card.Content>
            <Typography.Paragraph>
              Your exercise minutes are ahead of where you normally are.
            </Typography.Paragraph>
            <ChartContainer config={exerciseChartConfig} style={{ height: 220, width: '100%' }}>
              <AreaChart data={exerciseData} margin={{ top: 12, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="minutesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-minutes)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-minutes)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="minutes"
                  stroke="var(--color-minutes)"
                  fill="url(#minutesFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </Card.Content>
        </Card>

        <Card title="Selection Controls">
          <Card.Content>
            <div className="theme-studio__form-stack">
              <DatePicker placeholder="Launch date" defaultValue={new Date(2025, 5, 18)} />
              <Select defaultValue="pro">
                <Select.Option value="starter">Starter</Select.Option>
                <Select.Option value="pro">Pro</Select.Option>
                <Select.Option value="scale">Scale</Select.Option>
              </Select>
              <Radio.Group defaultValue="b">
                <Flex gap="sm">
                  <Radio value="a">A</Radio>
                  <Radio value="b">B</Radio>
                </Flex>
              </Radio.Group>
              <Checkbox defaultChecked>Enable automation</Checkbox>
              <Switch />
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

function DashboardPreview(): React.ReactElement {
  const columns = [
    { title: 'Campaign', dataIndex: 'campaign', key: 'campaign' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Conversion', dataIndex: 'conversion', key: 'conversion' },
    { title: 'Spend', dataIndex: 'spend', key: 'spend' },
  ];

  const data = [
    { key: '1', campaign: 'Spring release', status: 'Live', conversion: '18.2%', spend: '$12.4k' },
    { key: '2', campaign: 'Docs refresh', status: 'Draft', conversion: '9.4%', spend: '$4.2k' },
    { key: '3', campaign: 'Theme launch', status: 'Queued', conversion: '12.1%', spend: '$8.8k' },
  ];

  return (
    <div className="theme-studio__dashboard-shell">
      <aside className="theme-studio__dashboard-sidebar">
        <div className="theme-studio__sidebar-brand">
          <Avatar>TD</Avatar>
          <div>
            <Typography.Text strong>Tiny Theme</Typography.Text>
            <Typography.Text className="theme-studio__sidebar-subtle">Dashboard</Typography.Text>
          </div>
        </div>
        {['Overview', 'Themes', 'Revenue', 'Activity', 'Settings'].map((item, index) => (
          <button key={item} className={`theme-studio__sidebar-link${index === 0 ? ' theme-studio__sidebar-link_active' : ''}`}>
            {item}
          </button>
        ))}
      </aside>

      <div className="theme-studio__dashboard-main">
        <div className="theme-studio__dashboard-top">
          <div>
            <Typography.Text className="theme-studio__eyebrow">Dashboard</Typography.Text>
            <Typography.Heading level={3}>Revenue snapshot</Typography.Heading>
          </div>
          <div className="theme-studio__dashboard-actions">
            <Select defaultValue="30d">
              <Select.Option value="7d">Last 7 days</Select.Option>
              <Select.Option value="30d">Last 30 days</Select.Option>
              <Select.Option value="90d">Last 90 days</Select.Option>
            </Select>
            <Button btnType="primary">Export</Button>
          </div>
        </div>

        <MetricsStrip
          items={[
            ['Revenue', '$45,231.89', '+20.1% from last month'],
            ['Subscriptions', '+2,350', '+180.1% from last month'],
            ['Sales', '+12,234', '+19% from last month'],
          ]}
        />

        <div className="theme-studio__preview-grid">
          <Card title="Overview">
            <Card.Content>
              <ChartContainer config={revenueChartConfig} style={{ height: 260, width: '100%' }}>
                <AreaChart data={revenueData} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.32} />
                      <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="target" stroke="var(--color-target)" strokeWidth={2} fillOpacity={0} />
                  <Area type="monotone" dataKey="revenue" stroke="var(--color-revenue)" fill="url(#revenueFill)" strokeWidth={2} />
                </AreaChart>
              </ChartContainer>
            </Card.Content>
          </Card>

          <Card title="Performance Channels">
            <Card.Content>
              <Table columns={columns} dataSource={data} pagination={false} bordered />
            </Card.Content>
          </Card>

          <Card title="Theme Health">
            <Card.Content>
              <Flex vertical gap="sm">
                <div>
                  <Typography.Text strong>Accessibility</Typography.Text>
                  <Progress.Bar percent={84} />
                </div>
                <Alert type="success" title="Contrast is healthy across key actions." />
                <Alert type="info" title="One focus treatment was customized." />
              </Flex>
            </Card.Content>
          </Card>

          <Card title="Traffic Sources">
            <Card.Content>
              <div className="theme-studio__member-list">
                {[
                  ['Direct', '42%', 'Stable'],
                  ['Referral', '26%', '+4.2%'],
                  ['Social', '18%', '+8.4%'],
                  ['Paid', '14%', '-1.1%'],
                ].map(([name, value, meta]) => (
                  <div key={name} className="theme-studio__member-row">
                    <div className="theme-studio__member-copy">
                      <Typography.Text strong>{name}</Typography.Text>
                      <Typography.Text type="secondary">{meta}</Typography.Text>
                    </div>
                    <Tag>{value}</Tag>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MailPreview(): React.ReactElement {
  return (
    <div className="theme-studio__mail-shell">
      <aside className="theme-studio__mail-sidebar">
        <div className="theme-studio__mail-sidebar-head">
          <div>
            <Typography.Text className="theme-studio__eyebrow">Mailbox</Typography.Text>
            <Typography.Heading level={4}>Studio Mail</Typography.Heading>
          </div>
          <Button btnType="primary" style={{ width: '100%' }}>Compose</Button>
        </div>

        <div className="theme-studio__mail-folder-list">
          {[
            ['Inbox', '128'],
            ['Drafts', '9'],
            ['Sent', '24'],
            ['Junk', '3'],
            ['Trash', '0'],
          ].map(([item, count], index) => (
            <button key={item} className={`theme-studio__mail-nav-item${index === 0 ? ' theme-studio__mail-nav-item_active' : ''}`}>
              <span>{item}</span>
              <small>{count}</small>
            </button>
          ))}
        </div>

        <div className="theme-studio__mail-labels">
          <Typography.Text strong>Labels</Typography.Text>
          <Flex gap="sm" wrap>
            <Tag color="info">Design</Tag>
            <Tag color="success">Work</Tag>
            <Tag color="warning">Personal</Tag>
          </Flex>
        </div>
      </aside>

      <section className="theme-studio__mail-panel">
        <div className="theme-studio__mail-panel-head">
          <Input placeholder="Search mail" />
          <Button>Filter</Button>
        </div>

        <div className="theme-studio__mail-thread-list">
          {[
            ['Sofia Davis', 'New message', 'Hi, how can I help you today?', '12m', true],
            ['Jackson Lee', 'Billing issue', 'I cannot update my card.', '1h', false],
            ['Olivia Martin', 'Access request', 'Can you grant me editor permissions?', '3h', false],
            ['William Kim', 'Design review', 'Please review the new dashboard polish.', 'Yesterday', false],
          ].map(([sender, subject, preview, time, unread], index) => (
            <button key={sender} className={`theme-studio__mail-item${index === 0 ? ' theme-studio__mail-item_active' : ''}`}>
              <div className="theme-studio__mail-item-head">
                <strong>{sender}</strong>
                <span>{time}</span>
              </div>
              <span className="theme-studio__mail-item-subject">
                {subject}
                {unread ? <i className="theme-studio__mail-item-dot" /> : null}
              </span>
              <small>{preview}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="theme-studio__mail-detail">
        <div className="theme-studio__mail-message-head">
          <div>
            <Typography.Text strong>Re: New message</Typography.Text>
            <Typography.Text type="secondary">support@tiny.design</Typography.Text>
          </div>
          <div className="theme-studio__mail-message-actions">
            <Tag color="info">Unread</Tag>
            <Button btnType="outline">Archive</Button>
          </div>
        </div>

        <div className="theme-studio__chat-thread">
          <div className="theme-studio__chat-bubble theme-studio__chat-bubble_in">Hi, how can I help you today?</div>
          <div className="theme-studio__chat-bubble theme-studio__chat-bubble_out">Hey, I&apos;m having trouble with my account.</div>
          <div className="theme-studio__chat-bubble theme-studio__chat-bubble_in">What seems to be the problem?</div>
          <div className="theme-studio__chat-bubble theme-studio__chat-bubble_out">I can&apos;t log in after resetting my password.</div>
        </div>

        <div className="theme-studio__mail-compose-card">
          <Textarea rows={5} placeholder="Reply Sofia Davis..." />
          <div className="theme-studio__mail-compose">
            <Button>Save Draft</Button>
            <Button btnType="primary">Send</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function PricingPreview(): React.ReactElement {
  return (
    <div className="theme-studio__preview-stack">
      <div className="theme-studio__pricing-hero">
        <div>
          <Typography.Text className="theme-studio__eyebrow">Pricing</Typography.Text>
          <Typography.Heading level={2}>Simple pricing for modern teams</Typography.Heading>
          <Typography.Paragraph>Choose a plan that scales from solo work to multi-product organizations.</Typography.Paragraph>
        </div>
        <Segmented
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly', value: 'yearly' },
          ]}
          value="monthly"
        />
      </div>

      <div className="theme-studio__pricing-grid">
        {[
          { name: 'Starter', price: '$29', description: 'Perfect for small businesses.', features: ['1 workspace', 'Basic analytics', 'Community support'] },
          { name: 'Pro', price: '$89', description: 'More features and storage.', featured: true, features: ['5 workspaces', 'Advanced analytics', 'Priority support'] },
          { name: 'Scale', price: '$199', description: 'For larger teams and advanced reporting.', features: ['Unlimited workspaces', 'SSO + audit log', 'Dedicated onboarding'] },
        ].map((plan) => (
          <div key={plan.name} className={`theme-studio__pricing-card${plan.featured ? ' theme-studio__pricing-card_featured' : ''}`}>
            {plan.featured ? <Tag color="success">Popular</Tag> : null}
            <Typography.Text strong>{plan.name}</Typography.Text>
            <Typography.Heading level={2}>{plan.price}</Typography.Heading>
            <Typography.Paragraph>{plan.description}</Typography.Paragraph>
            <div className="theme-studio__pricing-feature-list">
              {plan.features.map((feature) => (
                <Typography.Text key={feature}>{feature}</Typography.Text>
              ))}
            </div>
            <Button btnType={plan.featured ? 'primary' : 'default'}>{plan.featured ? 'Upgrade plan' : 'Choose plan'}</Button>
          </div>
        ))}
      </div>

      <div className="theme-studio__preview-grid">
        <Card title="Frequently Asked Questions">
          <Card.Content>
            <div className="theme-studio__settings-list">
              <Alert type="info" title="Can I cancel anytime?" description="Yes, plans can be changed or canceled without lock-in." />
              <Alert type="success" title="Do you offer team migration?" description="Pro and Scale include assisted import and onboarding." />
            </div>
          </Card.Content>
        </Card>
        <Card title="Usage Snapshot">
          <Card.Content>
            <div className="theme-studio__settings-list">
              <div>
                <Typography.Text strong>Seats</Typography.Text>
                <Progress.Bar percent={68} />
              </div>
              <div>
                <Typography.Text strong>Storage</Typography.Text>
                <Progress.Bar percent={42} />
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

export function renderPreview(
  template: ThemePreviewTemplate,
  fields: ThemeEditorFields,
  section: ThemeEditorSection,
): React.ReactElement {
  const content = template === 'dashboard'
    ? <DashboardPreview />
    : template === 'mail'
      ? <MailPreview />
      : template === 'pricing'
        ? <PricingPreview />
        : <CardsPreview />;

  return (
    <div className="theme-studio__preview-stack">
      {(section === 'colors' || section === 'typography' || section === 'other') ? <LiveResponsePanel fields={fields} /> : null}
      {content}
    </div>
  );
}
