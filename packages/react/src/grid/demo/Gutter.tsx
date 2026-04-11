import React from 'react';
import { Row, Col, Slider } from '@tiny-design/react';
import type { SliderValue } from '@tiny-design/react';

export default function GutterDemo() {
  const box: React.CSSProperties = {
    padding: '20px 0',
    color: '#fff',
    textAlign: 'center',
  };

  const lighterBox = {
    backgroundColor: 'color-mix(in srgb, var(--ty-color-primary) 84%, transparent)',
  };

  const darkerBox = {
    backgroundColor: 'color-mix(in srgb, var(--ty-color-primary) 98%, transparent)',
  };

  const [gutter, setGutter] = React.useState(8);

  return (
    <>
      <p>Gutter Size: </p>
      <Slider
        defaultValue={8}
        min={8}
        max={48}
        step={8}
        dots
        marks={{
          8: '8',
          16: '16',
          24: '24',
          32: '32',
          40: '40',
          48: '48',
        }}
        onChange={(val: SliderValue) => {
          if (typeof val === 'number') {
            setGutter(val);
          }
        }}
        style={{ width: 300 }}
      />
      <Row gutter={gutter} gutterSide>
        <Col span={6}><div style={{...box, ...darkerBox}}>col-6</div></Col>
        <Col span={6}><div style={{...box, ...lighterBox}}>col-6</div></Col>
        <Col span={6}><div style={{...box, ...darkerBox}}>col-6</div></Col>
        <Col span={6}><div style={{...box, ...lighterBox}}>col-6</div></Col>
      </Row>
    </>
  );
}
