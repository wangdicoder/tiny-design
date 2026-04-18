import React from 'react';
import { Split } from '@tiny-design/react';

export default function MultipleDemo() {
  return (
    <Split
      primary="second"
      defaultSize="28%"
      min="160px"
      max="420px"
      style={{ height: 220, border: '1px solid #dcdee2', background: '#f8fafc' }}>
      <Split.Pane min="120px" style={{ padding: 16 }}>
        Canvas
      </Split.Pane>
      <Split.Pane style={{ padding: 16, background: '#fff' }}>
        Secondary panel
      </Split.Pane>
    </Split>
  );
}
