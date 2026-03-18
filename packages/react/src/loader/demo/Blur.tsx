import React from 'react';
import { Loader, Alert, Switch } from '@tiny-design/react';

export default function BlurDemo() {
  const [blurred, setBlurred] = React.useState(true);

  return (
    <>
      <Loader blurred={blurred}>
        <Alert
          title="Alert message title"
          type="info"
        >
          Further details about the context of this alert.
        </Alert>
      </Loader>
      <div style={{ marginTop: 16 }}>
        Blurred state：
        <Switch checked={blurred} onChange={(val) => setBlurred(val)} />
      </div>
    </>
  );
}