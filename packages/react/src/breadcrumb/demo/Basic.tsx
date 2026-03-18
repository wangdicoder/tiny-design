import React from 'react';
import { Breadcrumb } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="#/components/breadcrumb">Project Center</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="#/components/breadcrumb">Project List</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>A Project</Breadcrumb.Item>
    </Breadcrumb>
  );
}