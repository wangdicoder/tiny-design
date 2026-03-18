import React from 'react';
import { List } from '@tiny-design/react';

export default function GridDemo() {
  const data = [
    { emoji: '🚀', title: 'Launch Week', desc: 'Ship new features and gather feedback from early adopters.', tag: 'In Progress', tagColor: '#6e41bf' },
    { emoji: '🎨', title: 'Design System', desc: 'Build a cohesive set of tokens, components, and patterns.', tag: 'Planning', tagColor: '#1890ff' },
    { emoji: '📊', title: 'Analytics', desc: 'Set up dashboards to track key metrics and user behavior.', tag: 'Done', tagColor: '#52c41a' },
    { emoji: '🔐', title: 'Auth v2', desc: 'Migrate to OAuth 2.1 with PKCE and refresh token rotation.', tag: 'In Review', tagColor: '#fa8c16' },
    { emoji: '⚡', title: 'Performance', desc: 'Reduce initial load time to under 1.5 s on 3G connections.', tag: 'In Progress', tagColor: '#6e41bf' },
    { emoji: '🌍', title: 'i18n Support', desc: 'Translate the UI into 8 languages with ICU message format.', tag: 'Planning', tagColor: '#1890ff' },
  ];

  const cardStyle = {
    padding: 20,
    borderRadius: 8,
    border: '1px solid #e9ecef',
    background: '#fff',
    height: '100%',
    boxSizing: 'border-box' as const,
  };

  return (
    <List
      grid={{ column: 3, gutter: 16 }}
      dataSource={data}
      renderItem={(item) => (
        <div style={cardStyle}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{item.emoji}</div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
          <div style={{ color: '#525f7f', fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>{item.desc}</div>
          <span style={{
            display: 'inline-block', padding: '2px 8px', borderRadius: 4,
            fontSize: 12, fontWeight: 500, color: item.tagColor,
            background: item.tagColor + '14',
          }}>
            {item.tag}
          </span>
        </div>
      )}
    />
  );
}