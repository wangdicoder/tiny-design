import React from 'react';
import { Progress } from '@tiny-design/react';

export default function SquareLinecapsDemo() {
  const { Bar, Circle } = Progress;

  return (
    <div>
      <Bar percent={80} strokeLinecap="square" />
      <Circle percent={80} strokeLinecap="square" />
    </div>
  );
}