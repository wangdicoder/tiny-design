import React from 'react';
import { Button, Heading } from '@tiny-design/react';

const { Group } = Button;

export default function GroupDemo() {
  return (
    <>
      <div>
        <Heading level={6}>Basic</Heading>
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
        <Heading level={6}>Group props</Heading>
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
