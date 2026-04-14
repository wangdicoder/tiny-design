import React from 'react';
import { Input, Button } from '@tiny-design/react';
import { IconSearch } from '@tiny-design/icons';

export default function AddonButtonDemo() {
  const { Group, Addon } = Input;

  return (
    <div style={{ width: 400 }}>
      <Group size="sm">
        <Input />
        <Addon noBorder>
          <Button
            variant="solid"
            color="primary"
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginRight: 0 }}>
            <IconSearch />
          </Button>
        </Addon>
      </Group>
      <br />
      <Group>
        <Input />
        <Addon noBorder>
          <Button
            variant="solid"
            color="primary"
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginRight: 0 }}>
            <IconSearch />
          </Button>
        </Addon>
      </Group>
      <br />
      <Group size="lg">
        <Input />
        <Addon noBorder>
          <Button
            variant="solid"
            color="primary"
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginRight: 0 }}>
            Search
          </Button>
        </Addon>
      </Group>
    </div>
  );
}
