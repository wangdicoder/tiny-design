import React from 'react';
import { Card, Grid, Text } from '@tiny-design/react';

const Item = ({
  title,
  desc,
  minHeight = 88,
}: {
  title: string;
  desc: string;
  minHeight?: number;
}) => (
  <Card
    style={{
      padding: 16,
      minHeight,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
    <Text strong>{title}</Text>
    <Text type="secondary">{desc}</Text>
  </Card>
);

export default function ResponsiveLayoutDemo() {
  return (
    <Grid columns={{ xs: 2, sm: 4, md: 12 }} gap={{ xs: 8, md: 24 }}>
      <Grid.Item size={{ xs: 2, sm: 2, md: 8 }}>
        <Item title="Hero" desc="xs=2 sm=2 md=8" minHeight={112} />
      </Grid.Item>
      <Grid.Item size={{ xs: 2, sm: 2, md: 4 }}>
        <Item title="Sidebar" desc="xs=2 sm=2 md=4" minHeight={112} />
      </Grid.Item>
      <Grid.Item size={{ xs: 1, sm: 2, md: 3 }}>
        <Item title="Card A" desc="xs=1 sm=2 md=3" />
      </Grid.Item>
      <Grid.Item size={{ xs: 1, sm: 2, md: 3 }}>
        <Item title="Card B" desc="xs=1 sm=2 md=3" />
      </Grid.Item>
      <Grid.Item size={{ xs: 2, sm: 4, md: 6 }}>
        <Item title="Content" desc="xs=2 sm=4 md=6" />
      </Grid.Item>
    </Grid>
  );
}
