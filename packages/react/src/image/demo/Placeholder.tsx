import React from 'react';
import { Image } from '@tiny-design/react';

const shimmerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background:
    'linear-gradient(90deg, rgba(15, 23, 42, 0.08) 25%, rgba(15, 23, 42, 0.16) 37%, rgba(15, 23, 42, 0.08) 63%)',
  backgroundSize: '400% 100%',
  animation: 'ty-image-demo-shimmer 1.4s ease infinite',
};

export default function PlaceholderDemo() {
  return (
    <div>
      <style>
        {`
          @keyframes ty-image-demo-shimmer {
            0% { background-position: 100% 50%; }
            100% { background-position: 0 50%; }
          }
        `}
      </style>
      <Image
        width={320}
        height={180}
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
        alt="Mountain lake"
        placeholder={<span style={shimmerStyle} />}
      />
    </div>
  );
}
