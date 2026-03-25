import React from 'react';
import { Anchor } from '@tiny-design/react';
import { useHeadings, HeadingItem } from '../../hooks/use-headings';
import './table-of-contents.scss';

interface TocNode {
  heading: HeadingItem;
  children: HeadingItem[];
}

const buildTree = (headings: HeadingItem[]): TocNode[] => {
  const tree: TocNode[] = [];
  let current: TocNode | null = null;

  for (const heading of headings) {
    if (heading.level === 2) {
      current = { heading, children: [] };
      tree.push(current);
    } else if (heading.level === 3) {
      if (current) {
        current.children.push(heading);
      } else {
        // h3 without a preceding h2 — treat as top-level
        tree.push({ heading, children: [] });
      }
    }
  }

  return tree;
};

export const TableOfContents = (): React.ReactElement | null => {
  const headings = useHeadings();

  if (headings.length === 0) {
    return null;
  }

  const tree = buildTree(headings);

  return (
    <div className="doc-toc">
      <Anchor type="line" offsetTop={80}>
        {tree.map((node) => (
          <Anchor.Link
            key={node.heading.id}
            href={`#${node.heading.id}`}
            title={node.heading.text}>
            {node.children.map((child) => (
              <Anchor.Link
                key={child.id}
                href={`#${child.id}`}
                title={child.text}
              />
            ))}
          </Anchor.Link>
        ))}
      </Anchor>
    </div>
  );
};
