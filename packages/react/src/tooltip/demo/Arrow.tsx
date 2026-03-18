import React from 'react';
import { Tooltip } from '@tiny-design/react';

export default function ArrowDemo() {
  return (
    <Tooltip title="I'm a tooltip" arrow={false}>
      <span>This tooltip doesn't have arrow.</span>
    </Tooltip>
  );
}