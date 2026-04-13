import React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@tiny-design/charts';

const chartData = [
  { month: 'January', forecast: 120, actual: 148 },
  { month: 'February', forecast: 140, actual: 132 },
  { month: 'March', forecast: 160, actual: 174 },
  { month: 'April', forecast: 180, actual: 169 },
  { month: 'May', forecast: 210, actual: 224 },
];

const chartConfig: ChartConfig = {
  forecast: {
    label: 'Forecast',
    theme: {
      light: '#334155',
      dark: '#cbd5e1',
    },
  },
  actual: {
    label: 'Actual',
    theme: {
      light: '#0f766e',
      dark: '#5eead4',
    },
  },
};

export default function ThemeColorsDemo() {
  return (
    <ChartContainer config={chartConfig} style={{ height: 300, width: '100%' }}>
      <LineChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Line
          type="monotone"
          dataKey="forecast"
          stroke="var(--color-forecast)"
          strokeWidth={2}
          strokeDasharray="6 4"
          dot={{ fill: 'var(--color-forecast)' }}
        />
        <Line
          type="monotone"
          dataKey="actual"
          stroke="var(--color-actual)"
          strokeWidth={2.5}
          dot={{ fill: 'var(--color-actual)' }}
        />
      </LineChart>
    </ChartContainer>
  );
}
