import { useState } from 'react';
import { Card, Slider, Waterfall } from '@tiny-design/react';
import { WaterfallItem } from '../types';

const heights = [120, 55, 85, 160, 95, 140, 75, 110, 65, 130, 90, 145, 55, 100, 80];

const items: WaterfallItem<number>[] = heights.map((height, index) => ({
  key: `item-${index}`,
  data: height,
}));

export default function ResponsiveDemo() {
  const [columnCount, setColumnCount] = useState(4);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        Columns: <strong>{columnCount}</strong>
        <Slider
          value={columnCount}
          min={1}
          max={6}
          step={1}
          onChange={(val) => setColumnCount(val as number)}
        />
      </div>
      <Waterfall
        columns={columnCount}
        gutter={16}
        items={items}
        itemRender={({ data, index }) => (
          <Card bordered style={{ height: data }}>
            <Card.Content>{index + 1}</Card.Content>
          </Card>
        )}
      />
    </div>
  );
}
