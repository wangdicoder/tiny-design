import { useState } from 'react';
import { Modal, Button, Flex } from '@tiny-design/react';

export default function AnimationDemo() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  return (
    <Flex gap="sm">
      <Button btnType="primary" onClick={() => setVisible1(true)}>
        Default Slide up and down
      </Button>
      <Button btnType="primary" onClick={() => setVisible2(true)}>
        Scale animation
      </Button>
      <Modal
        header="Default Slide up and down"
        visible={visible1}
        onConfirm={() => setVisible1(false)}
        onCancel={() => setVisible1(false)}>
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
      </Modal>
      <Modal
        animation="scale"
        header="I'm a scale animation modal"
        visible={visible2}
        onConfirm={() => setVisible2(false)}
        onCancel={() => setVisible2(false)}>
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
      </Modal>
    </Flex>
  );
}
