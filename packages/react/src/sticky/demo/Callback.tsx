import React from 'react';
import { Sticky, Button } from '@tiny-design/react';

export default function CallbackDemo() {
  return (
    <Sticky offsetTop={120} onChange={(affixed) => console.log(affixed)}>
      <Button>100px to affix top</Button>
    </Sticky>
  );
}