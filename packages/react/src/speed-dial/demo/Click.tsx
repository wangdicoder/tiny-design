import React from 'react';
import { SpeedDial, Message } from '@tiny-design/react';

export default function ClickDemo() {
  return (
    <div style={{ position: 'relative', height: 320 }}>
      <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <SpeedDial trigger="click">
          <SpeedDial.Action icon="C" tooltip="Copy" onClick={() => Message.info('Copy')} />
          <SpeedDial.Action icon="P" tooltip="Print" onClick={() => Message.info('Print')} />
          <SpeedDial.Action icon="S" tooltip="Share" onClick={() => Message.info('Share')} />
        </SpeedDial>
      </div>
    </div>
  );
}