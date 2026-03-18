import React from 'react';
import { AutoComplete } from '@tiny-design/react';

export default function BasicDemo() {
  const [options, setOptions] = React.useState([]);

  const handleSearch = (value) => {
    if (!value) {
      setOptions([]);
    } else {
      setOptions(
        ['gmail.com', 'outlook.com', 'qq.com'].map((domain) => ({
          value: `${value}@${domain}`,
        }))
      );
    }
  };

  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        options={options}
        onSearch={handleSearch}
        placeholder="Enter email"
      />
    </div>
  );
}