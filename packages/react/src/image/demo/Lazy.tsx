import React from 'react';
import { Image } from '@tiny-design/react';

export default function LazyDemo() {
  return (
    <div style={{ height: 250, overflowY: 'scroll' }}>
      <p>Scroll up to make images into the view area.</p>
      <div style={{ height: 350 }} />
      <Image lazy round src="../avatar/avatar3.png" placeholder="../avatar/avatar3_blur.png" />
      <div style={{ height: 350 }} />
      <Image lazy width={300} height={200} src="../avatar/plants.jpg" placeholder="../avatar/plants_blur.png" />
      <div style={{ height: 100 }} />
    </div>
  );
}