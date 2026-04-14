import React from 'react';
import { Checkbox, Grid, Slider } from '@tiny-design/react';
import type { SliderValue } from '@tiny-design/react';
import { DemoBlock, DemoControlLabel, DemoControls } from './shared';

export default function OffsetAutoDemo() {
  const [leftSize, setLeftSize] = React.useState(3);
  const [rightSize, setRightSize] = React.useState(3);
  const [useAutoOffset, setUseAutoOffset] = React.useState(true);

  return (
    <div>
      <DemoControls>
        <div>
          <DemoControlLabel>Left size: {leftSize}</DemoControlLabel>
          <Slider
            min={2}
            max={5}
            step={1}
            value={leftSize}
            onChange={(val: SliderValue) => {
              if (typeof val === 'number') {
                setLeftSize(val);
              }
            }}
          />
        </div>
        <div>
          <DemoControlLabel>Right size: {rightSize}</DemoControlLabel>
          <Slider
            min={2}
            max={5}
            step={1}
            value={rightSize}
            onChange={(val: SliderValue) => {
              if (typeof val === 'number') {
                setRightSize(val);
              }
            }}
          />
        </div>
        <div>
          <Checkbox
            checked={useAutoOffset}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUseAutoOffset(e.currentTarget.checked)}>
            Use `offset=&quot;auto&quot;`
          </Checkbox>
        </div>
      </DemoControls>
      <Grid columns={12} spacing="md">
        <Grid.Item size={leftSize}>
          <DemoBlock title="Left" detail={`size=${leftSize}`} tone="strong" />
        </Grid.Item>
        <Grid.Item size={rightSize} offset={useAutoOffset ? 'auto' : undefined}>
          <DemoBlock
            title="Right"
            detail={useAutoOffset ? `size=${rightSize} offset=auto` : `size=${rightSize}`}
            tone="soft"
          />
        </Grid.Item>
      </Grid>
    </div>
  );
}
