import React from 'react';
import { Radio } from '@tiny-design/react';

const { Group } = Radio;

export default function GroupDemo() {
  const [value, setValue] = React.useState('a');

  return (
    <>
      <p>Controlled</p>
      <Group
        name="abc"
        value={value}
        onChange={(val) => setValue(val)}
      >
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio value="d">D</Radio>
      </Group>

      <br />

      <p>Uncontrolled</p>
      <Group defaultValue="a">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio value="d">D</Radio>
      </Group>
    </>
  );
}