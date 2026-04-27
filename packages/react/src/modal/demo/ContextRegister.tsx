import React, { useMemo, useState } from 'react';
import { Modal, Button, Space, createModalStore } from '@tiny-design/react';

interface ConfirmDeleteProps {
  itemName: string;
}

function ConfirmDelete({ itemName }: ConfirmDeleteProps) {
  const { visible, hide, remove } = Modal.useModalSelf<ConfirmDeleteProps, boolean>();
  return (
    <Modal
      header="Delete item"
      visible={visible}
      afterClose={remove}
      onConfirm={() => hide(true)}
      onCancel={() => hide(false)}
      confirmText="Delete"
      cancelText="Keep">
      <p>
        Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
      </p>
    </Modal>
  );
}

function Trigger() {
  const { show } = Modal.useModalActions();
  const [last, setLast] = useState<string>('');

  return (
    <Space direction="vertical">
      <Button
        variant="solid"
        color="danger"
        onClick={async () => {
          const ok = await show<boolean, ConfirmDeleteProps>('confirm-delete', {
            itemName: 'Project Apollo',
          });
          setLast(ok ? 'deleted Project Apollo' : 'cancelled');
        }}>
        Delete Project Apollo
      </Button>
      {last ? <span>Last action: {last}</span> : null}
    </Space>
  );
}

export default function ContextRegisterDemo() {
  const store = useMemo(() => createModalStore(), []);
  return (
    <Modal.Provider store={store}>
      <Modal.Register id="confirm-delete" component={ConfirmDelete} />
      <Trigger />
    </Modal.Provider>
  );
}
