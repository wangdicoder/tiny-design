import React from 'react';
import { Empty, Button, Link } from '@tiny-design/react';

export default function CustomisedDemo() {
  return (
    <Empty
      image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
      imageStyle={{
        height: 60,
      }}
      description={
        <span>
          Customize <Link href="#API">Description</Link>
        </span>
      }
    >
      <Button btnType="primary">Create Now</Button>
    </Empty>
  );
}