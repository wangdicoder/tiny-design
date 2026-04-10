import React from 'react';
import { PopConfirm, Message, Button } from '@tiny-design/react';

export default function LocaleDemo() {
  return (
    <PopConfirm
      title="Are you sure to delete this?"
      confirmText="OK"
      cancelText="Cancel"
      onConfirm={() => Message.info('You clicked Yes')}
    >
      <Button btnType="link">
        Delete
      </Button>
    </PopConfirm>
  );
}