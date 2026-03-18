import React from 'react';
import { Card } from '@tiny-design/react';

export default function InnerCardDemo() {
  return (
    <Card title="Parent Card">
      <Card.Content>
        <h5 style={{ marginTop: 0 }}>Group title</h5>
        <Card title="Child Card" extra={<a href="#">More</a>}>
          <Card.Content>
            <div>Inner Card content</div>
          </Card.Content>
        </Card>

        <Card title="Child Card" extra={<a href="#">More</a>}>
          <Card.Content>
            <div>Inner Card content</div>
          </Card.Content>
        </Card>
      </Card.Content>
    </Card>
  );
}