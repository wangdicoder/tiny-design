import React from 'react';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Flex,
  Grid,
  Input,
  Progress,
  Radio,
  Select,
  Segmented,
  Switch,
  Table,
  Tag,
  Textarea,
  Calendar,
  Heading,
  Paragraph,
  Text,
} from '@tiny-design/react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@tiny-design/charts';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { swatchTextStyle } from './editor-fields';
import type { ThemeEditorFields, ThemeEditorSection, ThemePreviewTemplate } from './types';
import { IconGithub, IconGoogle } from '@tiny-design/icons';

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

const cardsRevenueData = [
  { month: 'Jan', value: 8.4 },
  { month: 'Feb', value: 7.2 },
  { month: 'Mar', value: 7.8 },
  { month: 'Apr', value: 6.9 },
  { month: 'May', value: 7.4 },
  { month: 'Jun', value: 8.1 },
  { month: 'Jul', value: 12.4 },
];

const cardsRevenueChartConfig: ChartConfig = {
  value: {
    label: 'Revenue',
    color: 'var(--ty-chart-4)',
  },
};

const moveGoalData = [
  { key: 'm1', dayLabel: 'M', value: 280 },
  { key: 't1', dayLabel: 'T', value: 340 },
  { key: 'w1', dayLabel: 'W', value: 220 },
  { key: 'th1', dayLabel: 'T', value: 310 },
  { key: 'f1', dayLabel: 'F', value: 360 },
  { key: 's1', dayLabel: 'S', value: 240 },
  { key: 'su1', dayLabel: 'S', value: 300 },
  { key: 'm2', dayLabel: 'M', value: 330 },
  { key: 't2', dayLabel: 'T', value: 260 },
  { key: 'w2', dayLabel: 'W', value: 320 },
  { key: 'th2', dayLabel: 'T', value: 350 },
  { key: 'f2', dayLabel: 'F', value: 290 },
];

const moveGoalChartConfig: ChartConfig = {
  value: {
    label: 'Calories',
    color: 'var(--ty-chart-1)',
  },
};

const cardsExerciseData = [
  { month: 'Mar', personal: 18, average: 22 },
  { month: 'Apr', personal: 14, average: 18 },
  { month: 'May', personal: 58, average: 26 },
  { month: 'Jun', personal: 28, average: 24 },
  { month: 'Jul', personal: 22, average: 20 },
  { month: 'Aug', personal: 26, average: 23 },
];

const cardsExerciseChartConfig: ChartConfig = {
  personal: {
    label: 'You',
    color: 'var(--ty-chart-2)',
  },
  average: {
    label: 'Average',
    color: 'var(--ty-chart-5)',
  },
};

const subscriptionsData = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 620 },
  { month: 'Mar', value: 980 },
  { month: 'Apr', value: 1480 },
  { month: 'May', value: 1910 },
  { month: 'Jun', value: 880 },
  { month: 'Jul', value: 2350 },
];

const subscriptionsChartConfig: ChartConfig = {
  value: {
    label: 'Subscriptions',
    color: 'var(--editor-card-foreground)',
  },
};

const currYear = new Date().getFullYear()
const currMonth = new Date().getMonth()

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
    <Grid className="theme-studio__metrics" minColumnWidth={180} gap="sm">
      {items.map(([label, value, meta]) => (
        <div key={label} className="theme-studio__metric">
          <span>{label}</span>
          <strong>{value}</strong>
          <small>{meta}</small>
        </div>
      ))}
    </Grid>
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
        <Grid className="theme-studio__response-swatches" columns={2} gap={6}>
          {colorPairs.map(([label, background, foreground]) => (
            <div key={label} className="theme-studio__response-swatch" style={swatchTextStyle(background, foreground)}>
              <span>{label}</span>
            </div>
          ))}
        </Grid>
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
    <div className="theme-studio__cards-scene">
      <div className="theme-studio__cards-column">
        <div className="theme-studio__cards-top-pair">
          <Card className="theme-studio__cards-panel theme-studio__cards-panel_revenue">
            <Card.Content>
              <div className="theme-studio__cards-panel-head">
                <div>
                  <Text strong>Total Revenue</Text>
                  <Text type="secondary">+20.1% from last month</Text>
                </div>
              </div>
              <Heading level={2}>$15,231.89</Heading>
              <ChartContainer config={cardsRevenueChartConfig} style={{ height: 72, width: '100%' }}>
                <LineChart data={cardsRevenueData} margin={{ top: 10, right: 6, left: -22, bottom: 0 }}>
                  <XAxis dataKey="month" hide />
                  <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent labelKey="month" />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-value)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </Card.Content>
          </Card>

          <Card className="theme-studio__cards-panel theme-studio__cards-panel_revenue">
            <Card.Content>
              <div className="theme-studio__cards-panel-head">
                <div>
                  <Text strong>Subscriptions</Text>
                  <Text type="secondary">+180.1% from last month</Text>
                </div>
              </div>
              <Heading level={2}>+2,350</Heading>
              <ChartContainer config={subscriptionsChartConfig} style={{ height: 72, width: '100%' }}>
                <AreaChart data={subscriptionsData} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="subscriptionsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="10%" stopColor="var(--color-value)" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="var(--color-value)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" hide />
                  <YAxis hide />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent labelKey="month" />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-value)"
                    fill="url(#subscriptionsFill)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </Card.Content>
          </Card>
        </div>

        <Card className="theme-studio__cards-panel">
          <Card.Content>
            <div className="theme-studio__cards-copy-block">
              <Text strong>Upgrade your subscription</Text>
              <Text type="secondary">
                You are currently on the free plan. Upgrade to the pro plan to get access to all features.
              </Text>
            </div>
            <div className="theme-studio__form-stack">
              <Flex gap="sm">
                <Input placeholder="Name" defaultValue="Evil Rabbit" />
                <Input placeholder="Email" defaultValue="m@example.com" />
              </Flex>
              <Input placeholder="Card Number" defaultValue="1234 1234 1234 1234" />
              <Flex gap="sm">
                <Input placeholder="MM/YY" defaultValue="06/25" />
                <Input placeholder="CVC" defaultValue="001" />
              </Flex>
              <Radio.Group defaultValue="starter">
                <div className="theme-studio__cards-plan-grid">
                  <div className="theme-studio__cards-plan-option">
                    <Radio value="starter">
                      <div>
                        <strong>Starter Plan</strong>
                        <small>Perfect for small businesses.</small>
                      </div>
                    </Radio>
                  </div>
                  <div className="theme-studio__cards-plan-option">
                    <Radio value="pro">
                      <div>
                        <strong>Pro Plan</strong>
                        <small>More features and storage.</small>
                      </div>
                    </Radio>
                  </div>
                </div>
              </Radio.Group>
              <Textarea rows={3} placeholder="Enter notes" />
              <Checkbox defaultChecked>I agree to the terms and conditions</Checkbox>
              <Checkbox>Allow us to send you emails</Checkbox>
              <div className="theme-studio__cards-actions-end">
                <Button>Cancel</Button>
                <Button btnType="primary">Upgrade Plan</Button>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card className="theme-studio__cards-panel">
          <Card.Content>
            <div className="theme-studio__cards-copy-block">
              <Text strong>Team Members</Text>
              <Text type="secondary">Invite your team members to collaborate.</Text>
            </div>
            <div className="theme-studio__member-list">
              {[
                ['Sofia Davis', 'm@example.com', 'Owner'],
                ['Jackson Lee', 'p@example.com', 'Developer'],
                ['Isabella Nguyen', 'i@example.com', 'Billing'],
              ].map(([name, email, role]) => (
                <div key={name} className="theme-studio__member-row">
                  <Avatar>{name.charAt(0)}</Avatar>
                  <div className="theme-studio__member-copy">
                    <Text strong>{name}</Text>
                    <Text type="secondary">{email}</Text>
                  </div>
                  <Select defaultValue={role.toLowerCase()} size="sm" className="theme-studio__cards-member-select">
                    <Select.Option value="owner">Owner</Select.Option>
                    <Select.Option value="developer">Developer</Select.Option>
                    <Select.Option value="billing">Billing</Select.Option>
                  </Select>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        <Card className="theme-studio__cards-panel">
          <Card.Content>
            <div className="theme-studio__cards-copy-block">
              <Text strong>Cookie Settings</Text>
              <Text type="secondary">Manage your cookie settings here.</Text>
            </div>
            <div className="theme-studio__settings-list">
              <div className="theme-studio__settings-row">
                <div>
                  <Text strong>Strictly Necessary</Text>
                  <Text type="secondary">These cookies are essential in order to use the website and use its features.</Text>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="theme-studio__settings-row">
                <div>
                  <Text strong>Functional Cookies</Text>
                  <Text type="secondary">These cookies allow the website to provide personalized functionality.</Text>
                </div>
                <Switch />
              </div>
              <Button btnType="primary" size='lg'>Save preferences</Button>
            </div>
          </Card.Content>
        </Card>

        <div className="theme-studio__cards-bottom-pair">
          <Card className="theme-studio__cards-panel theme-studio__cards-panel_calendar">
            <Card.Content>
              <Calendar selectionMode="range" defaultRangeValue={[new Date(currYear, currMonth, 5), new Date(currYear, currMonth, 15)]} fullscreen={false} />
            </Card.Content>
          </Card>

          <Card className="theme-studio__cards-panel theme-studio__cards-panel_goal">
            <Card.Content>
              <div className="theme-studio__cards-copy-block">
                <Text strong>Move Goal</Text>
                <Text type="secondary">Set your daily activity goal.</Text>
              </div>
              <div className="theme-studio__cards-goal-header">
                <Button size="sm" className="theme-studio__cards-goal-circle">-</Button>
                <div className="theme-studio__goal-display">
                  <span>350</span>
                  <small>CALORIES/DAY</small>
                </div>
                <Button size="sm" className="theme-studio__cards-goal-circle">+</Button>
              </div>
              <ChartContainer config={moveGoalChartConfig} style={{ height: 82, width: '100%' }}>
                <BarChart data={moveGoalData} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="dayLabel" hide />
                  <YAxis hide />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="value" fill="var(--color-value)" radius={[2, 2, 2, 2]} barSize={10} />
                </BarChart>
              </ChartContainer>
              <Button btnType="primary">Set Goal</Button>
            </Card.Content>
          </Card>
        </div>
      </div>

      <div className="theme-studio__cards-column">
        <Card className="theme-studio__cards-panel">
          <Card.Content>
            <div className="theme-studio__cards-copy-block">
              <Text strong>Create an account</Text>
              <Text type="secondary">Enter your email below to create your account</Text>
            </div>
            <div className="theme-studio__cards-auth-actions">
              <Button><IconGithub /> GitHub</Button>
              <Button><IconGoogle /> Google</Button>
            </div>
            <Divider className="theme-studio__cards-divider-label">OR CONTINUE WITH</Divider>
            <div className="theme-studio__form-stack">
              <Input placeholder="Email" defaultValue="m@example.com" />
              <Input placeholder="Password" type="password" />
              <Button btnType="primary">Create account</Button>
            </div>
          </Card.Content>
        </Card>

        <Card className="theme-studio__cards-panel">
          <Card.Content>
            <div className="theme-studio__member-row theme-studio__member-row_compact">
              <Avatar>S</Avatar>
              <div className="theme-studio__member-copy">
                <Text strong>Sofia Davis</Text>
                <Text type="secondary">m@example.com</Text>
              </div>
            </div>
            <div className="theme-studio__chat-thread">
              <Card bordered={false} className="theme-studio__chat-bubble theme-studio__chat-bubble_in">
                <Card.Content>Hi, how can I help you today?</Card.Content>
              </Card>
              <Card bordered={false} className="theme-studio__chat-bubble theme-studio__chat-bubble_out">
                <Card.Content>Hey, I&apos;m having trouble with my account.</Card.Content>
              </Card>
              <Card bordered={false} className="theme-studio__chat-bubble theme-studio__chat-bubble_in">
                <Card.Content>What seems to be the problem?</Card.Content>
              </Card>
              <Card bordered={false} className="theme-studio__chat-bubble theme-studio__chat-bubble_out">
                <Card.Content>I can&apos;t log in.</Card.Content>
              </Card>
            </div>
            <Input size='lg' placeholder="Type your message..." />
          </Card.Content>
        </Card>

        <Card className="theme-studio__cards-inline-card">
          <Card.Content>
            <Text>Date picker with range</Text>
            <Text type="secondary">Select a date range.</Text>
            <DatePicker range defaultValue={[new Date(2022, 0, 20), new Date(2022, 1, 9)]} />
          </Card.Content>
        </Card>

        <Card className="theme-studio__cards-panel">
          <Card.Content>
            <div className="theme-studio__cards-copy-block">
              <Text strong>Exercise Minutes</Text>
              <Text type="secondary">
                Your exercise minutes are ahead of where you normally are.
              </Text>
            </div>
            <ChartContainer config={cardsExerciseChartConfig} style={{ height: 146, width: '100%' }}>
              <LineChart data={cardsExerciseData} margin={{ top: 8, right: 4, left: -22, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="personal"
                  stroke="var(--color-personal)"
                  strokeWidth={2.2}
                  dot={{ r: 2.6, strokeWidth: 0, fill: 'var(--color-personal)' }}
                  activeDot={{ r: 3.6, strokeWidth: 0, fill: 'var(--color-personal)' }}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="var(--color-average)"
                  strokeWidth={1.6}
                  dot={{ r: 2.2, strokeWidth: 0, fill: 'var(--color-average)' }}
                  activeDot={{ r: 3.4, strokeWidth: 0, fill: 'var(--color-average)' }}
                />
              </LineChart>
            </ChartContainer>
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
    <Grid className="theme-studio__dashboard-shell" columns="240px minmax(0, 1fr)" gap="sm">
      <Card className="theme-studio__dashboard-sidebar">
        <Card.Content>
          <div className="theme-studio__sidebar-brand">
            <Avatar>TD</Avatar>
            <div>
              <Text strong>Tiny Theme</Text>
              <Text className="theme-studio__sidebar-subtle">Dashboard</Text>
            </div>
          </div>
          <div className="theme-studio__sidebar-section-label">Workspace</div>
          {['Overview', 'Themes', 'Revenue', 'Activity', 'Settings'].map((item, index) => (
            <Button
              key={item}
              className={`theme-studio__sidebar-link${index === 0 ? ' theme-studio__sidebar-link_active' : ''}`}
              btnType={index === 0 ? 'primary' : 'ghost'}
            >
              {item}
            </Button>
          ))}
          <div className="theme-studio__dashboard-sidebar-footer">
            <Text strong>Live Sync</Text>
            <Text className="theme-studio__sidebar-subtle">Theme changes are applied across docs in real time.</Text>
          </div>
        </Card.Content>
      </Card>

      <div className="theme-studio__dashboard-main">
        <div className="theme-studio__dashboard-top">
          <div>
            <Text className="theme-studio__eyebrow">Dashboard</Text>
            <Heading level={3}>Revenue snapshot</Heading>
            <div className="theme-studio__pill-row">
              <Tag color="success">Healthy</Tag>
              <Tag color="info">Synced</Tag>
            </div>
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

        <Grid className="theme-studio__preview-grid" minColumnWidth={260} gap="sm">
          <Card title="Overview" className="theme-studio__preview-card">
            <Card.Content>
              <div className="theme-studio__card-kicker-row">
                <Text strong>$7.6k</Text>
                <Text type="secondary">vs $6.6k target</Text>
              </div>
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

          <Card title="Performance Channels" className="theme-studio__preview-card">
            <Card.Content>
              <Table columns={columns} dataSource={data} pagination={false} bordered />
            </Card.Content>
          </Card>

          <Card title="Theme Health" className="theme-studio__preview-card">
            <Card.Content>
              <Flex vertical gap="sm">
                <div>
                  <Text strong>Accessibility</Text>
                  <Progress.Bar percent={84} />
                </div>
                <Alert type="success" title="Contrast is healthy across key actions." />
                <Alert type="info" title="One focus treatment was customized." />
              </Flex>
            </Card.Content>
          </Card>

          <Card title="Traffic Sources" className="theme-studio__preview-card">
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
                      <Text strong>{name}</Text>
                      <Text type="secondary">{meta}</Text>
                    </div>
                    <Tag>{value}</Tag>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </Grid>
      </div>
    </Grid>
  );
}

function MailPreview(): React.ReactElement {
  return (
    <Grid className="theme-studio__mail-shell" columns="260px minmax(280px, 360px) minmax(0, 1fr)" gap="sm">
      <Card className="theme-studio__mail-sidebar">
        <Card.Content>
          <div className="theme-studio__mail-sidebar-head">
            <div>
              <Text className="theme-studio__eyebrow">Mailbox</Text>
              <Heading level={4}>Studio Mail</Heading>
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
              <Button
                key={item}
                className={`theme-studio__mail-nav-item${index === 0 ? ' theme-studio__mail-nav-item_active' : ''}`}
                btnType={index === 0 ? 'primary' : 'ghost'}
              >
                <span>{item}</span>
                <small>{count}</small>
              </Button>
            ))}
          </div>

          <div className="theme-studio__mail-labels">
            <Text strong>Labels</Text>
            <Flex gap="sm" wrap>
              <Tag color="info">Design</Tag>
              <Tag color="success">Work</Tag>
              <Tag color="warning">Personal</Tag>
            </Flex>
          </div>
        </Card.Content>
      </Card>

      <Card className="theme-studio__mail-panel">
        <Card.Content>
          <div className="theme-studio__mail-panel-head">
            <Input placeholder="Search mail" />
            <Button>Filter</Button>
          </div>
          <div className="theme-studio__mail-toolbar">
            <Tag color="info">All mail</Tag>
            <Tag>Unread</Tag>
            <Tag>Assigned</Tag>
          </div>

          <div className="theme-studio__mail-thread-list">
            {[
              ['Sofia Davis', 'New message', 'Hi, how can I help you today?', '12m', true],
              ['Jackson Lee', 'Billing issue', 'I cannot update my card.', '1h', false],
              ['Olivia Martin', 'Access request', 'Can you grant me editor permissions?', '3h', false],
              ['William Kim', 'Design review', 'Please review the new dashboard polish.', 'Yesterday', false],
            ].map(([sender, subject, preview, time, unread], index) => (
              <Card key={sender} className={`theme-studio__mail-item${index === 0 ? ' theme-studio__mail-item_active' : ''}`} active={index === 0} hoverable>
                <Card.Content>
                  <div className="theme-studio__mail-item-head">
                    <strong>{sender}</strong>
                    <span>{time}</span>
                  </div>
                  <span className="theme-studio__mail-item-subject">
                    {subject}
                    {unread ? <i className="theme-studio__mail-item-dot" /> : null}
                  </span>
                  <small>{preview}</small>
                </Card.Content>
              </Card>
            ))}
          </div>
        </Card.Content>
      </Card>

      <Card className="theme-studio__mail-detail">
        <Card.Content>
          <div className="theme-studio__mail-message-head">
            <div className="theme-studio__mail-message-meta">
              <Avatar>S</Avatar>
              <div>
                <Text strong>Re: New message</Text>
                <Text type="secondary">support@tiny.design</Text>
              </div>
            </div>
            <div className="theme-studio__mail-message-actions">
              <Tag color="info">Unread</Tag>
              <Button btnType="outline">Archive</Button>
            </div>
          </div>

          <div className="theme-studio__chat-thread">
            <Card bordered={false} className="theme-studio__chat-bubble theme-studio__chat-bubble_in">
              <Card.Content>Hi, how can I help you today?</Card.Content>
            </Card>
            <Card bordered={false} className="theme-studio__chat-bubble theme-studio__chat-bubble_out">
              <Card.Content>Hey, I&apos;m having trouble with my account.</Card.Content>
            </Card>
            <Card bordered={false} className="theme-studio__chat-bubble theme-studio__chat-bubble_in">
              <Card.Content>What seems to be the problem?</Card.Content>
            </Card>
            <Card bordered={false} className="theme-studio__chat-bubble theme-studio__chat-bubble_out">
              <Card.Content>I can&apos;t log in after resetting my password.</Card.Content>
            </Card>
          </div>

          <Card className="theme-studio__mail-compose-card">
            <Card.Content>
              <Textarea rows={5} placeholder="Reply Sofia Davis..." />
              <div className="theme-studio__mail-compose">
                <Button>Save Draft</Button>
                <Button btnType="primary">Send</Button>
              </div>
            </Card.Content>
          </Card>
        </Card.Content>
      </Card>
    </Grid>
  );
}

function PricingPreview(): React.ReactElement {
  return (
    <div className="theme-studio__preview-stack">
      <div className="theme-studio__pricing-hero">
        <div>
          <Text className="theme-studio__eyebrow">Pricing</Text>
          <Heading level={2}>Simple pricing for modern teams</Heading>
          <Paragraph>Choose a plan that scales from solo work to multi-product organizations.</Paragraph>
          <div className="theme-studio__pill-row">
            <Tag color="success">No setup fee</Tag>
            <Tag>Cancel anytime</Tag>
          </div>
        </div>
        <Segmented
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly', value: 'yearly' },
          ]}
          value="monthly"
        />
      </div>

      <Grid className="theme-studio__pricing-grid" minColumnWidth={240} gap="sm">
        {[
          { name: 'Starter', price: '$29', description: 'Perfect for small businesses.', features: ['1 workspace', 'Basic analytics', 'Community support'] },
          { name: 'Pro', price: '$89', description: 'More features and storage.', featured: true, features: ['5 workspaces', 'Advanced analytics', 'Priority support'] },
          { name: 'Scale', price: '$199', description: 'For larger teams and advanced reporting.', features: ['Unlimited workspaces', 'SSO + audit log', 'Dedicated onboarding'] },
        ].map((plan) => (
          <Card
            key={plan.name}
            className={`theme-studio__pricing-card${plan.featured ? ' theme-studio__pricing-card_featured' : ''}`}
          >
            <Card.Content>
              <div className="theme-studio__pricing-card-head">
                {plan.featured ? <Tag color="success">Popular</Tag> : null}
                <Text strong>{plan.name}</Text>
              </div>
              <div className="theme-studio__pricing-price">
                <Heading level={2}>{plan.price}</Heading>
                <Text type="secondary">Per workspace / month</Text>
              </div>
              <Paragraph>{plan.description}</Paragraph>
              <div className="theme-studio__pricing-feature-list">
                {plan.features.map((feature) => (
                  <Text key={feature}>{feature}</Text>
                ))}
              </div>
              <div className="theme-studio__pricing-card-footer">
                <Button btnType={plan.featured ? 'primary' : 'default'}>{plan.featured ? 'Upgrade plan' : 'Choose plan'}</Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Grid>

      <Grid className="theme-studio__preview-grid" minColumnWidth={280} gap="sm">
        <Card title="Frequently Asked Questions" className="theme-studio__preview-card">
          <Card.Content>
            <div className="theme-studio__faq-list">
              <div className="theme-studio__faq-item">
                <Text strong>Can I cancel anytime?</Text>
                <Text type="secondary">Yes. Plans can be changed or canceled without lock-in.</Text>
              </div>
              <div className="theme-studio__faq-item">
                <Text strong>Do you offer team migration?</Text>
                <Text type="secondary">Pro and Scale include assisted import and onboarding.</Text>
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card title="Usage Snapshot" className="theme-studio__preview-card">
          <Card.Content>
            <div className="theme-studio__settings-list">
              <div>
                <Text strong>Seats</Text>
                <Progress.Bar percent={68} />
              </div>
              <div>
                <Text strong>Storage</Text>
                <Progress.Bar percent={42} />
              </div>
            </div>
          </Card.Content>
        </Card>
      </Grid>
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
      {(template !== 'cards' && (section === 'colors' || section === 'typography' || section === 'other')) ? <LiveResponsePanel fields={fields} /> : null}
      {content}
    </div>
  );
}
