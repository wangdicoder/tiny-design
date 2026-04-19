import React from 'react';
import { QuickActions, Message } from '@tiny-design/react';
import { IconBookmark, IconShare, IconStar } from '@tiny-design/icons';

export default function ActionBehaviorDemo() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 32,
        minHeight: 320,
        padding: '0 16px 20px',
        flexWrap: 'wrap',
      }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 12, color: 'var(--ty-color-text-secondary)', textAlign: 'center' }}>
          Keep the whole launcher open
        </div>
        <QuickActions label="Persistent actions" closeOnActionClick={false}>
          <QuickActions.Action
            icon={<IconBookmark />}
            label="Pin selection"
            description="Every action click keeps this stack visible."
            onClick={() => Message.info('Pinned')}
          />
          <QuickActions.Action
            icon={<IconStar />}
            label="Mark priority"
            description="Useful when several quick actions happen in sequence."
            onClick={() => Message.success('Priority updated')}
          />
          <QuickActions.Action
            icon={<IconShare />}
            label="Share update"
            description="Still stays open after sharing."
            onClick={() => Message.info('Shared')}
          />
        </QuickActions>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 12, color: 'var(--ty-color-text-secondary)', textAlign: 'center' }}>
          Keep only one action open
        </div>
        <QuickActions label="Selective persistence">
          <QuickActions.Action
            icon={<IconBookmark />}
            label="Save draft"
            description="Default action clicks close the launcher."
            onClick={() => Message.success('Draft saved')}
          />
          <QuickActions.Action
            icon={<IconStar />}
            label="Adjust audience"
            description="This action opts into keeping the launcher open."
            keepOpen
            onClick={() => Message.info('Audience panel opened')}
          />
          <QuickActions.Action
            icon={<IconShare />}
            label="Send update"
            description="Closes again because keepOpen is not set."
            onClick={() => Message.info('Update sent')}
          />
        </QuickActions>
      </div>
    </div>
  );
}
