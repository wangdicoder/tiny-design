import React from 'react';
import { Badge } from '@tiny-design/react';
import { IconLock } from '@tiny-design/icons';

export default function BasicDemo() {
  const spanStyle = {
    width: '42px',
    height: '42px',
    borderRadius: '4px',
    background: '#eee',
    display: 'inline-block',
    verticalAlign: 'middle',
  };

  const badgeStyle = {
    marginRight: '20px'
  };

  return (
    <>
      <Badge count={5} style={badgeStyle}>
        <span style={spanStyle} />
      </Badge>
      <Badge count={0} showZero style={badgeStyle}>
        <span style={spanStyle} />
      </Badge>
      <Badge count="hot" style={badgeStyle}>
        <span style={spanStyle} />
      </Badge>
      <Badge count={<IconLock style={{ color: '#f5222d' }} />}>
        <span style={spanStyle} />
      </Badge>
    </>
  );
}