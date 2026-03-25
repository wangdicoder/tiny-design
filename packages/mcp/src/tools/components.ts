import type { ComponentData } from '@tiny-design/extract';
import componentsData from '../data/components.json';

const components = componentsData as ComponentData[];

export function listComponents(category?: string) {
  const filtered = category
    ? components.filter((c) => c.category === category)
    : components;

  return filtered.map(({ name, category, description }) => ({
    name,
    category,
    description,
  }));
}

export function getComponentProps(name: string) {
  const component = components.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
  if (!component) return null;

  return {
    name: component.name,
    category: component.category,
    description: component.description,
    props: component.props,
  };
}

export function getComponentExample(name: string, demo?: string) {
  const component = components.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
  if (!component) return null;

  if (demo) {
    const found = component.demos.filter(
      (d) => d.name.toLowerCase() === demo.toLowerCase()
    );
    return found.length > 0 ? found : null;
  }

  return component.demos;
}
