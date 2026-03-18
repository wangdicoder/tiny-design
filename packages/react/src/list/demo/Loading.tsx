import React from 'react';
import { List, Switch } from '@tiny-design/react';

export default function LoadingDemo() {
  const [loading, setLoading] = React.useState(true);

  const data = [
    { name: 'Emma Watson', role: 'Designer', avatar: '🎨' },
    { name: 'James Lee', role: 'Developer', avatar: '💻' },
    { name: 'Mia Torres', role: 'PM', avatar: '📋' },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Switch checked={loading} onChange={(checked) => setLoading(checked)} />
        <span style={{ fontSize: 14, color: '#525f7f' }}>Simulate loading</span>
      </div>
      <List
        bordered
        loading={loading}
        header={<b>Team Members</b>}
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={[<a key="msg" style={{ color: '#6e41bf', fontSize: 13 }}>Message</a>]}>
            <List.ItemMeta
              avatar={<span style={{ fontSize: 24 }}>{item.avatar}</span>}
              title={item.name}
              description={item.role}
            />
          </List.Item>
        )}
      />
    </div>
  );
}