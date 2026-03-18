import React from 'react';
import { Skeleton } from '@tiny-design/react';

export default function ActiveDemo() {
  return (
    <>
      <Skeleton active style={{ width: 300 }} />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </>
  );
}