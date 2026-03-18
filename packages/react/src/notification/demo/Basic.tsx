import React from 'react';
import { Button, Notification } from '@tiny-design/react';

export default function BasicDemo() {
  const btnOnClick = () => {
    Notification.open({
      title: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  return <Button btnType="primary" onClick={btnOnClick}>Open the notification box</Button>;
}