import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Dropdown from '../index';
import Menu from '../../menu';

describe('<Dropdown />', () => {
  it('should match the snapshot', () => {
    const overlay = <div>Menu</div>;
    const { asFragment } = render(<Dropdown overlay={overlay}><button>Trigger</button></Dropdown>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render trigger', () => {
    const overlay = <div>Menu</div>;
    const { getByText } = render(<Dropdown overlay={overlay}><button>Click me</button></Dropdown>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('should open and close on outside click for click trigger', async () => {
    render(
      <div>
        <Dropdown trigger="click" overlay={<div>Menu</div>}>
          <button>Trigger</button>
        </Dropdown>
        <button>Outside</button>
      </div>
    );

    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByText('Menu')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Outside'));

    await waitFor(() => {
      expect(screen.queryByText('Menu')).not.toBeInTheDocument();
    });
  });

  it('should close when a menu item is selected', async () => {
    render(
      <Dropdown
        trigger="click"
        overlay={
          <Menu>
            <Menu.Item>Menu Item</Menu.Item>
          </Menu>
        }
      >
        <button>Trigger</button>
      </Dropdown>
    );

    fireEvent.click(screen.getByText('Trigger'));
    fireEvent.click(screen.getByText('Menu Item'));

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('should keep the menu open when overlay onSelect handles visibility itself', async () => {
    const ControlledDemo = () => {
      const [visible, setVisible] = React.useState(false);

      return (
        <Dropdown
          trigger="click"
          visible={visible}
          onVisibleChange={(nextVisible) => {
            if (nextVisible) {
              setVisible(true);
            }
          }}
          overlay={
            <Menu onSelect={() => {}}>
              <Menu.Item>Menu Item</Menu.Item>
            </Menu>
          }>
          <button>Trigger</button>
        </Dropdown>
      );
    };

    render(<ControlledDemo />);

    fireEvent.click(screen.getByText('Trigger'));
    fireEvent.click(screen.getByText('Menu Item'));

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  it('should respect controlled visible prop', () => {
    const { rerender } = render(
      <Dropdown visible={false} trigger="click" overlay={<div>Menu</div>}>
        <button>Trigger</button>
      </Dropdown>
    );

    expect(screen.queryByText('Menu')).not.toBeInTheDocument();

    rerender(
      <Dropdown visible={true} trigger="click" overlay={<div>Menu</div>}>
        <button>Trigger</button>
      </Dropdown>
    );

    expect(screen.getByText('Menu')).toBeInTheDocument();
  });
});
