import React from 'react';
import { SpeedDial } from '@tiny-design/react';

export default function DirectionDemo() {
  const actions = (
    <>
      <SpeedDial.Action icon="A" tooltip="Action 1" />
      <SpeedDial.Action icon="B" tooltip="Action 2" />
      <SpeedDial.Action icon="C" tooltip="Action 3" />
    </>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, gap: 80 }}>
      <SpeedDial direction="right">
        {actions}
      </SpeedDial>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 120 }}>
        <SpeedDial direction="down">
          {actions}
        </SpeedDial>
        <SpeedDial direction="up">
          {actions}
        </SpeedDial>
      </div>
      <SpeedDial direction="left">
        {actions}
      </SpeedDial>
    </div>
  );
}