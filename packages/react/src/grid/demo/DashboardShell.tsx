import React from 'react';
import { Checkbox, Grid, Slider } from '@tiny-design/react';
import type { SliderValue } from '@tiny-design/react';
import { DemoBlock, DemoControlLabel, DemoControls, getDemoBlockStyle } from './shared';

export default function DashboardShellDemo() {
  const [gap, setGap] = React.useState(16);
  const [showFilters, setShowFilters] = React.useState(true);

  return (
    <div>
      <DemoControls>
        <div>
          <DemoControlLabel>Desktop gap: {gap}px</DemoControlLabel>
          <Slider
            min={8}
            max={24}
            step={4}
            value={gap}
            onChange={(val: SliderValue) => {
              if (typeof val === 'number') {
                setGap(val);
              }
            }}
          />
        </div>
        <div>
          <Checkbox
            checked={showFilters}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShowFilters(e.currentTarget.checked)}>
            Show filters area
          </Checkbox>
        </div>
      </DemoControls>
      <Grid
        areas={
          showFilters
            ? {
                xs: ['header header', 'metrics filters', 'chart activity'],
                md: ['header header header', 'metrics metrics filters', 'chart chart activity'],
              }
            : {
                xs: ['header header', 'metrics metrics', 'chart activity'],
                md: ['header header header', 'metrics metrics activity', 'chart chart activity'],
              }
        }
        columns={{ xs: 2, md: 3 }}
        gap={{ xs: 8, md: gap }}>
        <Grid.Item area="header">
          <DemoBlock
            title="Header"
            detail="grid-area: header"
            tone="strong"
            minHeight={120}
          />
        </Grid.Item>

        <Grid.Item area="metrics">
          <Grid columns={2} gap="sm">
            <Grid.Item size={1}>
              <DemoBlock title="Metric A" detail="nested grid" tone="base" minHeight={120} />
            </Grid.Item>
            <Grid.Item size={1}>
              <DemoBlock title="Metric B" detail="nested grid" tone="soft" minHeight={120} />
            </Grid.Item>
          </Grid>
        </Grid.Item>

        {showFilters ? (
          <Grid.Item area="filters">
            <DemoBlock title="Filters" detail="grid-area: filters" tone="subtle" minHeight={120} />
          </Grid.Item>
        ) : null}

        <Grid.Item area="chart">
          <div style={getDemoBlockStyle('base', 168)}>
            <strong>Chart</strong>
            <Grid columns={6} gap={8} align="end" style={{ minHeight: 84 }}>
              {[38, 60, 50, 82, 56, 72].map((height, index) => (
                <div
                  key={height}
                  style={{
                    height,
                    borderRadius: 8,
                    background: `color-mix(in srgb, #fff ${index % 2 === 0 ? 16 : 24}%, transparent)`,
                  }}
                />
              ))}
            </Grid>
            <span style={{ opacity: 0.92 }}>wide area spanning two columns</span>
          </div>
        </Grid.Item>

        <Grid.Item area="activity">
          <DemoBlock title="Activity" detail="grid-area: activity" tone="soft" minHeight={showFilters ? 168 : 120} />
        </Grid.Item>
      </Grid>
    </div>
  );
}
