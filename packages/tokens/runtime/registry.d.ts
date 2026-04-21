declare const registry: {
  version: number;
  generatedAt: string;
  tokens: Array<{
    key: string;
    cssVar: string;
    category: string;
    component?: string;
    type: string;
    group?: string;
    description?: string;
    source: string;
    defaultValue: string | number;
    resolvedValue: string | number;
    fallback?: string;
    status: string;
  }>;
};

export default registry;
