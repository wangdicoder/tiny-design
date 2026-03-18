import React, { useState } from 'react';
import { Popover, Button } from '@tiny-design/react';

export default function ControlledDemo() {
  const [visible, setVisible] = useState(false);

  const content = (
    <Button
      btnType="ghost"
      onClick={() => setVisible(false)}
    >
      Close
    </Button>
  );

  return (
    <Popover
      visible={visible}
      onVisibleChange={(v) => setVisible(v)}
      title="Popover Title"
      content={content}
    >
      <Button btnType="primary">
        Click Me
      </Button>
    </Popover>
  );
}