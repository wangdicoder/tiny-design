import React from 'react';
import { Cascader } from '@tiny-design/react';

export default function HoverDemo() {
  const options = [
    {
      value: 'design',
      label: 'Design',
      children: [
        { value: 'figma', label: 'Figma' },
        { value: 'sketch', label: 'Sketch' },
        { value: 'xd', label: 'Adobe XD' },
      ],
    },
    {
      value: 'development',
      label: 'Development',
      children: [
        { value: 'vscode', label: 'VS Code' },
        { value: 'webstorm', label: 'WebStorm' },
        { value: 'vim', label: 'Neovim' },
      ],
    },
    {
      value: 'collaboration',
      label: 'Collaboration',
      children: [
        { value: 'slack', label: 'Slack' },
        { value: 'notion', label: 'Notion' },
        { value: 'linear', label: 'Linear' },
      ],
    },
  ];

  return (
    <Cascader
      options={options}
      expandTrigger="hover"
      placeholder="Pick your toolset"
    />
  );
}