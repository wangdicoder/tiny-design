import React from 'react';
import { Split } from '@tiny-design/react';

export default function NestDemo() {
  return (
    <Split defaultSize={220} min="120px" style={{ height: 320, border: '1px solid #dcdee2', background: '#f8fafc' }}>
      <Split.Pane style={{ padding: 16, background: '#fff' }}>
        Sidebar
      </Split.Pane>
      <Split.Pane min="180px">
        <Split orientation="vertical" defaultSize="38%" min="72px" style={{ height: '100%' }}>
          <Split.Pane style={{ padding: 16, background: '#fff7ed' }}>
            Summary
          </Split.Pane>
          <Split.Pane min="96px" style={{ padding: 16, background: '#ffffff' }}>
            Detail
          </Split.Pane>
        </Split>
      </Split.Pane>
    </Split>
  );
}
