import React from 'react';
import { Keyboard } from '@tiny-design/react';

type SearchTriggerProps = {
  onClick: () => void;
};

const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

export const SearchTrigger = ({ onClick }: SearchTriggerProps): React.ReactElement => {
  return (
    <button className="header__search-trigger" onClick={onClick} aria-label="Search docs">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <Keyboard>{isMac ? '⌘ + K' : 'Ctrl + K'}</Keyboard>
    </button>
  );
};
