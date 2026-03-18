import React from 'react';
import { Split } from '@tiny-design/react';

export default function StepDemo() {
  return (
    <Split step={30} style={{ height: 200, border: '1px solid #dcdee2' }}>
      <div>
        Left
      </div>
      <div>
        Right
      </div>
    </Split>
  );
}