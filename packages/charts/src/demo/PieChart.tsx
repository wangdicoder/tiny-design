import React from 'react';
import { Pie, PieChart, Cell } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@tiny-design/charts';

const chartData = [
  { browser: 'Chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'Safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'Firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'Edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'Other', visitors: 90, fill: 'var(--color-other)' },
];

const chartConfig: ChartConfig = {
  chrome: {
    label: 'Chrome',
    color: 'var(--ty-chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--ty-chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--ty-chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--ty-chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--ty-chart-5)',
  },
};

export default function PieChartDemo() {
  return (
    <ChartContainer config={chartConfig} style={{ height: 300, width: '100%' }}>
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="browser" />} />
        <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="browser"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
        >
          {chartData.map((entry) => (
            <Cell key={entry.browser} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
