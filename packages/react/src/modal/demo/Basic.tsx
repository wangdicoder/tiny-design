import { useState } from 'react';
import { Modal, Button } from '@tiny-design/react';

export default function BasicDemo() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button variant="solid" color="primary" onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <Modal
        header="Basic Modal"
        visible={visible}
        onConfirm={() => setVisible(false)}
        onCancel={() => setVisible(false)}>
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
      </Modal>
    </>
  );
}
