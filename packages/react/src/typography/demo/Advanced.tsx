import React from 'react';
import { Paragraph, Text } from '@tiny-design/react';

export default function AdvancedDemo() {
  return (
    <>
      <Text copyable code>
        npm install @tiny-design/react
      </Text>
      <br />
      <br />
      <Text type="secondary" ellipsis={{ tooltip: true }} style={{ display: 'inline-block', maxWidth: 240 }}>
        This is a long line that will truncate gracefully while keeping the original content on hover.
      </Text>
      <br />
      <br />
      <Paragraph
        as="blockquote"
        ellipsis={{ rows: 2, tooltip: true }}
        style={{ maxWidth: 320, marginBottom: 0 }}>
        Design systems are most useful when the low-level API is predictable enough that product teams can compose without reading component source every time.
      </Paragraph>
    </>
  );
}
