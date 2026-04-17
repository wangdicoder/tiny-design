import React from 'react';
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Flex,
  Heading,
  Input,
  Menu,
  Popover,
  Segmented,
  Select,
  Text,
} from '@tiny-design/react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@tiny-design/charts';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from 'recharts';
import {
  IconDocument,
  IconHome,
  IconMore,
  IconPlus,
  IconSearch,
  IconSetting,
  IconStatistics,
  IconStructure,
  IconSupport,
  IconSwitch,
  IconTeam,
} from '@tiny-design/icons';

const dashboardVisitorsData = Array.from({ length: 90 }, (_, index) => {
  const date = new Date(2024, 3, 1 + index);
  const waveA = Math.sin(index * 0.92);
  const waveB = Math.sin(index * 0.42 + 0.8);
  const waveC = Math.sin(index * 1.54 + 1.1);
  const waveD = Math.sin(index * 0.24 + 2.1);
  const climb = index * 1.18;
  const spikePrimary = [8, 17, 27, 34, 35, 46, 58, 64, 72, 77, 83, 88].includes(index)
    ? 108
    : 0;
  const spikeSecondary = [5, 12, 21, 30, 41, 54, 61, 69, 80, 86].includes(index) ? 52 : 0;
  const valley = [9, 25, 50, 66].includes(index) ? -24 : 0;
  const sharedSignal =
    120 +
    climb +
    waveA * 21 +
    waveB * 17 +
    waveC * 11 +
    Math.max(0, waveD * 8) +
    spikePrimary * 0.92 +
    spikeSecondary * 0.78 +
    valley;

  return {
    label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    total: Math.round(sharedSignal * 0.56 + 18),
    trend: Math.round(sharedSignal + 44),
  };
});

const dashboardVisitorsRangeData = {
  'last-3-months': dashboardVisitorsData,
  'last-30-days': [
    { label: 'Jun 2', total: 58, trend: 132 },
    { label: 'Jun 4', total: 81, trend: 244 },
    { label: 'Jun 6', total: 74, trend: 124 },
    { label: 'Jun 8', total: 86, trend: 208 },
    { label: 'Jun 10', total: 78, trend: 138 },
    { label: 'Jun 12', total: 89, trend: 198 },
    { label: 'Jun 14', total: 105, trend: 286 },
    { label: 'Jun 16', total: 83, trend: 182 },
    { label: 'Jun 18', total: 94, trend: 248 },
    { label: 'Jun 20', total: 65, trend: 104 },
    { label: 'Jun 22', total: 88, trend: 234 },
    { label: 'Jun 24', total: 92, trend: 194 },
    { label: 'Jun 26', total: 116, trend: 298 },
    { label: 'Jun 28', total: 87, trend: 176 },
    { label: 'Jun 30', total: 121, trend: 272 },
  ],
  'last-7-days': [
    { label: 'Jun 24', total: 92, trend: 194 },
    { label: 'Jun 25', total: 101, trend: 228 },
    { label: 'Jun 26', total: 116, trend: 298 },
    { label: 'Jun 27', total: 110, trend: 252 },
    { label: 'Jun 28', total: 87, trend: 176 },
    { label: 'Jun 29', total: 95, trend: 222 },
    { label: 'Jun 30', total: 121, trend: 272 },
  ],
} as const;

const dashboardVisitorsChartConfig: ChartConfig = {
  total: {
    label: 'Visitors',
    color: '#6aa1ff',
  },
  trend: {
    label: 'Trend',
    color: '#afd3ff',
  },
};

const dashboardDonutData = [
  { name: 'Chrome', value: 310, fill: '#8ab7ee' },
  { name: 'Safari', value: 265, fill: '#467fe0' },
  { name: 'Firefox', value: 220, fill: '#3365db' },
  { name: 'Edge', value: 185, fill: '#2852c7' },
  { name: 'Other', value: 145, fill: '#2f49ae' },
];

const dashboardDonutChartConfig: ChartConfig = {
  chrome: { label: 'Chrome', color: '#8ab7ee' },
  safari: { label: 'Safari', color: '#467fe0' },
  firefox: { label: 'Firefox', color: '#3365db' },
  edge: { label: 'Edge', color: '#2852c7' },
  other: { label: 'Other', color: '#2f49ae' },
};

const dashboardBarData = [
  { browser: 'Chrome', visitors: 192, fill: '#8ab7ee' },
  { browser: 'Safari', visitors: 190, fill: '#467fe0' },
  { browser: 'Firefox', visitors: 187, fill: '#3365db' },
  { browser: 'Edge', visitors: 184, fill: '#2852c7' },
  { browser: 'Other', visitors: 160, fill: '#2f49ae' },
];

const dashboardBarChartConfig: ChartConfig = {
  visitors: {
    label: 'Visitors',
    color: '#467fe0',
  },
};

const dashboardBaseDocumentRows = [
  {
    key: 'cover-page',
    title: 'Cover page',
    section: 'Cover page',
    reviewer: 'Eddie Lake',
    target: '18',
    limit: '5',
    group: 'past',
  },
  {
    key: 'table-of-contents',
    title: 'Table of contents',
    section: 'Cover page',
    reviewer: 'Eddie Lake',
    target: '29',
    limit: '24',
    group: 'past',
  },
  {
    key: 'executive-summary',
    title: 'Executive summary',
    section: 'Narrative',
    reviewer: 'Eddie Lake',
    target: '10',
    limit: '13',
    group: 'past',
  },
  {
    key: 'technical-approach',
    title: 'Technical approach',
    section: 'Narrative',
    reviewer: 'Jamik Tashpulatov',
    target: '27',
    limit: '23',
    group: 'personnel',
  },
  {
    key: 'design',
    title: 'Design',
    section: 'Narrative',
    reviewer: 'Jamik Tashpulatov',
    target: '2',
    limit: '16',
    group: 'personnel',
  },
  {
    key: 'capabilities',
    title: 'Capabilities',
    section: 'Narrative',
    reviewer: 'Jamik Tashpulatov',
    target: '20',
    limit: '8',
    group: 'focus',
  },
  {
    key: 'integration',
    title: 'Integration with existing systems',
    section: 'Narrative',
    reviewer: 'Jamik Tashpulatov',
    target: '19',
    limit: '21',
    group: 'focus',
  },
  {
    key: 'innovation',
    title: 'Innovation and Advantages',
    section: 'Narrative',
    reviewer: 'Assign reviewer',
    target: '25',
    limit: '26',
    group: 'focus',
  },
  {
    key: 'emr-overview',
    title: "Overview of EMR's Innovative Solutions",
    section: 'Technical content',
    reviewer: 'Assign reviewer',
    target: '7',
    limit: '23',
    group: 'focus',
  },
  {
    key: 'advanced-algorithms',
    title: 'Advanced Algorithms and Machine Learning',
    section: 'Narrative',
    reviewer: 'Assign reviewer',
    target: '30',
    limit: '28',
    group: 'focus',
  },
] as const;

const dashboardDocumentRows = Array.from({ length: 68 }, (_, index) => {
  const baseRow = dashboardBaseDocumentRows[index % dashboardBaseDocumentRows.length];

  if (index < dashboardBaseDocumentRows.length) {
    return baseRow;
  }

  const cycle = Math.floor(index / dashboardBaseDocumentRows.length) + 1;
  return {
    ...baseRow,
    key: `${baseRow.key}-${cycle}`,
    title: `${baseRow.title} ${cycle}`,
  };
});

type DashboardVisitorRange = keyof typeof dashboardVisitorsRangeData;
type DashboardDocTab = 'outline' | 'past' | 'personnel' | 'focus';
type DashboardRow = (typeof dashboardDocumentRows)[number];
type DashboardRowField = 'target' | 'limit' | 'reviewer';
type DashboardVisibleColumns = {
  section: boolean;
  target: boolean;
  limit: boolean;
  reviewer: boolean;
};

export function DashboardPreview(): React.ReactElement {
  const [activeSidebarItem, setActiveSidebarItem] = React.useState('Dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [visitorRange, setVisitorRange] = React.useState<DashboardVisitorRange>('last-3-months');
  const [activeDocTab, setActiveDocTab] = React.useState<DashboardDocTab>('outline');
  const [documentRows, setDocumentRows] = React.useState(() => dashboardDocumentRows);
  const [compactRows, setCompactRows] = React.useState(false);
  const [visibleColumns, setVisibleColumns] = React.useState<DashboardVisibleColumns>({
    section: true,
    target: true,
    limit: true,
    reviewer: true,
  });
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [rowFields, setRowFields] = React.useState(() =>
    dashboardDocumentRows.reduce<Record<string, { target: string; limit: string; reviewer: string }>>(
      (acc, row) => {
        acc[row.key] = {
          target: row.target,
          limit: row.limit,
          reviewer: row.reviewer,
        };
        return acc;
      },
      {}
    )
  );

  const filteredRows =
    activeDocTab === 'outline'
      ? documentRows
      : documentRows.filter((row) => row.group === activeDocTab);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedRows = filteredRows.slice((safeCurrentPage - 1) * rowsPerPage, safeCurrentPage * rowsPerPage);
  const allVisibleSelected =
    pagedRows.length > 0 && pagedRows.every((row) => selectedRows.includes(row.key));
  const tableGridTemplate = [
    '24px',
    'minmax(290px, 1.9fr)',
    visibleColumns.section ? 'minmax(144px, 1fr)' : null,
    visibleColumns.target ? '96px' : null,
    visibleColumns.limit ? '96px' : null,
    visibleColumns.reviewer ? 'minmax(188px, 1fr)' : null,
    '56px',
  ]
    .filter(Boolean)
    .join(' ');

  const addSection = (
    group: Exclude<DashboardDocTab, 'outline'> = activeDocTab === 'outline' ? 'focus' : activeDocTab
  ) => {
    const nextIndex = documentRows.length + 1;
    const nextKey = `new-section-${nextIndex}`;
    const nextRow = {
      key: nextKey,
      title: `New section ${nextIndex}`,
      section: group === 'focus' ? 'Technical content' : 'Narrative',
      reviewer: 'Assign reviewer',
      target: '12',
      limit: '18',
      group,
    } as const;

    setDocumentRows((current) => [...current, nextRow]);
    setRowFields((current) => ({
      ...current,
      [nextKey]: {
        target: nextRow.target,
        limit: nextRow.limit,
        reviewer: nextRow.reviewer,
      },
    }));
    setCurrentPage(totalPages);
  };

  const updateRowField = (key: string, field: DashboardRowField, value: string) => {
    setRowFields((current) => ({
      ...current,
      [key]: {
        ...current[key],
        [field]: value,
      },
    }));
  };

  const toggleRowSelection = (key: string, checked: boolean) => {
    setSelectedRows((current) =>
      checked ? Array.from(new Set([...current, key])) : current.filter((item) => item !== key)
    );
  };

  const toggleVisibleRows = (checked: boolean) => {
    setSelectedRows((current) => {
      const visibleKeys = pagedRows.map((row) => row.key);
      return checked
        ? Array.from(new Set([...current, ...visibleKeys]))
        : current.filter((item) => !visibleKeys.includes(item));
    });
  };

  const runRowAction = (key: string, action: string) => {
    if (action === 'duplicate') {
      setDocumentRows((current) => {
        const index = current.findIndex((row) => row.key === key);
        if (index < 0) return current;

        const source = current[index];
        const copyKey = `${source.key}-copy-${Date.now()}`;
        const copiedRow = {
          ...source,
          key: copyKey,
          title: `${source.title} (Copy)`,
        };

        setRowFields((fields) => ({
          ...fields,
          [copyKey]: {
            target: fields[key]?.target ?? source.target,
            limit: fields[key]?.limit ?? source.limit,
            reviewer: fields[key]?.reviewer ?? source.reviewer,
          },
        }));

        return [...current.slice(0, index + 1), copiedRow, ...current.slice(index + 1)];
      });
    }

    if (action === 'focus') {
      setDocumentRows((current) =>
        current.map((row) =>
          row.key === key ? { ...row, group: 'focus', section: 'Technical content' } : row
        )
      );
    }

    if (action === 'archive') {
      setDocumentRows((current) => current.filter((row) => row.key !== key));
      setSelectedRows((current) => current.filter((item) => item !== key));
      setRowFields((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  };

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  React.useEffect(() => {
    setRowFields((current) => {
      let changed = false;
      const next = { ...current };

      documentRows.forEach((row) => {
        if (!next[row.key]) {
          next[row.key] = {
            target: row.target,
            limit: row.limit,
            reviewer: row.reviewer,
          };
          changed = true;
        }
      });

      Object.keys(next).forEach((key) => {
        if (!documentRows.some((row) => row.key === key)) {
          delete next[key];
          changed = true;
        }
      });

      return changed ? next : current;
    });
  }, [documentRows]);

  const visitorData = dashboardVisitorsRangeData[visitorRange];
  const visitorTickInterval =
    visitorRange === 'last-3-months' ? 15 : visitorRange === 'last-30-days' ? 1 : 0;

  return (
    <div className={`theme-studio__docdash${sidebarCollapsed ? ' theme-studio__docdash_collapsed' : ''}`}>
      <Card className="theme-studio__docdash-sidebar">
        <Card.Content>
          <div className="theme-studio__docdash-brand">
            <Avatar>A</Avatar>
            {!sidebarCollapsed ? (
              <div>
                <Text strong>Acme Inc.</Text>
                <Text type="secondary">Workspace</Text>
              </div>
            ) : null}
          </div>

          <Button
            variant="solid"
            color="primary"
            className="theme-studio__docdash-create"
            onClick={() => addSection('focus')}>
            <IconPlus />
            {!sidebarCollapsed ? 'Quick Create' : null}
          </Button>

          <div className="theme-studio__docdash-nav-section">
            {[
              { label: 'Dashboard', icon: <IconHome /> },
              { label: 'Lifecycle', icon: <IconStructure /> },
              { label: 'Analytics', icon: <IconStatistics /> },
              { label: 'Projects', icon: <IconDocument /> },
              { label: 'Team', icon: <IconTeam /> },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                aria-label={item.label}
                title={item.label}
                onClick={() => setActiveSidebarItem(item.label)}
                className={`theme-studio__docdash-nav-item${activeSidebarItem === item.label ? ' theme-studio__docdash-nav-item_active' : ''}`}>
                <span>{item.icon}</span>
                {!sidebarCollapsed ? <span>{item.label}</span> : null}
              </button>
            ))}
          </div>

          {!sidebarCollapsed ? <div className="theme-studio__docdash-section-label">Documents</div> : null}
          <div className="theme-studio__docdash-nav-section">
            {['Data Library', 'Reports', 'Word Assistant', 'More'].map((item) => (
              <button
                key={item}
                type="button"
                aria-label={item}
                title={item}
                onClick={() => setActiveSidebarItem(item)}
                className={`theme-studio__docdash-nav-item${activeSidebarItem === item ? ' theme-studio__docdash-nav-item_active' : ''}`}>
                <span>
                  <IconDocument />
                </span>
                {!sidebarCollapsed ? <span>{item}</span> : null}
                {!sidebarCollapsed ? <small>More</small> : null}
              </button>
            ))}
          </div>

          <div className="theme-studio__docdash-nav-section theme-studio__docdash-nav-section_footer">
            {[
              { label: 'Settings', icon: <IconSetting /> },
              { label: 'Get Help', icon: <IconSupport /> },
              { label: 'Search', icon: <IconSearch /> },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                aria-label={item.label}
                title={item.label}
                onClick={() => setActiveSidebarItem(item.label)}
                className={`theme-studio__docdash-nav-item${activeSidebarItem === item.label ? ' theme-studio__docdash-nav-item_active' : ''}`}>
                <span>{item.icon}</span>
                {!sidebarCollapsed ? <span>{item.label}</span> : null}
              </button>
            ))}
          </div>

          <button type="button" className="theme-studio__docdash-locale">
            CN
          </button>

          <div className="theme-studio__docdash-profile">
            <Avatar>S</Avatar>
            {!sidebarCollapsed ? (
              <div>
                <Text strong>shadcn</Text>
                <Text type="secondary">m@example.com</Text>
              </div>
            ) : null}
          </div>
        </Card.Content>
      </Card>

      <div className="theme-studio__docdash-main">
        <div className="theme-studio__docdash-header">
          <div className="theme-studio__docdash-header-copy">
            <Button
              variant="ghost"
              className="theme-studio__docdash-toggle"
              onClick={() => setSidebarCollapsed((current) => !current)}>
              <IconSwitch />
              Toggle Sidebar
            </Button>
            <Heading level={2}>Documents</Heading>
          </div>
        </div>

        <div className="theme-studio__docdash-metrics">
          {[
            ['Total Revenue', '$1,250.00', '+12.5%', 'Trending up this month', 'Visitors for the last 6 months'],
            ['New Customers', '1,234', '-20%', 'Down 20% this period', 'Acquisition needs attention'],
            ['Active Accounts', '45,678', '+12.5%', 'Strong user retention', 'Engagement exceed targets'],
            ['Growth Rate', '4.5%', '+4.5%', 'Steady performance', 'Meets growth projections'],
          ].map(([label, value, delta, title, meta]) => (
            <Card key={label} className="theme-studio__docdash-metric">
              <Card.Content>
                <Text strong>{label}</Text>
                <div className="theme-studio__docdash-metric-value">{value}</div>
                <div className="theme-studio__docdash-metric-delta">{delta}</div>
                <Text>{title}</Text>
                <Text type="secondary">{meta}</Text>
              </Card.Content>
            </Card>
          ))}
        </div>

        <div className="theme-studio__docdash-body">
          <div className="theme-studio__docdash-primary">
            <Card className="theme-studio__docdash-traffic">
              <Card.Content>
                <div className="theme-studio__docdash-card-head">
                  <Flex vertical>
                    <Text strong>Total Visitors</Text>
                    <Text type="secondary">Total for the last 3 months</Text>
                  </Flex>
                  <Segmented
                    className="theme-studio__docdash-traffic-segmented"
                    options={[
                      { label: 'Last 3 months', value: 'last-3-months' },
                      { label: 'Last 30 days', value: 'last-30-days' },
                      { label: 'Last 7 days', value: 'last-7-days' },
                    ]}
                    value={visitorRange}
                    onChange={(value) => setVisitorRange(value as DashboardVisitorRange)}
                  />
                </div>

                <ChartContainer
                  config={dashboardVisitorsChartConfig}
                  style={{ height: 286, width: '100%' }}>
                  <AreaChart
                    data={visitorData}
                    margin={{ top: 8, right: 6, left: 6, bottom: 0 }}>
                    <defs>
                      <linearGradient id="dashboardVisitorsTrendFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-trend)" stopOpacity={0.88} />
                        <stop offset="100%" stopColor="var(--color-trend)" stopOpacity={0.16} />
                      </linearGradient>
                      <linearGradient id="dashboardVisitorsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-total)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-total)" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#edf1f7" strokeDasharray="0" />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      interval={visitorTickInterval}
                      tickMargin={10}
                      tick={{ fontSize: 11, fill: '#7b8190' }}
                    />
                    <YAxis hide domain={[0, 'dataMax + 10']} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Area
                      type="natural"
                      dataKey="trend"
                      stroke="var(--color-trend)"
                      fill="url(#dashboardVisitorsTrendFill)"
                      strokeWidth={1.65}
                      dot={false}
                    />
                    <Area
                      type="natural"
                      dataKey="total"
                      stroke="var(--color-total)"
                      fill="url(#dashboardVisitorsFill)"
                      strokeWidth={1.75}
                      dot={false}
                    />
                  </AreaChart>
                </ChartContainer>
              </Card.Content>
            </Card>

            <Card className="theme-studio__docdash-table-card">
              <Card.Content>
                <div className="theme-studio__docdash-card-head">
                  <div className="theme-studio__docdash-outline">
                    {[
                      ['outline', 'Outline', null],
                      ['past', 'Past Performance', '3'],
                      ['personnel', 'Key Personnel', '2'],
                      ['focus', 'Focus Documents', null],
                    ].map(([key, label, value]) => (
                      <button
                        key={key}
                        type="button"
                        className={`theme-studio__docdash-outline-pill${activeDocTab === key ? ' theme-studio__docdash-outline-pill_active' : ''}`}
                        onClick={() => setActiveDocTab(key as DashboardDocTab)}>
                        <span>{label}</span>
                        {value ? <strong>{value}</strong> : null}
                      </button>
                    ))}
                  </div>
                  <div className="theme-studio__docdash-table-actions">
                    <Popover
                      trigger="click"
                      placement="bottom-end"
                      title="Customize table"
                      content={
                        <div className="theme-studio__docdash-popover">
                          <label className="theme-studio__docdash-popover-option">
                            <Checkbox
                              checked={compactRows}
                              onChange={(event) => setCompactRows(event.target.checked)}
                            />
                            <span>Compact rows</span>
                          </label>
                        </div>
                      }>
                      <Button size="sm">Customize Columns</Button>
                    </Popover>
                    <Popover
                      trigger="click"
                      placement="bottom-end"
                      title="Visible columns"
                      content={
                        <div className="theme-studio__docdash-popover">
                          {[
                            ['section', 'Section Type'],
                            ['target', 'Target'],
                            ['limit', 'Limit'],
                            ['reviewer', 'Reviewer'],
                          ].map(([key, label]) => (
                            <label key={key} className="theme-studio__docdash-popover-option">
                              <Checkbox
                                checked={visibleColumns[key as keyof DashboardVisibleColumns]}
                                onChange={(event) =>
                                  setVisibleColumns((current) => ({
                                    ...current,
                                    [key]: event.target.checked,
                                  }))
                                }
                              />
                              <span>{label}</span>
                            </label>
                          ))}
                        </div>
                      }>
                      <Button size="sm" variant="outline">
                        Columns
                      </Button>
                    </Popover>
                    <Button size="sm" variant="solid" color="primary" onClick={() => addSection()}>
                      Add Section
                    </Button>
                  </div>
                </div>

                <div className="theme-studio__docdash-table-head" style={{ gridTemplateColumns: tableGridTemplate }}>
                  <Checkbox checked={allVisibleSelected} onChange={(event) => toggleVisibleRows(event.target.checked)} />
                  <span>Header</span>
                  {visibleColumns.section ? <span>Section Type</span> : null}
                  {visibleColumns.target ? <span>Target</span> : null}
                  {visibleColumns.limit ? <span>Limit</span> : null}
                  {visibleColumns.reviewer ? <span>Reviewer</span> : null}
                  <span />
                </div>

                <div className="theme-studio__docdash-table-body">
                  {pagedRows.map((row) => (
                    <div
                      key={row.key}
                      className={`theme-studio__docdash-row${compactRows ? ' theme-studio__docdash-row_compact' : ''}`}
                      style={{ gridTemplateColumns: tableGridTemplate }}>
                      <Checkbox
                        checked={selectedRows.includes(row.key)}
                        onChange={(event) => toggleRowSelection(row.key, event.target.checked)}
                      />
                      <div className="theme-studio__docdash-row-title">
                        <strong>{row.title}</strong>
                        <small>Drag to reorder</small>
                      </div>
                      {visibleColumns.section ? (
                        <Button size="sm" className="theme-studio__docdash-row-chip">
                          {row.section}
                        </Button>
                      ) : null}
                      {visibleColumns.target ? (
                        <Input
                          size="sm"
                          aria-label="Target"
                          value={rowFields[row.key]?.target ?? ''}
                          onChange={(event) => updateRowField(row.key, 'target', event.target.value)}
                        />
                      ) : null}
                      {visibleColumns.limit ? (
                        <Input
                          size="sm"
                          aria-label="Limit"
                          value={rowFields[row.key]?.limit ?? ''}
                          onChange={(event) => updateRowField(row.key, 'limit', event.target.value)}
                        />
                      ) : null}
                      {visibleColumns.reviewer ? (
                        row.reviewer === 'Assign reviewer' ? (
                          <Select
                            size="sm"
                            value={rowFields[row.key]?.reviewer}
                            onChange={(value) => updateRowField(row.key, 'reviewer', value)}>
                            <Select.Option value="Eddie Lake">Eddie Lake</Select.Option>
                            <Select.Option value="Jamik Tashpulatov">Jamik Tashpulatov</Select.Option>
                            <Select.Option value="Assign reviewer">Assign reviewer</Select.Option>
                          </Select>
                        ) : (
                          <div className="theme-studio__docdash-reviewer">{rowFields[row.key]?.reviewer}</div>
                        )
                      ) : null}
                      <Dropdown
                        trigger="click"
                        overlay={
                          <Menu onSelect={(action) => runRowAction(row.key, action)}>
                            <Menu.Item index="duplicate">Duplicate section</Menu.Item>
                            <Menu.Item index="focus">Move to focus</Menu.Item>
                            <Menu.Item index="archive" danger>
                              Archive section
                            </Menu.Item>
                          </Menu>
                        }>
                        <button type="button" className="theme-studio__docdash-more" aria-label="Open menu">
                          <IconMore />
                        </button>
                      </Dropdown>
                    </div>
                  ))}
                </div>

                <div className="theme-studio__docdash-table-footer">
                  <Text type="secondary">
                    {selectedRows.length} of {documentRows.length} row(s) selected.
                  </Text>
                  <div className="theme-studio__docdash-pagination">
                    <span>Rows per page</span>
                    <Select
                      value={String(rowsPerPage)}
                      size="sm"
                      onChange={(value) => {
                        setRowsPerPage(Number(value));
                        setCurrentPage(1);
                      }}>
                      <Select.Option value="10">10</Select.Option>
                      <Select.Option value="20">20</Select.Option>
                    </Select>
                    <span>
                      Page {safeCurrentPage} of {totalPages}
                    </span>
                    <div className="theme-studio__docdash-pagination-buttons">
                      <button type="button" disabled={safeCurrentPage === 1} onClick={() => setCurrentPage(1)}>
                        «
                      </button>
                      <button
                        type="button"
                        disabled={safeCurrentPage === 1}
                        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>
                        ‹
                      </button>
                      <button
                        type="button"
                        disabled={safeCurrentPage === totalPages}
                        onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}>
                        ›
                      </button>
                      <button
                        type="button"
                        disabled={safeCurrentPage === totalPages}
                        onClick={() => setCurrentPage(totalPages)}>
                        »
                      </button>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>

            <div className="theme-studio__docdash-chart-pair">
              <Card className="theme-studio__docdash-chart-card">
                <Card.Content>
                  <div className="theme-studio__docdash-card-head">
                    <Flex vertical>
                      <Text strong>Pie Chart - Donut with Text</Text>
                      <Text type="secondary">January - June 2024</Text>
                    </Flex>
                  </div>
                  <ChartContainer config={dashboardDonutChartConfig} style={{ height: 318, width: '100%' }}>
                    <PieChart>
                      <Pie
                        data={dashboardDonutData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="49%"
                        innerRadius={56}
                        outerRadius={106}
                        strokeWidth={0}
                        paddingAngle={0}>
                        {dashboardDonutData.map((entry) => (
                          <Cell key={entry.name} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                  <div className="theme-studio__docdash-chart-center">
                    <strong>1,125</strong>
                    <small>Visitors</small>
                  </div>
                  <div className="theme-studio__docdash-chart-note">
                    <span>Trending up by 5.2% this month</span>
                  </div>
                  <Text type="secondary">Showing total visitors for the last 6 months</Text>
                </Card.Content>
              </Card>

              <Card className="theme-studio__docdash-chart-card">
                <Card.Content>
                  <div className="theme-studio__docdash-card-head">
                    <Flex vertical>
                      <Text strong>Bar Chart - Mixed</Text>
                      <Text type="secondary">January - June 2024</Text>
                    </Flex>
                  </div>
                  <ChartContainer config={dashboardBarChartConfig} style={{ height: 318, width: '100%' }}>
                    <BarChart
                      data={dashboardBarData}
                      layout="vertical"
                      margin={{ top: 20, right: 2, left: 0, bottom: 4 }}
                      barCategoryGap={16}>
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="browser"
                        tickLine={false}
                        axisLine={false}
                        width={48}
                        tick={{ fontSize: 12, fill: '#7b8190' }}
                      />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                      <Bar dataKey="visitors" radius={[6, 6, 6, 6]} barSize={46}>
                        {dashboardBarData.map((entry) => (
                          <Cell key={entry.browser} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                  <div className="theme-studio__docdash-chart-center theme-studio__docdash-chart-center_compact">
                    <span>Trending up by 5.2% this month</span>
                  </div>
                  <Text type="secondary">Showing total visitors for the last 6 months</Text>
                </Card.Content>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
