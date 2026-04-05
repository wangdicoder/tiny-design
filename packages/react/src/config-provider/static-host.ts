import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { renderStaticNode } from './static-config';

const rootMap = new Map<HTMLElement, Root>();

export function createStaticHost(className?: string): HTMLElement {
  const container = document.createElement('div');

  if (className) {
    container.className = className;
  }

  document.body.appendChild(container);

  return container;
}

export function renderStaticHost(container: HTMLElement, node: React.ReactElement): Root {
  const root = rootMap.get(container) ?? createRoot(container);

  root.render(renderStaticNode(node));
  rootMap.set(container, root);

  return root;
}

export function destroyStaticHost(container: HTMLElement): void {
  const root = rootMap.get(container);

  if (root) {
    root.unmount();
    rootMap.delete(container);
  }

  if (container.parentNode) {
    container.parentNode.removeChild(container);
  }
}
