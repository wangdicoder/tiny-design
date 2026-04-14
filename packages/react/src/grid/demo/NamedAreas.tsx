import React from 'react';
import { Grid, Radio } from '@tiny-design/react';
import { DemoBlock, DemoControlLabel, DemoControls } from './shared';

export default function NamedAreasDemo() {
  const [layout, setLayout] = React.useState<'right-rail' | 'header-band' | 'stacked'>('right-rail');

  const templates = {
    'right-rail': {
      columns: { xs: 1, md: 3 },
      areas: {
        xs: ['hero', 'side', 'content'],
        md: ['hero hero side', 'content content side'],
      },
    },
    'header-band': {
      columns: { xs: 1, md: 3 },
      areas: {
        xs: ['hero', 'content', 'side'],
        md: ['hero hero hero', 'content content side'],
      },
    },
    stacked: {
      columns: { xs: 1, md: 2 },
      areas: {
        xs: ['hero', 'content', 'side'],
        md: ['hero hero', 'content content', 'side side'],
      },
    },
  } as const;

  const current = templates[layout];

  return (
    <div>
      <DemoControls>
        <div>
          <DemoControlLabel>Area template</DemoControlLabel>
          <Radio.Group value={layout} onChange={(val) => setLayout(val as 'right-rail' | 'header-band' | 'stacked')}>
            <Radio value="right-rail">right-rail</Radio>
            <Radio value="header-band">header-band</Radio>
            <Radio value="stacked">stacked</Radio>
          </Radio.Group>
        </div>
      </DemoControls>
      <Grid areas={current.areas} columns={current.columns} gap="md">
        <Grid.Item area="hero">
          <DemoBlock title="Hero" detail="grid-area: hero" tone="strong" minHeight={96} />
        </Grid.Item>
        <Grid.Item area="side">
          <DemoBlock title="Sidebar" detail="grid-area: side" tone="soft" minHeight={96} />
        </Grid.Item>
        <Grid.Item area="content">
          <DemoBlock title="Content" detail="grid-area: content" tone="base" minHeight={96} />
        </Grid.Item>
      </Grid>
    </div>
  );
}
