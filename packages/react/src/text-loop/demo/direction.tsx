import React from 'react';
import { TextLoop, Space } from '@tiny-design/react';

const items = ['Spring', 'Summer', 'Autumn', 'Winter'];

export default function DirectionDemo() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      {(['up', 'down'] as const).map((dir) => (
        <div key={dir} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <code style={{ width: 48 }}>{dir}</code>
          <TextLoop direction={dir}>
            {items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </TextLoop>
        </div>
      ))}
    </Space>
  );
}
