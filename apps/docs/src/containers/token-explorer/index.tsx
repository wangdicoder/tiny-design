import React, { useEffect, useMemo, useState } from 'react';
import registryData from '@tiny-design/tokens/registry-runtime';
import { useSearchParams } from 'react-router-dom';
import {
  Button,
  Calendar,
  Card,
  DatePicker,
  Input,
  Select,
  Tag,
  Textarea,
  TimePicker,
} from '@tiny-design/react';
import { useLocaleContext } from '../../context/locale-context';
import './token-explorer.scss';

type RegistryToken = {
  key: string;
  cssVar: string;
  category: string;
  component?: string;
  type: string;
  group?: string;
  description?: string;
  source: string;
  defaultValue?: string;
  fallback?: string;
  status: string;
};

type RegistryShape = {
  version: number;
  generatedAt: string;
  tokens: RegistryToken[];
};

type PreviewRenderer = () => React.ReactElement;

const registry = registryData as RegistryShape;

function titleCase(value: string): string {
  return value
    .split(/[-.]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function getSemanticGroup(component: string, tokenKey: string): string {
  const remainder = tokenKey.replace(`${component}.`, '');

  if (remainder.startsWith('header-')) return 'Header';
  if (remainder.startsWith('cell-')) return 'Cells';
  if (remainder.startsWith('panel-item-')) return 'Panel Items';
  if (remainder.startsWith('today-')) return 'Today Action';
  if (remainder.startsWith('input-')) return 'Input';
  if (remainder.startsWith('range-')) return 'Range';
  if (remainder.startsWith('week-number-')) return 'Week Numbers';
  if (remainder.startsWith('month-content-')) return 'Panel Items';
  if (remainder.startsWith('footer-')) return 'Footer';
  if (remainder.startsWith('body-')) return 'Body';

  const [firstSegment] = remainder.split('.');
  return titleCase(firstSegment);
}

function formatComponentLabel(component: string): string {
  return component
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function isColorValue(value: string | undefined): boolean {
  if (!value) return false;
  if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
    return CSS.supports('color', value);
  }
  return false;
}

const TokenExplorer = (): React.ReactElement => {
  const { siteLocale } = useLocaleContext();
  const isZh = siteLocale.locale === 'zh_CN';
  const labels = useMemo(
    () =>
      isZh
        ? {
            title: 'Token Explorer',
            intro:
              '浏览组件 token 的最小可用面板。组件列表会自动从 registry 生成，重点组件提供实时预览，用来检查命名、分组、默认值与运行时 CSS 变量。',
            component: '组件',
            search: '搜索 token',
            searchPlaceholder: '按 key、描述或 CSS 变量搜索',
            summary: '摘要',
            groups: '分组',
            type: '类型',
            tokens: 'Tokens',
            components: '组件数',
            generatedAt: '生成时间',
            previewStatus: '预览',
            defaultValue: '默认值',
            fallback: 'Fallback',
            resolvedValue: '当前值',
            source: '来源',
            preview: '实时预览',
            previewDesc:
              '右侧预览直接使用当前 docs 主题环境，适合快速核对 token 是否命中对应界面。',
            previewMissing: '这个组件还没有专用预览，当前版本先提供 token 浏览能力。',
            copyKey: '复制 Key',
            copyVar: '复制变量',
            copied: '已复制',
            empty: '没有匹配的 token。',
            allGroups: '全部分组',
            allTypes: '全部类型',
            previewReady: '已配置',
            previewMissingBadge: '待补',
          }
        : {
            title: 'Token Explorer',
            intro:
              'A minimal token browser for component tokens. The component list is generated from the registry, and key components include live previews so token naming, grouping, defaults, and runtime CSS vars are easy to inspect.',
            component: 'Component',
            search: 'Search Tokens',
            searchPlaceholder: 'Search by key, description, or CSS variable',
            summary: 'Summary',
            groups: 'Groups',
            type: 'Type',
            tokens: 'Tokens',
            components: 'Components',
            generatedAt: 'Generated',
            previewStatus: 'Preview',
            defaultValue: 'Default',
            fallback: 'Fallback',
            resolvedValue: 'Resolved',
            source: 'Source',
            preview: 'Live Preview',
            previewDesc:
              'The preview uses the current docs theme environment, so it is useful for quick token-to-UI verification.',
            previewMissing:
              'This component does not have a dedicated preview yet. In this version, token browsing still works without it.',
            copyKey: 'Copy Key',
            copyVar: 'Copy Var',
            copied: 'Copied',
            empty: 'No matching tokens.',
            allGroups: 'All Groups',
            allTypes: 'All Types',
            previewReady: 'Ready',
            previewMissingBadge: 'Pending',
          },
    [isZh]
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const previewRenderers = useMemo<Record<string, PreviewRenderer>>(
    () => ({
      'date-picker': () => (
        <div className="token-explorer__preview-stack">
          <Card className="token-explorer__preview-card" title="Date Panel">
            <Card.Content>
              <div className="token-explorer__preview-date-picker">
                <DatePicker open defaultValue={new Date(2026, 3, 15)} />
              </div>
            </Card.Content>
          </Card>
          <Card className="token-explorer__preview-card" title="Year Panel">
            <Card.Content>
              <div className="token-explorer__preview-date-picker">
                <DatePicker open picker="year" defaultValue={new Date(2026, 0, 1)} />
              </div>
            </Card.Content>
          </Card>
        </div>
      ),
      calendar: () => (
        <div className="token-explorer__preview-stack">
          <Card className="token-explorer__preview-card" title="Card Calendar">
            <Card.Content>
              <div className="token-explorer__preview-calendar">
                <Calendar fullscreen={false} showToday value={new Date(2026, 3, 15)} />
              </div>
            </Card.Content>
          </Card>
        </div>
      ),
      button: () => (
        <div className="token-explorer__preview-stack">
          <Card className="token-explorer__preview-card" title="Buttons">
            <Card.Content>
              <div className="token-explorer__button-preview">
                <Button color="primary">Primary</Button>
                <Button variant="outline" color="primary">
                  Outline
                </Button>
                <Button variant="ghost" color="primary">
                  Ghost
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      ),
      input: () => (
        <div className="token-explorer__preview-stack">
          <Card className="token-explorer__preview-card" title="Inputs">
            <Card.Content>
              <div className="token-explorer__form-preview">
                <Input defaultValue="Tokyo Design Team" />
                <Input placeholder="Search tokens" />
              </div>
            </Card.Content>
          </Card>
        </div>
      ),
      textarea: () => (
        <div className="token-explorer__preview-stack">
          <Card className="token-explorer__preview-card" title="Textarea">
            <Card.Content>
              <Textarea rows={4} defaultValue="Token explorer preview for multiline field states." />
            </Card.Content>
          </Card>
        </div>
      ),
      select: () => (
        <div className="token-explorer__preview-stack">
          <Card className="token-explorer__preview-card" title="Select">
            <Card.Content>
              <Select defaultValue="design" style={{ width: '100%' }}>
                <Select.Option value="design">Design</Select.Option>
                <Select.Option value="engineering">Engineering</Select.Option>
                <Select.Option value="product">Product</Select.Option>
              </Select>
            </Card.Content>
          </Card>
        </div>
      ),
      'time-picker': () => (
        <div className="token-explorer__preview-stack">
          <Card className="token-explorer__preview-card" title="Time Picker">
            <Card.Content>
              <div className="token-explorer__preview-time-picker">
                <TimePicker open value={new Date(2026, 3, 15, 9, 30, 0)} />
              </div>
            </Card.Content>
          </Card>
        </div>
      ),
    }),
    []
  );

  const componentOptions = useMemo(
    () =>
      Array.from(
        new Set(
          registry.tokens
            .filter((token) => token.category === 'component' && token.component)
            .map((token) => token.component as string)
        )
      )
        .sort((a, b) => {
          const aHasPreview = Number(Boolean(previewRenderers[a]));
          const bHasPreview = Number(Boolean(previewRenderers[b]));
          if (aHasPreview !== bHasPreview) return bHasPreview - aHasPreview;
          return a.localeCompare(b);
        })
        .map((component) => ({
          value: component,
          label: formatComponentLabel(component),
          hasPreview: Boolean(previewRenderers[component]),
        })),
    [previewRenderers]
  );

  const defaultComponent = useMemo(
    () =>
      componentOptions.find((option) => option.value === 'date-picker')?.value ??
      componentOptions[0]?.value ??
      '',
    [componentOptions]
  );

  const [selectedComponent, setSelectedComponent] = useState<string>(
    searchParams.get('component') || defaultComponent
  );
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedGroup, setSelectedGroup] = useState(searchParams.get('group') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [resolvedValues, setResolvedValues] = useState<Record<string, string>>({});
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const componentTokens = useMemo(
    () =>
      registry.tokens.filter(
        (token) => token.category === 'component' && token.component === selectedComponent
      ),
    [selectedComponent]
  );

  const typeOptions = useMemo(
    () => [labels.allTypes, ...Array.from(new Set(componentTokens.map((token) => token.type))).sort()],
    [componentTokens, labels.allTypes]
  );

  const groupOptions = useMemo(() => {
    const groups = Array.from(
      new Set(componentTokens.map((token) => getSemanticGroup(selectedComponent, token.key)))
    );

    return [labels.allGroups, ...groups];
  }, [componentTokens, labels.allGroups, selectedComponent]);

  const filteredTokens = useMemo(() => {
    const query = search.trim().toLowerCase();

    return componentTokens.filter((token) => {
      const semanticGroup = getSemanticGroup(selectedComponent, token.key);
      const matchesGroup = selectedGroup === 'all' || semanticGroup === selectedGroup;
      const matchesType = selectedType === 'all' || token.type === selectedType;
      const matchesSearch =
        query.length === 0 ||
        token.key.toLowerCase().includes(query) ||
        token.cssVar.toLowerCase().includes(query) ||
        (token.description ?? '').toLowerCase().includes(query);

      return matchesGroup && matchesType && matchesSearch;
    });
  }, [componentTokens, search, selectedComponent, selectedGroup, selectedType]);

  const groupedTokens = useMemo(() => {
    const groups = new Map<string, RegistryToken[]>();

    filteredTokens.forEach((token) => {
      const semanticGroup = getSemanticGroup(selectedComponent, token.key);
      const current = groups.get(semanticGroup) ?? [];
      current.push(token);
      groups.set(semanticGroup, current);
    });

    return Array.from(groups.entries());
  }, [filteredTokens, selectedComponent]);

  useEffect(() => {
    const updateResolvedValues = () => {
      const styles = getComputedStyle(document.documentElement);
      const nextValues: Record<string, string> = {};
      componentTokens.forEach((token) => {
        nextValues[token.cssVar] = styles.getPropertyValue(token.cssVar).trim();
      });
      setResolvedValues(nextValues);
    };

    updateResolvedValues();

    const observer = new MutationObserver(updateResolvedValues);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-tiny-theme'],
    });

    return () => observer.disconnect();
  }, [componentTokens]);

  useEffect(() => {
    setSelectedGroup('all');
    setSelectedType('all');
  }, [selectedComponent]);

  useEffect(() => {
    if (!componentOptions.some((option) => option.value === selectedComponent)) {
      setSelectedComponent(defaultComponent);
    }
  }, [componentOptions, defaultComponent, selectedComponent]);

  useEffect(() => {
    const nextParams = new URLSearchParams();
    if (selectedComponent) nextParams.set('component', selectedComponent);
    if (search.trim()) nextParams.set('q', search.trim());
    if (selectedGroup !== 'all') nextParams.set('group', selectedGroup);
    if (selectedType !== 'all') nextParams.set('type', selectedType);
    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [search, searchParams, selectedComponent, selectedGroup, selectedType, setSearchParams]);

  const handleCopy = async (value: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopiedValue(value);
    window.setTimeout(() => {
      setCopiedValue((current) => (current === value ? null : current));
    }, 1200);
  };

  const renderPreview = () => {
    const renderer = previewRenderers[selectedComponent];

    if (renderer) {
      return renderer();
    }

    return (
      <div className="token-explorer__preview-stack">
        <Card className="token-explorer__preview-card" title={formatComponentLabel(selectedComponent)}>
          <Card.Content>
            <p className="token-explorer__preview-empty">{labels.previewMissing}</p>
          </Card.Content>
        </Card>
      </div>
    );
  };

  return (
    <div className="token-explorer">
      <h1 className="markdown__heading-1">{labels.title}</h1>
      <p className="markdown__p">{labels.intro}</p>

      <div className="token-explorer__layout">
        <div className="token-explorer__main">
          <Card className="token-explorer__controls-card">
            <Card.Content>
              <div className="token-explorer__controls">
                <label className="token-explorer__field">
                  <span className="token-explorer__field-label">{labels.component}</span>
                  <Select
                    value={selectedComponent}
                    onChange={(value) => setSelectedComponent(String(value))}>
                    {componentOptions.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </label>

                <label className="token-explorer__field">
                  <span className="token-explorer__field-label">{labels.groups}</span>
                  <Select value={selectedGroup} onChange={(value) => setSelectedGroup(String(value))}>
                    <Select.Option value="all">{labels.allGroups}</Select.Option>
                    {groupOptions
                      .filter((group) => group !== labels.allGroups)
                      .map((group) => (
                        <Select.Option key={group} value={group}>
                          {group}
                        </Select.Option>
                      ))}
                  </Select>
                </label>

                <label className="token-explorer__field">
                  <span className="token-explorer__field-label">{labels.type}</span>
                  <Select value={selectedType} onChange={(value) => setSelectedType(String(value))}>
                    <Select.Option value="all">{labels.allTypes}</Select.Option>
                    {typeOptions
                      .filter((type) => type !== labels.allTypes)
                      .map((type) => (
                        <Select.Option key={type} value={type}>
                          {type}
                        </Select.Option>
                      ))}
                  </Select>
                </label>

                <label className="token-explorer__field token-explorer__field_search">
                  <span className="token-explorer__field-label">{labels.search}</span>
                  <Input
                    value={search}
                    placeholder={labels.searchPlaceholder}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </label>
              </div>

              <div className="token-explorer__summary">
                <div className="token-explorer__summary-item">
                  <span>{labels.summary}</span>
                  <strong>{componentOptions.find((option) => option.value === selectedComponent)?.label}</strong>
                </div>
                <div className="token-explorer__summary-item">
                  <span>{labels.previewStatus}</span>
                  <strong>
                    {componentOptions.find((option) => option.value === selectedComponent)?.hasPreview
                      ? labels.previewReady
                      : labels.previewMissingBadge}
                  </strong>
                </div>
                <div className="token-explorer__summary-item">
                  <span>{labels.groups}</span>
                  <strong>{groupedTokens.length}</strong>
                </div>
                <div className="token-explorer__summary-item">
                  <span>{labels.tokens}</span>
                  <strong>{filteredTokens.length}</strong>
                </div>
                <div className="token-explorer__summary-item">
                  <span>{labels.components}</span>
                  <strong>{componentOptions.length}</strong>
                </div>
                <div className="token-explorer__summary-item">
                  <span>{labels.generatedAt}</span>
                  <strong>{new Date(registry.generatedAt).toLocaleDateString()}</strong>
                </div>
              </div>
            </Card.Content>
          </Card>

          {groupedTokens.length === 0 ? (
            <Card className="token-explorer__group-card">
              <Card.Content>{labels.empty}</Card.Content>
            </Card>
          ) : null}

          {groupedTokens.map(([groupName, tokens]) => (
            <Card key={groupName} className="token-explorer__group-card">
              <Card.Content>
                <div className="token-explorer__group-header">
                  <h2 className="token-explorer__group-title">{groupName}</h2>
                  <Tag>{tokens.length}</Tag>
                </div>
                <div className="token-explorer__token-list">
                  {tokens.map((token) => (
                    <article key={token.key} className="token-explorer__token-card">
                      <div className="token-explorer__token-head">
                        <div>
                          <div className="token-explorer__token-key">{token.key}</div>
                          <div className="token-explorer__token-var">{token.cssVar}</div>
                        </div>
                        <div className="token-explorer__token-badges">
                          {isColorValue(resolvedValues[token.cssVar]) ? (
                            <span
                              className="token-explorer__token-swatch"
                              style={{ backgroundColor: resolvedValues[token.cssVar] }}
                              aria-label={resolvedValues[token.cssVar]}
                              title={resolvedValues[token.cssVar]}
                            />
                          ) : null}
                          <Tag variant="soft">{token.type}</Tag>
                        </div>
                      </div>
                      {token.description ? (
                        <p className="token-explorer__token-desc">{token.description}</p>
                      ) : null}
                      <div className="token-explorer__token-actions">
                        <button
                          type="button"
                          className="token-explorer__copy-btn"
                          onClick={() => handleCopy(token.key)}>
                          {copiedValue === token.key ? labels.copied : labels.copyKey}
                        </button>
                        <button
                          type="button"
                          className="token-explorer__copy-btn"
                          onClick={() => handleCopy(token.cssVar)}>
                          {copiedValue === token.cssVar ? labels.copied : labels.copyVar}
                        </button>
                      </div>
                      <dl className="token-explorer__token-meta">
                        <div>
                          <dt>{labels.defaultValue}</dt>
                          <dd>{token.defaultValue ?? '-'}</dd>
                        </div>
                        <div>
                          <dt>{labels.fallback}</dt>
                          <dd>{token.fallback ?? '-'}</dd>
                        </div>
                        <div>
                          <dt>{labels.resolvedValue}</dt>
                          <dd>{resolvedValues[token.cssVar] || '-'}</dd>
                        </div>
                        <div>
                          <dt>{labels.source}</dt>
                          <dd>{token.source}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>

        <aside className="token-explorer__aside">
          <Card className="token-explorer__preview-shell">
            <Card.Content>
              <div className="token-explorer__preview-header">
                <h2 className="token-explorer__preview-title">{labels.preview}</h2>
                <p className="token-explorer__preview-desc">{labels.previewDesc}</p>
              </div>
              {renderPreview()}
            </Card.Content>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default TokenExplorer;
