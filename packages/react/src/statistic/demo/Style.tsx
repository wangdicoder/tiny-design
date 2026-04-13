import React from 'react';
import { Statistic, Flex } from '@tiny-design/react';

export default function StyleDemo() {
  return (
    <Flex gap="lg">
      <Statistic
        title="Revenue"
        value={1128930}
        prefix="$"
        valueStyle={{ color: '#52c41a' }}
      />
      <Statistic
        title="EU Revenue"
        value={1128930.5}
        prefix="EUR"
        groupSeparator="."
        decimalSeparator=","
        precision={2}
        valueStyle={{ color: '#f59e0b' }}
      />
      <Statistic
        title="Data Pending"
        empty="Pending"
        valueClassName="statistic-demo__pending"
      />
    </Flex>
  );
}
