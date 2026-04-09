import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SpeedDial from '../index';

describe('<SpeedDial />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <SpeedDial>
        <SpeedDial.Action icon="A" tooltip="Action A" />
        <SpeedDial.Action icon="B" tooltip="Action B" />
      </SpeedDial>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with default class', () => {
    const { container } = render(
      <SpeedDial>
        <SpeedDial.Action icon="A" />
      </SpeedDial>
    );
    expect(container.firstChild).toHaveClass('ty-speed-dial');
    expect(container.firstChild).toHaveClass('ty-speed-dial_up');
  });

  it('should render actions on hover', () => {
    const { container, getByText } = render(
      <SpeedDial>
        <SpeedDial.Action icon="A" tooltip="Action A" />
      </SpeedDial>
    );
    const root = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(root);
    expect(root.querySelector('.ty-speed-dial__actions')).toHaveClass('ty-speed-dial__actions_open');
    expect(getByText('Action A')).toBeInTheDocument();
  });

  it('should close actions on mouse leave', () => {
    const { container } = render(
      <SpeedDial>
        <SpeedDial.Action icon="A" />
      </SpeedDial>
    );
    const root = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(root);
    expect(root.querySelector('.ty-speed-dial__actions')).toHaveClass('ty-speed-dial__actions_open');
    fireEvent.mouseLeave(root);
    expect(root.querySelector('.ty-speed-dial__actions')).not.toHaveClass('ty-speed-dial__actions_open');
  });

  it('should toggle on click with click trigger', () => {
    const { container } = render(
      <SpeedDial trigger="click">
        <SpeedDial.Action icon="A" />
      </SpeedDial>
    );
    const button = container.querySelector('.ty-speed-dial__button') as HTMLElement;
    fireEvent.click(button);
    expect(container.querySelector('.ty-speed-dial__actions')).toHaveClass('ty-speed-dial__actions_open');
    fireEvent.click(button);
    expect(container.querySelector('.ty-speed-dial__actions')).not.toHaveClass('ty-speed-dial__actions_open');
  });

  it('should close on outside click with click trigger', () => {
    const { container, getByText } = render(
      <div>
        <SpeedDial trigger="click">
          <SpeedDial.Action icon="A" />
        </SpeedDial>
        <button>Outside</button>
      </div>
    );
    const button = container.querySelector('.ty-speed-dial__button') as HTMLElement;
    fireEvent.click(button);
    expect(container.querySelector('.ty-speed-dial__actions')).toHaveClass('ty-speed-dial__actions_open');

    fireEvent.click(getByText('Outside'));

    expect(container.querySelector('.ty-speed-dial__actions')).not.toHaveClass('ty-speed-dial__actions_open');
  });

  it('should render correct direction class', () => {
    const directions = ['up', 'down', 'left', 'right'] as const;
    directions.forEach((direction) => {
      const { container } = render(
        <SpeedDial direction={direction}>
          <SpeedDial.Action icon="A" />
        </SpeedDial>
      );
      expect(container.firstChild).toHaveClass(`ty-speed-dial_${direction}`);
    });
  });

  it('should not open when disabled', () => {
    const { container } = render(
      <SpeedDial disabled>
        <SpeedDial.Action icon="A" />
      </SpeedDial>
    );
    const root = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(root);
    expect(root.querySelector('.ty-speed-dial__actions')).not.toHaveClass('ty-speed-dial__actions_open');
  });

  it('should support controlled open', () => {
    const { container, rerender } = render(
      <SpeedDial open={false}>
        <SpeedDial.Action icon="A" />
      </SpeedDial>
    );
    expect(container.querySelector('.ty-speed-dial__actions')).not.toHaveClass('ty-speed-dial__actions_open');

    rerender(
      <SpeedDial open={true}>
        <SpeedDial.Action icon="A" />
      </SpeedDial>
    );
    expect(container.querySelector('.ty-speed-dial__actions')).toHaveClass('ty-speed-dial__actions_open');
  });

  it('should render custom icon', () => {
    const { container } = render(
      <SpeedDial icon={<span data-testid="custom">X</span>}>
        <SpeedDial.Action icon="A" />
      </SpeedDial>
    );
    expect(container.querySelector('[data-testid="custom"]')).toBeInTheDocument();
  });

  it('should render openIcon when open', () => {
    const { container } = render(
      <SpeedDial open={true} openIcon={<span data-testid="open-icon">O</span>}>
        <SpeedDial.Action icon="A" />
      </SpeedDial>
    );
    expect(container.querySelector('[data-testid="open-icon"]')).toBeInTheDocument();
  });

  it('should call onOpen and onClose callbacks', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { container } = render(
      <SpeedDial onOpen={onOpen} onClose={onClose}>
        <SpeedDial.Action icon="A" />
      </SpeedDial>
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
      <SpeedDial onOpen={onOpen} onClose={onClose}>
        <SpeedDial.Action icon="A" />
      </SpeedDial>
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
      <SpeedDial open={true}>
        <SpeedDial.Action icon="A" disabled onClick={onClick} />
      </SpeedDial>
    );
    const action = container.querySelector('.ty-speed-dial__action') as HTMLButtonElement;
    expect(action).toBeDisabled();
    expect(action).toHaveClass('ty-speed-dial__action_disabled');
  });
});
