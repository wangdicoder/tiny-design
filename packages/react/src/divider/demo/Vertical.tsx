import React from 'react';
import { Divider } from '@tiny-design/react';

export default function VerticalDemo() {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span>Draft</span>
      <Divider orientation="vertical" />
      <a href="#">Preview</a>
      <Divider orientation="vertical" />
      <a href="#">Publish</a>
    </div>
  );
}
