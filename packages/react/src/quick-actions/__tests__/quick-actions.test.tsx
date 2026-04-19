import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import QuickActions from '../index';

describe('<QuickActions />', () => {
  const getPanel = () => document.querySelector('.ty-quick-actions__actions') as HTMLElement;

  const renderActions = (props: React.ComponentProps<typeof QuickActions> = {}) =>
    render(
      <QuickActions label="Composer actions" {...props}>
        <QuickActions.Action icon="S" label="Save draft" description="Store the latest version." />
        <QuickActions.Action icon="P" label="Publish" description="Push it live now." />
      </QuickActions>
    );

  it('renders with the default direction and closed state', () => {
    const { container } = renderActions();

    expect(container.firstChild).toHaveClass('ty-quick-actions');
    expect(container.firstChild).toHaveClass('ty-quick-actions_up');
    expect(getPanel()).toHaveAttribute('aria-hidden', 'true');
  });

  it('opens on click by default', () => {
    renderActions();

    fireEvent.click(screen.getByRole('button', { name: 'Composer actions' }));

    expect(getPanel()).toHaveAttribute('aria-hidden', 'false');
  });

  it('supports defaultOpen', () => {
    renderActions({ defaultOpen: true });

    expect(getPanel()).toHaveAttribute('aria-hidden', 'false');
  });

  it('supports controlled open state', () => {
    const { rerender } = renderActions({ open: false });

    expect(getPanel()).toHaveAttribute('aria-hidden', 'true');

    rerender(
      <QuickActions label="Composer actions" open={true}>
        <QuickActions.Action icon="S" label="Save draft" description="Store the latest version." />
      </QuickActions>
    );

    expect(getPanel()).toHaveAttribute('aria-hidden', 'false');
  });

  it('calls onOpenChange with click, outside and action sources', () => {
    const onOpenChange = jest.fn();

    render(
      <div>
        <QuickActions label="Composer actions" onOpenChange={onOpenChange}>
          <QuickActions.Action icon="S" label="Save draft" />
        </QuickActions>
        <button type="button">Outside</button>
      </div>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Composer actions' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save draft' }));
    fireEvent.click(screen.getByRole('button', { name: 'Composer actions' }));
    fireEvent.click(screen.getByRole('button', { name: 'Outside' }));

    expect(onOpenChange).toHaveBeenNthCalledWith(1, true, { source: 'trigger-click' });
    expect(onOpenChange).toHaveBeenNthCalledWith(2, false, { source: 'action-click' });
    expect(onOpenChange).toHaveBeenNthCalledWith(3, true, { source: 'trigger-click' });
    expect(onOpenChange).toHaveBeenNthCalledWith(4, false, { source: 'outside' });
  });

  it('supports hover trigger with keyboard focus', () => {
    jest.useFakeTimers();

    const { container } = renderActions({ trigger: 'hover' });
    const root = container.firstChild as HTMLElement;
    const trigger = screen.getByRole('button', { name: 'Composer actions' });

    fireEvent.mouseEnter(root);
    expect(getPanel()).toHaveAttribute('aria-hidden', 'false');

    fireEvent.mouseLeave(root);
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(getPanel()).toHaveAttribute('aria-hidden', 'true');

    fireEvent.keyDown(root, { key: 'Tab' });
    fireEvent.focus(trigger);
    expect(getPanel()).toHaveAttribute('aria-hidden', 'false');

    jest.useRealTimers();
  });

  it('closes on mouse leave after clicking the trigger in hover mode', () => {
    jest.useFakeTimers();

    const { container } = renderActions({ trigger: 'hover' });
    const root = container.firstChild as HTMLElement;
    const trigger = screen.getByRole('button', { name: 'Composer actions' });

    fireEvent.mouseEnter(root);
    fireEvent.mouseDown(trigger);
    fireEvent.click(trigger);
    fireEvent.mouseLeave(root);

    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(getPanel()).toHaveAttribute('aria-hidden', 'true');

    jest.useRealTimers();
  });

  it('closes on escape and returns focus to the trigger', () => {
    renderActions({ defaultOpen: true });
    const trigger = screen.getByRole('button', { name: 'Composer actions' });
    const action = screen.getByRole('button', { name: 'Save draft Store the latest version.' });

    action.focus();
    fireEvent.keyDown(action, { key: 'Escape' });

    expect(getPanel()).toHaveAttribute('aria-hidden', 'true');
    expect(trigger).toHaveFocus();
  });

  it('keeps the panel open when keepOpen is set on an action', () => {
    render(
      <QuickActions label="Composer actions" defaultOpen>
        <QuickActions.Action icon="S" label="Save draft" keepOpen />
      </QuickActions>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Save draft' }));

    expect(getPanel()).toHaveAttribute('aria-hidden', 'false');
  });

  it('renders danger and loading states', () => {
    render(
      <QuickActions label="Composer actions" defaultOpen>
        <QuickActions.Action icon="D" label="Delete" danger />
        <QuickActions.Action icon="L" label="Syncing" loading />
      </QuickActions>
    );

    const deleteAction = screen.getByRole('button', { name: 'Delete' });
    const syncingAction = screen.getByRole('button', { name: 'Syncing' });

    expect(deleteAction).toHaveClass('ty-quick-actions__action_danger');
    expect(syncingAction).toBeDisabled();
    expect(syncingAction).toHaveClass('ty-quick-actions__action_loading');
  });
});
