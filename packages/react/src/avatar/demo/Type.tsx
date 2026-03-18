import React from 'react';
import { Avatar } from '@tiny-design/react';
import { IconUser } from '@tiny-design/icons';

export default function TypeDemo() {
  const style = {
    marginRight: 10
  };

  return (
    <>
      <Avatar icon={<IconUser size={20}/>} style={style}/>
      <Avatar style={style}>U</Avatar>
      <Avatar style={style}>USER</Avatar>
      <Avatar src="../avatar/avatar1.png" style={{ ...style }}/>
      <Avatar style={{ ...style, color: '#f56a00', backgroundColor: '#fde3cf' }}>LW</Avatar>
      <Avatar style={{ ...style, backgroundColor: '#87d068' }} icon={<IconUser size={20}/>} />
    </>
  );
}