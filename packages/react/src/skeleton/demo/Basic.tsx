import React from 'react';
import { Skeleton } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <>
      <Skeleton style={{ width: 300 }} />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
}