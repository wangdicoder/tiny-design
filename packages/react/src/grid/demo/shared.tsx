import React from 'react';

const toneMix = {
  strong: 96,
  base: 88,
  soft: 76,
  subtle: 64,
} as const;

type DemoTone = keyof typeof toneMix;

export function getDemoBlockStyle(
  tone: DemoTone = 'base',
  minHeight = 88,
  extraStyle?: React.CSSProperties,
): React.CSSProperties {
  return {
    minHeight,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 8,
    color: '#fff',
    background: `color-mix(in srgb, var(--ty-color-primary) ${toneMix[tone]}%, transparent)`,
    ...extraStyle,
  };
}

export function DemoBlock({
  title,
  detail,
  tone = 'base',
  minHeight = 88,
  style,
}: {
  title: string;
  detail?: string;
  tone?: DemoTone;
  minHeight?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={getDemoBlockStyle(tone, minHeight, style)}>
      <strong>{title}</strong>
      {detail ? <span style={{ opacity: 0.92 }}>{detail}</span> : null}
    </div>
  );
}

export function DemoControls({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginBottom: 16,
        padding: 12,
        display: 'grid',
        gap: 12,
        border: '1px solid color-mix(in srgb, var(--ty-color-primary) 12%, var(--ty-color-border))',
        background: 'color-mix(in srgb, var(--ty-color-primary) 3%, transparent)',
      }}>
      {children}
    </div>
  );
}

export function DemoControlLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 600 }}>{children}</div>;
}
