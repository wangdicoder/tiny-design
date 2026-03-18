import React from 'react';
import { Statistic, Flex } from '@tiny-design/react';

export default function FormatterDemo() {
  return (
    <Flex gap="lg">
      <Statistic
        title="Countdown"
        value={Date.now() + 86400000}
        formatter={(val) => {
          const diff = Math.max(0, Math.floor((Number(val) - Date.now()) / 3600000));
          return `${diff}h remaining`;
        }}
      />
      <Statistic
        title="Score"
        value={9.8}
        formatter={(val) => <span style={{ color: '#52c41a' }}>{val} / 10</span>}
      />
    </Flex>
  );
}