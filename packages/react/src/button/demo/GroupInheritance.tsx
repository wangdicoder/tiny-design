import React from 'react';
import { Button, Flex } from '@tiny-design/react';

const { Group } = Button;

export default function GroupInheritanceDemo() {
  return (
    <Flex vertical gap="sm">
      <Group variant="solid" color="primary" size="lg" disabled>
        <Button>Inherited</Button>
        <Button disabled={false}>Enabled Override</Button>
        <Button variant="solid" color="danger">Danger Override</Button>
      </Group>
      <Group variant="solid" color="primary" inheritMode="override">
        <Button variant="solid" color="danger">Forced Primary</Button>
        <Button size="sm">Forced Size</Button>
      </Group>
    </Flex>
  );
}
