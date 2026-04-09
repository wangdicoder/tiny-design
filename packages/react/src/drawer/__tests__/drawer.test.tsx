import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Drawer from '../index';

describe('<Drawer />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Drawer visible>Content</Drawer>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when visible', () => {
    const { getByText } = render(<Drawer visible>Drawer Content</Drawer>);
    expect(getByText('Drawer Content')).toBeInTheDocument();
  });

  it('should render header', () => {
    const { getByText } = render(<Drawer visible header="Title">Content</Drawer>);
    expect(getByText('Title')).toBeInTheDocument();
  });

  it('should render close button when closable', () => {
    const { baseElement } = render(<Drawer visible closable>Content</Drawer>);
    expect(baseElement.querySelector('.ty-drawer__close-btn')).toBeInTheDocument();
  });

  it('should render footer', () => {
    const { getByText } = render(<Drawer visible footer={<div>Footer</div>}>Content</Drawer>);
    expect(getByText('Footer')).toBeInTheDocument();
  });

  it('should close on escape by default', () => {
    const onClose = jest.fn();
    render(<Drawer visible onClose={onClose}>Content</Drawer>);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not close on escape when keyboard is disabled', () => {
    const onClose = jest.fn();
    render(
      <Drawer visible keyboard={false} onClose={onClose}>
        Content
      </Drawer>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should focus the dialog container when there are no focusable children', async () => {
    const { baseElement } = render(<Drawer visible closable={false}>Content</Drawer>);

    await waitFor(() => {
      expect(baseElement.querySelector('.ty-drawer__content')).toHaveFocus();
    });
  });

  it('should expose aria relationships for header and body content', () => {
    render(
      <Drawer visible header="Filters" onClose={jest.fn()}>
        Drawer content
      </Drawer>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
    expect(document.getElementById(dialog.getAttribute('aria-labelledby') || '')).toHaveTextContent('Filters');
    expect(document.getElementById(dialog.getAttribute('aria-describedby') || '')).toHaveTextContent('Drawer content');
  });
});
