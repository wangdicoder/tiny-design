import React, { useMemo } from 'react';
import { Modal, Button, Space, createModalStore } from '@tiny-design/react';

function ConfirmModal() {
  const { visible, close } = Modal.useModal('confirm');
  return (
    <Modal header="Confirm" visible={visible} onClose={close} onConfirm={close}>
      <p>Are you sure you want to proceed?</p>
    </Modal>
  );
}

function SettingsModal() {
  const { visible, close } = Modal.useModal('settings');
  return (
    <Modal header="Settings" visible={visible} onClose={close} footer={null}>
      <p>Application settings go here.</p>
    </Modal>
  );
}

function Toolbar() {
  const { show } = Modal.useModalActions();
  return (
    <Space>
      <Button variant="solid" color="primary" onClick={() => show('confirm')}>
        Open Confirm
      </Button>
      <Button onClick={() => show('settings')}>Open Settings</Button>
    </Space>
  );
}

export default function ContextDemo() {
  const store = useMemo(() => createModalStore(), []);
  return (
    <Modal.Provider store={store}>
      <Toolbar />
      <ConfirmModal />
      <SettingsModal />
    </Modal.Provider>
  );
}
