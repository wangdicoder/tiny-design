import React from 'react';
import {
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@tiny-design/charts';

const chartData = [
  { subject: 'Math', a: 120, b: 110 },
  { subject: 'Chinese', a: 98, b: 130 },
  { subject: 'English', a: 86, b: 130 },
  { subject: 'Geography', a: 99, b: 100 },
  { subject: 'Physics', a: 85, b: 90 },
  { subject: 'History', a: 65, b: 85 },
];

const chartConfig: ChartConfig = {
  a: {
    label: 'Student A',
    color: 'var(--ty-chart-1)',
  },
  b: {
    label: 'Student B',
    color: 'var(--ty-chart-4)',
  },
};

export default function RadarChartDemo() {
  return (
    <ChartContainer config={chartConfig} style={{ height: 300, width: '100%' }}>
      <RadarChart data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Radar
          name="a"
          dataKey="a"
          stroke="var(--color-a)"
          fill="var(--color-a)"
          fillOpacity={0.25}
        />
        <Radar
          name="b"
          dataKey="b"
          stroke="var(--color-b)"
          fill="var(--color-b)"
          fillOpacity={0.25}
        />
      </RadarChart>
    </ChartContainer>
  );
}
