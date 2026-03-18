import React from 'react';
import { Upload, Button } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <Upload
      name="file"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
      <Button>Click to Upload</Button>
    </Upload>
  );
}