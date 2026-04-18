import React from 'react';
import { Split } from '@tiny-design/react';

export default function VerticalDemo() {
  return (
    <Split orientation="vertical" defaultSize="42%" min="64px" style={{ height: 220, border: '1px solid #dcdee2' }}>
      <Split.Pane style={{ padding: 16, background: '#fff7ed' }}>
        Preview
      </Split.Pane>
      <Split.Pane min="72px" style={{ padding: 16, background: '#fff' }}>
        Inspector
      </Split.Pane>
    </Split>
  );
}
