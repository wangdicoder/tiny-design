import React from 'react';
import { Split } from '@tiny-design/react';

export default function StepDemo() {
  return (
    <Split
      dragStep={24}
      keyboardStep={16}
      defaultSize={220}
      min="120px"
      style={{ height: 220, border: '1px solid var(--ty-color-border-secondary)' }}>
      <Split.Pane style={{ padding: 16, background: 'var(--ty-color-bg-container)' }}>
        Step-based pane
      </Split.Pane>
      <Split.Pane min="160px" style={{ padding: 16, background: 'var(--ty-color-fill)' }}>
        Content
      </Split.Pane>
    </Split>
  );
}
