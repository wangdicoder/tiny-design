import React from 'react';
import { Button, Flex } from '@tiny-design/react';
import { IconWifi, IconGift, IconSearch, IconCloudUpload } from '@tiny-design/icons';

export default function IconDemo() {
  return (
    <Flex gap="sm">
      <Button icon={<IconWifi />} color="primary" />
      <Button icon={<IconGift />} color="primary" />
      <Button icon={<IconSearch />} color="primary">Search</Button>
      <Button btnType="primary">Upload <IconCloudUpload /></Button>
    </Flex>
  );
}
