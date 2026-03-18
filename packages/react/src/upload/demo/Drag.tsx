import React from 'react';
import { Upload } from '@tiny-design/react';
import { IconCloudUpload } from '@tiny-design/icons';

export default function DragDemo() {
  return (
    <Upload
      drag
      name="file"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
      <p style={{marginBottom: 20}}>
        <IconCloudUpload color="#1890ff" size={50}/>
      </p>
      <p style={{color: 'rgba(0,0,0,.85)', fontSize: 16}}>Click or drag file to this area to upload</p>
      <p style={{color: 'rgba(0,0,0,.45)', fontSize: 14}}>
         Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
      </p>
    </Upload>
  );
}