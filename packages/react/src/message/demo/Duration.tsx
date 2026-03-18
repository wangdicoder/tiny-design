import React from 'react';
import { Button, Message } from '@tiny-design/react';

export default function DurationDemo() {
  const onClick = () => {
    Message('This is a prompt message for success, and it will disappear in 10 seconds', 10000);
  };

  return (
    <Button onClick={onClick}>Customized display duration</Button>
  );
}