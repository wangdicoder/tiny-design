import React from 'react';
import { Select } from '@tiny-design/react';

const options = Array.from({ length: 30 }, (_, i) => ({
  value: `option-${i + 1}`,
  label: `Option ${i + 1}`,
}));

export default function ScrollToSelectedDemo() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Select
        style={{ width: 200 }}
        placeholder="Enabled (default)"
        defaultValue="option-25"
        options={options}
      />
      <Select
        style={{ width: 200 }}
        placeholder="Disabled"
        defaultValue="option-25"
        scrollToSelected={false}
        options={options}
      />
    </div>
  );
}
