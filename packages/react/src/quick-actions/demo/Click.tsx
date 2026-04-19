import React from 'react';
import { QuickActions, Message } from '@tiny-design/react';
import { IconBookmark, IconShare, IconStar } from '@tiny-design/icons';

export default function ClickDemo() {
  return (
    <div style={{ position: 'relative', height: 320 }}>
      <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <QuickActions label="Project actions" trigger="hover">
          <QuickActions.Action
            icon={<IconBookmark />}
            label="Save snapshot"
            description="Open on pointer hover and keyboard focus."
            onClick={() => Message.success('Snapshot saved')}
          />
          <QuickActions.Action
            icon={<IconStar />}
            label="Keep panel open"
            description="Useful for multi-step quick operations."
            keepOpen
            onClick={() => Message.info('Panel kept open')}
          />
          <QuickActions.Action
            icon={<IconShare />}
            label="Share board"
            description="Invite teammates into the current workspace."
            onClick={() => Message.info('Invite sent')}
          />
        </QuickActions>
      </div>
    </div>
  );
}
