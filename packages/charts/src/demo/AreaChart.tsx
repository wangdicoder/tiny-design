import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@tiny-design/charts';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig: ChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--ty-chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--ty-chart-2)',
  },
};

export default function AreaChartDemo() {
  return (
    <ChartContainer config={chartConfig} style={{ height: 300, width: '100%' }}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="desktopGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="mobileGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="desktop"
          stroke="var(--color-desktop)"
          fill="url(#desktopGrad)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="mobile"
          stroke="var(--color-mobile)"
          fill="url(#mobileGrad)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
