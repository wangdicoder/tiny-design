import React from 'react';
import { QuickActions, Message } from '@tiny-design/react';

export default function ClickDemo() {
  return (
    <div style={{ position: 'relative', height: 320 }}>
      <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <QuickActions trigger="click">
          <QuickActions.Action icon="C" tooltip="Copy" onClick={() => Message.info('Copy')} />
          <QuickActions.Action icon="P" tooltip="Print" onClick={() => Message.info('Print')} />
          <QuickActions.Action icon="S" tooltip="Share" onClick={() => Message.info('Share')} />
        </QuickActions>
      </div>
    </div>
  );
}
