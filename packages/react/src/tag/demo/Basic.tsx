import React from 'react';
import { Tag } from '@tiny-design/react';

export default function BasicDemo() {
  const log = (e: React.MouseEvent) => {
    console.log(e);
  };

  const preventDefault = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Tag>Tag 1</Tag>
      <Tag>
        <a href="https://github.com">Link</a>
      </Tag>
      <Tag closable onClose={log}>
        Tag 2
      </Tag>
      <Tag closable onClose={preventDefault}>
        Prevent Default
      </Tag>
    </>
  );
}