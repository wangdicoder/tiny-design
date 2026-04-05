import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
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
});
