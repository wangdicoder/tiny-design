import React from 'react';
import { Loader, Alert, Switch } from '@tiny-design/react';

export default function StateDemo() {
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Loader loading={loading}>
        <Alert
          title="Alert message title"
          type="info"
        >
          Further details about the context of this alert.
        </Alert>
      </Loader>
      <div style={{ marginTop: 16 }}>
        Loading state：
        <Switch checked={loading} onChange={(val) => setLoading(val)} />
      </div>
    </>
  );
}