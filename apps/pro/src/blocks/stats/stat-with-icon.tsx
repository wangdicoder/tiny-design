import { Card, Flex, Progress, Statistic, Tag, Typography } from '@tiny-design/react';

const { Text } = Typography;

const metrics = [
  { title: 'Total Sales', value: 89420, prefix: '$', progress: 72, trend: '+12.5%' },
  { title: 'New Customers', value: 1423, progress: 58, trend: '+8.2%' },
  { title: 'Satisfaction', value: 94.2, suffix: '%', progress: 94, trend: '+2.1%' },
  { title: 'Response Time', value: 1.2, suffix: 's', progress: 85, trend: '-15.3%' },
];

export default function StatWithIcon() {
  return (
    <div style={{ padding: 24 }}>
      <Flex gap="md" wrap="wrap">
        {metrics.map((m) => (
          <Card key={m.title} style={{ flex: '1 1 220px', minWidth: 200 }}>
            <Text style={{ fontSize: 13, color: 'var(--ty-color-text-secondary)', display: 'block', marginBottom: 8 }}>
              {m.title}
            </Text>
            <Flex justify="space-between" align="baseline">
              <Statistic value={m.value} prefix={m.prefix} suffix={m.suffix} />
              <Tag color="green" variant="soft" style={{ fontSize: 12 }}>{m.trend}</Tag>
            </Flex>
            <Progress.Bar percent={m.progress} showInfo={false} style={{ marginTop: 12 }} />
          </Card>
        ))}
      </Flex>
    </div>
  );
}
