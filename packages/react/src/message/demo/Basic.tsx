import React from 'react';
import { Button, Message } from '@tiny-design/react';

export default function BasicDemo() {
  const onClick = () => {
    Message('Normal message for information.');
  };

  return (
    <Button btnType="primary" onClick={onClick}>Normal message</Button>
  );
}