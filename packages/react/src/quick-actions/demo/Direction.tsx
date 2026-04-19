import React from 'react';
import { QuickActions } from '@tiny-design/react';

export default function DirectionDemo() {
  const actions = (
    <>
      <QuickActions.Action icon="A" tooltip="Action 1" />
      <QuickActions.Action icon="B" tooltip="Action 2" />
      <QuickActions.Action icon="C" tooltip="Action 3" />
    </>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, gap: 80 }}>
      <QuickActions direction="right">
        {actions}
      </QuickActions>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 120 }}>
        <QuickActions direction="down">
          {actions}
        </QuickActions>
        <QuickActions direction="up">
          {actions}
        </QuickActions>
      </div>
      <QuickActions direction="left">
        {actions}
      </QuickActions>
    </div>
  );
}
