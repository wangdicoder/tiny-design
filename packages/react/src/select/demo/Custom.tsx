import React from 'react';
import { Select } from '@tiny-design/react';

export default function CustomDemo() {
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ]);

  const handleSearch = (val) => {
    if (val) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div style={{ width: 300 }}>
      <Select
        showSearch
        placeholder="Select a framework"
        options={options}
        loading={loading}
        onSearch={handleSearch}
        optionRender={(opt, { index }) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{opt.label}</span>
            <span style={{ color: '#999' }}>#{index + 1}</span>
          </div>
        )}
        allowClear
      />
    </div>
  );
}