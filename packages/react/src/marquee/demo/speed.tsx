import React from 'react';
import { Marquee } from '@tiny-design/react';

const itemStyle: React.CSSProperties = {
  flexShrink: 0,
  padding: '12px 24px',
  borderRadius: 8,
  background: 'var(--ty-color-bg-component)',
  border: '1px solid var(--ty-color-border-secondary)',
  whiteSpace: 'nowrap',
};

export default function SpeedDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Marquee fade duration={10}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={itemStyle}>
            Fast {i + 1}
          </div>
        ))}
      </Marquee>
      <Marquee fade duration={60}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={itemStyle}>
            Slow {i + 1}
          </div>
        ))}
      </Marquee>
    </div>
  );
}
