import React from 'react';
import { Drawer, Button, Radio } from '@tiny-design/react';

export default function PlacementDemo() {
  const [visible, setVisible] = React.useState(false);
  const [placement, setPlacement] = React.useState('left');

  return (
    <>
      <Radio.Group value={placement} onChange={(val) => setPlacement(val)}>
        <Radio value="top">Top</Radio>
        <Radio value="bottom">Bottom</Radio>
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
      </Radio.Group>
      <br />
      <br />

      <Button btnType="primary" onClick={() => setVisible(true)}>
        Open
      </Button>

      <Drawer
        header="Basic Drawer"
        placement={placement}
        onClose={() => setVisible(false)}
        open={visible}
      >
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
      </Drawer>
    </>
  );
}