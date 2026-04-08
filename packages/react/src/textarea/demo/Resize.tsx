import React from 'react';
import { Textarea } from '@tiny-design/react';

export default function ResizeDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Textarea rows={3} placeholder="Default resize handle" />
      <Textarea rows={3} placeholder="Not resizable" resizable={false} />
      <Textarea
        rows={3}
        placeholder="Custom vertical resize handle"
        resizeHandle={<span style={{ fontSize: 12, lineHeight: 1 }}>≡</span>}
      />
    </div>
  );
}
