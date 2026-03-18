import React, { useState } from 'react';
import { Switch, Button } from '@tiny-design/react';

export default function DisabledDemo() {
  const [disabled, setDisabled] = useState(true);

  return (
    <>
      <Switch disabled={disabled} />
      <br />
      <br />
      <Button btnType="primary" onClick={() => setDisabled(!disabled)}>
        Toggle Disabled
      </Button>
    </>
  );
}