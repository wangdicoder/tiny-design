import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@tiny-design/charts';

const chartData = [
  { period: 'jan', label: 'January', revenue: 186, cost: 80 },
  { period: 'feb', label: 'February', revenue: 305, cost: 200 },
  { period: 'mar', label: 'March', revenue: 237, cost: 120 },
  { period: 'apr', label: 'April', revenue: 173, cost: 190 },
];

const chartConfig: ChartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--ty-chart-1)',
  },
  cost: {
    label: 'Cost',
    color: 'var(--ty-chart-5)',
  },
  jan: { label: 'January 2026' },
  feb: { label: 'February 2026' },
  mar: { label: 'March 2026' },
  apr: { label: 'April 2026' },
};

export default function MappedTooltipLegendDemo() {
  return (
    <ChartContainer config={chartConfig} style={{ height: 320, width: '100%' }}>
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent labelKey="period" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        <Bar dataKey="cost" fill="var(--color-cost)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
