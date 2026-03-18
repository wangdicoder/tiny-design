import React from 'react';
import { Collapse, Button, Badge, Tag } from '@tiny-design/react';

export default function ExtraDemo() {
  const { Panel } = Collapse;

  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel
        itemKey="1"
        header="Panel with action"
        extra={
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              alert('Settings clicked');
            }}
          >
            Settings
          </Button>
        }
      >
        Panel content with an extra action button.
      </Panel>
      <Panel
        itemKey="2"
        header="Panel with badge"
        extra={<Badge count={5} />}
      >
        Panel content with a badge indicator.
      </Panel>
      <Panel
        itemKey="3"
        header="Panel with tag"
        extra={<Tag color="#6e41bf">New</Tag>}
      >
        Panel content with a tag.
      </Panel>
    </Collapse>
  );
}