import React from 'react';
import { Collapse } from '@tiny-design/react';

export default function BorderlessDemo() {
  const { Panel } = Collapse;

  const text = `A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.`;

  return (
    <Collapse bordered={false}>
      <Panel header="This is panel header 1" itemKey="1">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 2" itemKey="2">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 3" itemKey="3" disabled>
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
}