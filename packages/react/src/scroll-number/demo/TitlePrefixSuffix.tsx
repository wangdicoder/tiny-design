import React, { useState } from 'react';
import { ScrollNumber, Button, Flex } from '@tiny-design/react';

export default function TitlePrefixSuffixDemo() {
  const [users, setUsers] = useState(2846);
  const [rate, setRate] = useState(93.12);

  return (
    <Flex gap="lg" align="start">
      <ScrollNumber title="Active Users" value={users} />
      <ScrollNumber title="Revenue" value={128930} prefix="$" precision={2} />
      <ScrollNumber
        title="Growth Rate"
        value={rate}
        suffix="%"
        precision={2}
        valueStyle={{ color: '#52c41a' }}
      />
    </Flex>
  );
}
