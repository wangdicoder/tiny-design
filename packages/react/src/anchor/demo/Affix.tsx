import React from 'react';
import { Anchor } from '@tiny-design/react';

export default function AffixDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null);

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
        <div id="affix-1" style={{ height: 300, padding: 16, background: 'rgba(111, 66, 193, 0.02)' }}>
          Section 1
        </div>
        <div id="affix-2" style={{ height: 300, padding: 16, background: 'rgba(111, 66, 193, 0.04)' }}>
          Section 2
        </div>
        <div id="affix-3" style={{ height: 300, padding: 16, background: 'rgba(111, 66, 193, 0.02)' }}>
          Section 3
        </div>
      </div>
      <div style={{ width: 140 }}>
        <Anchor affix getContainer={() => containerRef.current ?? window}>
          <Anchor.Link href="#affix-1" title="Section 1" />
          <Anchor.Link href="#affix-2" title="Section 2" />
          <Anchor.Link href="#affix-3" title="Section 3" />
        </Anchor>
      </div>
    </div>
  );
}
