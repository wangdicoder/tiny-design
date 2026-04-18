import React from 'react';
import { Split } from '@tiny-design/react';

export default function VerticalDemo() {
  return (
    <Split
      orientation="vertical"
      defaultSize="42%"
      min="64px"
      style={{ height: 220, border: '1px solid var(--ty-color-border-secondary)' }}>
      <Split.Pane
        style={{
          padding: 16,
          background: 'color-mix(in srgb, var(--ty-color-warning) 10%, var(--ty-color-bg-container))',
        }}>
        Preview
      </Split.Pane>
      <Split.Pane min="72px" style={{ padding: 16, background: 'var(--ty-color-bg-container)' }}>
        Inspector
      </Split.Pane>
    </Split>
  );
}
