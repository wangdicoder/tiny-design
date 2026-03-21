import { useState } from 'react';
import { Button, Card, Flex, Waterfall } from '@tiny-design/react';
import { WaterfallItem } from '../types';

const heights = [150, 50, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 70, 50, 80];

type ItemType = WaterfallItem<number> & { key: number };

export default function DynamicDemo() {
  const [items, setItems] = useState<ItemType[]>(() =>
    heights.map((height, index) => ({
      key: index,
      data: height,
    })),
  );

  const removeItem = (removeKey: React.Key) => {
    setItems((prev) => prev.filter(({ key }) => key !== removeKey));
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        key: prev.length ? prev[prev.length - 1].key + 1 : 0,
        data: Math.floor(Math.random() * 100) + 50,
      },
    ]);
  };

  return (
    <Flex vertical gap="md">
      <Waterfall
        columns={4}
        gutter={16}
        items={items}
        itemRender={({ data, key }) => (
          <Card bordered style={{ height: data, position: 'relative' }}>
            <Card.Content>
              {Number(key) + 1}
              <Button
                style={{ position: 'absolute', top: 8, right: 8 }}
                size="sm"
                onClick={() => removeItem(key)}
              >
                x
              </Button>
            </Card.Content>
          </Card>
        )}
        onLayoutChange={(sortedItems) => {
          setItems((prev) =>
            prev.map((item) => {
              const match = sortedItems.find((s) => s.key === item.key);
              return match ? { ...item, column: match.column } : item;
            }),
          );
        }}
      />
      <Button block onClick={addItem}>
        Add Item
      </Button>
    </Flex>
  );
}
