import React from 'react';
import { Card, Waterfall } from '@tiny-design/react';
import { WaterfallItem } from '../types';

const heights = [150, 50, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 60, 50, 80];

const items: WaterfallItem<number>[] = heights.map((height, index) => ({
  key: `item-${index}`,
  data: height,
}));

export default function BasicDemo() {
  return (
    <Waterfall
      columns={4}
      gutter={16}
      items={items}
      itemRender={({ data, index }) => (
        <Card bordered style={{ height: data }}>
          <Card.Content>{index + 1}</Card.Content>
        </Card>
      )}
    />
  );
}
