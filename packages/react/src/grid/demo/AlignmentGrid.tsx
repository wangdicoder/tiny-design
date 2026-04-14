import React from 'react';
import { Grid, Radio } from '@tiny-design/react';
import { DemoControlLabel, DemoControls, getDemoBlockStyle } from './shared';

type AlignmentValue = 'start' | 'center' | 'end' | 'stretch';

export default function AlignmentGridDemo() {
  const [justify, setJustify] = React.useState<AlignmentValue>('stretch');
  const [align, setAlign] = React.useState<AlignmentValue>('stretch');

  return (
    <div>
      <DemoControls>
        <div>
          <DemoControlLabel>Justify</DemoControlLabel>
          <Radio.Group value={justify} onChange={(val) => setJustify(val as AlignmentValue)}>
            <Radio value="start">start</Radio>
            <Radio value="center">center</Radio>
            <Radio value="end">end</Radio>
            <Radio value="stretch">stretch</Radio>
          </Radio.Group>
        </div>
        <div>
          <DemoControlLabel>Align</DemoControlLabel>
          <Radio.Group value={align} onChange={(val) => setAlign(val as AlignmentValue)}>
            <Radio value="start">start</Radio>
            <Radio value="center">center</Radio>
            <Radio value="end">end</Radio>
            <Radio value="stretch">stretch</Radio>
          </Radio.Group>
        </div>
      </DemoControls>
      <Grid
        columns={3}
        gap="sm"
        align={align}
        justify={justify}
        style={{
          minHeight: 180,
          padding: 16,
          border: '1px dashed var(--ty-color-border)',
          borderRadius: 12,
          background: 'color-mix(in srgb, var(--ty-color-primary) 4%, transparent)',
        }}>
        <div
          style={getDemoBlockStyle('strong', 64, {
            minHeight: 64,
            width: justify === 'stretch' ? undefined : 92,
            justifyContent: 'center',
          })}>
          {justify}
        </div>
        <div
          style={getDemoBlockStyle('base', 64, {
            minHeight: 64,
            width: justify === 'stretch' ? undefined : 92,
            justifyContent: 'center',
          })}>
          {align}
        </div>
        <div
          style={getDemoBlockStyle('soft', 64, {
            minHeight: 64,
            width: justify === 'stretch' ? undefined : 92,
            justifyContent: 'center',
          })}>
          items
        </div>
      </Grid>
    </div>
  );
}
