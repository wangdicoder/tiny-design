import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@tiny-design/charts';

const chartData = [
  { week: 'W1', signups: 42 },
  { week: 'W2', signups: 57 },
  { week: 'W3', signups: 61 },
  { week: 'W4', signups: 75 },
];

const chartConfig: ChartConfig = {
  signups: {
    label: 'Signups',
    color: 'var(--ty-chart-2)',
  },
};

export default function FallbackSizeDemo() {
  return (
    <ChartContainer
      config={chartConfig}
      fallbackSize={{ width: 640, height: 280 }}
      style={{ minHeight: 280, width: '100%' }}
    >
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="signupsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-signups)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-signups)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="week" tickLine={false} tickMargin={10} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="signups"
          stroke="var(--color-signups)"
          fill="url(#signupsGrad)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
