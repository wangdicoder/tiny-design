import React from 'react';
import { PopConfirm, Message, Button } from '@tiny-design/react';
import { IconQuestionFill } from '@tiny-design/icons';

export default function IconDemo() {
  return (
    <PopConfirm
      title="Are you sure to delete this?"
      icon={<IconQuestionFill color="#f00" />}
      onConfirm={() => Message.info('You clicked Yes')}>
      <Button variant="link" color="primary">
        Delete
      </Button>
    </PopConfirm>
  );
}
