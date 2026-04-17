import React from 'react';
import {
  Avatar,
  Button,
  Calendar,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Flex,
  Grid,
  Heading,
  Input,
  Radio,
  Select,
  Switch,
  Tag,
  Text,
  Textarea,
} from '@tiny-design/react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@tiny-design/charts';
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { IconGithub, IconGoogle, IconMore } from '@tiny-design/icons';

const cardsRevenueData = [
  { month: 'Jan', value: 38 },
  { month: 'Feb', value: 42 },
  { month: 'Mar', value: 36 },
  { month: 'Apr', value: 34 },
  { month: 'May', value: 33 },
  { month: 'Jun', value: 36 },
  { month: 'Jul', value: 38 },
  { month: 'Aug', value: 58 },
];

const cardsRevenueChartConfig: ChartConfig = {
  value: {
    label: 'Revenue',
    color: 'var(--ty-chart-1)',
  },
};

const moveGoalData = [
  { key: 'm', dayLabel: 'M', value: 34 },
  { key: 't', dayLabel: 'T', value: 26 },
  { key: 'w', dayLabel: 'W', value: 18 },
  { key: 'th', dayLabel: 'T', value: 26 },
  { key: 'f', dayLabel: 'F', value: 18 },
  { key: 's', dayLabel: 'S', value: 23 },
  { key: 'su', dayLabel: 'S', value: 16 },
  { key: 'm2', dayLabel: 'M', value: 22 },
  { key: 't2', dayLabel: 'T', value: 26 },
  { key: 'w2', dayLabel: 'W', value: 18 },
  { key: 'th2', dayLabel: 'T', value: 24 },
  { key: 'f2', dayLabel: 'F', value: 17 },
  { key: 's2', dayLabel: 'S', value: 30 },
];

const moveGoalChartConfig: ChartConfig = {
  value: {
    label: 'Calories',
    color: 'var(--ty-chart-2)',
  },
};

const cardsExerciseData = [
  { month: 'Mon', personal: 16, average: 22 },
  { month: 'Tue', personal: 12, average: 18 },
  { month: 'Wed', personal: 58, average: 14 },
  { month: 'Thu', personal: 24, average: 17 },
  { month: 'Fri', personal: 29, average: 13 },
  { month: 'Sat', personal: 23, average: 15 },
  { month: 'Sun', personal: 26, average: 20 },
];

const cardsExerciseChartConfig: ChartConfig = {
  personal: {
    label: 'You',
    color: 'var(--ty-chart-1)',
  },
  average: {
    label: 'Average',
    color: 'var(--ty-chart-3)',
  },
};

const paymentRows = [
  ['Success', 'ken99@example.com', '$316.00'],
  ['Success', 'abe45@example.com', '$242.00'],
  ['Processing', 'monserrat44@example.com', '$837.00'],
  ['Failed', 'carmella@example.com', '$721.00'],
  ['Pending', 'jason78@example.com', '$450.00'],
  ['Success', 'sarah23@example.com', '$1,280.00'],
] as const;

const currYear = new Date().getFullYear();
const currMonth = new Date().getMonth();

function RevenueCard(): React.ReactElement {
  return (
    <Card className="theme-studio__cards-panel theme-studio__cards-panel_stat">
      <Card.Content>
        <Flex vertical className="theme-studio__cards-copy-block">
          <Text type="secondary">Total Revenue</Text>
          <Heading level={2}>$15,231.89</Heading>
          <Text type="secondary">+20.1% from last month</Text>
        </Flex>
        <ChartContainer config={cardsRevenueChartConfig} style={{ height: 118, width: '100%' }}>
          <LineChart data={cardsRevenueData} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
            <XAxis dataKey="month" hide />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent labelKey="month" />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              strokeWidth={2.2}
              dot={{ r: 2.8, fill: 'var(--editor-card)', stroke: 'var(--color-value)', strokeWidth: 1.8 }}
              activeDot={{ r: 4, fill: 'var(--editor-card)', stroke: 'var(--color-value)', strokeWidth: 2 }}
            />
          </LineChart>
        </ChartContainer>
      </Card.Content>
    </Card>
  );
}

function UpgradeCard(): React.ReactElement {
  return (
    <Card className="theme-studio__cards-panel theme-studio__cards-panel_form">
      <Card.Content>
        <Flex vertical className="theme-studio__cards-copy-block">
          <Heading level={4}>Upgrade your subscription</Heading>
          <Text type="secondary">
            You are currently on the free plan. Upgrade to the pro plan to get access to all
            features.
          </Text>
        </Flex>
        <div className="theme-studio__form-stack">
          <Grid className="theme-studio__cards-input-grid">
            <label className="theme-studio__cards-field">
              <span>Name</span>
              <Input placeholder="Name" defaultValue="Evil Rabbit" />
            </label>
            <label className="theme-studio__cards-field">
              <span>Email</span>
              <Input placeholder="Email" defaultValue="example@acme.com" />
            </label>
          </Grid>
          <label className="theme-studio__cards-field">
            <span>Card Number</span>
            <Input placeholder="Card Number" defaultValue="1234 1234 1234 1234" />
          </label>
          <Grid className="theme-studio__cards-input-grid theme-studio__cards-input-grid_compact">
            <Input placeholder="MM/YY" defaultValue="MM/YY" />
            <Input placeholder="CVC" defaultValue="CVC" />
          </Grid>
          <Flex vertical className="theme-studio__cards-copy-block">
            <Text strong>Plan</Text>
            <Text type="secondary">Select the plan that best fits your needs.</Text>
          </Flex>
          <Radio.Group defaultValue="starter">
            <Grid className="theme-studio__cards-plan-grid">
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
            </Grid>
          </Radio.Group>
          <label className="theme-studio__cards-field">
            <span>Notes</span>
            <Textarea rows={3} placeholder="Enter notes" />
          </label>
          <Flex vertical className="theme-studio__cards-checklist">
            <Checkbox>I agree to the terms and conditions</Checkbox>
            <Checkbox>Allow us to send you emails</Checkbox>
          </Flex>
          <Flex className="theme-studio__cards-actions-split">
            <Button color="default">Cancel</Button>
            <Button variant="solid" color="primary">
              Upgrade Plan
            </Button>
          </Flex>
        </div>
      </Card.Content>
    </Card>
  );
}

function CreateAccountCard(): React.ReactElement {
  return (
    <Card className="theme-studio__cards-panel theme-studio__cards-panel_form theme-studio__cards-panel_auth">
      <Card.Content>
        <Flex vertical className="theme-studio__cards-copy-block">
          <Heading level={3}>Create an account</Heading>
          <Text type="secondary">Enter your email below to create your account</Text>
        </Flex>
        <Flex className="theme-studio__cards-auth-actions">
          <Button>
            <IconGithub /> GitHub
          </Button>
          <Button>
            <IconGoogle /> Google
          </Button>
        </Flex>
        <Divider className="theme-studio__cards-divider-label">OR CONTINUE WITH</Divider>
        <div className="theme-studio__form-stack">
          <label className="theme-studio__cards-field">
            <span>Email</span>
            <Input placeholder="Email" defaultValue="m@example.com" />
          </label>
          <label className="theme-studio__cards-field">
            <span>Password</span>
            <Input placeholder="Password" type="password" />
          </label>
          <Button variant="solid" color="primary">
            Create account
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

function TeamMembersCard(): React.ReactElement {
  return (
    <Card className="theme-studio__cards-panel theme-studio__cards-panel_members">
      <Card.Content>
        <Flex vertical className="theme-studio__cards-copy-block">
          <Heading level={4}>Team Members</Heading>
          <Text type="secondary">Invite your team members to collaborate.</Text>
        </Flex>
        <Flex vertical className="theme-studio__member-list">
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
        </Flex>
      </Card.Content>
    </Card>
  );
}

function CookieSettingsCard(): React.ReactElement {
  return (
    <Card className="theme-studio__cards-panel theme-studio__cards-panel_settings">
      <Card.Content>
        <Flex vertical className="theme-studio__cards-copy-block">
          <Heading level={4}>Cookie Settings</Heading>
          <Text type="secondary">Manage your cookie settings here.</Text>
        </Flex>
        <Flex vertical className="theme-studio__form-stack">
          <Flex justify="space-between">
            <Flex vertical>
              <Text strong>Strictly Necessary</Text>
              <Text type="secondary">
                These cookies are essential in order to use the website and use its features.
              </Text>
            </Flex>
            <Switch defaultChecked />
          </Flex>
          <Flex justify="space-between">
            <Flex vertical>
              <Text strong>Functional Cookies</Text>
              <Text type="secondary">
                These cookies allow the website to provide personalized functionality.
              </Text>
            </Flex>
            <Switch />
          </Flex>
          <Button variant="solid" color="primary">
            Save preferences
          </Button>
        </Flex>
      </Card.Content>
    </Card>
  );
}

function DatePickerCard(): React.ReactElement {
  return (
    <Card className="theme-studio__cards-inline-card theme-studio__cards-inline-card_date">
      <Card.Content>
        <Text strong>Date picker with range</Text>
        <Text type="secondary">Select a date range.</Text>
        <DatePicker range defaultValue={[new Date(2022, 0, 20), new Date(2022, 1, 9)]} />
      </Card.Content>
    </Card>
  );
}

function ChatCard(): React.ReactElement {
  return (
    <Card className="theme-studio__cards-panel theme-studio__cards-panel_chat">
      <Card.Content>
        <Flex align="center" className="theme-studio__member-row theme-studio__member-row_compact">
          <Avatar>S</Avatar>
          <div className="theme-studio__member-copy">
            <Text strong>Sofia Davis</Text>
            <Text type="secondary">m@example.com</Text>
          </div>
          <Button size="sm" variant="outline">
            New message
          </Button>
        </Flex>
        <Flex vertical className="theme-studio__chat-thread">
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
        </Flex>
        <Flex className="theme-studio__cards-chat-compose">
          <Input size="lg" placeholder="Type your message..." />
          <Button variant="solid" color="primary" size='lg'>
            Send
          </Button>
        </Flex>
      </Card.Content>
    </Card>
  );
}

function CalendarCard(): React.ReactElement {
  return (
    <Card className="theme-studio__cards-panel theme-studio__cards-panel_calendar">
      <Card.Content>
        <Calendar
          selectionMode="range"
          defaultRangeValue={[
            new Date(currYear, currMonth, 5),
            new Date(currYear, currMonth, 13),
          ]}
          fullscreen={false}
        />
      </Card.Content>
    </Card>
  );
}

function GoalCard(): React.ReactElement {
  return (
    <Card className="theme-studio__cards-panel theme-studio__cards-panel_goal">
      <Card.Content>
        <Flex vertical className="theme-studio__cards-copy-block">
          <Heading level={4}>Move Goal</Heading>
          <Text type="secondary">Set your daily activity goal.</Text>
        </Flex>
        <Flex align="center" justify="center" className="theme-studio__cards-goal-header">
          <Button size="sm" className="theme-studio__cards-goal-circle" aria-label="Decrease">
            -
          </Button>
          <Flex vertical align="center" className="theme-studio__goal-display">
            <span>350</span>
            <small>CALORIES/DAY</small>
          </Flex>
          <Button size="sm" className="theme-studio__cards-goal-circle" aria-label="Increase">
            +
          </Button>
        </Flex>
        <ChartContainer config={moveGoalChartConfig} style={{ height: 92, width: '100%' }}>
          <BarChart data={moveGoalData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <XAxis hide dataKey="dayLabel" />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 4, 4]} barSize={22} />
          </BarChart>
        </ChartContainer>
        <Button variant="solid" color="default">
          Set Goal
        </Button>
      </Card.Content>
    </Card>
  );
}

function ExerciseCard(): React.ReactElement {
  return (
    <Card className="theme-studio__cards-panel theme-studio__cards-panel_exercise">
      <Card.Content>
        <Flex vertical className="theme-studio__cards-copy-block">
          <Heading level={4}>Exercise Minutes</Heading>
          <Text type="secondary">
            Your exercise minutes are ahead of where you normally are.
          </Text>
        </Flex>
        <ChartContainer config={cardsExerciseChartConfig} style={{ height: 208, width: '100%' }}>
          <LineChart data={cardsExerciseData} margin={{ top: 12, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="0" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 10, fill: 'var(--editor-muted-foreground)' }}
            />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="personal"
              stroke="var(--color-personal)"
              strokeWidth={2.2}
              dot={{ r: 3, strokeWidth: 0, fill: 'var(--color-personal)' }}
              activeDot={{ r: 4, strokeWidth: 0, fill: 'var(--color-personal)' }}
            />
            <Line
              type="monotone"
              dataKey="average"
              stroke="var(--color-average)"
              strokeWidth={1.6}
              dot={{ r: 3, strokeWidth: 0, fill: 'var(--color-average)' }}
              activeDot={{ r: 3.8, strokeWidth: 0, fill: 'var(--color-average)' }}
            />
          </LineChart>
        </ChartContainer>
      </Card.Content>
    </Card>
  );
}

function PaymentsCard(): React.ReactElement {
  return (
    <Card className="theme-studio__cards-panel theme-studio__cards-panel_table">
      <Card.Content>
        <Flex vertical className="theme-studio__cards-copy-block">
          <Heading level={4}>Payments</Heading>
          <Text type="secondary">Manage your payments.</Text>
        </Flex>
        <div className="theme-studio__cards-payments">
          <div className="theme-studio__cards-payments-head">
            <Checkbox />
            <span>Status</span>
            <span>Email</span>
            <span>Amount</span>
            <span />
          </div>
          {paymentRows.map(([status, email, amount]) => (
            <div key={email} className="theme-studio__cards-payments-row">
              <Checkbox />
              <Tag
                color={
                  status === 'Success'
                    ? 'success'
                    : status === 'Processing'
                      ? 'info'
                      : status === 'Pending'
                        ? 'warning'
                        : 'danger'
                }>
                {status}
              </Tag>
              <span>{email}</span>
              <strong>{amount}</strong>
              <button type="button" className="theme-studio__cards-icon-action" aria-label="Open menu">
                <IconMore />
              </button>
            </div>
          ))}
        </div>
        <Flex className="theme-studio__cards-table-footer">
          <Text type="secondary">0 of 6 row(s) selected.</Text>
          <Flex gap="sm">
            <Button size="sm" disabled>
              Previous
            </Button>
            <Button size="sm" disabled>
              Next
            </Button>
          </Flex>
        </Flex>
      </Card.Content>
    </Card>
  );
}

function ShareCard(): React.ReactElement {
  return (
    <Card className="theme-studio__cards-panel theme-studio__cards-panel_share">
      <Card.Content>
        <Flex vertical className="theme-studio__cards-copy-block">
          <Heading level={4}>Share this document</Heading>
          <Text type="secondary">Anyone with the link can view this document.</Text>
        </Flex>
        <div className="theme-studio__cards-share-row">
          <label className="theme-studio__cards-field">
            <span>Link</span>
            <Input value="http://example.com/link/to/document" readOnly />
          </label>
          <Button>Copy Link</Button>
        </div>
      </Card.Content>
    </Card>
  );
}

function AccessCard(): React.ReactElement {
  return (
    <Card className="theme-studio__cards-panel theme-studio__cards-panel_access">
      <Card.Content>
        <Flex vertical className="theme-studio__cards-copy-block">
          <Heading level={4}>People with access</Heading>
        </Flex>
        <Flex vertical className="theme-studio__member-list">
          {[
            ['Olivia Martin', 'm@example.com'],
            ['Isabella Nguyen', 'b@example.com'],
            ['Sofia Davis', 'p@example.com'],
            ['Ethan Thompson', 'e@example.com'],
          ].map(([name, email]) => (
            <div key={email} className="theme-studio__member-row">
              <Avatar>{name.charAt(0)}</Avatar>
              <div className="theme-studio__member-copy">
                <Text strong>{name}</Text>
                <Text type="secondary">{email}</Text>
              </div>
              <Select defaultValue="edit" size="sm" className="theme-studio__cards-member-select">
                <Select.Option value="edit">Can edit</Select.Option>
                <Select.Option value="view">Can view</Select.Option>
              </Select>
            </div>
          ))}
        </Flex>
      </Card.Content>
    </Card>
  );
}

function ReportIssueCard(): React.ReactElement {
  return (
    <Card className="theme-studio__cards-panel theme-studio__cards-panel_issue">
      <Card.Content>
        <Flex vertical className="theme-studio__cards-copy-block">
          <Heading level={4}>Report an issue</Heading>
          <Text type="secondary">What area are you having problems with?</Text>
        </Flex>
        <div className="theme-studio__form-stack">
          <Grid className="theme-studio__cards-input-grid">
            <label className="theme-studio__cards-field">
              <span>Area</span>
              <Select defaultValue="billing">
                <Select.Option value="billing">Billing</Select.Option>
                <Select.Option value="security">Security</Select.Option>
              </Select>
            </label>
            <label className="theme-studio__cards-field">
              <span>Security Level</span>
              <Select defaultValue="severity-2">
                <Select.Option value="severity-1">Severity 1</Select.Option>
                <Select.Option value="severity-2">Severity 2</Select.Option>
              </Select>
            </label>
          </Grid>
          <label className="theme-studio__cards-field">
            <span>Subject</span>
            <Input placeholder="Subject" />
          </label>
          <label className="theme-studio__cards-field">
            <span>Description</span>
            <Textarea rows={4} placeholder="Describe the issue" />
          </label>
          <Flex className="theme-studio__cards-actions-end">
            <Button>Cancel</Button>
            <Button variant="solid" color="primary">
              Submit
            </Button>
          </Flex>
        </div>
      </Card.Content>
    </Card>
  );
}

export function CardsPreview(): React.ReactElement {
  return (
    <div className="theme-studio__cards-shell">
      <Flex vertical className="theme-studio__cards-shell-left">
        <RevenueCard />
        <UpgradeCard />
        <TeamMembersCard />
        <CookieSettingsCard />
        <ReportIssueCard />
        <DatePickerCard />
      </Flex>

      <Flex vertical className="theme-studio__cards-shell-right">
        <div className="theme-studio__cards-shell-right-top">
          <CalendarCard />
          <GoalCard />
        </div>
        <ExerciseCard />
        <PaymentsCard />
        <CreateAccountCard />
        <ChatCard />
        <ShareCard />
        <AccessCard />
      </Flex>
    </div>
  );
}
