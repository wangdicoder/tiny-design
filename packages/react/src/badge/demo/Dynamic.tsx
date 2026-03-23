import { useState } from 'react';
import { Badge, Button, Switch, Flex } from '@tiny-design/react';

export default function DynamicDemo() {
  const [count, setCount] = useState(5);
  const [dot, setDot] = useState(true);

  const spanStyle = {
    width: '42px',
    height: '42px',
    borderRadius: '4px',
    background: '#eee',
    display: 'inline-block',
  };

  return (
    <div>
      <Flex gap="lg" align="center">
        <Badge count={count}>
          <span style={spanStyle} />
        </Badge>
        <Button.Group>
          <Button
            onClick={() => setCount((c) => Math.max(0, c - 1))}
            style={{ display: 'inline-flex', alignItems: 'center' }}>
            -
          </Button>
          <Button
            onClick={() => setCount((c) => c + 1)}
            style={{ display: 'inline-flex', alignItems: 'center' }}>
            +
          </Button>
        </Button.Group>
      </Flex>
      <Flex gap="lg" align="center" style={{ marginTop: 16 }}>
        <Badge dot={dot}>
          <span style={spanStyle} />
        </Badge>
        <Switch checked={dot} onChange={setDot} />
      </Flex>
    </div>
  );
}
