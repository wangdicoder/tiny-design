import React from 'react';
import { Popover, Button } from '@tiny-design/react';

export default function BasicDemo() {
  const content = (
    <div>
      <div>This is the content</div>
      <div>This is the content</div>
    </div>
  );

  return (
    <Popover trigger="hover" title="Title" content={content}>
      <Button variant="solid" color="primary">
        Hover me
      </Button>
    </Popover>
  );
}
