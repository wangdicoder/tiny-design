import React from 'react';
import { Divider } from '@tiny-design/react';

export default function PlainAndGapDemo() {
  return (
    <>
      <Divider>Default Title Gap</Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti
        licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider titleGap={24}>Wide Title Gap</Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti
        licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider plain>Plain Supporting Text</Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti
        licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
    </>
  );
}
