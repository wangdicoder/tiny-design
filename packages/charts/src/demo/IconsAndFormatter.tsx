import React from 'react';
import { Pie, PieChart, Cell } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
  type ChartIconProps,
} from '@tiny-design/charts';

function DotIcon({ style, className }: ChartIconProps) {
  return (
    <span
      className={className}
      style={{
        width: 10,
        height: 10,
        borderRadius: 999,
        display: 'inline-block',
        background: 'currentColor',
        ...style,
      }}
    />
  );
}

function SquareIcon({ style, className }: ChartIconProps) {
  return (
    <span
      className={className}
      style={{
        width: 10,
        height: 10,
        borderRadius: 2,
        display: 'inline-block',
        background: 'currentColor',
        ...style,
      }}
    />
  );
}

const chartData = [
  { segment: 'enterprise', value: 420, fill: 'var(--color-enterprise)' },
  { segment: 'startup', value: 260, fill: 'var(--color-startup)' },
];

const chartConfig: ChartConfig = {
  enterprise: {
    label: 'Enterprise',
    color: 'var(--ty-chart-1)',
    icon: DotIcon,
  },
  startup: {
    label: 'Startup',
    color: 'var(--ty-chart-3)',
    icon: SquareIcon,
  },
};

export default function IconsAndFormatterDemo() {
  return (
    <ChartContainer config={chartConfig} style={{ height: 300, width: '100%' }}>
      <PieChart>
        <ChartTooltip
          content={
            <ChartTooltipContent
              nameKey="segment"
              formatter={(value) => `${value} accounts`}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent nameKey="segment" />} />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="segment"
          innerRadius={60}
          outerRadius={100}
          cx="50%"
          cy="50%"
        >
          {chartData.map((entry) => (
            <Cell key={entry.segment} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
