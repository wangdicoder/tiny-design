import React from 'react';
import { QuickActions } from '@tiny-design/react';

const actions = (
  <>
    <QuickActions.Action icon="R" label="Review" description="Collect final approvals." />
    <QuickActions.Action icon="S" label="Schedule" description="Set launch time and audience." />
    <QuickActions.Action icon="P" label="Publish" description="Push this update live." danger />
  </>
);

export default function DirectionDemo() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 320,
        gap: 96,
      }}>
      <QuickActions direction="right" label="Right actions">
        {actions}
      </QuickActions>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 140 }}>
        <QuickActions direction="down" label="Down actions">
          {actions}
        </QuickActions>
        <QuickActions direction="up" label="Up actions">
          {actions}
        </QuickActions>
      </div>
      <QuickActions direction="left" label="Left actions">
        {actions}
      </QuickActions>
    </div>
  );
}
