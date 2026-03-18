import React from 'react';
import { Row, Col } from '@tiny-design/react';

export default function ResponsiveDemo() {
  const style = (bg: string) => ({
    background: bg,
    color: '#fff',
    padding: '12px 0',
    textAlign: 'center',
    borderRadius: 4,
    marginBottom: 8,
  });

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={style('rgba(110, 65, 191, 0.9)')}>xs=24 sm=12 md=8 lg=6</div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={style('rgba(110, 65, 191, 0.7)')}>xs=24 sm=12 md=8 lg=6</div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={style('rgba(110, 65, 191, 0.9)')}>xs=24 sm=12 md=8 lg=6</div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={style('rgba(110, 65, 191, 0.7)')}>xs=24 sm=12 md=8 lg=6</div>
        </Col>
      </Row>
    </>
  );
}