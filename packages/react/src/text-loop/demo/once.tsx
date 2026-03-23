import React from 'react';
import { TextLoop } from '@tiny-design/react';

export default function OnceDemo() {
  return (
    <TextLoop infinite={false}>
      <span>Step 1: Install dependencies</span>
      <span>Step 2: Configure your project</span>
      <span>Step 3: Start building</span>
    </TextLoop>
  );
}
