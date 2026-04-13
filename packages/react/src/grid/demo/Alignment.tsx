import React from 'react';
import { Row, Col, Divider } from '@tiny-design/react';

export default function AlignmentDemo() {
  const row: React.CSSProperties = {
    padding: '10px 0',
    margin: '16px 0',
    background: 'rgba(128, 128, 128, 0.08)',
  };

  const box: React.CSSProperties = {
    color: '#fff',
    textAlign: 'center',
  };

  const box100 = {
    height: 100,
    lineHeight: '100px',
  };

  const box50 = {
    height: 50,
    lineHeight: '50px',
  };

  const box120 = {
    height: 120,
    lineHeight: '120px',
  };

  const box80 = {
    height: 80,
    lineHeight: '80px',
  };

  const lighterBox = {
    backgroundColor: 'color-mix(in srgb, var(--ty-color-primary) 84%, transparent)',
  };

  const darkerBox = {
    backgroundColor: 'color-mix(in srgb, var(--ty-color-primary) 98%, transparent)',
  };

  return (
    <>
      <Divider align="left">Align Top</Divider>
      <Row style={row} justify="center" align="top">
        <Col span={4}><div style={{...box, ...darkerBox, ...box100}}>col-4</div></Col>
        <Col span={4}><div style={{...box, ...lighterBox, ...box50}}>col-4</div></Col>
        <Col span={4}><div style={{...box, ...darkerBox, ...box120}}>col-4</div></Col>
        <Col span={4}><div style={{...box, ...lighterBox, ...box80}}>col-4</div></Col>
      </Row>

      <Divider align="left">Align Center</Divider>
      <Row style={row} justify="space-around" align="center">
        <Col span={4}><div style={{...box, ...darkerBox, ...box100}}>col-4</div></Col>
        <Col span={4}><div style={{...box, ...lighterBox, ...box50}}>col-4</div></Col>
        <Col span={4}><div style={{...box, ...darkerBox, ...box120}}>col-4</div></Col>
        <Col span={4}><div style={{...box, ...lighterBox, ...box80}}>col-4</div></Col>
      </Row>

      <Divider align="left">Align Bottom</Divider>
      <Row style={row} justify="space-between" align="bottom">
        <Col span={4}><div style={{...box, ...darkerBox, ...box100}}>col-4</div></Col>
        <Col span={4}><div style={{...box, ...lighterBox, ...box50}}>col-4</div></Col>
        <Col span={4}><div style={{...box, ...darkerBox, ...box120}}>col-4</div></Col>
        <Col span={4}><div style={{...box, ...lighterBox, ...box80}}>col-4</div></Col>
      </Row>
    </>
  );
}
