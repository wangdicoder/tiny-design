import React from 'react';
import { Tag, Button } from '@tiny-design/react';

export default function ControlledDemo() {
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <Tag closable visible={visible} onClose={() => setVisible(false)}>
        Movies
      </Tag>
      <br />
      <br />
      <Button variant="solid" color="primary" size="sm" onClick={() => setVisible(!visible)}>
        Toggle
      </Button>
    </>
  );
}
