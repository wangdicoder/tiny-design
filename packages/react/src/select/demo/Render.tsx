import React from 'react';
import { Select } from '@tiny-design/react';

export default function RenderDemo() {
  const options = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
  ];

  const colors = { red: '#f5222d', green: '#52c41a', blue: '#1890ff', purple: '#722ed1' };

  return (
    <Select
      defaultValue="blue"
      style={{ width: 200 }}
      options={options}
      optionRender={(option) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: colors[option.value],
              display: 'inline-block',
            }}
          />
          {option.label}
        </div>
      )}
      labelRender={({ label, value }) => (
        <span style={{ color: colors[value] }}>{label}</span>
      )}
    />
  );
}