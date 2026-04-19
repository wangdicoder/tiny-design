import React from 'react';
import { QuickActions, Message } from '@tiny-design/react';
import { IconBookmark, IconShare, IconStar, IconPlus, IconClose } from '@tiny-design/icons';

export default function BasicDemo() {
  return (
    <div style={{ position: 'relative', height: 320 }}>
      <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <QuickActions label="Post actions" icon={<IconPlus />} openIcon={<IconClose />}>
          <QuickActions.Action
            icon={<IconBookmark />}
            label="Save draft"
            description="Keep this update in your private workspace."
            onClick={() => Message.success('Draft saved')}
          />
          <QuickActions.Action
            icon={<IconStar />}
            label="Feature post"
            description="Pin it to the top of your campaign board."
            onClick={() => Message.info('Marked as featured')}
          />
          <QuickActions.Action
            icon={<IconShare />}
            label="Share now"
            description="Send the latest version to collaborators."
            onClick={() => Message.info('Share started')}
          />
        </QuickActions>
      </div>
    </div>
  );
}
