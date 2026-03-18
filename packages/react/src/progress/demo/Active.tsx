import React from 'react';
import { Progress } from '@tiny-design/react';

export default function ActiveDemo() {
  const { Bar } = Progress;

  return (
    <div>
      <Bar percent={50} backgroundType="impulse" />
      <Bar percent={50} backgroundType="striped" />
    </div>
  );
}