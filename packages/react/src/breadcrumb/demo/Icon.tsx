import React from 'react';
import { Breadcrumb } from '@tiny-design/react';
import { IconHome, IconInspection } from '@tiny-design/icons';

export default function IconDemo() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <IconHome />
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="#/components/breadcrumb"><IconInspection />Project List</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>A Project</Breadcrumb.Item>
    </Breadcrumb>
  );
}