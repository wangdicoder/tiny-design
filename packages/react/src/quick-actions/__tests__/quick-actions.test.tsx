import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuickActions from '../index';

describe('<QuickActions />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <QuickActions>
        <QuickActions.Action icon="A" tooltip="Action A" />
        <QuickActions.Action icon="B" tooltip="Action B" />
      </QuickActions>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with default class', () => {
    const { container } = render(
      <QuickActions>
        <QuickActions.Action icon="A" />
      </QuickActions>
    );
    expect(container.firstChild).toHaveClass('ty-quick-actions');
    expect(container.firstChild).toHaveClass('ty-quick-actions_up');
  });

  it('should render actions on hover', () => {
    const { container, getByText } = render(
      <QuickActions>
        <QuickActions.Action icon="A" tooltip="Action A" />
      </QuickActions>
    );
    const root = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(root);
    expect(root.querySelector('.ty-quick-actions__actions')).toHaveClass('ty-quick-actions__actions_open');
    expect(getByText('Action A')).toBeInTheDocument();
  });

  it('should close actions on mouse leave', () => {
    const { container } = render(
      <QuickActions>
        <QuickActions.Action icon="A" />
      </QuickActions>
    );
    const root = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(root);
    expect(root.querySelector('.ty-quick-actions__actions')).toHaveClass('ty-quick-actions__actions_open');
    fireEvent.mouseLeave(root);
    expect(root.querySelector('.ty-quick-actions__actions')).not.toHaveClass('ty-quick-actions__actions_open');
  });

  it('should toggle on click with click trigger', () => {
    const { container } = render(
      <QuickActions trigger="click">
        <QuickActions.Action icon="A" />
      </QuickActions>
    );
    const button = container.querySelector('.ty-quick-actions__button') as HTMLElement;
    fireEvent.click(button);
    expect(container.querySelector('.ty-quick-actions__actions')).toHaveClass('ty-quick-actions__actions_open');
    fireEvent.click(button);
    expect(container.querySelector('.ty-quick-actions__actions')).not.toHaveClass('ty-quick-actions__actions_open');
  });

  it('should close on outside click with click trigger', () => {
    const { container, getByText } = render(
      <div>
        <QuickActions trigger="click">
          <QuickActions.Action icon="A" />
        </QuickActions>
        <button>Outside</button>
      </div>
    );
    const button = container.querySelector('.ty-quick-actions__button') as HTMLElement;
    fireEvent.click(button);
    expect(container.querySelector('.ty-quick-actions__actions')).toHaveClass('ty-quick-actions__actions_open');

    fireEvent.click(getByText('Outside'));

    expect(container.querySelector('.ty-quick-actions__actions')).not.toHaveClass('ty-quick-actions__actions_open');
  });

  it('should render correct direction class', () => {
    const directions = ['up', 'down', 'left', 'right'] as const;
    directions.forEach((direction) => {
      const { container } = render(
        <QuickActions direction={direction}>
          <QuickActions.Action icon="A" />
        </QuickActions>
      );
      expect(container.firstChild).toHaveClass(`ty-quick-actions_${direction}`);
    });
  });

  it('should not open when disabled', () => {
    const { container } = render(
      <QuickActions disabled>
        <QuickActions.Action icon="A" />
      </QuickActions>
    );
    const root = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(root);
    expect(root.querySelector('.ty-quick-actions__actions')).not.toHaveClass('ty-quick-actions__actions_open');
  });

  it('should support controlled open', () => {
    const { container, rerender } = render(
      <QuickActions open={false}>
        <QuickActions.Action icon="A" />
      </QuickActions>
    );
    expect(container.querySelector('.ty-quick-actions__actions')).not.toHaveClass('ty-quick-actions__actions_open');

    rerender(
      <QuickActions open={true}>
        <QuickActions.Action icon="A" />
      </QuickActions>
    );
    expect(container.querySelector('.ty-quick-actions__actions')).toHaveClass('ty-quick-actions__actions_open');
  });

  it('should render custom icon', () => {
    const { container } = render(
      <QuickActions icon={<span data-testid="custom">X</span>}>
        <QuickActions.Action icon="A" />
      </QuickActions>
    );
    expect(container.querySelector('[data-testid="custom"]')).toBeInTheDocument();
  });

  it('should render openIcon when open', () => {
    const { container } = render(
      <QuickActions open={true} openIcon={<span data-testid="open-icon">O</span>}>
        <QuickActions.Action icon="A" />
      </QuickActions>
    );
    expect(container.querySelector('[data-testid="open-icon"]')).toBeInTheDocument();
  });

  it('should call onOpen and onClose callbacks', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { container } = render(
      <QuickActions onOpen={onOpen} onClose={onClose}>
        <QuickActions.Action icon="A" />
      </QuickActions>
    );
    const root = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(root);
    expect(onOpen).toHaveBeenCalledTimes(1);
    fireEvent.mouseLeave(root);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should only call onOpen and onClose when the state changes', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { container } = render(
      <QuickActions onOpen={onOpen} onClose={onClose}>
        <QuickActions.Action icon="A" />
      </QuickActions>
    );
    const root = container.firstChild as HTMLElement;

    fireEvent.mouseEnter(root);
    fireEvent.mouseEnter(root);
    expect(onOpen).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(root);
    fireEvent.mouseLeave(root);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should disable action button', () => {
    const onClick = jest.fn();
    const { container } = render(
      <QuickActions open={true}>
        <QuickActions.Action icon="A" disabled onClick={onClick} />
      </QuickActions>
    );
    const action = container.querySelector('.ty-quick-actions__action') as HTMLButtonElement;
    expect(action).toBeDisabled();
    expect(action).toHaveClass('ty-quick-actions__action_disabled');
  });
});
