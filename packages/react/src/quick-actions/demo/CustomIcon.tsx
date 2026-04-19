import React, { useState } from 'react';
import { QuickActions, Message } from '@tiny-design/react';
import { IconBookmark, IconClose, IconPlus, IconShare, IconStar } from '@tiny-design/icons';

export default function CustomIconDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative', height: 320 }}>
      <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <QuickActions
          open={open}
          onOpenChange={(nextOpen) => setOpen(nextOpen)}
          label="Campaign actions"
          icon={<IconPlus />}
          openIcon={<IconClose />}>
          <QuickActions.Action
            icon={<IconBookmark />}
            label="Save for later"
            description="Keep this campaign editable for the next sprint."
            onClick={() => Message.success('Saved for later')}
          />
          <QuickActions.Action
            icon={<IconStar />}
            label="Featured slot"
            description="Reserve a premium slot on the landing page."
            loading={open}
          />
          <QuickActions.Action
            icon={<IconShare />}
            label="Share campaign"
            description="Send the campaign link to stakeholders."
            danger
            onClick={() => Message.warning('Shared with external reviewers')}
          />
        </QuickActions>
      </div>
    </div>
  );
}
