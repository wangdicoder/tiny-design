import React from 'react';
import { Flex, Segmented, Button } from '@tiny-design/react';

export default function AlignDemo() {
  const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];
  const alignOptions = ['flex-start', 'center', 'flex-end'];

  const [justify, setJustify] = React.useState('flex-start');
  const [align, setAlign] = React.useState('flex-start');

  const boxStyle = {
    width: '100%',
    height: 120,
    borderRadius: 6,
    border: '1px solid var(--ty-color-primary)',
  };

  return (
    <Flex gap="md" align="flex-start" vertical>
      <span>Select justify:</span>
      <Segmented options={justifyOptions} value={justify} onChange={(val) => setJustify(val)} />
      <span>Select align:</span>
      <Segmented options={alignOptions} value={align} onChange={(val) => setAlign(val)} />
      <Flex style={boxStyle} justify={justify} align={align}>
        <Button btnType="primary">Primary</Button>
        <Button btnType="primary">Primary</Button>
        <Button btnType="primary">Primary</Button>
        <Button btnType="primary">Primary</Button>
      </Flex>
    </Flex>
  );
}
