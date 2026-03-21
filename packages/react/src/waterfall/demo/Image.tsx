import { Waterfall } from '@tiny-design/react';
import { WaterfallItem } from '../types';

// Lorem Picsum — free placeholder images with varying aspect ratios
const imageList = [
  'https://picsum.photos/id/10/400/300',
  'https://picsum.photos/id/22/400/500',
  'https://picsum.photos/id/37/400/250',
  'https://picsum.photos/id/42/400/400',
  'https://picsum.photos/id/58/400/350',
  'https://picsum.photos/id/65/400/450',
  'https://picsum.photos/id/76/400/280',
  'https://picsum.photos/id/84/400/520',
  'https://picsum.photos/id/96/400/320',
  'https://picsum.photos/id/119/400/380',
  'https://picsum.photos/id/137/400/260',
  'https://picsum.photos/id/152/400/470',
  'https://picsum.photos/id/167/400/310',
  'https://picsum.photos/id/180/400/420',
  'https://picsum.photos/id/193/400/290',
  'https://picsum.photos/id/206/400/360',
];

const items: WaterfallItem<string>[] = imageList.map((img, index) => ({
  key: `img-${index}`,
  data: img,
}));

export default function ImageDemo() {
  return (
    <Waterfall
      columns={4}
      gutter={16}
      items={items}
      itemRender={({ data }) => (
        <img
          src={data}
          alt="sample"
          style={{ width: '100%', display: 'block', borderRadius: 4 }}
        />
      )}
    />
  );
}
