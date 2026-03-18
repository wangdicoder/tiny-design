import React from 'react';
import { Carousel } from '@tiny-design/react';

export default function FadeDemo() {
  const style = {
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 24,
  };
  return (
    <Carousel effect="fade" autoplay>
      <div style={{ ...style, background: '#364d79' }}>Slide 1</div>
      <div style={{ ...style, background: '#6b8e23' }}>Slide 2</div>
      <div style={{ ...style, background: '#8b4513' }}>Slide 3</div>
    </Carousel>
  );
}