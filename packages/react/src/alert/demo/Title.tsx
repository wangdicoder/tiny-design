import React from 'react';
import { Alert } from '@tiny-design/react';

export default function TitleDemo() {
  return (
    <Alert title="Well done!" type="success">
      Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.
    </Alert>
  );
}