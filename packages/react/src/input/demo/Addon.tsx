import React from 'react';
import { Input } from '@tiny-design/react';
import { IconUser } from '@tiny-design/icons';

export default function AddonDemo() {
  const { Group, Addon } = Input;

  return (
    <div style={{ width: 400 }}>
      <Group>
        <Addon>@</Addon>
        <Input />
      </Group>
      <br />
      <Group>
        <Input placeholder="your domain" />
        <Addon>.com</Addon>
      </Group>
      <br />
      <Group>
        <Addon>$</Addon>
        <Input />
        <Addon>.00</Addon>
      </Group>
      <br />
      <Group>
        <Input placeholder="From" />
        <Addon>To</Addon>
        <Input placeholder="Destination" />
      </Group>
      <br />
      <Group>
        <Addon><IconUser /></Addon>
        <Input placeholder="Your name" />
      </Group>
    </div>
  );
}