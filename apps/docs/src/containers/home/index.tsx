import React, { useMemo, useState, useCallback, useRef } from 'react';
import './home.scss';
import { useNavigate } from 'react-router-dom';
import { useRunner } from 'react-runner';
import { Highlight } from 'prism-react-renderer';
import { LightCodeTheme, DarkCodeTheme } from '../../components/demo-block/code-theme';
import * as TinyDesign from '@tiny-design/react';
import * as TinyIcons from '@tiny-design/icons';
import {
  Button, Flex, Tag, Switch, Badge, Avatar, Progress, Rate, Input, Tabs,
  Slider, Tooltip, Checkbox, Radio, Keyboard, useTheme,
} from '@tiny-design/react';
import {
  IconGithub, IconSearch, IconCheckmark,
  IconColorlens, IconCode, IconPuzzle, IconAccessible,
} from '@tiny-design/icons';
import { Footer } from './footer';
import { ThemeShowcase } from './theme-showcase';
import { useLocaleContext } from '../../context/locale-context';
import { getComponentMenu } from '../../routers';
import pkg from '../../../../../packages/react/package.json';
import logoSvg from '../../assets/logo/logo.svg';

const { repository } = pkg;

// ─── Component Showcase Section ───
const ComponentShowcase = (): React.ReactElement => {
  const [switchVal, setSwitchVal] = useState(true);
  const [sliderVal, setSliderVal] = useState(40);
  const [rateVal, setRateVal] = useState(4);

  return (
    <div className="home__showcase-grid">
      {/* Card 1: Buttons */}
      <div className="home__showcase-card home__showcase-card_wide">
        <span className="home__showcase-label">Buttons</span>
        <Flex gap="sm" wrap="wrap">
          <Button btnType="primary">Primary</Button>
          <Button btnType="outline">Outline</Button>
          <Button btnType="default">Default</Button>
          <Button btnType="ghost">Ghost</Button>
          <Button btnType="success">Success</Button>
          <Button btnType="danger">Danger</Button>
        </Flex>
      </div>

      {/* Card 2: Tags */}
      <div className="home__showcase-card">
        <span className="home__showcase-label">Tags</span>
        <Flex gap="sm" wrap="wrap">
          <Tag>Default</Tag>
          <Tag color="#f50">#f50</Tag>
          <Tag color="success">Success</Tag>
          <Tag color="warning">Warning</Tag>
          <Tag color="danger">Danger</Tag>
          <Tag color="info">Info</Tag>
        </Flex>
      </div>

      {/* Card 3: Toggle & Slider */}
      <div className="home__showcase-card">
        <span className="home__showcase-label">Controls</span>
        <Flex vertical gap="md">
          <Flex align="center" gap="sm">
            <Switch checked={switchVal} onChange={setSwitchVal} />
            <span style={{ fontSize: 13, color: 'var(--ty-color-text-secondary)' }}>
              {switchVal ? 'Enabled' : 'Disabled'}
            </span>
          </Flex>
          <Slider value={sliderVal} onChange={(v) => setSliderVal(v as number)} />
        </Flex>
      </div>

      {/* Card 4: Avatars & Badge */}
      <div className="home__showcase-card">
        <span className="home__showcase-label">Avatars</span>
        <Flex align="center" gap="md">
          <Avatar.Group>
            <Avatar style={{ background: '#7c3aed' }}>A</Avatar>
            <Avatar style={{ background: '#2563eb' }}>B</Avatar>
            <Avatar style={{ background: '#059669' }}>C</Avatar>
            <Avatar style={{ background: '#d97706' }}>D</Avatar>
            <Avatar style={{ background: '#dc2626' }}>E</Avatar>
          </Avatar.Group>
          <Badge count={5}>
            <Avatar shape="square" style={{ background: 'var(--ty-color-primary)' }}>U</Avatar>
          </Badge>
        </Flex>
      </div>

      {/* Card 5: Input */}
      <div className="home__showcase-card">
        <span className="home__showcase-label">Input</span>
        <Input placeholder="Search components..." prefix={<IconSearch size={16} />} />
      </div>

      {/* Card 6: Progress & Rate */}
      <div className="home__showcase-card">
        <span className="home__showcase-label">Feedback</span>
        <Flex vertical gap="sm">
          <Progress.Bar percent={72} />
          <Rate value={rateVal} onChange={setRateVal} />
        </Flex>
      </div>

      {/* Card 7: Tabs */}
      <div className="home__showcase-card home__showcase-card_wide">
        <span className="home__showcase-label">Tabs</span>
        <Tabs
          defaultActiveKey="1"
          size="sm"
          items={[
            { key: '1', label: 'Overview' },
            { key: '2', label: 'Analytics' },
            { key: '3', label: 'Settings' },
          ]}
        />
      </div>

      {/* Card 8: Checkbox & Radio */}
      <div className="home__showcase-card">
        <span className="home__showcase-label">Selection</span>
        <Flex vertical gap="sm">
          <Checkbox defaultChecked>Remember me</Checkbox>
          <Radio.Group defaultValue="a">
            <Radio value="a">Option A</Radio>
            <Radio value="b">Option B</Radio>
          </Radio.Group>
        </Flex>
      </div>

      {/* Card 9: Keyboard & Tooltip */}
      <div className="home__showcase-card">
        <span className="home__showcase-label">Misc</span>
        <Flex gap="sm" wrap="wrap" align="center">
          <Keyboard>⌘</Keyboard>
          <Keyboard>K</Keyboard>
          <Tooltip title="Hello from Tiny UI!">
            <Button size="sm" btnType="outline">Hover me</Button>
          </Tooltip>
        </Flex>
      </div>
    </div>
  );
};

// ─── Live Code Example Section ───
const INITIAL_CODE = `import { Button, Flex, Tag } from '@tiny-design/react';

export default function App() {
  return (
    <Flex gap="sm" align="center" wrap="wrap">
      <Button btnType="primary">
        Get Started
      </Button>
      <Button btnType="outline">
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
        window.HTMLTextAreaElement.prototype, 'value'
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
            <span /><span /><span />
          </div>
          <span className="home__code-filename">App.tsx</span>
          <span className="home__code-editable">Editable</span>
        </div>
        <div className="home__code-editor">
          <div className="home__code-editor-overlay">
            <Highlight code={code} language="tsx" theme={codeTheme}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ ...style, padding: '16px', margin: 0 }} aria-hidden="true">
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
          {error
            ? <pre className="home__code-error">{error}</pre>
            : element
          }
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
          {copied
            ? <><IconCheckmark size={14} /> {s.home.cta.copied}</>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
          }
        </button>
      </div>
      <Flex gap="sm" justify="center" className="home__cta-actions">
        <Button btnType="primary" size="lg" onClick={() => navigate('/guide')}>
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
            <span>Tiny UI for React</span>
          </div>
          <h1 className="home__hero-heading">
            Build beautiful interfaces
            <span className="home__hero-heading-accent"> with less effort</span>
          </h1>
          <p className="home__hero-subtitle">{s.home.subtitle}</p>
          <Flex gap="sm" className="home__hero-actions">
            <Button
              className="home__btn-primary"
              btnType="primary"
              size="lg"
              onClick={() => navigate('/guide')}>
              {s.home.getStarted}
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
      </section>

      {/* ─── Component Showcase ─── */}
      <section className="home__section">
        <div className="home__section-inner">
          <div className="home__section-header">
            <h2 className="home__section-title">{s.home.showcase.title}</h2>
            <p className="home__section-subtitle">{s.home.showcase.subtitle}</p>
          </div>
          <ComponentShowcase />
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
          </div>
          <div className="home__features-row">
            <FeatureCard
              icon={<IconColorlens size={28} />}
              title={s.home.features.themeable}
              desc={s.home.features.themeableDesc}
            />
            <FeatureCard
              icon={<IconCode size={28} />}
              title={s.home.features.elegant}
              desc={s.home.features.elegantDesc}
            />
            <FeatureCard
              icon={<IconPuzzle size={28} />}
              title={s.home.features.composable}
              desc={s.home.features.composableDesc}
            />
            <FeatureCard
              icon={<IconAccessible size={28} />}
              title={s.home.features.accessible}
              desc={s.home.features.accessibleDesc}
            />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CtaSection s={s} />

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="home__feature-card">
    <span className="home__feature-icon">{icon}</span>
    <h3 className="home__feature-name">{title}</h3>
    <p className="home__feature-desc">{desc}</p>
  </div>
);

export default HomePage;
