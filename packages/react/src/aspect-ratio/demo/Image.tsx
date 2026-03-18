import React from 'react';
import { AspectRatio } from '@tiny-design/react';

export default function ImageDemo() {
  return (
    <AspectRatio>
      <img
        src="https://miro.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png"
        alt="image"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </AspectRatio>
  );
}