import React from 'react';
import { Skeleton, ConfigProvider, Flex } from '@tiny-design/react';

export default function CombinationDemo() {
  return (
    <ConfigProvider skeleton={{ animation: 'shimmer' }}>
      <Flex gap="sm" vertical>
        <Flex gap="sm">
          <Skeleton.Avatar size={50} />
          <div>
            <Skeleton width={300} />
            <Skeleton width={300} />
          </div>
        </Flex>
        <Skeleton title paragraph={{ rows: 2 }} />
        <Skeleton title paragraph={{ rows: 4 }} />
      </Flex>
    </ConfigProvider>
  );
}
