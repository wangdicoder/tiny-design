import React from 'react';
import { Split } from '@tiny-design/react';

export default function StepDemo() {
  return (
    <Split dragStep={24} keyboardStep={16} defaultSize={220} min="120px" style={{ height: 220, border: '1px solid #dcdee2' }}>
      <Split.Pane style={{ padding: 16, background: '#fff' }}>
        Step-based pane
      </Split.Pane>
      <Split.Pane min="160px" style={{ padding: 16, background: '#f8fafc' }}>
        Content
      </Split.Pane>
    </Split>
  );
}
