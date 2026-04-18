import React from 'react';
import { Card, Flex, Statistic } from '@tiny-design/react';

export default function StyleDemo() {
  return (
    <Flex gap="md" wrap="wrap">
      <Card title="North America" style={{ minWidth: 320, flex: '1 1 320px' }}>
        <Card.Content>
          <Statistic
            title="Pipeline Coverage"
            tooltip="Coverage compares weighted pipeline against next quarter target."
            description="Weighted opportunity pipeline for next quarter."
            value={3.4}
            suffix="x"
            trend={{ direction: 'up', value: '+0.6x', label: 'since forecast review', sentiment: 'positive' }}
            footer="Target coverage is 3.0x to 3.5x."
          />
        </Card.Content>
      </Card>
      <Card title="Operations" style={{ minWidth: 320, flex: '1 1 320px' }}>
        <Card.Content>
          <Statistic
            title="Incident Response"
            description="Median time from alert open to first owner action."
            value={8 * 60 + 24}
            format={{ type: 'duration', durationUnit: 's' }}
            status={{ type: 'warning', text: 'Above weekly target' }}
            extra="Target: under 7m"
            footer="Escalation routing is currently being tuned for APAC."
          />
        </Card.Content>
      </Card>
    </Flex>
  );
}
