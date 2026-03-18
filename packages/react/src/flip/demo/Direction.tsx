import React from 'react';
import { Flip } from '@tiny-design/react';

export default function DirectionDemo() {
  const { Item } = Flip;

  const WIDTH = '240px';
  const HEIGHT = '150px';

  const itemStyle = {
    color: '#fff',
    lineHeight: HEIGHT,
    fontSize: '18px',
  };

  return (
    <>
      <p>Horizontal flip</p>
      <Flip height={HEIGHT} width={WIDTH}>
        <Item style={{ ...itemStyle, backgroundColor: '#00bcd4' }}>
          Flip from right to left
        </Item>
        <Item style={{ ...itemStyle, backgroundColor: '#ff9800' }}>
          I'm back
        </Item>
      </Flip>

      <span style={{ width: 20, display: 'inline-block' }} />

      <Flip reverse height={HEIGHT} width={WIDTH}>
        <Item style={{ ...itemStyle, backgroundColor: '#00bcd4' }}>
          Flip from left to right
        </Item>
        <Item style={{ ...itemStyle, backgroundColor: '#ff9800' }}>
          I'm back
        </Item>
      </Flip>

      <p>Vertical flip</p>
      <Flip direction="vertical" height={HEIGHT} width={WIDTH}>
        <Item style={{ ...itemStyle, backgroundColor: '#00bcd4' }}>
          Flip from top to bottom
        </Item>
        <Item style={{ ...itemStyle, backgroundColor: '#ff9800' }}>
          I'm back
        </Item>
      </Flip>

      <span style={{ width: 20, display: 'inline-block' }} />

      <Flip direction="vertical" reverse height={HEIGHT} width={WIDTH}>
        <Item style={{ ...itemStyle, backgroundColor: '#00bcd4' }}>
          Flip from bottom to top
        </Item>
        <Item style={{ ...itemStyle, backgroundColor: '#ff9800' }}>
          I'm back
        </Item>
      </Flip>
    </>
  );
}