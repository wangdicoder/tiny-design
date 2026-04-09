import React from 'react';
import { Dropdown, Menu } from '@tiny-design/react';
import { IconDown } from '@tiny-design/icons';

export default function CloseDemo() {
  const [visible, setVisible] = React.useState(false);

  const handleMenuClick = (key) => {
    if (key === '2') {
      setVisible(false);
    }
  };

  const handleVisibleChange = (vis) => {
    if (vis) {
      setVisible(vis);
    }
  };

  const renderOverlay = () => (
    <Menu onSelect={handleMenuClick}>
      <Menu.Item key="1">Clicking me will not close the menu.</Menu.Item>
      <Menu.Item key="2">Clicking me will also not close the menu.</Menu.Item>
      <Menu.Item key="3">Clicking me will close the menu.</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={renderOverlay()}
      onVisibleChange={handleVisibleChange}
      visible={visible}
    >
      <a onClick={(e) => e.preventDefault()}>
        Hover me <IconDown size={12} />
      </a>
    </Dropdown>
  );
}
