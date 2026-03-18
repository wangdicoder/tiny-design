import React from 'react';
import { Button, Typography } from '@tiny-design/react';

const { Group } = Button;

export default function GroupDemo() {
  return (
    <>
      <div>
        <Typography.Heading level={6}>Basic</Typography.Heading>
        <Group>
          <Button>Go Left</Button>
          <Button>Go Right</Button>
        </Group>
        <br />
        <Group btnType="primary">
          <Button>Normal Button</Button>
          <Button>Middle</Button>
          <Button>Normal Button</Button>
        </Group>
      </div>
      <br />
      <div>
        <Typography.Heading level={6}>Group props</Typography.Heading>
        <Group size="lg">
          <Button>Go Left</Button>
          <Button>Go Right</Button>
        </Group>
        <br />
        <Group btnType="primary" round>
          <Button disabled>Normal Button</Button>
          <Button>Middle</Button>
          <Button>Normal Button</Button>
        </Group>
        <br />
        <Group btnType="green" disabled>
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </Group>
      </div>
    </>
  );
}
