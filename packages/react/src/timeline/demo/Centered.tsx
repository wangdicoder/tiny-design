import React from 'react';
import { Timeline } from '@tiny-design/react';

export default function CenteredDemo() {
  return (
    <Timeline position="center">
      <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
      <Timeline.Item>Solve initial network problems 2015-09-04</Timeline.Item>
      <Timeline.Item>Technical testing 2015-09-12</Timeline.Item>
      <Timeline.Item>Network problems being solved 2015-09-20</Timeline.Item>
    </Timeline>
  );
}