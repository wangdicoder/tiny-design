import React from 'react';
import { List } from '@tiny-design/react';
import { IconStarFill } from '@tiny-design/icons';

export default function ActionsDemo() {
  const colors = ['#6e41bf', '#1890ff', '#52c41a', '#fa8c16'];
  const data = [
    { name: 'Sophie Chen', role: 'Lead Designer', msg: 'Updated the dashboard wireframes and shared with the team for review.', time: '2 min ago' },
    { name: 'Marcus Rivera', role: 'Backend Engineer', msg: 'Deployed API v2.3 to staging — all health checks passing.', time: '15 min ago' },
    { name: 'Ava Johansson', role: 'Product Manager', msg: 'Sprint retrospective notes are up. Please add your feedback by Friday.', time: '1 hr ago' },
    { name: 'Liam Patel', role: 'Frontend Engineer', msg: 'Refactored the auth module — reduced bundle size by 12%.', time: '3 hrs ago' },
  ];

  return (
    <List
      bordered
      dataSource={data}
      renderItem={(item, i) => (
        <List.Item
          actions={[
            <a key="reply" style={{ color: '#6e41bf', fontSize: 13 }}>Reply</a>,
            <a key="star" style={{ fontSize: 13, color: '#8898aa' }}><IconStarFill /> Star</a>,
          ]}
          extra={<span style={{ color: '#adb5bd', fontSize: 12, whiteSpace: 'nowrap' }}>{item.time}</span>}
        >
          <List.ItemMeta
            avatar={
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: colors[i % colors.length], color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 600, fontSize: 15, flexShrink: 0,
              }}>
                {item.name.split(' ').map(n => n[0]).join('')}
              </div>
            }
            title={<span>{item.name} <span style={{ fontWeight: 400, color: '#8898aa', fontSize: 13 }}>· {item.role}</span></span>}
            description={item.msg}
          />
        </List.Item>
      )}
    />
  );
}