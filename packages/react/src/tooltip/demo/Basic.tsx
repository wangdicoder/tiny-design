import React from 'react';
import { Tooltip } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <Tooltip title="I'm a tooltip">
      <span>Tooltip will show on mouse enter.</span>
    </Tooltip>
  );
}