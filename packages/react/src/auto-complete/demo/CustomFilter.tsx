import { AutoComplete } from '@tiny-design/react';
import type { AutoCompleteOption } from '@tiny-design/react';

export default function CustomFilterDemo() {
  const options = [
    { value: 'React' },
    { value: 'Vue' },
    { value: 'Angular' },
    { value: 'Svelte' },
  ];

  const filterOption = (inputValue: string, option: AutoCompleteOption) => {
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
