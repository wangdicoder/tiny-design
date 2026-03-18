import React from 'react';
import { Statistic, Flex } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <Flex gap="lg">
      <Statistic title="Active Users" value={112893} />
      <Statistic title="Account Balance" value={112893} precision={2} prefix="$" />
      <Statistic title="Growth Rate" value={93.12} suffix="%" precision={2} />
    </Flex>
  );
}