import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { ComponentData } from '../types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadComponents(): ComponentData[] {
  const dataPath = resolve(__dirname, '../data/components.json');
  const raw = readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw) as ComponentData[];
}

export function listComponents(category?: string) {
  const components = loadComponents();
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
  const components = loadComponents();
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
  const components = loadComponents();
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
