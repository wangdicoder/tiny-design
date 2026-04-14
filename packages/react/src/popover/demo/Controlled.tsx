import React, { useState } from 'react';
import { Popover, Button } from '@tiny-design/react';

export default function ControlledDemo() {
  const [visible, setVisible] = useState(false);

  const content = (
    <Button variant="ghost" color="primary" onClick={() => setVisible(false)}>
      Close
    </Button>
  );

  return (
    <Popover
      visible={visible}
      onVisibleChange={(v) => setVisible(v)}
      title="Popover Title"
      content={content}>
      <Button variant="solid" color="primary">
        Click Me
      </Button>
    </Popover>
  );
}
