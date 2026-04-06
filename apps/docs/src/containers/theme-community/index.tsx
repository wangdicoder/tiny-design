import React, { useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  ConfigProvider,
  Flex,
  Input,
  Table,
  Tag,
  Typography,
} from '@tiny-design/react';
import { COMMUNITY_THEMES, CommunityThemeRecord } from '../../data/community-themes';
import { savePendingThemeDocument } from '../../utils/theme-document';
import './theme-community.scss';

const columns = [
  { title: 'Campaign', dataIndex: 'name', key: 'name' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Conversion', dataIndex: 'conversion', key: 'conversion' },
];

const data = [
  { key: '1', name: 'Spring release', status: 'Live', conversion: '18.2%' },
  { key: '2', name: 'Waitlist', status: 'Draft', conversion: '9.4%' },
];

function ThemeMiniPreview({ theme }: { theme: CommunityThemeRecord }): React.ReactElement {
  return (
    <ConfigProvider theme={theme.themeDocument}>
      <div className="theme-community__mini-preview">
        <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
          <Typography.Text strong>Overview</Typography.Text>
          <Tag color="info">{theme.themeDocument.mode}</Tag>
        </Flex>
        <Flex gap="sm" style={{ marginBottom: 12 }}>
          <Button btnType="primary" size="sm">Primary</Button>
          <Button size="sm">Default</Button>
          <Button btnType="outline" size="sm">Outline</Button>
        </Flex>
        <Flex gap="sm" style={{ marginBottom: 12 }}>
          <Input placeholder="Search themes..." style={{ width: 220 }} />
        </Flex>
        <Table columns={columns} dataSource={data} pagination={false} bordered />
      </div>
    </ConfigProvider>
  );
}

function createForkDocument(theme: CommunityThemeRecord) {
  return {
    ...theme.themeDocument,
    meta: {
      ...theme.themeDocument.meta,
      id: `${theme.id}-fork`,
      name: `${theme.name} Remix`,
    },
  };
}

function ThemeCard({
  theme,
  active,
}: {
  theme: CommunityThemeRecord;
  active?: boolean;
}): React.ReactElement {
  return (
    <Link
      to={`/theme/theme-community/${theme.slug}`}
      className={`theme-community__card${active ? ' theme-community__card_active' : ''}`}
    >
      <div
        className="theme-community__card-preview"
        style={{
          background: `linear-gradient(135deg, ${theme.preview.surface} 0%, ${theme.preview.accent} 130%)`,
          color: theme.preview.text,
        }}
      >
        <div className="theme-community__card-swatches">
          {theme.swatches.map((color) => (
            <span
              key={color}
              className="theme-community__card-swatch"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="theme-community__card-badge">{theme.themeDocument.mode}</span>
      </div>
      <div className="theme-community__card-body">
        <Typography.Text strong>{theme.name}</Typography.Text>
        <Typography.Paragraph>{theme.description}</Typography.Paragraph>
        <div className="theme-community__card-meta">
          <span>by {theme.author}</span>
          <span>{theme.likes} likes</span>
        </div>
        <div className="theme-community__tags">
          {theme.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}

function ThemeGalleryPage(): React.ReactElement {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const filteredThemes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return COMMUNITY_THEMES;
    return COMMUNITY_THEMES.filter((theme) =>
      [theme.name, theme.description, theme.author, ...theme.tags].join(' ').toLowerCase().includes(normalized)
    );
  }, [query]);

  const featured = filteredThemes[0] ?? COMMUNITY_THEMES[0];

  return (
    <div className="theme-community">
      <div className="theme-community__hero">
        <div>
          <Typography.Heading level={2}>Community Theme Hub</Typography.Heading>
          <Typography.Paragraph>
            Explore shareable theme documents, inspect them in a live shell, then remix any theme in Theme Studio.
          </Typography.Paragraph>
        </div>
        <div className="theme-community__hero-actions">
          <Input
            value={query}
            placeholder="Search by name, tag, or author"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="theme-community__featured">
        <div className="theme-community__featured-copy">
          <Typography.Text className="theme-community__eyebrow">Featured Theme</Typography.Text>
          <Typography.Heading level={3}>{featured.name}</Typography.Heading>
          <Typography.Paragraph>{featured.description}</Typography.Paragraph>
          <div className="theme-community__detail-meta">
            {featured.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <div className="theme-community__detail-actions">
            <Button btnType="primary" onClick={() => navigate(`/theme/theme-community/${featured.slug}`)}>
              View Detail
            </Button>
            <Button onClick={() => navigate('/theme/theme-studio')}>
              Open Blank Studio
            </Button>
          </div>
        </div>
        <ThemeMiniPreview theme={featured} />
      </div>

      <div className="theme-community__grid">
        {filteredThemes.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>
    </div>
  );
}

function ThemeDetailPage(): React.ReactElement {
  const navigate = useNavigate();
  const { slug } = useParams();
  const theme = COMMUNITY_THEMES.find((item) => item.slug === slug) ?? COMMUNITY_THEMES[0];
  const relatedThemes = COMMUNITY_THEMES.filter((item) => item.slug !== theme.slug).slice(0, 3);

  const handleOpenInStudio = (record: CommunityThemeRecord) => {
    savePendingThemeDocument(record.themeDocument);
    navigate('/theme/theme-studio');
  };

  const handleForkInStudio = (record: CommunityThemeRecord) => {
    savePendingThemeDocument(createForkDocument(record));
    navigate('/theme/theme-studio');
  };

  return (
    <div className="theme-community">
      <div className="theme-community__hero">
        <div>
          <Typography.Text className="theme-community__eyebrow">Theme Detail</Typography.Text>
          <Typography.Heading level={2}>{theme.name}</Typography.Heading>
          <Typography.Paragraph>{theme.description}</Typography.Paragraph>
          <div className="theme-community__detail-meta">
            <Tag color="info">{theme.themeDocument.extends}</Tag>
            <Tag color="success">schema v{theme.themeDocument.meta?.schemaVersion ?? 1}</Tag>
            <Tag>{theme.likes} likes</Tag>
          </div>
        </div>
        <div className="theme-community__hero-actions theme-community__hero-actions_column">
          <Button btnType="primary" onClick={() => handleOpenInStudio(theme)}>
            Open in Studio
          </Button>
          <Button onClick={() => handleForkInStudio(theme)}>
            Fork Into Studio
          </Button>
          <Button onClick={() => navigator.clipboard.writeText(JSON.stringify(theme.themeDocument, null, 2))}>
            Copy Theme JSON
          </Button>
        </div>
      </div>

      <div className="theme-community__layout">
        <Card className="theme-community__detail" title="Live Preview">
          <Card.Content>
            <ThemeMiniPreview theme={theme} />
          </Card.Content>
        </Card>

        <Card className="theme-community__detail" title="Theme Metadata">
          <Card.Content>
            <div className="theme-community__detail-list">
              <div><span>Author</span><code>{theme.author}</code></div>
              <div><span>Slug</span><code>{theme.slug}</code></div>
              <div><span>Mode</span><code>{theme.themeDocument.mode}</code></div>
              <div><span>Base Theme</span><code>{theme.themeDocument.extends}</code></div>
            </div>
            <div className="theme-community__tags">
              {theme.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>

      <div className="theme-community__subsection">
        <Flex justify="space-between" align="center">
          <Typography.Heading level={4}>Related themes</Typography.Heading>
          <Button btnType="link" onClick={() => navigate('/theme/theme-community')}>Back to gallery</Button>
        </Flex>
        <div className="theme-community__grid">
          {relatedThemes.map((item) => (
            <ThemeCard key={item.id} theme={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

const ThemeCommunityPage = (): React.ReactElement => {
  return (
    <Routes>
      <Route path="" element={<ThemeGalleryPage />} />
      <Route path=":slug" element={<ThemeDetailPage />} />
      <Route path="*" element={<Navigate to="/theme/theme-community" replace />} />
    </Routes>
  );
};

export default ThemeCommunityPage;
