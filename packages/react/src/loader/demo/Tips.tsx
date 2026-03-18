import React from 'react';
import { Loader, Alert } from '@tiny-design/react';

export default function TipsDemo() {
  return (
    <>
      <Loader tip="Loading...">
        <Alert
          title="Alert message title"
          type="info"
        >
          Further details about the context of this alert.
        </Alert>
      </Loader>
      <br />
      <br />
      <Loader tip="Loading..." vertical>
        <Alert
          title="Alert message title"
          type="info"
        >
          Further details about the context of this alert.
        </Alert>
      </Loader>
    </>
  );
}