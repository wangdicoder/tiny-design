import React, { useMemo } from 'react';
import { ChartConfig } from './types';

const THEMES = { light: '', dark: 'html[data-tiny-theme=dark]' } as const;
const SAFE_COLOR_KEY = /^[A-Za-z0-9_-]+$/;

/**
 * Generates an inline <style> element for chart color tokens that need
 * separate light/dark values (i.e. when `theme` is used in ChartConfig).
 *
 * This is only rendered when at least one config entry uses `theme`.
 */
export function ChartStyle({
  id,
  config,
}: {
  id: string;
  config: ChartConfig;
}) {
  const colorConfig = useMemo(
    () =>
      Object.entries(config).filter(
        ([dataKey, cfg]) => SAFE_COLOR_KEY.test(dataKey) && (cfg.theme || cfg.color)
      ),
    [config]
  );

  if (
    !colorConfig.length ||
    !colorConfig.some(([, cfg]) => cfg.theme)
  ) {
    return null;
  }

  const css = Object.entries(THEMES)
    .map(([key, prefix]) => {
      const vars = colorConfig
        .map(([dataKey, cfg]) => {
          const color = cfg.theme?.[key as keyof typeof cfg.theme] || cfg.color;
          return color ? `  --color-${dataKey}: ${color};` : null;
        })
        .filter(Boolean)
        .join('\n');
      return `${prefix} [data-chart="${id}"] {\n${vars}\n}`;
    })
    .join('\n');

  return (
    <style dangerouslySetInnerHTML={{ __html: css }} />
  );
}
