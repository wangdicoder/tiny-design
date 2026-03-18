import React from 'react';
import { AspectRatio } from '@tiny-design/react';

export default function VideoDemo() {
  return (
    <AspectRatio ratio={4 / 3}>
      <iframe
        style={{ width: '100%', height: '100%' }}
        src="https://www.youtube.com/embed/dpw9EHDh2bM"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </AspectRatio>
  );
}