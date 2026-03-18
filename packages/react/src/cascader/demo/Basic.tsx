import React from 'react';
import { Cascader } from '@tiny-design/react';

export default function BasicDemo() {
  const options = [
    {
      value: 'us',
      label: 'United States',
      children: [
        {
          value: 'california',
          label: 'California',
          children: [
            { value: 'la', label: 'Los Angeles' },
            { value: 'sf', label: 'San Francisco' },
            { value: 'sd', label: 'San Diego' },
          ],
        },
        {
          value: 'newyork',
          label: 'New York',
          children: [
            { value: 'nyc', label: 'New York City' },
            { value: 'buffalo', label: 'Buffalo' },
          ],
        },
        {
          value: 'texas',
          label: 'Texas',
          children: [
            { value: 'houston', label: 'Houston' },
            { value: 'austin', label: 'Austin' },
            { value: 'dallas', label: 'Dallas' },
          ],
        },
      ],
    },
    {
      value: 'jp',
      label: 'Japan',
      children: [
        {
          value: 'kanto',
          label: 'Kanto',
          children: [
            { value: 'tokyo', label: 'Tokyo' },
            { value: 'yokohama', label: 'Yokohama' },
          ],
        },
        {
          value: 'kansai',
          label: 'Kansai',
          children: [
            { value: 'osaka', label: 'Osaka' },
            { value: 'kyoto', label: 'Kyoto' },
            { value: 'kobe', label: 'Kobe' },
          ],
        },
      ],
    },
    {
      value: 'uk',
      label: 'United Kingdom',
      children: [
        {
          value: 'england',
          label: 'England',
          children: [
            { value: 'london', label: 'London' },
            { value: 'manchester', label: 'Manchester' },
            { value: 'birmingham', label: 'Birmingham' },
          ],
        },
        {
          value: 'scotland',
          label: 'Scotland',
          children: [
            { value: 'edinburgh', label: 'Edinburgh' },
            { value: 'glasgow', label: 'Glasgow' },
          ],
        },
      ],
    },
  ];

  return (
    <Cascader
      options={options}
      placeholder="Select a country, state, and city"
      onChange={(value, opts) => console.log(value, opts)}
    />
  );
}