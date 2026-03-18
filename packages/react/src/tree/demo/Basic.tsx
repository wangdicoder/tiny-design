import React from 'react';
import { Tree } from '@tiny-design/react';

export default function BasicDemo() {
  const treeData = [
    {
      title: 'level one 1',
      children: [{
        title: 'level two 1-1',
        children: [{
          title: 'level three 1-1-1'
        }]
      }]
    }, {
      title: 'level one 2',
      children: [{
        title: 'level two 2-1',
        children: [{
          title: 'level three 2-1-1'
        }]
      }, {
        title: 'level two 2-2',
        children: [{
          title: 'level three 2-2-1'
        }]
      }]
    }, {
      title: 'level one 3',
      children: [{
        title: 'level two 3-1',
        children: [{
          title: 'level three 3-1-1'
        }]
      }, {
        title: 'level two 3-2',
        children: [{
          title: 'level three 3-2-1'
        }]
      }]
    }
  ];

  return (
    <Tree data={treeData} />
  );
}