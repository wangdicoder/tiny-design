import React from 'react';
import { Modal, Button, Space } from '@tiny-design/react';

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
  const confirm = Modal.useModal('confirm');
  const settings = Modal.useModal('settings');
  return (
    <Space>
      <Button btnType="primary" onClick={confirm.show}>Open Confirm</Button>
      <Button onClick={settings.show}>Open Settings</Button>
    </Space>
  );
}

export default function ContextDemo() {
  return (
    <Modal.Provider>
      <Toolbar />
      <ConfirmModal />
      <SettingsModal />
    </Modal.Provider>
  );
}