import React from 'react';
import { Cascader } from '@tiny-design/react';

export default function DefaultValueDemo() {
  const options = [
    {
      value: 'electronics',
      label: 'Electronics',
      children: [
        {
          value: 'phones',
          label: 'Phones',
          children: [
            { value: 'iphone', label: 'iPhone 16 Pro' },
            { value: 'galaxy', label: 'Galaxy S25 Ultra' },
            { value: 'pixel', label: 'Pixel 9 Pro' },
          ],
        },
        {
          value: 'laptops',
          label: 'Laptops',
          children: [
            { value: 'macbook', label: 'MacBook Pro' },
            { value: 'thinkpad', label: 'ThinkPad X1' },
            { value: 'xps', label: 'Dell XPS 15' },
          ],
        },
      ],
    },
    {
      value: 'clothing',
      label: 'Clothing',
      children: [
        {
          value: 'mens',
          label: "Men's",
          children: [
            { value: 'jackets', label: 'Jackets' },
            { value: 'shirts', label: 'Shirts' },
          ],
        },
        {
          value: 'womens',
          label: "Women's",
          children: [
            { value: 'dresses', label: 'Dresses' },
            { value: 'tops', label: 'Tops' },
          ],
        },
      ],
    },
  ];

  return (
    <Cascader
      options={options}
      defaultValue={['electronics', 'laptops', 'macbook']}
      displayRender={(labels) => labels.join(' > ')}
    />
  );
}