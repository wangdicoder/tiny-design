import React from 'react';
import { Row, Col } from '@tiny-design/react';

export default function OrderDemo() {
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

  return (
    <>
      <Row>
        <Col span={6} order={4}><div style={{...box, ...darkerBox}}>1 col-order-4</div></Col>
        <Col span={6} order={3}><div style={{...box, ...lighterBox}}>2 col-order-4</div></Col>
        <Col span={6} order={2}><div style={{...box, ...darkerBox}}>3 col-order-4</div></Col>
        <Col span={6} order={1}><div style={{...box, ...lighterBox}}>4 col-order-4</div></Col>
      </Row>
    </>
  );
}
