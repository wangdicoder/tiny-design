import React from 'react';
import { Grid, Slider } from '@tiny-design/react';
import type { SliderValue } from '@tiny-design/react';
import { DemoBlock, DemoControlLabel, DemoControls } from './shared';

export default function ExplicitColumnsDemo() {
  const [sidebarWidth, setSidebarWidth] = React.useState(220);
  const [inspectorWidth, setInspectorWidth] = React.useState(180);

  return (
    <div>
      <DemoControls>
        <div>
          <DemoControlLabel>Sidebar: {sidebarWidth}px</DemoControlLabel>
          <Slider
            min={160}
            max={320}
            step={20}
            value={sidebarWidth}
            onChange={(val: SliderValue) => {
              if (typeof val === 'number') {
                setSidebarWidth(val);
              }
            }}
          />
        </div>
        <div>
          <DemoControlLabel>Inspector: {inspectorWidth}px</DemoControlLabel>
          <Slider
            min={120}
            max={260}
            step={20}
            value={inspectorWidth}
            onChange={(val: SliderValue) => {
              if (typeof val === 'number') {
                setInspectorWidth(val);
              }
            }}
          />
        </div>
      </DemoControls>
      <Grid columns={`${sidebarWidth}px minmax(0, 1fr) ${inspectorWidth}px`} gap="sm">
        <DemoBlock title="Sidebar" detail={`${sidebarWidth}px`} tone="strong" minHeight={104} />
        <DemoBlock title="Main Content" detail="minmax(0, 1fr)" tone="base" minHeight={104} />
        <DemoBlock title="Inspector" detail={`${inspectorWidth}px`} tone="soft" minHeight={104} />
      </Grid>
    </div>
  );
}
