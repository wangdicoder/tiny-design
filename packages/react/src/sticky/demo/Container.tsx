import React from 'react';
import { Sticky, Button } from '@tiny-design/react';

export default function ContainerDemo() {
  const containerStyle: React.CSSProperties = {
    height: 130,
    overflowY: 'scroll',
  };

  const bgStyle: React.CSSProperties = {
    paddingTop: 60,
    height: 500,
    backgroundColor: '#dfdfdf',
  };

  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div style={containerStyle} ref={containerRef}>
      <div style={bgStyle}>
        <Sticky container={() => containerRef.current ?? window}>
          <Button variant="solid" color="primary">
            Fixed at the top of container
          </Button>
        </Sticky>
      </div>
    </div>
  );
}
