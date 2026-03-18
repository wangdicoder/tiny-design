import React from 'react';
import { List } from '@tiny-design/react';

export default function BasicDemo() {
  const data = [
    { name: 'React', desc: 'A JavaScript library for building user interfaces', url: 'https://react.dev' },
    { name: 'TypeScript', desc: 'Typed superset of JavaScript that compiles to plain JS', url: 'https://typescriptlang.org' },
    { name: 'Vite', desc: 'Next generation frontend tooling for blazing fast development', url: 'https://vitejs.dev' },
    { name: 'Sass', desc: 'The most mature and powerful CSS extension language', url: 'https://sass-lang.com' },
  ];

  return (
    <List
      bordered
      header={<b>Frontend Toolkit</b>}
      footer={<span style={{ color: '#8898aa' }}>{data.length} technologies</span>}
      dataSource={data}
      renderItem={(item) => (
        <List.Item actions={[<a key="link" style={{ color: '#6e41bf' }}>Visit →</a>]}>
          <List.ItemMeta
            title={item.name}
            description={item.desc}
          />
        </List.Item>
      )}
    />
  );
}