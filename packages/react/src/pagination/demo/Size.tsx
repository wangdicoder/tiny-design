import React from 'react';
import { Pagination } from '@tiny-design/react';

export default function SizeDemo() {
  return (
    <>
      <Pagination defaultCurrent={1} total={50} />
      <br />
      <Pagination defaultCurrent={1} total={50} size="sm" />
    </>
  );
}