import React from 'react';
import { Input } from '@tiny-design/react';

export default function SizeDemo() {
  return (
    <div style={{ width: 400 }}>
      <Input size="sm" placeholder="Small size" />
      <br />
      <Input placeholder="Medium size" />
      <br />
      <Input size="lg" placeholder="Large size" />
    </div>
  );
}