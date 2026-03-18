import React from 'react';
import { Row, Col } from '@tiny-design/react';

export default function BasicDemo() {
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
        <Col span={24}><div style={{...box, ...darkerBox}}>col</div></Col>
      </Row>
      <Row style={row}>
        <Col span={12}><div style={{...box, ...darkerBox}}>col-12</div></Col>
        <Col span={12}><div style={{...box, ...lighterBox}}>col-12</div></Col>
      </Row>
      <Row style={row}>
        <Col span={8}><div style={{...box, ...darkerBox}}>col-8</div></Col>
        <Col span={8}><div style={{...box, ...lighterBox}}>col-8</div></Col>
        <Col span={8}><div style={{...box, ...darkerBox}}>col-8</div></Col>
      </Row>
      <Row style={row}>
        <Col span={6}><div style={{...box, ...darkerBox}}>col-6</div></Col>
        <Col span={6}><div style={{...box, ...lighterBox}}>col-6</div></Col>
        <Col span={6}><div style={{...box, ...darkerBox}}>col-6</div></Col>
        <Col span={6}><div style={{...box, ...lighterBox}}>col-6</div></Col>
      </Row>
    </>
  );
}