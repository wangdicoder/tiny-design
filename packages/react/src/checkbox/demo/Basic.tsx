import React from 'react';
import { Checkbox } from '@tiny-design/react';

export default function BasicDemo() {
  const onChange = (e) => {
    console.log(e.currentTarget.checked);
  };

  return <Checkbox onChange={onChange}>Checkbox</Checkbox>;
}