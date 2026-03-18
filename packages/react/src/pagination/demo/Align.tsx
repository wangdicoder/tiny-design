import React from 'react';
import { Pagination } from '@tiny-design/react';

export default function AlignDemo() {
  return (
    <>
      <Pagination defaultCurrent={5} total={250} align="left" />
      <br />
      <Pagination defaultCurrent={5} total={250} align="center" />
      <br />
      <Pagination defaultCurrent={5} total={250} align="right" />
    </>
  );
}