import React from 'react';
import { Button, Flex } from '@tiny-design/react';
import { IconWifi, IconGift, IconSearch, IconCloudUpload } from '@tiny-design/icons';

export default function IconDemo() {
  return (
    <Flex gap="sm">
      <Button icon={<IconWifi />} variant="solid" color="primary" aria-label="Network" />
      <Button
        icon={<IconGift />}
        variant="solid"
        color="primary"
        shape="circle"
        aria-label="Gift"
      />
      <Button icon={<IconSearch />} variant="solid" color="primary">
        Search
      </Button>
      <Button variant="solid" color="primary" icon={<IconCloudUpload />} iconPosition="end">
        Upload
      </Button>
    </Flex>
  );
}
