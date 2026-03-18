import React from 'react';
import { Anchor } from '@tiny-design/react';

export default function NestedDemo() {
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
        <div id="intro" style={{ height: 300, padding: 16, background: 'rgba(111, 66, 193, 0.02)' }}>
          Introduction
        </div>
        <div id="guide" style={{ height: 300, padding: 16, background: 'rgba(111, 66, 193, 0.04)' }}>
          Guide
        </div>
        <div id="guide-install" style={{ height: 300, padding: 16, background: 'rgba(111, 66, 193, 0.02)' }}>
          Installation
        </div>
        <div id="guide-usage" style={{ height: 300, padding: 16, background: 'rgba(111, 66, 193, 0.04)' }}>
          Usage
        </div>
        <div id="api" style={{ height: 300, padding: 16, background: 'rgba(111, 66, 193, 0.02)' }}>
          API Reference
        </div>
      </div>
      <div style={{ width: 160 }}>
        <Anchor type="line" getContainer={() => containerRef.current}>
          <Anchor.Link href="#intro" title="Introduction" />
          <Anchor.Link href="#guide" title="Guide">
            <Anchor.Link href="#guide-install" title="Installation" />
            <Anchor.Link href="#guide-usage" title="Usage" />
          </Anchor.Link>
          <Anchor.Link href="#api" title="API Reference" />
        </Anchor>
      </div>
    </div>
  );
}