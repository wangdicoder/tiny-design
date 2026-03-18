import React from 'react';
import { IconHeart } from '@tiny-design/icons';

export default function SizeAndColorDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconHeart size={16} color="#999" />
      <IconHeart size={24} color="#f5222d" />
      <IconHeart size={32} color="#eb2f96" />
      <IconHeart size={48} color="#f5222d" />
    </div>
  );
}