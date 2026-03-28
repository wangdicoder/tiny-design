import React from 'react';
import { Card, Flex } from '@tiny-design/react';

export default function VariantDemo() {
  return (
    <Flex gap="md" wrap="wrap">
      <Card variant="outlined" title="Outlined" style={{ width: 260 }}>
        <Card.Content>Default style with a border.</Card.Content>
      </Card>
      <Card variant="elevated" title="Elevated" style={{ width: 260 }}>
        <Card.Content>Shadow without border.</Card.Content>
      </Card>
      <Card variant="filled" title="Filled" style={{ width: 260 }}>
        <Card.Content>Subtle fill background.</Card.Content>
      </Card>
    </Flex>
  );
}
