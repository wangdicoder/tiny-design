import React from 'react';
import { Button } from '@tiny-design/react';

export default function BlockDemo() {
  const style = {
    marginBottom: 12,
  };

  return (
    <>
      <Button block style={style}>Default Button</Button>
      <Button block btnType="primary" style={style}>Primary Button</Button>
      <Button block btnType="outline" style={style}>Outline Button</Button>
      <Button block btnType="ghost" style={style}>Ghost Button</Button>
      <Button block btnType="link" style={style}>Link Button</Button>
    </>
  );
}
