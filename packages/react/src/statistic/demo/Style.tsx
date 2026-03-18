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
        title="Loss"
        value={93120}
        prefix="$"
        valueStyle={{ color: '#f5222d' }}
      />
      <Statistic
        title="No Separator"
        value={9999999}
        groupSeparator=""
      />
    </Flex>
  );
}