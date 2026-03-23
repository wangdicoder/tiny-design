import React from 'react';
import { TextLoop } from '@tiny-design/react';

export default function IntervalDemo() {
  return (
    <TextLoop interval={1500}>
      <span>Fast rotation — 1.5s interval</span>
      <span>Useful for short, glanceable messages</span>
      <span>Keeps the user's attention</span>
    </TextLoop>
  );
}
