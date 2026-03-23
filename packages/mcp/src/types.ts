export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ComponentDemo {
  name: string;
  code: string;
}

export interface ComponentData {
  name: string;
  category: string;
  description: string;
  props: ComponentProp[];
  demos: ComponentDemo[];
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
