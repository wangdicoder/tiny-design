import React from 'react';
import { Anchor } from '@tiny-design/react';

export default function BasicDemo() {
  const containerRef = React.useRef(null);

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div
        ref={containerRef}
        style={{
          flex: 1,
          height: 300,
          overflowY: 'auto',
          border: '1px solid #e8e8e8',
          borderRadius: 4,
        }}
      >
        <div id="section-1" style={{ height: 300, padding: 16, background: 'rgba(111, 66, 193, 0.02)' }}>
          Section 1
        </div>
        <div id="section-2" style={{ height: 300, padding: 16, background: 'rgba(111, 66, 193, 0.04)' }}>
          Section 2
        </div>
        <div id="section-3" style={{ height: 300, padding: 16, background: 'rgba(111, 66, 193, 0.02)' }}>
          Section 3
        </div>
        <div id="section-4" style={{ height: 300, padding: 16, background: 'rgba(111, 66, 193, 0.04)' }}>
          Section 4
        </div>
      </div>
      <div style={{ width: 140 }}>
        <Anchor getContainer={() => containerRef.current}>
          <Anchor.Link href="#section-1" title="Section 1" />
          <Anchor.Link href="#section-2" title="Section 2" />
          <Anchor.Link href="#section-3" title="Section 3" />
          <Anchor.Link href="#section-4" title="Section 4" />
        </Anchor>
      </div>
    </div>
  );
}