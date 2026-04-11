import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@tiny-design/charts';

const chartData: Array<{ month: string; revenue: number }> = [];

const chartConfig: ChartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--ty-chart-1)',
  },
};

export default function EmptyStateDemo() {
  if (!chartData.length) {
    return (
      <div
        style={{
          minHeight: 280,
          border: '1px dashed var(--ty-color-border)',
          borderRadius: 12,
          display: 'grid',
          placeItems: 'center',
          background:
            'linear-gradient(180deg, var(--ty-color-bg-container) 0%, var(--ty-color-bg-layout) 100%)',
          padding: 24,
          textAlign: 'center',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 'var(--ty-font-size-lg)',
              fontWeight: 600,
              color: 'var(--ty-color-text)',
              marginBottom: 8,
            }}
          >
            No chart data yet
          </div>
          <div
            style={{
              fontSize: 'var(--ty-font-size-sm)',
              color: 'var(--ty-color-text-secondary)',
              maxWidth: 320,
            }}
          >
            Keep empty and loading states outside `ChartContainer`. Render the chart only when
            your data is ready.
          </div>
        </div>
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} style={{ height: 280, width: '100%' }}>
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
