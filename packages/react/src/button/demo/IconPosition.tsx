import React from 'react';
import { Button, Flex } from '@tiny-design/react';
import { IconArrowRight, IconDownload } from '@tiny-design/icons';

export default function IconPositionDemo() {
  return (
    <Flex gap="sm">
      <Button icon={<IconDownload />}>Download</Button>
      <Button variant="solid" color="primary" icon={<IconArrowRight />} iconPosition="end">
        Continue
      </Button>
    </Flex>
  );
}
