import React from 'react';
import { Button, Overlay, Flex } from '@tiny-design/react';

export default function MaskTypesDemo() {
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState('default');

  const open = (t) => {
    setType(t);
    setVisible(true);
  };

  return (
    <>
      <Flex gap={12}>
        <Button onClick={() => open('default')}>Default</Button>
        <Button onClick={() => open('inverted')}>Inverted</Button>
        <Button onClick={() => open('none')}>None</Button>
      </Flex>
      <Overlay isShow={visible} type={type} clickCallback={() => setVisible(false)}>
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: type === 'none' ? '#333' : '#fff', fontSize: 20 }}>
          Mask type: {type} (click to close)
        </div>
      </Overlay>
    </>
  );
}