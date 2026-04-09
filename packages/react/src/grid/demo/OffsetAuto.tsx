import React from 'react';
import { Card, Grid, Text } from '@tiny-design/react';

const Item = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => (
  <Card style={{ padding: 16, minHeight: 88 }}>
    <Text strong>{title}</Text>
    <div style={{ marginTop: 8 }}>
      <Text type="secondary">{desc}</Text>
    </div>
  </Card>
);

export default function OffsetAutoDemo() {
  return (
    <Grid columns={12} spacing="md">
      <Grid.Item size={3}>
        <Item title="Left" desc="size=3" />
      </Grid.Item>
      <Grid.Item size={3} offset="auto">
        <Item title="Right" desc="size=3 offset=auto" />
      </Grid.Item>
    </Grid>
  );
}
