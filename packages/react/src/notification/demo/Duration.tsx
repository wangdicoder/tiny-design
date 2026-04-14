import React from 'react';
import { Button, Notification } from '@tiny-design/react';

export default function DurationDemo() {
  const btnOnClick = () => {
    Notification.open({
      title: 'Notification Title',
      description: 'This notification only can be closed by clicking the close button',
      duration: 0,
    });
  };

  return (
    <Button variant="solid" color="primary" onClick={btnOnClick}>
      Open the notification box
    </Button>
  );
}
