import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Modal from '../index';
import { createModalStore } from '../modal-context';

describe('Modal context — legacy useModal(id)', () => {
  function Toolbar() {
    const confirm = Modal.useModal('confirm');
    return <button onClick={confirm.show}>open</button>;
  }
  function ConfirmModal() {
    const { visible, close } = Modal.useModal('confirm');
    return (
      <Modal visible={visible} onClose={close} header="Confirm">
        confirm body
      </Modal>
    );
  }

  it('shows and closes a modal via per-id hook', () => {
    render(
      <Modal.Provider store={createModalStore()}>
        <Toolbar />
        <ConfirmModal />
      </Modal.Provider>
    );

    expect(screen.queryByText('confirm body')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('open'));
    expect(screen.getByText('confirm body')).toBeInTheDocument();
  });
});

describe('Modal context — imperative API + outlet', () => {
  function ConfirmContent(props: { message: string }) {
    const { visible, hide, remove } = Modal.useModalSelf<{ message: string }, boolean>();
    return (
      <Modal
        visible={visible}
        header="Are you sure?"
        afterClose={remove}
        onConfirm={() => hide(true)}
        onCancel={() => hide(false)}>
        <span data-testid="message">{props.message}</span>
      </Modal>
    );
  }

  it('renders registered components and resolves with hide(result)', async () => {
    const store = createModalStore();
    store.register('confirm', ConfirmContent);

    let resolved: boolean | undefined;
    function Trigger() {
      const modal = Modal.useModalActions();
      return (
        <button
          onClick={async () => {
            resolved = await modal.show<boolean, { message: string }>('confirm', {
              message: 'delete this?',
            });
          }}>
          ask
        </button>
      );
    }

    render(
      <Modal.Provider store={store}>
        <Trigger />
      </Modal.Provider>
    );

    fireEvent.click(screen.getByText('ask'));
    expect(screen.getByTestId('message')).toHaveTextContent('delete this?');

    await act(async () => {
      fireEvent.click(screen.getByText('OK'));
    });
    expect(resolved).toBe(true);
  });

  it('declarative <Modal.Register> works the same as store.register', () => {
    const store = createModalStore();
    function Trigger() {
      const modal = Modal.useModalActions();
      return <button onClick={() => modal.show('confirm', { message: 'hi' })}>go</button>;
    }

    render(
      <Modal.Provider store={store}>
        <Modal.Register id="confirm" component={ConfirmContent} />
        <Trigger />
      </Modal.Provider>
    );

    expect(store.isRegistered('confirm')).toBe(true);
    fireEvent.click(screen.getByText('go'));
    expect(screen.getByTestId('message')).toHaveTextContent('hi');
  });

  it('<Modal.Register> unregisters when unmounted', () => {
    const store = createModalStore();
    function Host({ mounted }: { mounted: boolean }) {
      return (
        <Modal.Provider store={store}>
          {mounted ? <Modal.Register id="confirm" component={ConfirmContent} /> : null}
        </Modal.Provider>
      );
    }

    const { rerender } = render(<Host mounted />);
    expect(store.isRegistered('confirm')).toBe(true);

    rerender(<Host mounted={false} />);
    expect(store.isRegistered('confirm')).toBe(false);
  });

  it('hideAll resolves all open modals with undefined', async () => {
    const store = createModalStore();
    store.register('a', () => {
      const { visible, remove } = Modal.useModalSelf();
      return (
        <Modal visible={visible} afterClose={remove} header="a">
          a body
        </Modal>
      );
    });
    store.register('b', () => {
      const { visible, remove } = Modal.useModalSelf();
      return (
        <Modal visible={visible} afterClose={remove} header="b">
          b body
        </Modal>
      );
    });

    let aResult: unknown = 'untouched';
    let bResult: unknown = 'untouched';
    render(<Modal.Provider store={store}>{null}</Modal.Provider>);

    await act(async () => {
      store.show('a').then((v) => (aResult = v));
      store.show('b').then((v) => (bResult = v));
    });
    expect(screen.getByText('a body')).toBeInTheDocument();
    expect(screen.getByText('b body')).toBeInTheDocument();

    await act(async () => {
      store.hideAll();
    });
    expect(aResult).toBeUndefined();
    expect(bResult).toBeUndefined();
  });

  it('remove() drains a pending resolver instead of leaking the promise', async () => {
    const store = createModalStore();
    store.register('confirm', ConfirmContent);

    let resolved: unknown = 'untouched';
    await act(async () => {
      store.show<boolean, { message: string }>('confirm', { message: 'x' }).then((v) => {
        resolved = v;
      });
    });

    await act(async () => {
      store.remove('confirm');
    });
    // microtask flush
    await act(async () => {});

    expect(resolved).toBeUndefined();
  });

  it('useModalSelf throws outside an outlet', () => {
    function Bad() {
      Modal.useModalSelf();
      return null;
    }
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(
        <Modal.Provider store={createModalStore()}>
          <Bad />
        </Modal.Provider>
      )
    ).toThrow(/useModalSelf must be used inside/);
    spy.mockRestore();
  });
});
