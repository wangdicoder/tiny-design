import React from 'react';
import { Skeleton, ConfigProvider, Row, Col } from '@tiny-design/react';

export default function CombinationDemo() {
  return (
    <ConfigProvider shimmer>
      <Row>
        <Col span={2}>
          <Skeleton rounded style={{ width: 50, height: 50 }} />
        </Col>
        <Col span={22}>
          <div>
            <Skeleton style={{ width: 300 }} />
          </div>
          <div>
            <Skeleton style={{ width: 300 }} />
          </div>
        </Col>
      </Row>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </ConfigProvider>
  );
}