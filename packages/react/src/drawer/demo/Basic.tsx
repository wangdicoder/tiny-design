import React from 'react';
import { Drawer, Button } from '@tiny-design/react';

export default function BasicDemo() {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Button btnType="primary" onClick={() => setVisible(true)}>
        Open
      </Button>
      <Drawer
        header="Basic Drawer"
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
      >
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
      </Drawer>
    </div>
  );
}