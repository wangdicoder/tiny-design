import React from 'react';
import { Sticky, Button } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <>
      <Sticky offsetTop={60}>
        <Button btnType="primary">Affix top</Button>
      </Sticky>
      <br />
      <Sticky offsetBottom={10}>
        <Button btnType="primary">Affix bottom</Button>
      </Sticky>
    </>
  );
}