import React from 'react';
import { Switch } from '@tiny-design/react';

export default function SizeDemo() {
  return (
    <div>
      <Switch size="sm" checkedText="sm" />
      <br />
      <br />
      <Switch checkedText="md" />
      <br />
      <br />
      <Switch size="lg" checkedText="lg" />
    </div>
  );
}