import React from 'react';
import { Input } from '@tiny-design/react';
import { IconUser, IconSearch } from '@tiny-design/icons';

export default function PreSufFixDemo() {
  const { Group, Addon } = Input;

  const searchOnClick = (e: any) => {
    console.log(e);
  };

  return (
    <div style={{ width: 400 }}>
      <Input prefix="@@@@" />
      <br />
      <Input placeholder="your domain" suffix=".com" />
      <br />
      <Input prefix="$" suffix=".00" />
      <br />
      <Input placeholder="Your name" prefix={<IconUser />} />
      <br />
      <Input
        placeholder="your domain"
        suffix={<IconSearch onClick={searchOnClick} style={{ cursor: 'pointer' }} />}
      />
    </div>
  );
}