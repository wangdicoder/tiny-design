import React from 'react';
import { PopConfirm, Message } from '@tiny-design/react';
import { IconQuestionFill } from '@tiny-design/icons';

export default function IconDemo() {
  return (
    <PopConfirm
      title="Are you sure to delete this?"
      icon={<IconQuestionFill color="#f00" />}
      onConfirm={() => Message.info('You clicked Yes')}
    >
      <a href="#" style={{ color: '#6E41BF' }}>
        Delete
      </a>
    </PopConfirm>
  );
}