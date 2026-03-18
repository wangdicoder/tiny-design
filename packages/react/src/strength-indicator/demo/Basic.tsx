import React, { useState } from 'react';
import { Button, StrengthIndicator } from '@tiny-design/react';

export default function BasicDemo() {
  const [current, setCurrent] = useState(1);

  const handleClick = () => {
    setCurrent((prev) => {
      if (prev < 3) {
        return prev + 1;
      }
      return 0;
    });
  };

  return (
    <div>
      <StrengthIndicator current={current} />
      <br />
      <Button btnType="primary" onClick={handleClick}>
        Next
      </Button>
    </div>
  );
}