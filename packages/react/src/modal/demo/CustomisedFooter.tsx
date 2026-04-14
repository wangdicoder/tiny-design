import React, { useState } from 'react';
import { Modal, Button } from '@tiny-design/react';

export default function CustomisedFooterDemo() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  return (
    <>
      <Button variant="solid" color="primary" onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <Modal
        header="Custom Footer"
        visible={visible}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
        confirmText="Submit"
        cancelText="Return"
        confirmLoading={loading}>
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
      </Modal>
    </>
  );
}
