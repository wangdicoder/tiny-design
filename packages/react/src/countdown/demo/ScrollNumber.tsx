import React, { useState } from 'react';
import { Countdown, ScrollNumber, Button, Flex } from '@tiny-design/react';

const createDeadline = () => new Date(Date.now() + 1000 * (60 * 60 * 12 + 34 * 60 + 56));

const formatUnit = (value: number) => String(value).padStart(2, '0');

function TimeBlock({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <Flex vertical gap="xs" align="center">
      <ScrollNumber
        value={formatUnit(value)}
        duration={500}
        valueStyle={{
          minWidth: 64,
          padding: '10px 12px',
          fontSize: 32,
          fontWeight: 600,
          lineHeight: 1.2,
          textAlign: 'center',
          color: '#111827',
          background: 'linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%)',
          border: '1px solid #d1d5db',
          borderRadius: 12,
          boxShadow: '0 12px 30px rgba(17, 24, 39, 0.08)',
        }}
      />
      <span style={{ fontSize: 12, letterSpacing: '0.08em', color: '#6b7280' }}>{label}</span>
    </Flex>
  );
}

export default function ScrollNumberDemo() {
  const [deadline, setDeadline] = useState(createDeadline);

  return (
    <Flex vertical gap="md" align="start">
      <Countdown value={deadline} onFinish={() => console.log('done')}>
        {({ hour, min, sec }) => (
          <Flex gap="sm" align="center">
            <TimeBlock label="HOURS" value={hour} />
            <span style={{ fontSize: 28, fontWeight: 600, color: '#9ca3af', marginBottom: 20 }}>:</span>
            <TimeBlock label="MINUTES" value={min} />
            <span style={{ fontSize: 28, fontWeight: 600, color: '#9ca3af', marginBottom: 20 }}>:</span>
            <TimeBlock label="SECONDS" value={sec} />
          </Flex>
        )}
      </Countdown>
      <Button onClick={() => setDeadline(createDeadline())}>Restart</Button>
    </Flex>
  );
}
