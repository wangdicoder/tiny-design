import React, { useState } from 'react';
import { Button, Space, Radio } from '@tiny-design/react';

export default function AlignDemo() {
  const wrapperStyle = {
    display: 'inline-block',
    border: '1px solid #6E41BF',
    padding: 4,
  };

  const boxStyle = {
    display: 'inline-block',
    padding: '16px 8px 32px',
    background: 'rgba(150, 150, 150, 0.2)',
  };

  const [align, setAlign] = useState('center');

  return (
    <>
      <Radio.Group value={align} onChange={(val: any) => setAlign(val)}>
        <Radio value="start">Start</Radio>
        <Radio value="center">Center</Radio>
        <Radio value="end">End</Radio>
        <Radio value="baseline">Baseline</Radio>
      </Radio.Group>
      <br />
      <br />
      <div style={wrapperStyle}>
        <Space align={align}>
          center
          <Button btnType="primary">Primary</Button>
          <span style={boxStyle}>Block</span>
        </Space>
      </div>
    </>
  );
}