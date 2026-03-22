import React from 'react';
import { Marquee } from '@tiny-design/react';

const cardStyle: React.CSSProperties = {
  flexShrink: 0,
  width: 200,
  padding: 16,
  borderRadius: 12,
  background: 'var(--ty-color-bg-component)',
  border: '1px solid var(--ty-color-border-secondary)',
};

const avatarStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: 'var(--ty-color-primary)',
  opacity: 0.2,
};

const nameStyle: React.CSSProperties = {
  height: 12,
  width: '60%',
  borderRadius: 6,
  background: 'var(--ty-color-text-secondary)',
  opacity: 0.2,
  marginTop: 12,
};

const textStyle: React.CSSProperties = {
  height: 8,
  borderRadius: 4,
  background: 'var(--ty-color-text-secondary)',
  opacity: 0.1,
  marginTop: 8,
};

export default function CardsDemo() {
  return (
    <Marquee fade duration={40} gap={20}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={cardStyle}>
          <div style={avatarStyle} />
          <div style={nameStyle} />
          <div style={textStyle} />
          <div style={{ ...textStyle, width: '80%' }} />
          <div style={{ ...textStyle, width: '45%' }} />
        </div>
      ))}
    </Marquee>
  );
}
