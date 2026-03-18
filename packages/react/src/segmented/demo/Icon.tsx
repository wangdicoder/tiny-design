import React from 'react';
import { Segmented } from '@tiny-design/react';
import { IconUser, IconStar, IconWifi } from '@tiny-design/icons';

export default function IconDemo() {
  return (
    <Segmented
      options={[
        { label: 'User', value: 'user', icon: <IconUser /> },
        { label: 'Star', value: 'star', icon: <IconStar /> },
        { label: 'Wifi', value: 'wifi', icon: <IconWifi /> },
      ]}
    />
  );
}