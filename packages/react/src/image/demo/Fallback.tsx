import React from 'react';
import { Image } from '@tiny-design/react';

export default function FallbackDemo() {
  return <Image src="../avatar/not-exists.png" fallback="../avatar/avatar4.png" />;
}
