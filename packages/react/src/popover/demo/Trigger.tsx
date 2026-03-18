import React from 'react';
import { Popover, Button } from '@tiny-design/react';

export default function TriggerDemo() {
  const content = (
    <div>
      <div>This is the content</div>
      <div>This is the content</div>
    </div>
  );

  return (
    <>
      <Popover content={content} title="Title" trigger="hover">
        <Button>Hover me</Button>
      </Popover>
      <Popover content={content} title="Title" trigger="focus">
        <Button>Focus me</Button>
      </Popover>
      <br />
      <br />
      <Popover content={content} title="Title" trigger="click">
        <Button>Click me</Button>
      </Popover>
      <Popover content={content} title="Title" trigger="contextmenu">
        <Button>Right Click me</Button>
      </Popover>
    </>
  );
}