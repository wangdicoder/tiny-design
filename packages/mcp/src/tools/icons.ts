import type { IconData } from '@tiny-design/extract';
import iconsData from '../data/icons.json';

const data = iconsData as IconData;

export function listIcons(search?: string): string[] {
  if (search) {
    const term = search.toLowerCase();
    return data.icons.filter((name) => name.toLowerCase().includes(term));
  }
  return data.icons;
}

export function getIcon(name: string) {
  const icon = data.icons.find(
    (i) => i.toLowerCase() === name.toLowerCase()
  );
  if (!icon) return null;
  return {
    name: icon,
    props: data.props,
    usage: `import { ${icon} } from '@tiny-design/icons';\n\n<${icon} size={24} color="#6e41bf" />`,
  };
}
