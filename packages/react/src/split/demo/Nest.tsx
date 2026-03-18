import React from 'react';
import { Split } from '@tiny-design/react';

export default function NestDemo() {
  return (
    <Split defaultSize={200} style={{ height: 300, border: '1px solid #dcdee2' }}>
      <div>
        Left
      </div>
      <Split mode="horizontal">
        <div>
          Top
        </div>
        <div>
          Bottom
        </div>
      </Split>
    </Split>
  );
}