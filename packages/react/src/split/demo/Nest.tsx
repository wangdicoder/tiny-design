import React from 'react';
import { Split } from '@tiny-design/react';

export default function NestDemo() {
  return (
    <Split
      defaultSize={220}
      min="120px"
      style={{
        height: 320,
        border: '1px solid var(--ty-color-border-secondary)',
        background: 'var(--ty-color-fill)',
      }}>
      <Split.Pane style={{ padding: 16, background: 'var(--ty-color-bg-container)' }}>
        Sidebar
      </Split.Pane>
      <Split.Pane min="180px">
        <Split orientation="vertical" defaultSize="38%" min="72px" style={{ height: '100%' }}>
          <Split.Pane
            style={{
              padding: 16,
              background: 'color-mix(in srgb, var(--ty-color-warning) 10%, var(--ty-color-bg-container))',
            }}>
            Summary
          </Split.Pane>
          <Split.Pane min="96px" style={{ padding: 16, background: 'var(--ty-color-bg-container)' }}>
            Detail
          </Split.Pane>
        </Split>
      </Split.Pane>
    </Split>
  );
}
