import React from 'react';
import { Rate } from '@tiny-design/react';

export default function CharacterDemo() {
  return (
    <>
      <Rate defaultValue={2} character="A" half style={{ fontSize: 30 }} />
      <br />
      <Rate defaultValue={2} character="好" half color="#4ca6ea" style={{ fontSize: 25 }}/>
      <br />
      <Rate defaultValue={2} character="하" half color="#3aa40d" style={{ fontSize: 25 }}/>
    </>
  );
}