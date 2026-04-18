import React, { useMemo, useState, useCallback, useRef } from 'react';
import './home.scss';
import { useNavigate } from 'react-router-dom';
import { useRunner } from 'react-runner';
import { Highlight } from 'prism-react-renderer';
import { LightCodeTheme, DarkCodeTheme } from '../../components/demo-block/code-theme';
import * as TinyDesign from '@tiny-design/react';
import * as TinyIcons from '@tiny-design/icons';
import {
  Button,
  Flex,
  Tag,
  Badge,
  Avatar,
  Progress,
  Rate,
  Input,
  Tabs,
  Tooltip,
  Checkbox,
  Keyboard,
  useTheme,
  Card,
  Heading,
  Paragraph,
  Statistic,
  Descriptions,
  Table,
  Timeline,
  Text,
  Image,
  Menu,
} from '@tiny-design/react';
import {
  IconGithub,
  IconSearch,
  IconCheckmark,
  IconArrowRight,
  IconColorlens,
  IconStructure,
  IconCheckCircle,
  IconFire,
  IconStatistics,
  IconSettings,
  IconCalendar,
  IconComment,
  IconCreditCard,
} from '@tiny-design/icons';
import { Footer } from './footer';
import { ThemeShowcase } from './theme-showcase';
import { useLocaleContext } from '../../context/locale-context';
import { getComponentMenu } from '../../routers';
import pkg from '../../../../../packages/react/package.json';
import logoSvg from '../../assets/logo/logo.svg';

const { repository } = pkg;

const productRows = [
  { key: '1', name: 'Acme Inc.', owner: 'Design', status: <Tag color="success">Healthy</Tag> },
  { key: '2', name: 'Northstar', owner: 'Growth', status: <Tag color="warning">Review</Tag> },
  { key: '3', name: 'Helio', owner: 'Ops', status: <Tag color="info">Live</Tag> },
];

const categoryGroups = [
  { title: 'Foundation', items: 'Button, Icon, Typography, Link' },
  { title: 'Layout', items: 'Flex, Grid, Split, Space' },
  { title: 'Navigation', items: 'Tabs, Menu, Breadcrumb, Pagination' },
  { title: 'Forms', items: 'Input, Select, Date Picker, Checkbox' },
  { title: 'Data Display', items: 'Card, Table, Timeline, Charts' },
  { title: 'Feedback', items: 'Modal, Notification, Tooltip, Drawer' },
];

const activityItems = [
  {
    key: '1',
    color: 'var(--ty-color-success)',
    title: 'Theme tokens synced',
    desc: 'Studio Bloom updated across docs and dashboard previews.',
  },
  {
    key: '2',
    color: 'var(--ty-color-info)',
    title: 'Checkout flow reviewed',
    desc: 'Input, validation, and action states passed the latest visual pass.',
  },
  {
    key: '3',
    color: 'var(--ty-color-primary)',
    title: 'Release candidate prepared',
    desc: '86+ components bundled for the next internal release.',
  },
];

const ProductPreview = ({ s }: { s: any }): React.ReactElement => {
  const [rateVal, setRateVal] = useState(4);

  return (
    <div className="home__product-shell">
      <div className="home__product-sidebar">
        <Flex align="center" gap="sm" className="home__product-brand">
          <Image src={logoSvg} alt="Tiny UI logo" width={28} height={28} />
          <div>
            <Text strong>Tiny UI</Text>
            <Text type="secondary">{s.home.preview.workspace}</Text>
          </div>
        </Flex>
        <Menu
          mode="inline"
          appearance="navigation"
          variant="ghost"
          size="lg"
          selectionStyle="background"
          className="home__product-nav"
          defaultSelectedKeys={['overview']}>
          <Menu.Item index="overview" icon={<IconStatistics size={16} />}>
            {s.home.preview.overview}
          </Menu.Item>
          <Menu.Item index="components" icon={<IconStructure size={16} />}>
            {s.home.preview.components}
          </Menu.Item>
          <Menu.Item index="settings" icon={<IconSettings size={16} />}>
            {s.home.preview.settings}
          </Menu.Item>
        </Menu>
        <Card className="home__product-sidebar-card" variant="filled">
          <Card.Content>
            <Text className="home__product-sidebar-kicker">{s.home.preview.activeTheme}</Text>
            <div className="home__product-swatches">
              <span className="home__product-swatch home__product-swatch_primary" />
              <span className="home__product-swatch home__product-swatch_info" />
              <span className="home__product-swatch home__product-swatch_success" />
              <span className="home__product-swatch home__product-swatch_warning" />
            </div>
            <Descriptions className="home__product-descriptions" column={1} size="sm">
              <Descriptions.Item label={s.home.preview.themeLabel}>
                {s.home.preview.themeValue}
              </Descriptions.Item>
              <Descriptions.Item label={s.home.preview.tokensLabel}>
                {s.home.preview.tokensValue}
              </Descriptions.Item>
            </Descriptions>
            <Paragraph className="home__product-theme-hint">{s.home.preview.themeHint}</Paragraph>
            <Button variant="outline" color="primary" size="sm">
              {s.home.preview.editTheme}
            </Button>
          </Card.Content>
        </Card>
      </div>

      <div className="home__product-main">
        <div className="home__product-topbar">
          <Input
            placeholder={s.home.preview.search}
            prefix={<IconSearch size={16} />}
            className="home__product-search"
          />
          <Flex gap="sm" align="center">
            <Badge count={3}>
              <Button variant="ghost" color="primary" icon={<IconComment size={16} />} />
            </Badge>
            <Avatar className="home__avatar home__avatar_primary">DW</Avatar>
          </Flex>
        </div>

        <div className="home__product-metrics">
          <Card className="home__product-metric" variant="filled">
            <Card.Content>
              <Statistic
                title={s.home.preview.metrics.velocity}
                value="24"
                suffix={s.home.preview.metrics.velocitySuffix}
              />
              <Progress.Bar percent={78} />
            </Card.Content>
          </Card>
          <Card className="home__product-metric" variant="filled">
            <Card.Content>
              <Statistic title={s.home.preview.metrics.adoption} value={83} suffix="%" />
              <div className="home__product-pills">
                <Tag color="success">Stable</Tag>
                <Tag color="info">Typed</Tag>
              </div>
            </Card.Content>
          </Card>
          <Card className="home__product-metric" variant="filled">
            <Card.Content>
              <Statistic title={s.home.preview.metrics.satisfaction} value="4.8/5" />
              <Rate value={rateVal} onChange={setRateVal} />
            </Card.Content>
          </Card>
        </div>

        <div className="home__product-panels">
          <Card
            className="home__product-panel home__product-panel_wide"
            title={s.home.preview.pipeline}
            extra={<Tag color="info">{s.home.preview.live}</Tag>}
            variant="outlined">
            <Card.Content>
              <Tabs
                defaultActiveKey="1"
                size="sm"
                items={[
                  { key: '1', label: s.home.preview.overview },
                  { key: '2', label: s.home.preview.analytics },
                  { key: '3', label: s.home.preview.settings },
                ]}
              />
              <Table
                size="sm"
                bordered
                columns={[
                  { title: s.home.preview.table.project, dataIndex: 'name', key: 'name' },
                  { title: s.home.preview.table.owner, dataIndex: 'owner', key: 'owner' },
                  { title: s.home.preview.table.status, dataIndex: 'status', key: 'status' },
                ]}
                dataSource={productRows}
                pagination={false}
              />
            </Card.Content>
          </Card>

          <Card
            className="home__product-panel"
            title={s.home.preview.checkout}
            extra={<IconCreditCard size={18} color="var(--ty-color-primary)" />}
            variant="outlined">
            <Card.Content>
              <Flex vertical gap="sm">
                <Input placeholder={s.home.preview.form.name} />
                <Input placeholder={s.home.preview.form.email} />
                <Checkbox defaultChecked>{s.home.preview.form.updates}</Checkbox>
                <Button variant="solid" color="primary">
                  {s.home.preview.form.submit}
                </Button>
              </Flex>
            </Card.Content>
          </Card>
        </div>

        <Card
          className="home__product-panel home__product-panel_activity"
          title={s.home.preview.activity}
          extra={<Tag color="success">{s.home.preview.activityTag}</Tag>}
          variant="outlined">
          <Card.Content>
            <Timeline>
              {activityItems.map((item) => (
                <Timeline.Item key={item.key} dotStyle={{ borderColor: item.color }}>
                  <Flex vertical gap="xs" className="home__product-activity-item">
                    <Text strong>{item.title}</Text>
                    <Text type="secondary">{item.desc}</Text>
                  </Flex>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

const ScenarioShowcase = ({ s }: { s: any }): React.ReactElement => (
  <div className="home__scenario-grid">
    <Card className="home__scenario-card" hoverable variant="outlined">
      <Card.Content>
        <div className="home__scenario-copy">
          <Tag color="info" variant="soft" className="home__scenario-kicker">
            {s.home.scenarios.dashboard.kicker}
          </Tag>
          <Heading level={3} className="home__scenario-title">
            {s.home.scenarios.dashboard.title}
          </Heading>
          <Paragraph className="home__scenario-desc">{s.home.scenarios.dashboard.desc}</Paragraph>
        </div>
        <div className="home__scenario-preview">
          <Statistic title="MRR" value={128} prefix="$" suffix="K" />
          <div className="home__scenario-bars">
            <span style={{ height: '42%' }} />
            <span style={{ height: '66%' }} />
            <span style={{ height: '58%' }} />
            <span style={{ height: '82%' }} />
            <span style={{ height: '71%' }} />
          </div>
        </div>
      </Card.Content>
    </Card>

    <Card className="home__scenario-card" hoverable variant="outlined">
      <Card.Content>
        <div className="home__scenario-copy">
          <Tag color="warning" variant="soft" className="home__scenario-kicker">
            {s.home.scenarios.forms.kicker}
          </Tag>
          <Heading level={3} className="home__scenario-title">
            {s.home.scenarios.forms.title}
          </Heading>
          <Paragraph className="home__scenario-desc">{s.home.scenarios.forms.desc}</Paragraph>
        </div>
        <div className="home__scenario-preview">
          <Input placeholder="Workspace name" />
          <Input placeholder="team@company.com" prefix={<IconCalendar size={16} />} />
          <Flex gap="sm" wrap="wrap">
            <Tag color="success">Validated</Tag>
            <Tag color="info">Typed</Tag>
            <Tag color="warning">Draft</Tag>
          </Flex>
        </div>
      </Card.Content>
    </Card>

    <Card className="home__scenario-card" hoverable variant="outlined">
      <Card.Content>
        <div className="home__scenario-copy">
          <Tag color="success" variant="soft" className="home__scenario-kicker">
            {s.home.scenarios.content.kicker}
          </Tag>
          <Heading level={3} className="home__scenario-title">
            {s.home.scenarios.content.title}
          </Heading>
          <Paragraph className="home__scenario-desc">{s.home.scenarios.content.desc}</Paragraph>
        </div>
        <div className="home__scenario-preview">
          <Flex align="center" justify="space-between">
            <Avatar.Group>
              <Avatar className="home__avatar home__avatar_primary">A</Avatar>
              <Avatar className="home__avatar home__avatar_info">B</Avatar>
              <Avatar className="home__avatar home__avatar_success">C</Avatar>
            </Avatar.Group>
            <Tooltip title="Fast keyboard flows">
              <Button variant="outline" color="primary" size="sm">
                <Keyboard>⌘</Keyboard>
                <span style={{ marginLeft: 8 }}>K</span>
              </Button>
            </Tooltip>
          </Flex>
          <Progress.Bar percent={72} />
        </div>
      </Card.Content>
    </Card>
  </div>
);

const CategoryCoverage = ({ s }: { s: any }): React.ReactElement => (
  <div className="home__coverage-grid">
    {categoryGroups.map((group) => (
      <Card key={group.title} className="home__coverage-card" variant="filled">
        <Card.Content>
          <Heading level={4} className="home__coverage-title">
            {group.title}
          </Heading>
          <Paragraph className="home__coverage-desc">{group.items}</Paragraph>
        </Card.Content>
      </Card>
    ))}
    <div className="home__coverage-summary">
      <span>{s.home.coverage.summary}</span>
      <Button variant="link" color="primary" onClick={() => window.location.assign('/components')}>
        {s.home.coverage.cta} <IconArrowRight size={16} />
      </Button>
    </div>
  </div>
);

// ─── Live Code Example Section ───
const INITIAL_CODE = `import { Button, Flex, Tag } from '@tiny-design/react';

export default function App() {
  return (
    <Flex gap="sm" align="center" wrap="wrap">
      <Button variant="solid" color="primary">
        Get Started
      </Button>
      <Button variant="outline" color="primary">
        Learn More
      </Button>
      <Tag color="success">v1.6</Tag>
    </Flex>
  );
}`;

const runnerScope = {
  import: {
    react: React,
    '@tiny-design/react': TinyDesign,
    '@tiny-design/icons': TinyIcons,
  },
};

const LiveCodeExample = (): React.ReactElement => {
  const [code, setCode] = useState(INITIAL_CODE);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { resolvedTheme } = useTheme();
  const codeTheme = (resolvedTheme === 'dark' ? DarkCodeTheme : LightCodeTheme) as any;

  const { element, error } = useRunner({ code, scope: runnerScope });

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const val = ta.value;
      const newVal = val.substring(0, start) + '  ' + val.substring(end);
      ta.value = newVal;
      ta.selectionStart = ta.selectionEnd = start + 2;
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      )?.set;
      setter?.call(ta, newVal);
      ta.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, []);

  return (
    <div className="home__code-split">
      <div className="home__code-block">
        <div className="home__code-header">
          <div className="home__code-dots">
            <span />
            <span />
            <span />
          </div>
          <span className="home__code-filename">App.tsx</span>
          <span className="home__code-editable">Editable</span>
        </div>
        <div className="home__code-editor">
          <div className="home__code-editor-overlay">
            <Highlight code={code} language="tsx" theme={codeTheme}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={className}
                  style={{ ...style, padding: '16px', margin: 0 }}
                  aria-hidden="true">
                  <code>
                    {tokens.map((line, i) => {
                      const { key: _lk, ...lineProps } = getLineProps({ line });
                      return (
                        <div key={i} {...lineProps}>
                          {line.map((token, j) => {
                            const { key: _tk, ...tokenProps } = getTokenProps({ token });
                            return <span key={j} {...tokenProps} />;
                          })}
                        </div>
                      );
                    })}
                  </code>
                </pre>
              )}
            </Highlight>
            <textarea
              ref={textareaRef}
              className="home__code-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
        </div>
      </div>
      <div className="home__code-result">
        <div className="home__code-result-label">Preview</div>
        <div className="home__code-result-content">
          {error ? <pre className="home__code-error">{error}</pre> : element}
        </div>
      </div>
    </div>
  );
};

// ─── CTA Section ───
const CtaSection = ({ s }: { s: any }): React.ReactElement => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(s.home.cta.install);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [s]);

  return (
    <section className="home__cta-section">
      <h2 className="home__cta-title">{s.home.cta.title}</h2>
      <p className="home__cta-subtitle">{s.home.cta.subtitle}</p>
      <div className="home__cta-install" onClick={handleCopy}>
        <code>$ {s.home.cta.install}</code>
        <button className="home__cta-copy" aria-label="Copy">
          {copied ? (
            <>
              <IconCheckmark size={14} /> {s.home.cta.copied}
            </>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          )}
        </button>
      </div>
      <Flex gap="sm" justify="center" className="home__cta-actions">
        <Button variant="solid" color="primary" size="lg" onClick={() => navigate('/guide')}>
          {s.home.cta.readDocs}
        </Button>
        <Button size="lg" onClick={() => navigate('/components')}>
          {s.home.cta.browseComponents}
        </Button>
      </Flex>
    </section>
  );
};

// ─── Main Page ───
const HomePage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { siteLocale: s } = useLocaleContext();

  const stats = useMemo(() => {
    const menu = getComponentMenu(s);
    const totalComponents = menu.reduce((sum, cat) => sum + (cat.children?.length ?? 0), 0);
    return [
      { value: `${totalComponents}+`, label: s.home.stats.components },
      { value: String(menu.length), label: s.home.stats.categories },
      { value: '100%', label: s.home.stats.typescript },
      { value: 'MIT', label: s.home.stats.license },
    ];
  }, [s]);

  return (
    <div className="home">
      <div className="home__bg-grid" />
      <div className="home__bg-glow" />

      {/* ─── Hero ─── */}
      <section className="home__hero">
        <div className="home__hero-inner">
          <div className="home__hero-badge">
            <img src={logoSvg} alt="logo" width={20} height={20} />
            <span>{s.home.badge}</span>
          </div>
          <h1 className="home__hero-heading">
            {s.home.heroTitle}
            <span className="home__hero-heading-accent">{s.home.heroAccent}</span>
          </h1>
          <p className="home__hero-subtitle">{s.home.subtitle}</p>
          <Flex gap="sm" className="home__hero-actions">
            <Button
              className="home__btn-primary"
              variant="solid"
              color="primary"
              size="lg"
              onClick={() => navigate('/guide')}>
              {s.home.getStarted}
            </Button>
            <Button
              className="home__btn-secondary"
              size="lg"
              variant="outline"
              color="primary"
              onClick={() => navigate('/components')}>
              {s.home.browseComponents}
            </Button>
            <Button
              className="home__btn-secondary"
              size="lg"
              icon={<IconGithub color="currentColor" />}
              onClick={() => window.open(repository.url)}>
              {s.home.github}
            </Button>
          </Flex>
        </div>
        <div className="home__hero-stats">
          {stats.map((stat, i) => (
            <div key={i} className="home__hero-stat">
              <span className="home__hero-stat-value">{stat.value}</span>
              <span className="home__hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
        <ProductPreview s={s} />
      </section>

      {/* ─── Scenario Showcase ─── */}
      <section className="home__section">
        <div className="home__section-inner">
          <div className="home__section-header">
            <h2 className="home__section-title">{s.home.showcase.title}</h2>
            <p className="home__section-subtitle">{s.home.showcase.subtitle}</p>
          </div>
          <ScenarioShowcase s={s} />
        </div>
      </section>

      {/* ─── Make It Yours ─── */}
      <ThemeShowcase />

      {/* ─── Code Example ─── */}
      <section className="home__section">
        <div className="home__section-inner">
          <div className="home__section-header">
            <h2 className="home__section-title">{s.home.codeExample.title}</h2>
            <p className="home__section-subtitle">{s.home.codeExample.subtitle}</p>
          </div>
          <LiveCodeExample />
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="home__section">
        <div className="home__section-inner">
          <div className="home__section-header">
            <h2 className="home__section-title">{s.home.designPrinciple}</h2>
            <p className="home__section-subtitle">{s.home.designPrincipleDesc}</p>
          </div>
          <div className="home__features-row">
            <FeatureCard
              icon={<IconFire size={28} />}
              title={s.home.features.themeable}
              desc={s.home.features.themeableDesc}
            />
            <FeatureCard
              icon={<IconColorlens size={28} />}
              title={s.home.features.elegant}
              desc={s.home.features.elegantDesc}
            />
            <FeatureCard
              icon={<IconStructure size={28} />}
              title={s.home.features.composable}
              desc={s.home.features.composableDesc}
            />
            <FeatureCard
              icon={<IconCheckCircle size={28} />}
              title={s.home.features.accessible}
              desc={s.home.features.accessibleDesc}
            />
          </div>
        </div>
      </section>

      <section className="home__section">
        <div className="home__section-inner">
          <div className="home__section-header">
            <h2 className="home__section-title">{s.home.coverage.title}</h2>
            <p className="home__section-subtitle">{s.home.coverage.subtitle}</p>
          </div>
          <CategoryCoverage s={s} />
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CtaSection s={s} />

      <Footer />
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="home__feature-card">
    <span className="home__feature-icon">{icon}</span>
    <h3 className="home__feature-name">{title}</h3>
    <p className="home__feature-desc">{desc}</p>
  </div>
);

export default HomePage;
