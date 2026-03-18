import React from 'react';
import { Drawer, Button } from '@tiny-design/react';

export default function MultiLevelDemo() {
  const [visible, setVisible] = React.useState(false);
  const [childVisible, setChildVisible] = React.useState(false);

  return (
    <>
      <Button btnType="primary" onClick={() => setVisible(true)}>
        Open drawer
      </Button>
      <Drawer
        header="Multi-level drawer"
        size={520}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Button btnType="primary" onClick={() => setChildVisible(true)}>
          Two-level drawer
        </Button>
        <Drawer
          header="Two-level Drawer"
          size={320}
          closable={false}
          onClose={() => setChildVisible(false)}
          visible={childVisible}
        >
          This is two-level drawer
        </Drawer>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button onClick={() => setVisible(false)}>Cancel</Button>
          <Button onClick={() => setVisible(false)} btnType="primary">
            Submit
          </Button>
        </div>
      </Drawer>
    </>
  );
}