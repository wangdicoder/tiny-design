import React from 'react';
import { Split } from '@tiny-design/react';

const paneStyle: React.CSSProperties = {
  padding: 16,
  background: '#ffffff',
};

export default function HorizontalDemo() {
  return (
    <Split defaultSize="32%" min="120px" style={{ height: 220, border: '1px solid #dcdee2', background: '#f8fafc' }}>
      <Split.Pane style={paneStyle}>
        Navigation
      </Split.Pane>
      <Split.Pane min="160px" style={{ ...paneStyle, background: '#f8fafc' }}>
        Workspace
      </Split.Pane>
    </Split>
  );
}
