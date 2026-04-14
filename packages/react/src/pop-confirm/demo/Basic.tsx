import React from 'react';
import { PopConfirm, Message, Button } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <PopConfirm
      title="Are you sure to delete this?"
      onConfirm={() => Message.info('You clicked Yes')}>
      <Button variant="link" color="primary">
        Delete
      </Button>
    </PopConfirm>
  );
}
