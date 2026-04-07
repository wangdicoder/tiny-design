import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocaleContext } from '../context/locale-context';

export interface HeadingItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const queryHeadings = (): HeadingItem[] => {
  const elements = document.querySelectorAll('.markdown h2[id], .markdown h3[id]');
  return Array.from(elements).map((el) => ({
    id: el.id,
    text: el.textContent?.replace(/\s*#$/, '') ?? '',
    level: (el.tagName === 'H2' ? 2 : 3) as 2 | 3,
  }));
};

export const useHeadings = (): HeadingItem[] => {
  const { pathname } = useLocation();
  const { locale } = useLocaleContext();
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    setHeadings([]);

    const container = document.querySelector('.doc-container__layout');
    if (!container) return;

    const update = () => {
      const found = queryHeadings();
      if (found.length > 0) {
        setHeadings(found);
      }
    };

    // Try immediately in case content is already rendered
    update();

    // Also observe DOM changes to catch async content swaps (e.g. locale toggle)
    const observer = new MutationObserver(update);
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname, locale]);

  return headings;
};
