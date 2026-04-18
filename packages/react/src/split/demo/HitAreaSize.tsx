import React from 'react';
import { Flex, Slider, Split, Alert } from '@tiny-design/react';
import type { SliderValue } from '@tiny-design/react';

export default function HitAreaSizeDemo() {
  const [hitAreaSize, setHitAreaSize] = React.useState(48);

  return (
    <Flex vertical gap="md">
      <div style={{ fontSize: 12, color: '#6b7280' }}>Hit area: {hitAreaSize}px</div>
      <Slider
        min={16}
        max={96}
        step={4}
        value={hitAreaSize}
        onChange={(value: SliderValue) => {
          if (typeof value === 'number') {
            setHitAreaSize(value);
          }
        }}
      />
      <Split
        defaultSize="36%"
        min="112px"
        separatorHitAreaSize={hitAreaSize}
        separatorStyle={{
          background: 'rgba(59, 130, 246, 0.24)',
          borderLeft: '2px solid rgba(59, 130, 246, 0.7)',
          borderRight: '2px solid rgba(59, 130, 246, 0.7)',
        }}
        style={{ height: 240, border: '1px solid #dcdee2', background: '#f8fafc' }}>
        <Split.Pane style={{ padding: 16, background: '#fff' }}>
          Navigation
        </Split.Pane>
        <Split.Pane min="160px" style={{ padding: 16, paddingLeft: 28 }}>
          Workspace
        </Split.Pane>
      </Split>
      <Alert type="info">
        Blue band = interaction zone. The visual handle stays slim while the drag target grows.
      </Alert>
    </Flex>
  );
}
