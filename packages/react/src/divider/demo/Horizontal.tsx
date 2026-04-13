import React from 'react';
import { Divider } from '@tiny-design/react';

export default function HorizontalDemo() {
  return (
    <>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti
        licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti
        licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider>Solid Section</Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti
        licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider variant="dashed">Dashed Section</Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti
        licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider variant="dotted">Dotted Section</Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti
        licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider plain>Quick Actions</Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti
        licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
    </>
  );
}
