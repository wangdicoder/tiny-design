import React from 'react';
import { Slider } from '@tiny-design/react';

export default function CustomisedTooltipDemo() {
  return <Slider defaultValue={50} tipFormatter={(val) => `${val}%`} />;
}