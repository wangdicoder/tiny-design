import React from 'react';
import { Radio, Button } from '@tiny-design/react';

const { Group } = Radio;

export default function DisabledDemo() {
  const [value, setValue] = React.useState('a');
  const [disabled, setDisabled] = React.useState(true);

  return (
    <>
      <Group
        value={value}
        onChange={(val) => setValue(val)}
        disabled={disabled}
      >
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c" disabled>
          C
        </Radio>
        <Radio value="d">D</Radio>
      </Group>
      <br />
      <br />
      <Button btnType="primary" onClick={() => setDisabled(!disabled)}>
        Toggle disabled
      </Button>
    </>
  );
}