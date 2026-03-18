import React from 'react';
import { Tag } from '@tiny-design/react';

export default function CheckableDemo() {
  const { CheckableTag } = Tag;

  const onChange = (checked: boolean) => {
    console.log(checked);
  };

  return (
    <>
      <CheckableTag defaultChecked onChange={onChange}>
        Tag1
      </CheckableTag>
      <CheckableTag defaultChecked={false} onChange={onChange}>
        Tag2
      </CheckableTag>
      <CheckableTag defaultChecked={false} onChange={onChange}>
        Tag3
      </CheckableTag>
    </>
  );
}