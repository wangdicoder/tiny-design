import React from 'react';
import { CopyToClipboard, Input, Button, Message } from '@tiny-design/react';

export default function UseInputDemo() {
  const [text, setText] = React.useState('');

  return (
    <div>
      <Input
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="Input something and then click button"
      />
      <CopyToClipboard text={text} onClick={() => Message.success('Copy successfully')}>
        <Button btnType="primary" style={{ marginTop: 5 }}>
          Copy
        </Button>
      </CopyToClipboard>
      <br />
      <br />
      <Input placeholder="Paste here" />
    </div>
  );
}