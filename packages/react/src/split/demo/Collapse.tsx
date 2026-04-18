import React from 'react';
import { Split } from '@tiny-design/react';

export default function CollapseDemo() {
  return (
    <Split
      defaultSize={240}
      min="128px"
      collapsible
      collapsedSize={72}
      style={{
        height: 220,
        border: '1px solid var(--ty-color-border-secondary)',
        background: 'var(--ty-color-fill)',
      }}>
      <Split.Pane style={{ padding: 16, background: 'var(--ty-color-bg-container)' }}>
        Collapsible sidebar
      </Split.Pane>
      <Split.Pane min="160px" style={{ padding: 16 }}>
        Press Enter on the separator or double-click it to collapse.
      </Split.Pane>
    </Split>
  );
}
