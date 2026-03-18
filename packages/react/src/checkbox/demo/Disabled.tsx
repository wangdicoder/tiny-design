import React from 'react';
import { Checkbox } from '@tiny-design/react';

export default function DisabledDemo() {
  const { Group } = Checkbox;

  return (
    <>
      <Group defaultValue={['a', 'b']} onChange={(val) => console.log(val)}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b" disabled>B</Checkbox>
        <Checkbox value="c">C</Checkbox>
      </Group>
      <br />
      <Group disabled defaultValue={['a', 'c']} onChange={(val) => console.log(val)}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
        <Checkbox value="c">C</Checkbox>
      </Group>
    </>
  );
}