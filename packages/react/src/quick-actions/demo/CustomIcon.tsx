import React from 'react';
import { QuickActions } from '@tiny-design/react';
import { IconPlus, IconClose, IconBookmark, IconStar, IconShare } from '@tiny-design/icons';

export default function CustomIconDemo() {
  return (
    <div style={{ position: 'relative', height: 320 }}>
      <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <QuickActions
          icon={<IconPlus />}
          openIcon={<IconClose />}
        >
          <QuickActions.Action icon={<IconBookmark />} tooltip="Save" />
          <QuickActions.Action icon={<IconStar />} tooltip="Favorite" />
          <QuickActions.Action icon={<IconShare />} tooltip="Share" />
        </QuickActions>
      </div>
    </div>
  );
}
