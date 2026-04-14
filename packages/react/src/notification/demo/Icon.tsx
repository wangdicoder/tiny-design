import React from 'react';
import { Button, Notification } from '@tiny-design/react';
import { IconBroadcast } from '@tiny-design/icons';

export default function IconDemo() {
  const btnOnClick = () => {
    Notification.open({
      title: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification.',
      icon: <IconBroadcast size={25} color="#1890ff" style={{ marginRight: 15 }} />,
    });
  };

  return (
    <Button variant="solid" color="primary" onClick={btnOnClick}>
      Notification with customised icon
    </Button>
  );
}
