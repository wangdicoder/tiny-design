import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    setHeadings([]);

    // Try immediately in case content is already rendered
    const initial = queryHeadings();
    if (initial.length > 0) {
      setHeadings(initial);
      return;
    }

    // Otherwise observe DOM changes until headings appear
    const container = document.querySelector('.doc-container__layout');
    if (!container) return;

    const observer = new MutationObserver(() => {
      const found = queryHeadings();
      if (found.length > 0) {
        setHeadings(found);
        observer.disconnect();
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  return headings;
};
