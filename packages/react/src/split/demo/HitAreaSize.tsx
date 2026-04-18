import React from 'react';
import { Flex, Slider, Split, Alert } from '@tiny-design/react';
import type { SliderValue } from '@tiny-design/react';

export default function HitAreaSizeDemo() {
  const [hitAreaSize, setHitAreaSize] = React.useState(48);

  return (
    <Flex vertical gap="md">
      <div style={{ fontSize: 12, color: 'var(--ty-color-text-secondary)' }}>Hit area: {hitAreaSize}px</div>
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
          background: 'color-mix(in srgb, var(--ty-color-info) 18%, transparent)',
          borderLeft: '2px solid color-mix(in srgb, var(--ty-color-info) 72%, transparent)',
          borderRight: '2px solid color-mix(in srgb, var(--ty-color-info) 72%, transparent)',
        }}
        style={{
          height: 240,
          border: '1px solid var(--ty-color-border-secondary)',
          background: 'var(--ty-color-fill)',
        }}>
        <Split.Pane style={{ padding: 16, background: 'var(--ty-color-bg-container)' }}>
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
