import React from 'react';
import { Split } from '@tiny-design/react';

const paneStyle: React.CSSProperties = {
  padding: 16,
  background: 'var(--ty-color-bg-container)',
};

export default function HorizontalDemo() {
  return (
    <Split
      defaultSize="32%"
      min="120px"
      style={{
        height: 220,
        border: '1px solid var(--ty-color-border-secondary)',
        background: 'var(--ty-color-fill)',
      }}>
      <Split.Pane style={paneStyle}>
        Navigation
      </Split.Pane>
      <Split.Pane min="160px" style={{ ...paneStyle, background: 'var(--ty-color-fill)' }}>
        Workspace
      </Split.Pane>
    </Split>
  );
}
