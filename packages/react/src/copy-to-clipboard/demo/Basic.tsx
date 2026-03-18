import React from 'react';
import { CopyToClipboard, Input, Message } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <div>
      <CopyToClipboard text="Click me to copy" onClick={() => Message.success('Copy successfully')}>
        Click me to copy
      </CopyToClipboard>
      <br />
      <br />
      <Input placeholder="Paste here" />
    </div>
  );
}