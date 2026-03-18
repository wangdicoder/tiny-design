import React from 'react';
import { InputNumber, Button } from '@tiny-design/react';

export default function DisabledDemo() {
  const [disabled, setDisabled] = React.useState(true);

  return (
    <div style={{ width: 400 }}>
      <InputNumber disabled={disabled} min={0} max={10} defaultValue={5} />
      <br />
      <Button
        onClick={() => setDisabled(!disabled)} btnType="primary">
        Toggle disabled
      </Button>
    </div>
  );
}