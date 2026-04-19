import React from 'react';
import { Flex, Skeleton, useTheme } from '@tiny-design/react';

export default function ComposedDemo() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const shellStyle: React.CSSProperties = {
    padding: 18,
    border: `1px solid ${isDark ? '#303030' : '#e2e8f0'}`,
    borderRadius: 20,
    background: isDark
      ? 'linear-gradient(180deg, #1f1f1f 0%, #262626 100%)'
      : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    boxShadow: isDark ? 'none' : '0 10px 30px rgba(15, 23, 42, 0.04)',
  };

  const sectionLabelStyle: React.CSSProperties = {
    marginBottom: 14,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: isDark ? '#8f8f8f' : '#64748b',
  };

  const statCardStyle: React.CSSProperties = {
    padding: 12,
    border: `1px solid ${isDark ? '#3a3a3a' : '#e2e8f0'}`,
    borderRadius: 16,
    background: isDark ? '#242424' : 'rgba(255, 255, 255, 0.75)',
  };

  return (
    <div style={shellStyle}>
      <div style={sectionLabelStyle}>Profile Summary</div>
      <Flex align="flex-start" gap={16}>
        <Skeleton.Avatar size={64} animation="shimmer" />
        <Flex vertical gap={14} style={{ flex: 1 }}>
          <Flex justify="space-between" align="center" gap={12}>
            <Skeleton.Text rows={1} width="42%" animation="shimmer" />
            <Skeleton.Block shape="round" width={74} height={24} animation="pulse" />
          </Flex>
          <Skeleton.Text rows={2} widths={['96%', '58%']} animation="shimmer" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 12,
            }}
          >
            <div style={statCardStyle}>
              <Skeleton.Text rows={1} width="52%" animation="pulse" />
              <div style={{ marginTop: 12 }}>
                <Skeleton.Block shape="round" width="72%" height={28} animation="shimmer" />
              </div>
            </div>
            <div style={statCardStyle}>
              <Skeleton.Text rows={1} width="48%" animation="pulse" />
              <div style={{ marginTop: 12 }}>
                <Skeleton.Block shape="round" width="68%" height={28} animation="shimmer" />
              </div>
            </div>
            <div style={statCardStyle}>
              <Skeleton.Text rows={1} width="44%" animation="pulse" />
              <div style={{ marginTop: 12 }}>
                <Skeleton.Block shape="round" width="66%" height={28} animation="shimmer" />
              </div>
            </div>
          </div>

          <Flex justify="space-between" align="center" gap={12}>
            <Skeleton.Text rows={1} width="32%" animation="pulse" />
            <Flex gap={10}>
              <Skeleton.Block shape="round" width={88} height={34} animation="pulse" />
              <Skeleton.Block shape="round" width={112} height={34} animation="shimmer" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
