import React from 'react';
import { PopConfirm, Message } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <PopConfirm
      title="Are you sure to delete this?"
      onConfirm={() => Message.info('You clicked Yes')}
    >
      <a href="#" style={{ color: '#6E41BF' }}>
        Delete
      </a>
    </PopConfirm>
  );
}