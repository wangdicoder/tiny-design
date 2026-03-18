import React from 'react';
import { Badge } from '@tiny-design/react';

export default function OverflowDemo() {
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
      <Badge count={99} style={badgeStyle}>
        <span style={spanStyle} />
      </Badge>
      <Badge count={100} style={badgeStyle}>
        <span style={spanStyle} />
      </Badge>
      <Badge count={99} max={10} style={badgeStyle}>
        <span style={spanStyle} />
      </Badge>
      <Badge count={1000} max={999}>
        <span style={spanStyle} />
      </Badge>
    </>
  );
}