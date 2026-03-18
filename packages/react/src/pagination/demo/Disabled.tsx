import React from 'react';
import { Pagination } from '@tiny-design/react';

export default function DisabledDemo() {
  return (
    <>
      <Pagination disabled defaultCurrent={1} total={50} />
      <br />
      <Pagination disabled defaultCurrent={1} total={50} size="sm" />
    </>
  );
}