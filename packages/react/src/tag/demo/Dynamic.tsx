import React from 'react';
import { Tag, Input } from '@tiny-design/react';
import { IconPlus } from '@tiny-design/icons';

export default function DynamicDemo() {
  const [tags, setTags] = React.useState(['Unremovable', 'Tag 2', 'Tag 3']);
  const [inputVisible, setInputVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleInputConfirm = () => {
    const tagValues = [...tags];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tagValues.push(inputValue);
    }
    setTags(tagValues);
    setInputVisible(false);
    setInputValue('');
  };

  const handleClose = (removedTag: string) => {
    const tagValues = [...tags];
    const filtered = tagValues.filter((tag) => tag !== removedTag);
    setTags(filtered);
  };

  return (
    <div>
      {tags.map((tag, idx) => (
        <Tag key={tag} closable={idx !== 0} onClose={() => handleClose(tag)}>
          {tag}
        </Tag>
      ))}
      {inputVisible ? (
        <Input
          autoFocus
          size="sm"
          style={{ width: 78, display: 'inline-block' }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onEnterPress={handleInputConfirm}
          ref={inputRef}
        />
      ) : (
        <Tag
          onClick={showInput}
          style={{ background: 'var(--ty-color-bg-container)', borderStyle: 'dashed' }}
        >
          <IconPlus size={11} /> New Tag
        </Tag>
      )}
    </div>
  );
}