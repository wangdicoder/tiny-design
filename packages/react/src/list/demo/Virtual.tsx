import React from 'react';
import { List } from '@tiny-design/react';

export default function VirtualDemo() {
  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    desc: `Description for item ${i + 1}`,
  }));

  return (
    <List
      virtual
      height={400}
      itemHeight={63}
      bordered
      header={<b>10,000 Items</b>}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.ItemMeta
            title={item.title}
            description={item.desc}
          />
        </List.Item>
      )}
    />
  );
}