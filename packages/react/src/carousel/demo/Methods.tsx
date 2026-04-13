import React from 'react';
import { Carousel, Button, Space } from '@tiny-design/react';
import type { CarouselRef } from '@tiny-design/react';

export default function MethodsDemo() {
  const ref = React.useRef<CarouselRef | null>(null);
  const style = {
    height: 160,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 24,
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => ref.current?.prev()}>Prev</Button>
        <Button onClick={() => ref.current?.next()}>Next</Button>
        <Button onClick={() => ref.current?.goTo(2)}>Go to Slide 3</Button>
      </Space>
      <Carousel ref={ref} dots>
        <div style={{ ...style, background: '#364d79' }}>Slide 1</div>
        <div style={{ ...style, background: '#6b8e23' }}>Slide 2</div>
        <div style={{ ...style, background: '#8b4513' }}>Slide 3</div>
        <div style={{ ...style, background: '#483d8b' }}>Slide 4</div>
      </Carousel>
    </div>
  );
}
