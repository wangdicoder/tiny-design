import React from 'react';
import { AutoComplete } from '@tiny-design/react';

export default function CustomFilterDemo() {
  const options = [
    { value: 'React' },
    { value: 'Vue' },
    { value: 'Angular' },
    { value: 'Svelte' },
  ];

  const filterOption = (inputValue, option) => {
    return option.value.toLowerCase().startsWith(inputValue.toLowerCase());
  };

  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        options={options}
        filterOption={filterOption}
        placeholder="Search frameworks"
      />
    </div>
  );
}