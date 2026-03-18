import React from 'react';
import { Button, Notification, Flex } from '@tiny-design/react';

export default function TypeDemo() {
  const btnOnClick = (type: string) => {
    Notification[type]({
      title: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  return (
    <Flex gap="sm">
      <Button btnType="info" onClick={() => btnOnClick('info')}>Info</Button>
      <Button btnType="success" onClick={() => btnOnClick('success')}>Success</Button>
      <Button btnType="warning" onClick={() => btnOnClick('warning')}>Warning</Button>
      <Button btnType="danger" onClick={() => btnOnClick('error')}>Error</Button>
    </Flex>
  );
}