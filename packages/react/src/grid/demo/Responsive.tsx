import React from 'react';
import { Row, Col } from '@tiny-design/react';

export default function ResponsiveDemo() {
  const style = (bg: string): React.CSSProperties => ({
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
          <div style={style('color-mix(in srgb, var(--ty-color-primary) 90%, transparent)')}>xs=24 sm=12 md=8 lg=6</div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={style('color-mix(in srgb, var(--ty-color-primary) 70%, transparent)')}>xs=24 sm=12 md=8 lg=6</div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={style('color-mix(in srgb, var(--ty-color-primary) 90%, transparent)')}>xs=24 sm=12 md=8 lg=6</div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={style('color-mix(in srgb, var(--ty-color-primary) 70%, transparent)')}>xs=24 sm=12 md=8 lg=6</div>
        </Col>
      </Row>
    </>
  );
}
