import React from 'react';
import { Textarea } from '@tiny-design/react';

export default function CountDemo() {
  return (
    <Textarea
      rows={4}
      placeholder="This textarea has the charater limit..."
      limit={50}
    />
  );
}