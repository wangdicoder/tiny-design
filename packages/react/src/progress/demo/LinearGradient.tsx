import React from 'react';
import { Progress } from '@tiny-design/react';

export default function LinearGradientDemo() {
  const { Bar } = Progress;

  return (
    <div>
      <Bar percent={90} strokeColor={['#108ee9', '#87d068']} backgroundType="impulse" />
      <Bar percent={90} strokeColor={['#FDBE2F', '#E64778', '#8927EA']} />
    </div>
  );
}