import React from 'react';
import { Checkbox } from '@tiny-design/react';

export default function GroupDemo() {
  const { Group } = Checkbox;

  return (
    <Group defaultValue={['a', 'b']} onChange={(val) => console.log(val)}>
      <Checkbox value="a">A</Checkbox>
      <Checkbox value="b">B</Checkbox>
      <Checkbox value="c">C</Checkbox>
    </Group>
  );
}