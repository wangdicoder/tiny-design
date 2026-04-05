import { Card, Flex, Statistic, Tag, Typography } from '@tiny-design/react';
import { IconWallet, IconTeam, IconPieChart, IconBullish } from '@tiny-design/icons';

const { Text } = Typography;

const stats = [
  { title: 'Total Revenue', value: 45231.89, prefix: '$', change: '+20.1%', up: true, icon: IconWallet, color: '#1d4ed8', bg: '#eff6ff' },
  { title: 'Subscribers', value: 2350, change: '+180', up: true, icon: IconTeam, color: '#0f766e', bg: '#ecfeff' },
  { title: 'Conversion', value: 12.5, suffix: '%', change: '+4.3%', up: true, icon: IconBullish, color: '#15803d', bg: '#f0fdf4' },
  { title: 'Bounce Rate', value: 24.5, suffix: '%', change: '-2.1%', up: false, icon: IconPieChart, color: '#b45309', bg: '#fffbeb' },
];

export default function StatsCard() {
  return (
    <div style={{ padding: 24, background: '#f8fafc' }}>
      <Flex gap="md" wrap="wrap">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.title}
              hoverable
              style={{
                flex: '1 1 220px',
                minWidth: 200,
                borderRadius: 16,
                border: '1px solid #dbe3ef',
                boxShadow: '0 10px 24px rgba(15, 23, 42, 0.05)',
              }}
            >
              <div style={{ padding: 18 }}>
                <Flex justify="space-between" align="start">
                  <div>
                    <Text style={{ fontSize: 13, color: 'var(--ty-color-text-secondary)', fontWeight: 500, display: 'block', marginBottom: 8 }}>
                      {s.title}
                    </Text>
                    <Statistic value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: s.bg,
                    border: '1px solid rgba(148, 163, 184, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon style={{ fontSize: 20, color: s.color }} />
                  </div>
                </Flex>
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #e2e8f0' }}>
                  <Flex align="center" gap="sm">
                    <Tag
                      color={s.up ? 'green' : 'gold'}
                      variant="soft"
                      style={{ fontSize: 12, fontWeight: 600 }}
                    >
                      {s.change}
                    </Tag>
                    <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>vs last month</Text>
                  </Flex>
                </div>
              </div>
            </Card>
          );
        })}
      </Flex>
    </div>
  );
}
