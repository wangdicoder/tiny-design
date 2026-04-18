import React from 'react';
import { Flex, Image, Slider } from '@tiny-design/react';

export default function SizeDemo() {
  const [width, setWidth] = React.useState(250);
  const [height, setHeight] = React.useState(150);

  return (
    <Flex vertical gap={16}>
      <Image
        width={width}
        height={height}
        src="https://cdn.pixabay.com/photo/2019/12/21/18/31/discus-fish-4711042__340.jpg"
        alt="Discus fish"
      />

      <Flex vertical gap={12}>
        <div style={{ fontSize: 12, color: '#64748b' }}>Width: {width}px</div>
        <Slider min={160} max={360} value={width} onChange={(value) => setWidth(Number(value))} />

        <div style={{ fontSize: 12, color: '#64748b' }}>Height: {height}px</div>
        <Slider min={100} max={260} value={height} onChange={(value) => setHeight(Number(value))} />
      </Flex>
    </Flex>
  );
}
