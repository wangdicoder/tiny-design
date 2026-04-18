import React from 'react';
import { Flex, Statistic } from '@tiny-design/react';

export default function FormatterDemo() {
  return (
    <Flex gap="lg" wrap="wrap">
      <Statistic
        title="Compact Number"
        value={3498200}
        format={{ type: 'compact', maximumFractionDigits: 1 }}
        size="sm"
      />
      <Statistic
        title="German Revenue"
        value={1128930.5}
        format={{ type: 'currency', currency: 'EUR', locale: 'de-DE', maximumFractionDigits: 2 }}
      />
      <Statistic
        title="API Latency"
        value={184}
        format={{ type: 'duration', durationUnit: 'ms' }}
      />
      <Statistic
        title="Fulfillment Rate"
        value={0.9962}
        format={{ type: 'percent', signDisplay: 'exceptZero', maximumFractionDigits: 2 }}
        suffix=" SLA"
      />
    </Flex>
  );
}
