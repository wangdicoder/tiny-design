import React from 'react';
import { Link, Flex } from '@tiny-design/react';

export default function UnderlineDemo() {
  return (
    <Flex vertical gap="sm">
      <span>This is a <Link href="https://tiny-design.dev/">link</Link> with underline style.</span>
      <span>This is a <Link href="https://tiny-design.dev/" underline={false}>link</Link> without underline style.</span>
    </Flex>
  );
}
