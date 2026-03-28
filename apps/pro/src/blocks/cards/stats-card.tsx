import { Card, Flex, Statistic, Tag, Typography } from '@tiny-design/react';

const { Text } = Typography;

const stats = [
  { title: 'Total Revenue', value: 45231.89, prefix: '$', change: '+20.1%', up: true },
  { title: 'Subscriptions', value: 2350, change: '+180.1%', up: true },
  { title: 'Active Users', value: 12234, change: '+19%', up: true },
  { title: 'Bounce Rate', value: 24.5, suffix: '%', change: '-4.3%', up: false },
];

export default function StatsCard() {
  return (
    <div style={{ padding: 24 }}>
      <Flex gap="md" wrap="wrap">
        {stats.map((s) => (
          <Card key={s.title} style={{ flex: '1 1 220px', minWidth: 200 }}>
            <Text style={{ fontSize: 13, color: 'var(--ty-color-text-secondary)' }}>
              {s.title}
            </Text>
            <Flex align="baseline" gap="sm" style={{ marginTop: 4 }}>
              <Statistic value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </Flex>
            <Tag
              color={s.up ? 'green' : 'red'}
              variant="soft"
              style={{ marginTop: 8 }}
            >
              {s.change} from last month
            </Tag>
          </Card>
        ))}
      </Flex>
    </div>
  );
}
