import React from 'react';
import { BackTop } from '@tiny-design/react';

export default function CustomDemo() {
  return (
    <BackTop visibilityHeight={100} style={{ bottom: 100 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 4,
          backgroundColor: '#6e41bf',
          color: '#fff',
          textAlign: 'center',
          lineHeight: '40px',
          fontSize: 14,
        }}
      >
        UP
      </div>
    </BackTop>
  );
}