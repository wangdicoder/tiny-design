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
        title="Conversion"
        value={0.2386}
        precision={2}
        formatter={(_, info) => <span style={{ color: '#1677ff' }}>{info.formattedValue}%</span>}
      />
    </Flex>
  );
}
