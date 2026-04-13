import React from 'react';
import { List, Segmented } from '@tiny-design/react';
import type { SegmentedValue } from '@tiny-design/react';

type DemoSize = 'sm' | 'md' | 'lg';

export default function SizesDemo() {
  const [size, setSize] = React.useState<DemoSize>('md');

  const data = [
    { title: 'Build pipeline passed', desc: 'main — commit a3f28e1' },
    { title: 'PR #142 merged', desc: 'feat: add calendar component' },
    { title: 'Deployment complete', desc: 'Production v2.8.0 is live' },
  ];

  return (
    <div>
      <Segmented
        options={[
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ]}
        value={size}
        onChange={(val: SegmentedValue) => setSize(String(val) as DemoSize)}
        style={{ marginBottom: 16 }}
      />
      <List
        size={size}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={[<a key="view" style={{ color: '#6e41bf', fontSize: 13 }}>View</a>]}>
            <List.ItemMeta title={item.title} description={item.desc} />
          </List.Item>
        )}
      />
    </div>
  );
}
