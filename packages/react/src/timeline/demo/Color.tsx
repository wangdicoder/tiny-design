import React from 'react';
import { Timeline } from '@tiny-design/react';

export default function ColorDemo() {
  return (
    <Timeline>
      <Timeline.Item dotStyle={{ borderColor: '#f30' }}>
        Create a services site 2015-09-01
      </Timeline.Item>
      <Timeline.Item dotStyle={{ borderColor: '#52c41a' }}>
        Solve initial network problems 2015-09-04
      </Timeline.Item>
      <Timeline.Item dotStyle={{ borderColor: '#1890ff' }}>
        Technical testing 2015-09-12
      </Timeline.Item>
      <Timeline.Item>Network problems being solved 2015-09-20</Timeline.Item>
    </Timeline>
  );
}