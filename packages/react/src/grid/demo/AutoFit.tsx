import React from 'react';
import { Checkbox, Grid, Slider } from '@tiny-design/react';
import type { SliderValue } from '@tiny-design/react';
import { DemoBlock, DemoControlLabel, DemoControls } from './shared';

export default function AutoFitDemo() {
  const [minColumnWidth, setMinColumnWidth] = React.useState(180);
  const [autoFit, setAutoFit] = React.useState(true);
  const [count, setCount] = React.useState(5);

  return (
    <div>
      <DemoControls>
        <div>
          <DemoControlLabel>Min column width: {minColumnWidth}px</DemoControlLabel>
          <Slider
            min={140}
            max={260}
            step={20}
            value={minColumnWidth}
            onChange={(val: SliderValue) => {
              if (typeof val === 'number') {
                setMinColumnWidth(val);
              }
            }}
          />
        </div>
        <div>
          <DemoControlLabel>Item count: {count}</DemoControlLabel>
          <Slider
            min={4}
            max={8}
            step={1}
            value={count}
            onChange={(val: SliderValue) => {
              if (typeof val === 'number') {
                setCount(val);
              }
            }}
          />
        </div>
        <div>
          <Checkbox
            checked={autoFit}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAutoFit(e.currentTarget.checked)}>
            Use auto-fit
          </Checkbox>
        </div>
      </DemoControls>
      <Grid minColumnWidth={minColumnWidth} autoFit={autoFit} gap="sm">
        {[
          ['Analytics', `${autoFit ? 'auto-fit' : 'auto-fill'} / ${minColumnWidth}px`],
          ['Revenue', 'responsive tracks'],
          ['Orders', 'reflow'],
          ['Retention', 'no breakpoints'],
          ['Conversion', 'fluid blocks'],
          ['Traffic', 'auto placement'],
          ['Pipeline', 'repeat tracks'],
          ['Forecast', 'adaptive cells'],
        ].slice(0, count).map(([title, detail], index) => (
          <DemoBlock
            key={title}
            title={title}
            detail={detail}
            tone={index % 2 === 0 ? 'strong' : 'soft'}
            minHeight={96}
          />
        ))}
      </Grid>
    </div>
  );
}
