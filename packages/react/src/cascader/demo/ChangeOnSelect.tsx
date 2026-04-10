import React from 'react';
import { Cascader } from '@tiny-design/react';

export default function ChangeOnSelectDemo() {
  const options = [
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            { value: 'zhonghuamen', label: 'Zhong Hua Men' },
          ],
        },
      ],
    },
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            { value: 'xihu', label: 'West Lake' },
          ],
        },
      ],
    },
  ];

  const [value, setValue] = React.useState<(string | number)[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Cascader
        options={options}
        value={value}
        onChange={(val) => setValue(val)}
        changeOnSelect
        placeholder="Select any level"
      />
      <span>Selected value: {value.length > 0 ? value.join(' / ') : 'none'}</span>
    </div>
  );
}
