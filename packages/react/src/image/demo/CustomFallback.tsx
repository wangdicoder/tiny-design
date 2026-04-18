import React from 'react';
import { Flex, Image } from '@tiny-design/react';

const fallbackStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  color: '#475569',
  background:
    'radial-gradient(circle at top, rgba(59, 130, 246, 0.12), rgba(148, 163, 184, 0.12) 45%, rgba(248, 250, 252, 1) 100%)',
  fontSize: 14,
  textAlign: 'center',
};

export default function CustomFallbackDemo() {
  return (
    <Image
      width={320}
      height={180}
      src="../avatar/not-exists.png"
      alt="Unavailable landscape"
      fallback={
        <Flex vertical align="center" justify="center" gap={8} style={fallbackStyle}>
          <strong style={{ fontSize: 16 }}>Image unavailable</strong>
          <span>The asset could not be loaded.</span>
        </Flex>
      }
    />
  );
}
