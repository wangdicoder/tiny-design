import React from 'react';
import { act, render, fireEvent, screen, waitFor } from '@testing-library/react';
import Modal from '../index';
import ConfigProvider from '../../config-provider';

describe('<Modal />', () => {
  afterEach(() => {
    ConfigProvider.config({ holderRender: undefined });
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(<Modal visible>Content</Modal>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when visible', () => {
    const { getByText } = render(<Modal visible>Modal Content</Modal>);
    expect(getByText('Modal Content')).toBeInTheDocument();
  });

  it('should render header', () => {
    const { getByText } = render(<Modal visible header="Title">Content</Modal>);
    expect(getByText('Title')).toBeInTheDocument();
  });

  it('should render close button when closable', () => {
    const { baseElement } = render(<Modal visible closable>Content</Modal>);
    expect(baseElement.querySelector('.ty-modal__close-btn')).toBeInTheDocument();
  });

  it('should render footer buttons', () => {
    const { getByText } = render(<Modal visible>Content</Modal>);
    expect(getByText('OK')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('should call onCancel from the cancel button without calling onClose', () => {
    const onCancel = jest.fn();
    const onClose = jest.fn();
    render(
      <Modal visible onCancel={onCancel} onClose={onClose}>
        Content
      </Modal>
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should call onClose from the close button without calling onCancel', () => {
    const onCancel = jest.fn();
    const onClose = jest.fn();
    render(
      <Modal visible onCancel={onCancel} onClose={onClose}>
        Content
      </Modal>
    );

    fireEvent.click(screen.getByLabelText('Close'));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('should close on escape by default', () => {
    const onClose = jest.fn();
    render(<Modal visible onClose={onClose}>Content</Modal>);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not close on escape when keyboard is disabled', () => {
    const onClose = jest.fn();
    render(
      <Modal visible keyboard={false} onClose={onClose}>
        Content
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should focus the dialog container when there are no focusable children', async () => {
    const { baseElement } = render(<Modal visible footer={null} closable={false}>Content</Modal>);

    await waitFor(() => {
      expect(baseElement.querySelector('.ty-modal__content')).toHaveFocus();
    });
  });

  it('should expose aria relationships for header and body content', () => {
    render(
      <Modal visible header="Settings">
        Modal content
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
    expect(document.getElementById(dialog.getAttribute('aria-labelledby') || '')).toHaveTextContent('Settings');
    expect(document.getElementById(dialog.getAttribute('aria-describedby') || '')).toHaveTextContent('Modal content');
  });

  it('should keep focus inside the modal across rerenders while visible', async () => {
    const { rerender } = render(
      <div>
        <button>Trigger</button>
        <Modal visible footer={null} closable={false} style={{ width: 320 }}>
          Content
        </Modal>
      </div>
    );

    const trigger = screen.getByText('Trigger');
    trigger.focus();

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toHaveFocus();
    });

    rerender(
      <div>
        <button>Trigger</button>
        <Modal visible footer={null} closable={false} style={{ width: 360 }}>
          Content
        </Modal>
      </div>
    );

    expect(screen.getByRole('dialog')).toHaveFocus();
    expect(trigger).not.toHaveFocus();
  });

  it('should render custom button text', () => {
    const { getByText } = render(<Modal visible confirmText="Yes" cancelText="No">Content</Modal>);
    expect(getByText('Yes')).toBeInTheDocument();
    expect(getByText('No')).toBeInTheDocument();
  });

  it('should render null footer', () => {
    const { container } = render(<Modal visible footer={null}>Content</Modal>);
    expect(container.querySelector('.ty-modal__footer')).toBeFalsy();
  });

  it('should support static modal open', () => {
    let instance!: ReturnType<typeof Modal.open>;

    act(() => {
      instance = Modal.open({
        header: 'Static Modal',
        children: 'Static Content',
      });
    });

    expect(document.body.textContent).toContain('Static Modal');
    expect(document.body.textContent).toContain('Static Content');

    act(() => {
      instance.destroy();
    });
  });

  it('should support static modal confirm', () => {
    let instance!: ReturnType<typeof Modal.confirm>;

    act(() => {
      instance = Modal.confirm({
        header: 'Confirm Modal',
        children: 'Confirm Content',
      });
    });

    expect(document.body.textContent).toContain('Confirm Modal');
    expect(document.body.textContent).toContain('Confirm Content');

    act(() => {
      instance.destroy();
    });
  });

  it('should apply holderRender to static modal APIs', () => {
    ConfigProvider.config({
      holderRender: (children) => (
        <div data-testid="modal-holder">{children}</div>
      ),
    });

    let instance!: ReturnType<typeof Modal.open>;

    act(() => {
      instance = Modal.open({
        header: 'Static Holder Modal',
        children: 'Holder Content',
      });
    });

    expect(document.body.querySelector('[data-testid="modal-holder"]')).toBeTruthy();
    expect(document.body.textContent).toContain('Static Holder Modal');

    act(() => {
      instance.destroy();
    });
  });

  it('should prefer onClose over onCancel for static modal closing', () => {
    const onClose = jest.fn();
    const onCancel = jest.fn();
    let instance!: ReturnType<typeof Modal.open>;

    act(() => {
      instance = Modal.open({
        header: 'Static Close Modal',
        children: 'Close Content',
        onClose,
        onCancel,
      });
    });

    const closeButtons = screen.getAllByLabelText('Close');
    fireEvent.click(closeButtons[closeButtons.length - 1]);

    return waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onCancel).not.toHaveBeenCalled();
    });
  });
});
