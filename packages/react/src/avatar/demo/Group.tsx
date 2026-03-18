import React from 'react';
import { Avatar } from '@tiny-design/react';

export default function GroupDemo() {
  const { Group } = Avatar;

  return (
    <div>
      <Group>
        <Avatar size={42} src="../avatar/avatar2.png" />
        <Avatar size={42} src="../avatar/avatar3.png" />
        <Avatar size={42} src="../avatar/avatar4.png" />
        <Avatar size={42} src="../avatar/avatar5.png" />
      </Group>
      <br />
      <br />
      <Group>
        <Avatar size={42} src="../avatar/avatar2.png" />
        <Avatar size={42} src="../avatar/avatar3.png" />
        <Avatar size={42} src="../avatar/avatar4.png" />
        <Avatar size={42} src="../avatar/avatar5.png" />
        <Avatar size={42}>+100</Avatar>
      </Group>
      <br />
      <br />
      <Group gap={0}>
        <Avatar size={42} src="../avatar/avatar2.png" />
        <Avatar size={42} src="../avatar/avatar3.png" />
        <Avatar size={42} src="../avatar/avatar4.png" />
        <Avatar size={42} src="../avatar/avatar5.png" />
      </Group>
    </div>
  );
}