import { Card, Flex, Progress, Statistic, Tag, Typography } from '@tiny-design/react';
import { IconWallet, IconTeam, IconStarFill, IconBullish } from '@tiny-design/icons';

const { Text } = Typography;

const metrics = [
  { title: 'Total Sales', value: 89420, prefix: '$', progress: 72, trend: '+12.5%', icon: IconWallet, color: '#6366f1', bg: '#eef2ff' },
  { title: 'New Customers', value: 1423, progress: 58, trend: '+8.2%', icon: IconTeam, color: '#0891b2', bg: '#ecfeff' },
  { title: 'Satisfaction', value: 94.2, suffix: '%', progress: 94, trend: '+2.1%', icon: IconStarFill, color: '#f59e0b', bg: '#fffbeb' },
  { title: 'Growth Rate', value: 23.5, suffix: '%', progress: 85, trend: '+4.3%', icon: IconBullish, color: '#059669', bg: '#ecfdf5' },
];

export default function StatWithIcon() {
  return (
    <div style={{ padding: 24 }}>
      <Flex gap="md" wrap="wrap">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.title} hoverable style={{ flex: '1 1 220px', minWidth: 200, borderRadius: 12 }}>
              <div style={{ padding: 16 }}>
                <Flex align="center" gap="md" style={{ marginBottom: 16 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: m.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon style={{ fontSize: 20, color: m.color }} />
                  </div>
                  <div>
                    <Text style={{ fontSize: 12, color: 'var(--ty-color-text-secondary)', fontWeight: 500, display: 'block' }}>
                      {m.title}
                    </Text>
                    <Statistic value={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </div>
                </Flex>

                <div style={{ marginBottom: 8 }}>
                  <Flex justify="space-between" align="center" style={{ marginBottom: 6 }}>
                    <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>Target progress</Text>
                    <Text style={{ fontSize: 12, fontWeight: 600, color: m.color }}>{m.progress}%</Text>
                  </Flex>
                  <Progress.Bar percent={m.progress} showInfo={false} style={{ height: 6 }} />
                </div>

                <Flex align="center" gap="sm" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--ty-color-border)' }}>
                  <Tag color="green" variant="soft" style={{ fontSize: 11, fontWeight: 600 }}>{m.trend}</Tag>
                  <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>vs last period</Text>
                </Flex>
              </div>
            </Card>
          );
        })}
      </Flex>
    </div>
  );
}
