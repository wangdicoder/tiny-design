import React from 'react';
import { Cascader } from '@tiny-design/react';

export default function SizesDemo() {
  const options = [
    {
      value: 'asia',
      label: 'Asia',
      children: [
        {
          value: 'japan',
          label: 'Japan',
          children: [
            { value: 'tokyo', label: 'Tokyo' },
            { value: 'osaka', label: 'Osaka' },
          ],
        },
        {
          value: 'korea',
          label: 'South Korea',
          children: [
            { value: 'seoul', label: 'Seoul' },
            { value: 'busan', label: 'Busan' },
          ],
        },
      ],
    },
    {
      value: 'europe',
      label: 'Europe',
      children: [
        {
          value: 'france',
          label: 'France',
          children: [
            { value: 'paris', label: 'Paris' },
            { value: 'lyon', label: 'Lyon' },
          ],
        },
        {
          value: 'germany',
          label: 'Germany',
          children: [
            { value: 'berlin', label: 'Berlin' },
            { value: 'munich', label: 'Munich' },
          ],
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Cascader options={options} size="sm" placeholder="Small" />
      <Cascader options={options} size="md" placeholder="Medium (default)" />
      <Cascader options={options} size="lg" placeholder="Large" />
    </div>
  );
}