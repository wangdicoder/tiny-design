import React from 'react';
import { Card } from '@tiny-design/react';

export default function NoBorderDemo() {
  return (
    <div style={{ background: '#eaeaea', padding: '30px' }}>
      <Card bordered={false} title="Basic Card" extra={<a href="#">More</a>}>
        <Card.Content>
          <div>This is a content.</div>
          <div>This is a content.</div>
          <div>This is a content.</div>
        </Card.Content>
      </Card>
    </div>
  );
}