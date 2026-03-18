import React, { useRef, useState } from 'react';
import './code-block.scss';
import { Highlight, themes, Prism, type Language } from 'prism-react-renderer';

// Register bash/shell grammar (not included in prism-react-renderer's default bundle)
Prism.languages.bash = Prism.languages.shell = {
  comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: true },
  'shell-symbol': { pattern: /^\$(?=\s)/m, alias: 'punctuation' },
  string: [
    { pattern: /\$'(?:[^'\\]|\\[\s\S])*'/, greedy: true },
    { pattern: /(^|[^\\])"(?:[^"\\]|\\.)*"/, lookbehind: true, greedy: true },
    { pattern: /(^|[^\\])'[^']*'/, lookbehind: true, greedy: true },
  ],
  variable: [/\$\{[^}]+\}/, /\$\([^)]+\)/, /\$(?:\w+|[!#?*@_])/],
  keyword:
    /\b(?:if|then|else|elif|fi|for|do|done|case|esac|while|until|function|in|select|return|exit)\b/,
  function:
    /\b(?:npm|npx|node|yarn|pnpm|bun|git|curl|wget|mkdir|cp|mv|rm|ls|cat|grep|sed|awk|chmod|chown|sudo|apt|brew|pip|python|ruby|go|cargo|make|docker|cd|echo|export|source|touch)\b/,
  'flag': { pattern: /(^|\s)--?[\w-]+/, lookbehind: true, alias: 'keyword' },
  number: /\b\d+\b/,
  operator: /&&|\|\||[|;]/,
  punctuation: /[{}[\]()]/,
};
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { LightCodeTheme, DarkCodeTheme } from './code-theme';
import * as Components from '@tiny-design/react';
import * as SvgIcons from '@tiny-design/icons';
import CollapseTransition from '@tiny-design/react/collapse-transition';
import { useTheme, Tooltip } from '@tiny-design/react';
import { useLocaleContext } from '../../context/locale-context';
import { openInStackBlitz, openInCodeSandbox } from '../../utils/sandbox';

type Props = {
  children: string;
  className?: string;
  live?: boolean;
};

/** StackBlitz logo icon (inline SVG) */
const StackBlitzIcon = () => (
  <svg viewBox="0 0 28 28" width="1em" height="1em" fill="currentColor">
    <path d="M12.747 16.273h-7.46L18.925 1.5l-3.671 10.227h7.46L9.075 26.5l3.672-10.227z" />
  </svg>
);

/** CodeSandbox logo icon (inline SVG) */
const CodeSandboxIcon = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.4 0.3L0 256v512l512 256 512-256V256L755 140.3zM512 59.2l205.3 115.5-205.3 115.5L306.7 174.7 512 59.2zM288 370.4V589l-224-112V265.8L288 370.4zm-224 263l224 112.4V962L64 850v-216.6zm256 226.8V632.5l224-112V291.7l224 111.7V633.4l-448 226.8zM960 589l-224 112V370.4l224-104.6V589z" />
  </svg>
);

export const CodeBlock = ({ children, className, live }: Props): React.ReactElement => {
  const [showCode, setShowCode] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();
  const { siteLocale: s } = useLocaleContext();
  const codeTheme = (resolvedTheme === 'dark' ? DarkCodeTheme : LightCodeTheme) as typeof themes.github;

  let language: Language = 'markup';
  if (className != null) {
    language = className.replace(/language-/, '') as Language;
  }

  if (live) {
    const code = children.trim();

    return (
      <div className="code-block__container" ref={ref}>
        <LiveProvider code={code} theme={codeTheme} scope={{ ...Components, ...SvgIcons }}>
          <LivePreview className="code-block__previewer" />
          <LiveError />
          <CollapseTransition isShow={showCode}>
            <div
              className="code-block__editor-container"
              style={{
                maxWidth: ref.current ? (ref.current as HTMLDivElement).offsetWidth : 0,
              }}>
              <div className="code-block__editor-wrapper">
                <LiveEditor />
              </div>
            </div>
          </CollapseTransition>
          <div className="code-block__actions">
            <Tooltip title={s.codeBlock.openInCodeSandbox}>
              <button
                className="code-block__action-btn"
                onClick={() => openInCodeSandbox(code)}
                aria-label={s.codeBlock.openInCodeSandbox}>
                <CodeSandboxIcon />
              </button>
            </Tooltip>
            <Tooltip title={s.codeBlock.openInStackBlitz}>
              <button
                className="code-block__action-btn"
                onClick={() => openInStackBlitz(code)}
                aria-label={s.codeBlock.openInStackBlitz}>
                <StackBlitzIcon />
              </button>
            </Tooltip>
            <span
              className="code-block__action-toggle"
              onClick={() => setShowCode(!showCode)}>
              {showCode ? s.codeBlock.hideCode : s.codeBlock.showCode}
            </span>
          </div>
        </LiveProvider>
      </div>
    );
  }
  return (
    <Highlight
      code={children.trim()}
      language={language}
      theme={codeTheme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '10px 12px' }}>
          <code>
            {tokens.map((line, i) => {
              const { key: _lk, ...lineProps } = getLineProps({ line });
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, j) => {
                    const { key: _tk, ...tokenProps } = getTokenProps({ token });
                    return <span key={j} {...tokenProps} />;
                  })}
                </div>
              );
            })}
          </code>
        </pre>
      )}
    </Highlight>
  );
};
