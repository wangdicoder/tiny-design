import React from 'react';
import { Row, Col } from '@tiny-design/react';

export default function OffsetDemo() {
  const row = {
    margin: '16px 0',
  };

  const box = {
    padding: '20px 0',
    color: '#fff',
    textAlign: 'center',
  };

  const lighterBox = {
    backgroundColor: '#6E41BFD6',
  };

  const darkerBox = {
    backgroundColor: '#6E41BFFA',
  };

  return (
    <>
      <Row style={row}>
        <Col span={12} offset={6}><div style={{...box, ...lighterBox}}>col-12 col-offset-6</div></Col>
      </Row>
      <Row style={row}>
        <Col span={8}><div style={{...box, ...darkerBox}}>col-8</div></Col>
        <Col span={8} offset={8}><div style={{...box, ...lighterBox}}>col-8 col-offset-8</div></Col>
      </Row>
      <Row style={row}>
        <Col span={6} offset={6}><div style={{...box, ...darkerBox}}>col-6 col-offset-6</div></Col>
        <Col span={6} offset={6}><div style={{...box, ...lighterBox}}>col-6 col-offset-6</div></Col>
      </Row>
    </>
  );
}