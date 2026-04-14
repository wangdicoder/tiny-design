import React from 'react';
import { Button } from '@tiny-design/react';

export default function BlockDemo() {
  const style = {
    marginBottom: 12,
  };

  return (
    <>
      <Button block style={style}>
        Default Button
      </Button>
      <Button block variant="solid" color="primary" style={style}>
        Primary Button
      </Button>
      <Button block variant="outline" color="primary" style={style}>
        Outline Button
      </Button>
      <Button block variant="ghost" color="primary" style={style}>
        Ghost Button
      </Button>
      <Button block variant="link" color="primary" style={style}>
        Link Button
      </Button>
    </>
  );
}
