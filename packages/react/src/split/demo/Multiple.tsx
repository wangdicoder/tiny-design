import React from 'react';
import { Split } from '@tiny-design/react';

export default function MultipleDemo() {
  return (
    <Split
      primary="second"
      defaultSize="28%"
      min="160px"
      max="420px"
      style={{
        height: 220,
        border: '1px solid var(--ty-color-border-secondary)',
        background: 'var(--ty-color-fill)',
      }}>
      <Split.Pane min="120px" style={{ padding: 16 }}>
        Canvas
      </Split.Pane>
      <Split.Pane style={{ padding: 16, background: 'var(--ty-color-bg-container)' }}>
        Secondary panel
      </Split.Pane>
    </Split>
  );
}
