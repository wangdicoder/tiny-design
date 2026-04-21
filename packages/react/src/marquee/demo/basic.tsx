import React from 'react';
import { Marquee } from '@tiny-design/react';

const itemStyle: React.CSSProperties = {
  flexShrink: 0,
  padding: '12px 24px',
  borderRadius: 8,
  background: 'var(--ty-color-bg-container)',
  border: '1px solid var(--ty-color-border-secondary)',
  whiteSpace: 'nowrap',
};

export default function BasicDemo() {
  return (
    <Marquee fade>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={itemStyle}>
          Item {i + 1}
        </div>
      ))}
    </Marquee>
  );
}
