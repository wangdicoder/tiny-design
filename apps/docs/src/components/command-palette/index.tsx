import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Overlay } from '@tiny-design/react';
import { useLocaleContext } from '../../context/locale-context';
import { getGuideMenu, getThemeMenu, getComponentMenu, RouterItem } from '../../routers';
import './command-palette.scss';

interface SearchItem {
  title: string;
  route: string;
  section: string;
  fullPath: string;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function flattenMenuItems(
  items: RouterItem[],
  section: string,
  pathPrefix: string,
): SearchItem[] {
  const result: SearchItem[] = [];
  for (const item of items) {
    if (item.children) {
      for (const child of item.children) {
        if (child.route) {
          result.push({
            title: child.title,
            route: child.route,
            section: item.title,
            fullPath: `${pathPrefix}/${child.route}`,
          });
        }
      }
    } else if (item.route) {
      result.push({
        title: item.title,
        route: item.route,
        section,
        fullPath: `${pathPrefix}/${item.route}`,
      });
    }
  }
  return result;
}

export const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps): React.ReactElement => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultListRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { siteLocale } = useLocaleContext();

  const searchIndex = useMemo(() => {
    const guideItems = flattenMenuItems(getGuideMenu(siteLocale), siteLocale.nav.guide, '/guide');
    const themeItems = flattenMenuItems(getThemeMenu(siteLocale), siteLocale.nav.theme, '/theme');
    const componentItems = flattenMenuItems(
      getComponentMenu(siteLocale),
      siteLocale.nav.components,
      '/components',
    );
    return [...guideItems, ...themeItems, ...componentItems];
  }, [siteLocale]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return searchIndex;
    const q = query.toLowerCase();
    return searchIndex.filter((item) => item.title.toLowerCase().includes(q));
  }, [query, searchIndex]);

  const groupedItems = useMemo(() => {
    const groups: { section: string; items: SearchItem[] }[] = [];
    for (const item of filteredItems) {
      const last = groups[groups.length - 1];
      if (last && last.section === item.section) {
        last.items.push(item);
      } else {
        groups.push({ section: item.section, items: [item] });
      }
    }
    return groups;
  }, [filteredItems]);

  const close = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const selectItem = useCallback(
    (item: SearchItem) => {
      navigate(item.fullPath);
      close();
    },
    [navigate, close],
  );

  // Reset state when closing
  useEffect(() => {
    if (!open) {
      setQuery('');
      setActiveIndex(0);
    }
  }, [open]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Global Cmd/Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  // Scroll active item into view
  useEffect(() => {
    if (!resultListRef.current) return;
    const activeEl = resultListRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    const total = filteredItems.length;
    if (total === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % total);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + total) % total);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredItems[activeIndex]) {
          selectItem(filteredItems[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        close();
        break;
    }
  };

  const handleEntered = () => {
    inputRef.current?.focus();
  };

  let flatIndex = 0;

  return (
    <Overlay isShow={open} clickCallback={close} onEntered={handleEntered} zIndex={1001}>
      <div className="command-palette" onClick={(e) => e.stopPropagation()}>
        <div className="command-palette__input-wrapper">
          <Input
            ref={inputRef}
            className="command-palette__input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={siteLocale.commandPalette.placeholder}
            size="lg"
            prefix={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            }
          />
        </div>
        <div className="command-palette__results" ref={resultListRef}>
          {filteredItems.length === 0 ? (
            <div className="command-palette__empty">{siteLocale.commandPalette.noResults}</div>
          ) : (
            groupedItems.map((group) => (
              <div key={group.section} className="command-palette__group">
                <div className="command-palette__group-label">{group.section}</div>
                {group.items.map((item) => {
                  const idx = flatIndex++;
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={item.fullPath}
                      className={`command-palette__item${isActive ? ' command-palette__item_active' : ''}`}
                      data-active={isActive}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => selectItem(item)}>
                      <span className="command-palette__item-title">{item.title}</span>
                      <span className="command-palette__item-path">{item.fullPath}</span>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </Overlay>
  );
};
