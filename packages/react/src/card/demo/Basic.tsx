import React from 'react';
import { Card } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <Card title="Basic Card" extra={<a href="#">More</a>}>
      <Card.Content>
        <div>This is a content.</div>
        <div>This is a content.</div>
        <div>This is a content.</div>
      </Card.Content>
    </Card>
  );
}