import React from 'react';
import { Upload, Button } from '@tiny-design/react';

export default function UploadListDemo() {
  return (
    <Upload
      name="file"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      defaultFileList={[
        {
          uid: '1',
          name: 'pic.png',
          status: 'done',
          url: 'http://www.google.com/pic.png',
        },
        {
          uid: '2',
          name: 'file1.docx',
          status: 'done',
          url: 'http://www.google.com/file1.docx',
        },
        {
          uid: '3',
          name: 'zzz.png',
          status: 'error',
          url: 'http://www.google.com/zzz.png',
        },
      ]}>
      <Button variant="solid" color="primary">
        Upload
      </Button>
    </Upload>
  );
}
