import React from 'react';
import { Flex, Radio, Skeleton } from '@tiny-design/react';

type AnimationMode = 'shimmer' | 'pulse';

export default function ActiveDemo() {
  const [animation, setAnimation] = React.useState<AnimationMode>('shimmer');

  return (
    <Flex vertical gap={16}>
      <Radio.Group value={animation} onChange={(value) => setAnimation(value as AnimationMode)}>
        <Radio value="shimmer">shimmer</Radio>
        <Radio value="pulse">pulse</Radio>
      </Radio.Group>

      <div>
        <Skeleton animation={animation} width={300} />
        <Skeleton animation={animation} />
        <Skeleton animation={animation} />
        <Skeleton animation={animation} />
      </div>
    </Flex>
  );
}
