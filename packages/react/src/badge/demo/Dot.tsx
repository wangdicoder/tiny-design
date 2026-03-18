import React from 'react';
import { Badge } from '@tiny-design/react';
import { IconBroadcast } from '@tiny-design/icons';

export default function DotDemo() {
  const badgeStyle = {
    marginRight: '20px'
  };

  return (
    <>
      <Badge dot style={badgeStyle}>
        <IconBroadcast />
      </Badge>
      <Badge dot={false} style={badgeStyle}>
        <IconBroadcast />
      </Badge>
      <Badge dot>
        <span>Something</span>
      </Badge>
    </>
  );
}