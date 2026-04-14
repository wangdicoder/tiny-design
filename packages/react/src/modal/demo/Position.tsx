import { useState } from 'react';
import { Modal, Button } from '@tiny-design/react';

export default function PositionDemo() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  return (
    <>
      <Button variant="solid" color="primary" onClick={() => setVisible1(true)}>
        Display a modal dialog at 20px to the top
      </Button>
      <br />
      <br />
      <Button variant="solid" color="primary" onClick={() => setVisible2(true)}>
        Vertically centered modal dialog
      </Button>
      <Modal
        top={20}
        header="20px to Top"
        visible={visible1}
        onConfirm={() => setVisible1(false)}
        onCancel={() => setVisible1(false)}>
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
      </Modal>
      <Modal
        centered
        header="Vertically centered modal dialog"
        visible={visible2}
        onConfirm={() => setVisible2(false)}
        onCancel={() => setVisible2(false)}>
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
      </Modal>
    </>
  );
}
