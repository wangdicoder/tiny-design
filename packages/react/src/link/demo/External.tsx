import React from 'react';
import { Link, Flex, VerticalSpace } from '@tiny-design/react';

export default function ExternalDemo() {
  return (
    <Flex direction="vertical" gap="sm">
      <span>This <Link href="https://google.com/">link</Link> will open a new window.</span>
      <span>This <Link external={false} href="https://google.com/">link</Link> will refresh the current window.</span>
    </Flex>
  );
}