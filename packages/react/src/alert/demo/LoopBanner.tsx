import React from 'react';
import { Alert, TextLoop } from '@tiny-design/react';

export default function LoopBannerDemo() {
  return (
    <Alert type="warning" icon>
      <TextLoop>
        <span>Alert message content 1</span>
        <span>Alert message content 2</span>
        <span>Alert message content 3</span>
      </TextLoop>
    </Alert>
  );
}
