import React from 'react';

export interface StaticConfig {
  holderRender?: (children: React.ReactNode) => React.ReactElement;
}

let staticConfig: StaticConfig = {};

export function setStaticConfig(config: StaticConfig): void {
  staticConfig = { ...staticConfig, ...config };
}

export function getStaticConfig(): StaticConfig {
  return staticConfig;
}

export function renderStaticNode(node: React.ReactElement): React.ReactElement {
  return staticConfig.holderRender ? staticConfig.holderRender(node) : node;
}
