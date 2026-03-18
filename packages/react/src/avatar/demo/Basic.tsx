import React from 'react';
import { Avatar, Flex } from '@tiny-design/react';
import { IconUser } from '@tiny-design/icons';

export default function BasicDemo() {
  const style = {
    marginRight: 10
  };

  return (
    <>
      <Flex gap="sm">
        <Avatar icon={<IconUser size={50} />} size={70} style={style} />
        <Avatar icon={<IconUser size={35} />} size={50} style={style} />
        <Avatar icon={<IconUser size={25} />} style={style} />
        <Avatar icon={<IconUser />} size={24} style={style} />
      </Flex>
      <br />
      <Flex gap="sm">
        <Avatar shape="square" icon={<IconUser size={50} />} size={70} style={style} />
        <Avatar shape="square" icon={<IconUser size={35} />} size={50} style={style} />
        <Avatar shape="square" icon={<IconUser size={25} />} style={style} />
        <Avatar shape="square" icon={<IconUser />} size={24} style={style} />
      </Flex>
    </>
  );
}