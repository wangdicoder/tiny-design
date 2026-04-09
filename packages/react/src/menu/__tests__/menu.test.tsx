import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import Menu from '../index';

describe('<Menu />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Menu>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(
      <Menu>
        <Menu.Item>Item 1</Menu.Item>
      </Menu>
    );
    expect(container.firstChild).toHaveClass('ty-menu');
  });

  it('should render items', () => {
    const { getByText } = render(
      <Menu>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
      </Menu>
    );
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
  });

  it('should render horizontal mode', () => {
    const { container } = render(
      <Menu mode="horizontal">
        <Menu.Item>Item</Menu.Item>
      </Menu>
    );
    expect(container.firstChild).toHaveClass('ty-menu_horizontal');
  });

  it('should open submenu popup on hover in vertical mode', () => {
    render(
      <Menu mode="vertical">
        <Menu.SubMenu title="Parent">
          <Menu.Item>Child</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    fireEvent.mouseEnter(screen.getByText('Parent').closest('li') as HTMLElement);
    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('should close submenu popup on outside click', async () => {
    render(
      <div>
        <Menu mode="vertical">
          <Menu.SubMenu title="Parent">
            <Menu.Item>Child</Menu.Item>
          </Menu.SubMenu>
        </Menu>
        <button>Outside</button>
      </div>
    );

    fireEvent.mouseEnter(screen.getByText('Parent').closest('li') as HTMLElement);
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(screen.getByText('Child')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Outside'));

    await waitFor(() => {
      expect(screen.queryByText('Child')).not.toBeInTheDocument();
    });
  });
});
