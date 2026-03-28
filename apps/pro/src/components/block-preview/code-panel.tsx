'use client';

import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from '@tiny-design/react';
import { LightCodeTheme, DarkCodeTheme } from './code-theme';
import styles from './block-preview.module.scss';

interface CodePanelProps {
  source: string;
}

export function CodePanel({ source }: CodePanelProps) {
  const { resolvedTheme } = useTheme();
  const theme = (resolvedTheme === 'dark' ? DarkCodeTheme : LightCodeTheme) as typeof themes.github;

  return (
    <div className={styles.codePanel}>
      <Highlight code={source.trim()} language="tsx" theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, padding: 16, margin: 0, overflow: 'auto' }}>
            <code>
              {tokens.map((line, i) => {
                const { key: _lineKey, ...lineProps } = getLineProps({ line }); // eslint-disable-line @typescript-eslint/no-unused-vars
                return (
                  <div key={i} {...lineProps}>
                    {line.map((token, j) => {
                      const { key: _tokenKey, ...tokenProps } = getTokenProps({ token }); // eslint-disable-line @typescript-eslint/no-unused-vars
                      return <span key={j} {...tokenProps} />;
                    })}
                  </div>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
