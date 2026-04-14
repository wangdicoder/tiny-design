import React from 'react';
import { Grid, Radio, Slider } from '@tiny-design/react';
import type { SliderValue } from '@tiny-design/react';
import { DemoBlock, DemoControlLabel, DemoControls } from './shared';

export default function ResponsiveLayoutDemo() {
  const [preset, setPreset] = React.useState<'balanced' | 'hero' | 'sidebar'>('hero');
  const [desktopGap, setDesktopGap] = React.useState(24);

  const presets = {
    balanced: {
      hero: 6,
      sidebar: 6,
      cardA: 3,
      cardB: 3,
      content: 6,
    },
    hero: {
      hero: 8,
      sidebar: 4,
      cardA: 3,
      cardB: 3,
      content: 6,
    },
    sidebar: {
      hero: 7,
      sidebar: 5,
      cardA: 4,
      cardB: 4,
      content: 4,
    },
  } as const;

  const current = presets[preset];

  return (
    <div>
      <DemoControls>
        <div>
          <DemoControlLabel>Desktop layout</DemoControlLabel>
          <Radio.Group value={preset} onChange={(val) => setPreset(val as 'balanced' | 'hero' | 'sidebar')}>
            <Radio value="hero">hero-first</Radio>
            <Radio value="balanced">balanced</Radio>
            <Radio value="sidebar">sidebar-heavy</Radio>
          </Radio.Group>
        </div>
        <div>
          <DemoControlLabel>Desktop gap: {desktopGap}px</DemoControlLabel>
          <Slider
            min={8}
            max={32}
            step={4}
            value={desktopGap}
            onChange={(val: SliderValue) => {
              if (typeof val === 'number') {
                setDesktopGap(val);
              }
            }}
          />
        </div>
      </DemoControls>
      <Grid columns={{ xs: 2, sm: 4, md: 12 }} gap={{ xs: 8, md: desktopGap }}>
        <Grid.Item size={{ xs: 2, sm: 2, md: current.hero }}>
          <DemoBlock title="Hero" detail={`xs=2 sm=2 md=${current.hero}`} tone="strong" minHeight={112} />
        </Grid.Item>
        <Grid.Item size={{ xs: 2, sm: 2, md: current.sidebar }}>
          <DemoBlock title="Sidebar" detail={`xs=2 sm=2 md=${current.sidebar}`} tone="soft" minHeight={112} />
        </Grid.Item>
        <Grid.Item size={{ xs: 1, sm: 2, md: current.cardA }}>
          <DemoBlock title="Card A" detail={`xs=1 sm=2 md=${current.cardA}`} tone="base" />
        </Grid.Item>
        <Grid.Item size={{ xs: 1, sm: 2, md: current.cardB }}>
          <DemoBlock title="Card B" detail={`xs=1 sm=2 md=${current.cardB}`} tone="subtle" />
        </Grid.Item>
        <Grid.Item size={{ xs: 2, sm: 4, md: current.content }}>
          <DemoBlock title="Content" detail={`xs=2 sm=4 md=${current.content}`} tone="base" />
        </Grid.Item>
      </Grid>
    </div>
  );
}
