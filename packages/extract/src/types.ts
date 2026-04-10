export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
}

export interface ComponentDemo {
  name: string;
  code: string;
}

export interface ComponentData {
  name: string;
  dirName: string;
  category: string;
  description: string;
  descriptionZh: string;
  props: ComponentProp[];
  demos: ComponentDemo[];
}

export interface ComponentDataWithDocs extends ComponentData {
  doc: { en: string; zh: string };
}

export interface TokenEntry {
  variable: string;
  value: string;
}

export interface TokenData {
  [category: string]: {
    [name: string]: TokenEntry;
  };
}

export interface IconData {
  props: {
    size: { type: string; default: string };
    color: { type: string; default: string };
  };
  icons: string[];
}

export interface ExtractComponentsOptions {
  /** Path to the react package src directory */
  reactSrcPath: string;
  /** Include full markdown docs (en + zh) */
  includeDocs?: boolean;
  /** Parse default values from API tables in markdown */
  includeDefaults?: boolean;
}

export interface ExtractTokensOptions {
  /** Path to the v2 token registry JSON file */
  registryPath?: string;
  /** Optional path to React SCSS compile-time variables for breakpoints */
  variablesPath?: string;
}

export interface ExtractIconsOptions {
  /** Path to the icons index.ts file */
  iconsIndexPath: string;
}
