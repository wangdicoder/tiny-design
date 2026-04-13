import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import Menu from '../index';
import ConfigProvider from '../../config-provider';

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

  it('should support controlled selected keys and variants', () => {
    render(
      <Menu
        mode="vertical"
        variant="fill"
        selectionStyle="background"
        selectedKeys={['analytics']}>
        <Menu.Item index="overview">Overview</Menu.Item>
        <Menu.Item index="analytics">Analytics</Menu.Item>
      </Menu>
    );

    expect(screen.getByText('Analytics').closest('li')).toHaveClass('ty-menu-item_selected');
  });

  it('should open inline submenu from defaultOpenKeys', () => {
    render(
      <Menu mode="inline" defaultOpenKeys={['parent']}>
        <Menu.SubMenu index="parent" title="Parent">
          <Menu.Item index="child">Child</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('should mark inline parent submenu on first render when a descendant is selected', async () => {
    render(
      <Menu
        mode="inline"
        defaultOpenKeys={['parent']}
        defaultSelectedKeys={['child']}>
        <Menu.SubMenu index="parent" title="Parent">
          <Menu.Item index="child">Child</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    await waitFor(() => {
      expect(screen.getByText('Parent').closest('.ty-menu-sub__title')).toHaveClass(
        'ty-menu-item_child-selected'
      );
      expect(screen.getByText('Parent').closest('.ty-menu-sub__title')).toHaveClass(
        'ty-menu-item_path-selected'
      );
    });
  });

  it('should mark popup parent submenu on first render when a descendant is selected', async () => {
    render(
      <Menu
        mode="vertical"
        defaultSelectedKeys={['child']}>
        <Menu.SubMenu index="parent" title="Parent">
          <Menu.Item index="child">Child</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    await waitFor(() => {
      expect(screen.getByText('Parent').closest('.ty-menu-sub__title')).toHaveClass(
        'ty-menu-item_child-selected'
      );
      expect(screen.getByText('Parent').closest('.ty-menu-sub__title')).toHaveClass(
        'ty-menu-item_path-selected'
      );
    });
  });

  it('should open submenu popup on hover in vertical mode', () => {
    render(
      <Menu mode="vertical">
        <Menu.SubMenu title="Parent">
          <Menu.Item>Child</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    fireEvent.mouseEnter(screen.getByText('Parent').closest('.ty-menu-sub') as HTMLElement);
    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('should close submenu popup when pointer leaves the trigger area', async () => {
    render(
      <div>
        <Menu mode="vertical">
          <Menu.SubMenu title="Parent">
            <Menu.Item>Child</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    );

    fireEvent.mouseEnter(screen.getByText('Parent').closest('.ty-menu-sub') as HTMLElement);
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(screen.getByText('Child')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByText('Parent').closest('.ty-menu-sub') as HTMLElement);
    act(() => {
      jest.advanceTimersByTime(250);
    });

    await waitFor(() => {
      expect(screen.queryByText('Child')).not.toBeInTheDocument();
    });
  });

  it('should keep only the active popup submenu branch open', async () => {
    render(
      <Menu mode="vertical">
        <Menu.SubMenu index="customers" title="Customers">
          <Menu.Item index="customers-list">Customer List</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu index="settings" title="Workspace Settings">
          <Menu.Item index="settings-general">General</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    fireEvent.mouseEnter(screen.getByText('Customers').closest('.ty-menu-sub') as HTMLElement);
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(screen.getByText('Customer List')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByText('Customers').closest('.ty-menu-sub') as HTMLElement);
    fireEvent.mouseEnter(screen.getByText('Workspace Settings').closest('.ty-menu-sub') as HTMLElement);
    act(() => {
      jest.advanceTimersByTime(250);
    });

    await waitFor(() => {
      expect(screen.queryByText('Customer List')).not.toBeInTheDocument();
    });
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('should keep popup submenu item selected after reopening', async () => {
    render(
      <Menu mode="vertical">
        <Menu.SubMenu index="customers" title="Customers">
          <Menu.Item index="customers-list">Customer List</Menu.Item>
          <Menu.Item index="customers-segments">Segments</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    const customersSubMenu = screen.getByText('Customers').closest('.ty-menu-sub') as HTMLElement;

    fireEvent.mouseEnter(customersSubMenu);
    act(() => {
      jest.advanceTimersByTime(250);
    });

    fireEvent.click(screen.getByText('Segments'));

    fireEvent.mouseLeave(customersSubMenu);
    act(() => {
      jest.advanceTimersByTime(250);
    });

    await waitFor(() => {
      expect(screen.queryByText('Segments')).not.toBeInTheDocument();
    });

    fireEvent.mouseEnter(customersSubMenu);
    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(screen.getByText('Segments').closest('li')).toHaveClass('ty-menu-item_selected');
  });

  it('should mark popup parent submenu when a nested descendant is selected', async () => {
    render(
      <Menu mode="horizontal">
        <Menu.SubMenu index="resources" title="Resources">
          <Menu.SubMenu index="community" title="Community">
            <Menu.Item index="showcase">Showcase</Menu.Item>
            <Menu.Item index="discord">Discord</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
    );

    const resourcesSubMenu = screen.getByText('Resources').closest('.ty-menu-sub') as HTMLElement;

    fireEvent.mouseEnter(resourcesSubMenu);
    act(() => {
      jest.advanceTimersByTime(250);
    });

    const communitySubMenu = screen.getByText('Community').closest('.ty-menu-sub') as HTMLElement;
    fireEvent.mouseEnter(communitySubMenu);
    act(() => {
      jest.advanceTimersByTime(250);
    });

    fireEvent.click(screen.getByText('Showcase'));

    fireEvent.mouseEnter(resourcesSubMenu);
    act(() => {
      jest.advanceTimersByTime(250);
    });

    fireEvent.mouseEnter(screen.getByText('Community').closest('.ty-menu-sub') as HTMLElement);
    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(screen.getByText('Community').closest('.ty-menu-sub__title')).toHaveClass(
      'ty-menu-item_child-selected'
    );
    expect(screen.getByText('Community').closest('.ty-menu-sub__title')).toHaveClass(
      'ty-menu-item_path-selected'
    );
  });

  it('should open nested horizontal submenu as a right-side popup', () => {
    render(
      <Menu mode="horizontal">
        <Menu.SubMenu index="resources" title="Resources">
          <Menu.SubMenu index="community" title="Community">
            <Menu.Item index="showcase">Showcase</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
    );

    fireEvent.mouseEnter(screen.getByText('Resources').closest('.ty-menu-sub') as HTMLElement);
    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(
      screen.getByText('Community').closest('.ty-menu-sub__title')?.querySelector('.ty-menu-sub__arrow_right')
    ).toBeTruthy();
  });

  it('should size nested popup submenu to its trigger width', () => {
    render(
      <Menu mode="vertical">
        <Menu.SubMenu index="customers" title="Customers">
          <Menu.SubMenu index="lifecycle" title="Lifecycle">
            <Menu.Item index="new-users">New Users</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
    );

    const customersSubMenu = screen.getByText('Customers').closest('.ty-menu-sub') as HTMLElement;
    fireEvent.mouseEnter(customersSubMenu);
    act(() => {
      jest.advanceTimersByTime(250);
    });

    const lifecycleTitle = screen.getByText('Lifecycle').closest('.ty-menu-sub__title') as HTMLElement;
    Object.defineProperty(lifecycleTitle, 'offsetWidth', {
      configurable: true,
      value: 240,
    });

    fireEvent.mouseEnter(lifecycleTitle.closest('.ty-menu-sub') as HTMLElement);
    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(screen.getByText('New Users').closest('.ty-menu-sub__list_popup')).toHaveStyle({
      minWidth: '240px',
    });
  });

  it('should follow global theme when theme prop is not provided and respect explicit theme override', () => {
    const { container, rerender } = render(
      <ConfigProvider theme="dark">
        <Menu>
          <Menu.Item>Item</Menu.Item>
        </Menu>
      </ConfigProvider>
    );

    expect(container.querySelector('.ty-menu')).toHaveClass('ty-menu_dark');

    rerender(
      <ConfigProvider theme="dark">
        <Menu theme="light">
          <Menu.Item>Item</Menu.Item>
        </Menu>
      </ConfigProvider>
    );

    expect(container.querySelector('.ty-menu')).toHaveClass('ty-menu_light');
  });
});
