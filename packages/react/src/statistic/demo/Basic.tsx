import React from 'react';
import { Card, Flex, Statistic } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <Flex gap="md" wrap="wrap">
      <Card style={{ minWidth: 260, flex: '1 1 260px' }}>
        <Card.Content>
          <Statistic
            title="Monthly Revenue"
            description="Booked revenue across all active subscriptions."
            value={128430.5}
            format={{ type: 'currency', currency: 'USD', maximumFractionDigits: 2 }}
            trend={{ direction: 'up', value: '+12.4%', label: 'vs last month', sentiment: 'positive' }}
            status={{ type: 'success', text: 'Healthy growth' }}
          />
        </Card.Content>
      </Card>
      <Card style={{ minWidth: 260, flex: '1 1 260px' }}>
        <Card.Content>
          <Statistic
            title="Conversion Rate"
            description="Signup to paid conversion in the last 7 days."
            value={0.2386}
            format={{ type: 'percent', maximumFractionDigits: 2 }}
            trend={{ direction: 'flat', value: 'Stable', label: 'within target band', sentiment: 'neutral' }}
            status={{ type: 'info', text: 'Watching experiment B' }}
          />
        </Card.Content>
      </Card>
      <Card style={{ minWidth: 260, flex: '1 1 260px' }}>
        <Card.Content>
          <Statistic
            title="Daily Active Users"
            description="Unique users active in the last 24 hours."
            value={112893}
            format={{ type: 'compact', maximumFractionDigits: 1 }}
            trend={{ direction: 'down', value: '-2.1%', label: 'after campaign cooldown', sentiment: 'negative' }}
            extra="Last updated 2 minutes ago"
          />
        </Card.Content>
      </Card>
    </Flex>
  );
}
