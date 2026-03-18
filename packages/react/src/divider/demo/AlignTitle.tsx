import React from 'react';
import { Divider } from '@tiny-design/react';

export default function AlignTitleDemo() {
  return (
    <>
      <Divider align="left">Left Text</Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti
        licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider align="right">Right Text</Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti
        licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
    </>
  );
}