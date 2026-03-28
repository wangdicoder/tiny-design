import { Card, Flex, Statistic, Tag, Typography } from '@tiny-design/react';
import { IconWallet, IconTeam, IconPieChart, IconBullish } from '@tiny-design/icons';

const { Text } = Typography;

const stats = [
  { title: 'Total Revenue', value: 45231.89, prefix: '$', change: '+20.1%', up: true, icon: IconWallet, color: '#6366f1', bg: '#eef2ff' },
  { title: 'Subscribers', value: 2350, change: '+180', up: true, icon: IconTeam, color: '#0891b2', bg: '#ecfeff' },
  { title: 'Conversion', value: 12.5, suffix: '%', change: '+4.3%', up: true, icon: IconBullish, color: '#059669', bg: '#ecfdf5' },
  { title: 'Bounce Rate', value: 24.5, suffix: '%', change: '-2.1%', up: false, icon: IconPieChart, color: '#e11d48', bg: '#fff1f2' },
];

export default function StatsCard() {
  return (
    <div style={{ padding: 24 }}>
      <Flex gap="md" wrap="wrap">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.title} hoverable style={{ flex: '1 1 220px', minWidth: 200, borderRadius: 12 }}>
              <div style={{ padding: 16 }}>
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon style={{ fontSize: 20, color: s.color }} />
                  </div>
                </Flex>
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--ty-color-border)' }}>
                  <Flex align="center" gap="sm">
                    <Tag
                      color={s.up ? 'green' : 'red'}
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
