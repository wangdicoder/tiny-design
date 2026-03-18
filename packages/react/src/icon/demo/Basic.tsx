import React from 'react';
import { IconClose, IconPlus, IconSearch, IconHeart, IconStar } from '@tiny-design/icons';

export default function BasicDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: 24 }}>
      <IconClose />
      <IconPlus />
      <IconSearch />
      <IconHeart />
      <IconStar />
    </div>
  );
}