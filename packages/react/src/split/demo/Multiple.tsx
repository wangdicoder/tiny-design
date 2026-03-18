import React from 'react';
import { Split } from '@tiny-design/react';

export default function MultipleDemo() {
  return (
    <Split style={{ height: 200, border: '1px solid #dcdee2' }}>
      <div>
        Left
      </div>
      <div>
        Right
      </div>
    </Split>
  );
}