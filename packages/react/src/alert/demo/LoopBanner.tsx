import React from 'react';
import { Alert, Marquee } from '@tiny-design/react';

export default function LoopBannerDemo() {
  return (
    <Alert type="warning" icon>
      <Marquee pauseOnHover fade={false}>
        This is a scrolling banner alert message — important announcements go here.
      </Marquee>
    </Alert>
  );
}
