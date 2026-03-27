import { useDeferredValue, useState } from 'react';
import { IconSearch } from '@tiny-design/icons';
import * as Icons from '@tiny-design/icons';
import type { IconProps } from '@tiny-design/icons';
import Input from '../../input';
import Message from '../../message';
import { useTheme } from '../../_utils/use-theme'

const iconEntries = Object.entries(Icons).filter(
  ([key]) => key.startsWith('Icon')
) as [string, React.FC<IconProps>][];

const fallbackCopy = (value: string): void => {
  const textArea = document.createElement('textarea');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};

const copyText = async (value: string): Promise<void> => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fall through to the legacy path when clipboard permissions fail.
    }
  }

  fallbackCopy(value);
};

const SvgIconList = (): JSX.Element => {
  const [keyword, setKeyword] = useState('');
  const [activeIconName, setActiveIconName] = useState('');
  const deferredKeyword = useDeferredValue(keyword);
  const { resolvedTheme } = useTheme()

  const normalizedKeyword = deferredKeyword.trim().toLowerCase();
  const filteredIconEntries = iconEntries.filter(([name]) =>
    name.toLowerCase().includes(normalizedKeyword)
  );
  const copyIconComponent = async (name: string): Promise<void> => {
    const componentSnippet = `<${name} />`;

    try {
      await copyText(componentSnippet);
      Message.success(`${componentSnippet} copied`);
    } catch {
      Message.error('Copy failed');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          value={keyword}
          clearable
          onClearClick={() => setKeyword('')}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Search icons by name"
          aria-label="Search icons by name"
          prefix={<IconSearch size={16} color="#8c8c8c" />}
          style={{
            width: '100%',
            maxWidth: 320,
            boxSizing: 'border-box',
          }}
        />
      </div>
      {filteredIconEntries.length > 0 ? (
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            flexWrap: 'wrap',
            padding: 0,
            margin: 0,
          }}>
          {filteredIconEntries.map(([name, Component]) => (
            <li
              key={name}
              onClick={() => void copyIconComponent(name)}
              onMouseEnter={() => setActiveIconName(name)}
              onMouseLeave={() => setActiveIconName('')}
              onFocus={() => setActiveIconName(name)}
              onBlur={() => setActiveIconName('')}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  void copyIconComponent(name);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Copy ${name} component`}
              style={{
                width: '16.66%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 0',
                cursor: 'pointer',
                boxShadow:
                  activeIconName === name
                    ? resolvedTheme === 'dark' ? '0 10px 24px rgba(255, 255, 255, 0.12)' : '0 10px 24px rgba(15, 23, 42, 0.12)'
                    : 'none',
                transform: activeIconName === name ? 'translateY(-2px)' : 'translateY(0)',
                transition:
                  'box-shadow 160ms ease, transform 160ms ease, background-color 160ms ease',
                position: 'relative',
                zIndex: activeIconName === name ? 1 : 0,
              }}>
              <Component size={30} />
              <span style={{ marginTop: 8, fontSize: 12 }}>{name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div
          style={{
            padding: '24px 16px',
            border: '1px solid #eaeefb',
            color: '#737373',
            fontSize: 14,
          }}>
          No icons match "{keyword.trim()}".
        </div>
      )}
    </div>
  );
};

export default SvgIconList;
