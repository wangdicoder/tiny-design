import React from 'react';
import { Badge } from '@tiny-design/react';

export default function CustomDemo() {
  return (
    <>
      <div><Badge dot /> Error</div>
      <div><Badge dot processing color="#1890ff" /> Processing</div>
      <div><Badge dot color="#52c41a" /> Successful</div>
      <div><Badge dot color="#faad14" /> Warning</div>
      <div><Badge dot processing color="#faad14" /> Warning with animation</div>
    </>
  );
}