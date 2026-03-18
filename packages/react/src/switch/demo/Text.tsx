import React from 'react';
import { Switch } from '@tiny-design/react';

export default function TextDemo() {
  return (
    <div>
      <Switch checkedText="On" uncheckedText="Off" />
      <br />
      <br />
      <Switch checkedText="开" uncheckedText="关" />
    </div>
  );
}