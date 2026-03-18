import React from 'react';
import { Switch } from '@tiny-design/react';

export default function LoadingDemo() {
  return (
    <div>
      <Switch loading checked={true} />
      <br />
      <br />
      <Switch loading checked={false} />
    </div>
  );
}